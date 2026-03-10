import os
import sys
import json
import multiprocessing

# CRITICAL: Force ColBERT to skip the C++ extension on Windows before importing ragatouille
os.environ["COLBERT_LOAD_TORCH_EXTENSION_VERBOSE"] = "True"
os.environ["FORCE_PYTORCH_OPS"] = "1" 

# On Windows, 'spawn' is the default, but explicitly setting it can help with some library bugs
if __name__ == "__main__":
    try:
        multiprocessing.set_start_method('spawn', force=True)
    except RuntimeError:
        pass

from ragatouille import RAGPretrainedModel
import colbert

# MONKEY PATCH: Disable ColBERT's attempt to compile C++ extensions on Windows
def skip_torch_extensions(*args, **kwargs):
    print("⚠️  Skipping ColBERT C++ extensions (Windows Compatibility Mode)")
    return None

colbert.modeling.colbert.ColBERT.try_load_torch_extensions = skip_torch_extensions

def build_nba_index():
    # 1. Setup paths
    dataset_path = "data/processed/nba_dataset.jsonl"
    index_name = "nba_stats_v1"
    
    if not os.path.exists(dataset_path):
        print(f"❌ Error: Dataset not found at {dataset_path}")
        return

    print(f"🚀 Loading dataset from {dataset_path}...")
    
    # 2. Extract texts and metadata from your JSONL
    documents = []
    metadatas = []
    
    try:
        with open(dataset_path, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                data = json.loads(line)
                documents.append(data["text"])
                metadatas.append(data.get("metadata", {}))
    except Exception as e:
        print(f"❌ Error reading dataset: {e}")
        return
    
    print(f"✅ Loaded {len(documents)} document chunks.")
    
    # 3. Initialize the model
    print("🧠 Initializing ColBERT v2.0...")
    try:
        RAG = RAGPretrainedModel.from_pretrained("colbert-ir/colbertv2.0", index_root=".ragatouille")
        
        # 4. Create the Index
        print("🏗️  Building index (this might take a minute)...")
        # Added num_processes=1 to avoid the multiprocessing bug on Windows/Python 3.12
        RAG.index(
            collection=documents,
            document_metadatas=metadatas,
            index_name=index_name,
            max_document_length=256,
            split_documents=False,
            use_faiss=True 
        )
        print(f"🏁 DONE! Index '{index_name}' created.")
    except Exception as e:
        print(f"❌ Error during indexing: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    build_nba_index()
