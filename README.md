# Swipe News Feed 🚀

_A Modern AI-Powered Personalized News App_

---

## 📰 Features

- **Tinder-Style News Discovery:**  
  Swipe right to save, left to skip — discover trending news tailored to your interests.
- **AI Summarization:**  
  Instantly generate concise or bullet-point article summaries with Google Gemini LLM.
  <img width="376" alt="image" src="https://github.com/user-attachments/assets/516ed875-64f6-40aa-bf36-ed1553d72458" />

- **Fact-Checking & Analysis:**  
  Extracts and verifies key claims, auto-tags and categorizes news for better discovery.
  <img width="383" alt="image" src="https://github.com/user-attachments/assets/2104da7e-e95d-4e5f-b481-73ce2724f56f" />

- **Conversational News Assistant:**  
  Chat with an AI about any article, get instant insights and suggested questions.
  <img width="381" alt="image" src="https://github.com/user-attachments/assets/f15705e5-f983-4a79-b550-8e1e08260c1b" />

- **Personalized Recommendations:**  
  Uses Pinecone vector search + RAG to recommend news based on your history.
  <img width="684" alt="image" src="https://github.com/user-attachments/assets/2edf389c-d37b-4d5c-a506-2acdafe629f1" />

- **Auto-Generated Tags & Keywords**
- **Saved Articles Collection**
- **Responsive, Mobile-First UI**

- <img width="472" alt="image" src="https://github.com/user-attachments/assets/bbdf9064-c948-4dc4-ac53-4a30641ecba3" />


---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Shadcn/UI
- **AI/LLM:** Google Gemini Pro API (summarization, chat, analysis)
- **Vector Search:** Pinecone (content-based recommendations)
- **Backend (optional):** Node.js/Express or FastAPI
- **Database:** PostgreSQL (user/article storage, extensible)
- **Cloud:** AWS S3, AWS RDS, Docker (containerization)
- **DevOps:** GitHub Actions, Vercel/Netlify

---

## 🌐 How It Works

1. **News Fetching:**  
   Articles are ingested via [NewsAPI.org](https://newsapi.org/) or a custom provider.
2. **AI Analysis:**  
   Gemini Pro LLM generates summaries, tags, keywords, and verifies claims.
3. **Swipe, Save & Chat:**  
   Swipe through news, ask article-specific questions, and build your saved list.
4. **Personalized Recommendations:**  
   Pinecone indexes your reading history as vector embeddings for real-time content-based suggestions.
5. **Chat & Auto-Suggested Questions:**  
   Engage with the AI assistant to get deeper insights and question prompts.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/swipe-news-feed.git
cd swipe-news-feed

npm install
