from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import time
from rag.retriever import get_scout
from rag.llm_chain import generate_nba_response

router = APIRouter()

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    playerName: str
    playerImage: str
    stat: str
    answer: str
    confidence: str
    time: str

@router.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    print(f"📡 [API] STAGE 1: Received question: '{request.question}'")
    start_time = time.time()
    
    try:
        # 1. Get the Scout (Retriever)
        print("🕵️‍♂️ [API] STAGE 2: Accessing NBA Scout...")
        scout = get_scout()
        
        # 2. Search the Vault (ColBERT)
        print(f"🔍 [API] STAGE 3: Searching Vault via ColBERT...")
        search_start = time.time()
        results = scout.search(request.question, k=3)
        search_duration = time.time() - search_start
        print(f"✅ [API] STAGE 3 Result: Found {len(results)} chunks in {search_duration:.3f}s.")
        
        if not results:
            print("⚠️ [API] No results found in index for this query.")
            return QueryResponse(
                playerName="StatSmash Engine",
                playerImage="https://cdn.nba.com/headshots/nba/latest/1040x760/logoman.png",
                stat="N/A",
                answer="I couldn't find any specific data on that in our vault. Try asking about a specific player or season!",
                confidence="0%",
                time=f"{int((time.time() - start_time) * 1000)}ms"
            )
        
        # 3. Extract metadata
        print(f"📦 [API] STAGE 4: Extracting metadata from top chunk...")
        best_match = results[0]
        metadata = best_match["document_metadata"]
        
        p_name = metadata.get("player_name", "NBA Player")
        p_id = metadata.get("player_id", "logoman")
        h_stat = metadata.get("highlight_stat", "Statistical anomaly detected")
        print(f"👤 Found Player: {p_name} ({p_id})")
        
        # 4. Generate AI response
        print(f"🧠 [API] STAGE 5: Generating Scouting Report via LLM...")
        gen_start = time.time()
        answer = generate_nba_response(request.question, results)
        gen_duration = time.time() - gen_start
        print(f"✍️ [API] STAGE 5 Result: Report generated in {gen_duration:.3f}s.")
        
        # 5. Build Final Response
        total_duration = int((time.time() - start_time) * 1000)
        print(f"🏁 [API] STAGE 6: Query complete. Total time: {total_duration}ms.")
        
        return QueryResponse(
            playerName=p_name,
            playerImage=f"https://cdn.nba.com/headshots/nba/latest/1040x760/{p_id}.png",
            stat=h_stat,
            answer=answer,
            confidence=f"{int(best_match['score'] * 2 + 60)}%",
            time=f"{total_duration}ms"
        )
        
    except Exception as e:
        print(f"❌ [API ERROR] Critical failure in query pipeline: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
