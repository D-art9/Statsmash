import os
import json
import torch
import numpy as np
import time
from sentence_transformers import SentenceTransformer

class VectorScout:
    def __init__(self, model_name='all-MiniLM-L6-v2', dataset_path='data/processed/nba_dataset.jsonl'):
        print(f"🕵️‍♂️ [SCASH] Initializing Vector Scout (SBERT)...")
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.model = SentenceTransformer(model_name, device=self.device)
        self.dataset_path = dataset_path
        
        self.documents = []
        self.metadatas = []
        self.embeddings = None
        self.load_data()
        self.ensure_embeddings()

    def load_data(self):
        print(f"🚀 [SCASH] Loading dataset from {self.dataset_path}...")
        try:
            with open(self.dataset_path, "r", encoding="utf-8") as f:
                for line in f:
                    if not line.strip(): continue
                    data = json.loads(line)
                    self.documents.append(data["text"])
                    self.metadatas.append(data.get("metadata", {}))
            print(f"✅ [SCASH] Loaded {len(self.documents)} segments.")
        except Exception as e:
            print(f"❌ [SCASH] Dataset load error: {e}")

    def ensure_embeddings(self):
        cache_path = "data/processed/embeddings_cache.pt"
        if os.path.exists(cache_path):
            print("📦 [SCASH] Loading embeddings from cache...")
            self.embeddings = torch.load(cache_path, map_location=self.device)
        else:
            print("🏗️ [SCASH] Generating embeddings for the first time... (Wait a sec)")
            start = time.time()
            self.embeddings = self.model.encode(self.documents, convert_to_tensor=True)
            torch.save(self.embeddings, cache_path)
            print(f"🏁 [SCASH] Embeddings ready in {time.time()-start:.2f}s.")

    def search(self, question, k=3):
        print(f"🔍 [SCASH] Searching Vault for: '{question}'")
        query_emb = self.model.encode(question, convert_to_tensor=True)
        
        # Simple Dot Product Similarity
        scores = torch.nn.functional.cosine_similarity(query_emb.unsqueeze(0), self.embeddings)
        top_results = torch.topk(scores, k=min(k, len(scores)))
        
        results = []
        for score, idx in zip(top_results.values, top_results.indices):
            results.append({
                "content": self.documents[idx],
                "score": score.item(),
                "document_metadata": self.metadatas[idx]
            })
        
        return results

# For testing
if __name__ == "__main__":
    scout = VectorScout()
    results = scout.search("Who is the most efficient scorer in 2016?")
    for r in results:
        print(f"--- {r['score']:.4f} ---\n{r['content']}\n")
