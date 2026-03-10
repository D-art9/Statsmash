import os
import time
from rag.vector_scout import VectorScout

# Singleton instance
scout = None

class NBAScout:
    def __init__(self):
        print(f"🕵️‍♂️ [SCOUT] Initializing NBA Vector Scout (SBERT Engine)...")
        # Initialize our new stable Windows-friendly search engine
        # Points to the processed dataset we found in data/processed/nba_dataset.jsonl
        self.engine = VectorScout(dataset_path='data/processed/nba_dataset.jsonl')

    def search(self, question, k=3):
        """
        Search the NBA index for the most relevant stat chunks using SBERT + Cosine Sim.
        Returns a list of results with text and metadata.
        """
        print(f"🔍 [SCOUT] Searching Vault for question: '{question}' (k={k})")
        try:
            start_search = time.time()
            results = self.engine.search(question, k=k)
            search_duration = time.time() - start_search
            print(f"✅ [SCOUT] Search complete in {search_duration:.3f}s. Found {len(results)} chunks.")
            
            # Map result keys to match what the API expects (already done in VectorScout)
            return results
        except Exception as e:
            print(f"❌ [SCOUT] Error during search: {str(e)}")
            import traceback
            traceback.print_exc()
            raise e

def get_scout():
    global scout
    if scout is None:
        scout = NBAScout()
    return scout

if __name__ == "__main__":
    # Test search directly
    my_scout = get_scout()
    results = my_scout.search("Who is the most efficient scorer in 2016?")
    for i, res in enumerate(results):
        print(f"\n[Result {i+1}] (Confidence: {res['score']:.4f})")
        print(f"Text: {res['content']}")
        print(f"Metadata: {res['document_metadata']}")
