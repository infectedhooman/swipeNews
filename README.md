# 🗞️ Swipe News Feed 🚀  
_A Modern AI-Powered Personalized News App_

---

## ✨ Features

- 🔥 **Tinder-Style News Discovery**  
  Swipe right to save, left to skip — explore personalized, trending news in a fun, addictive way.

- 🧠 **AI-Powered Summarization**  
  Instantly get concise summaries or bullet-point overviews powered by **Google Gemini LLM**.  
  ![summary](https://github.com/user-attachments/assets/516ed875-64f6-40aa-bf36-ed1553d72458)

- ✅ **Fact-Checking & Article Analysis**  
  Extracts and verifies key claims, tags important entities, and categorizes articles for smarter browsing.  
  ![fact-check](https://github.com/user-attachments/assets/2104da7e-e95d-4e5f-b481-73ce2724f56f)

- 💬 **Conversational News Assistant**  
  Chat with an AI about any article. Get instant insights, generate questions, and understand context.  
  ![chat](https://github.com/user-attachments/assets/f15705e5-f983-4a79-b550-8e1e08260c1b)

- 🎯 **Smart Recommendations (RAG + Pinecone)**  
  Personalized suggestions powered by Pinecone vector embeddings and Gemini’s Retrieval-Augmented Generation.  
  ![recommend](https://github.com/user-attachments/assets/2edf389c-d37b-4d5c-a506-2acdafe629f1)

- 🏷️ **Auto-Generated Tags & Keywords**

- 📚 **Saved Articles Collection**

- 📱 **Responsive Mobile-First UI**  
  ![mobile](https://github.com/user-attachments/assets/bbdf9064-c948-4dc4-ac53-4a30641ecba3)

---

## 🛠️ Tech Stack

| Layer         | Tools & Libraries                                               |
|---------------|------------------------------------------------------------------|
| **Frontend**  | React, Tailwind CSS, Shadcn/UI                                  |
| **AI/LLM**     | Google Gemini Pro (Summarization, Chat, Fact-Checking)          |
| **Search**     | Pinecone (Vector DB), RAG (Context-Aware Suggestions)           |
| **Backend**   | Node.js + Express or FastAPI (optional)                         |
| **Database**  | PostgreSQL (for articles, user data)                            |
| **Cloud**     | AWS S3, AWS RDS, Docker                                         |
| **CI/CD**     | GitHub Actions, Vercel or Netlify                               |

---

## ⚙️ How It Works

1. 📰 **News Ingestion**  
   Pulls latest articles from [NewsAPI.org](https://newsapi.org/) or a custom source.

2. 🤖 **AI Analysis**  
   Google Gemini summarizes, fact-checks, tags, and generates embeddings.

3. 👉 **Swipe & Interact**  
   Swipe through cards, save articles, or chat with the AI for deeper understanding.

4. 🎯 **Personalized Recommendations**  
   Pinecone indexes your saved content as vectors for real-time similarity search.

5. 💡 **Ask & Learn**  
   Ask context-specific questions with auto-suggested queries from the chat assistant.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/swipe-news-feed.git
cd swipe-news-feed

npm install
npm run dev
