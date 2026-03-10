# 🏀 StatSmash

StatSmash is an elite NBA Intelligence Engine built with a modern React frontend and a powerful Python FastApi backend. It leverages RAG (Retrieval-Augmented Generation) and ColBERT to provide deep, analytical insights into NBA player statistics, career highlights, and contract details.

## 🚀 Features

- **The Court:** An immersive, Neo-Brutalist chat interface designed like a professional terminal.
- **Deep Analytics RAG:** Uses a ColBERT vector database to retrieve highly accurate, year-specific statistics.
- **Court Vision AI:** Powered by Groq's Llama 3 API, the AI acts as a seasoned front-office insider, breaking down stats into actionable insights, comparisons, and financial context.
- **Dynamic Player Cards:** Automatically fetches and displays official NBA player headshots based on accurate retrieval matching.
- **Under The Hood:** A dedicated architecture visualization page breaking down the tech stack.

## 🛠 Tech Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Custom CSS (Neo-Brutalist / Technical Aesthetic)
- **Icons:** Lucide React
- **Markdown:** React-Markdown for rich scouting reports

### Backend
- **Framework:** FastAPI
- **Retrieval:** RAGatouille (ColBERT)
- **LLM:** Groq (Llama-3.3-70b-versatile)
- **Data:** Kaggle NBA Players Stats Dataset

## 📦 Local Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file in the `backend` folder and add your API keys:
   ```
   GROQ_API_KEY=your_key_here
   YOUTUBE_API_KEY=your_key_here
   ```
6. Start the FastAPI server: `uvicorn main:app --reload`
   *(Runs on http://localhost:8000)*

### 2. Frontend Setup
1. Navigate to the root directory `statsmash`.
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
   *(Runs on http://localhost:5173)*

## 🧠 The Intelligence Framework

The `Court Vision` prompt guides the LLM to output professional scout reports structured into:
1. **Instant Headline**
2. **Core Stats Block**
3. **The Insight Layer**
4. **The Comparison Anchor**
5. **Contextual Intelligence**
6. **Contract Intel (Internal Knowledge)**

## 🛡️ License

This project is open-source and available for educational and analytical purposes.
