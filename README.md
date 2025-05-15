<h1 align="center">🗞️ Swipe News Feed 🚀</h1>
<p align="center"><i>A sleek AI-powered personalized news app — swipe, summarize, and stay informed.</i></p>

---

## ✨ Features

- 🔥 **Tinder-Style Discovery**  
  Swipe right to save, left to skip — explore personalized news just like a dating app.

- 🧠 **LLM-Based Summaries**  
  Instantly generate concise or bullet summaries using **Google Gemini Pro**.  
  <p align="center"><img src="https://github.com/user-attachments/assets/516ed875-64f6-40aa-bf36-ed1553d72458" width="400"/></p>

- ✅ **Fact-Checking & Deep Analysis**  
  Auto-verifies claims, extracts key info, and tags news contextually.  
  <p align="center"><img src="https://github.com/user-attachments/assets/2104da7e-e95d-4e5f-b481-73ce2724f56f" width="400"/></p>

- 💬 **Conversational News Assistant**  
  Chat with an AI to get insights, ask questions, or dive deeper into articles.  
  <p align="center"><img src="https://github.com/user-attachments/assets/f15705e5-f983-4a79-b550-8e1e08260c1b" width="400"/></p>

- 🎯 **Smart Recommendations (RAG + Pinecone)**  
  Your reading history powers personalized content suggestions.  
  <p align="center"><img src="https://github.com/user-attachments/assets/2edf389c-d37b-4d5c-a506-2acdafe629f1" width="600"/></p>

- 📚 **Saved Article Collections**  
  Keep your favorite articles organized and accessible.

- 🏷️ **Auto-Generated Tags & Keywords**

- 📱 **Mobile-First Design**  
  <p align="center"><img src="https://github.com/user-attachments/assets/bbdf9064-c948-4dc4-ac53-4a30641ecba3" width="400"/></p>

---

## 🛠 Tech Stack

| Layer        | Tech Stack                                              |
|--------------|----------------------------------------------------------|
| **Frontend** | React, Tailwind CSS, Shadcn/UI                           |
| **LLM**      | Google Gemini Pro (Summarization, Fact-checking, Chat)  |
| **Vector DB**| Pinecone (RAG-powered recommendations)                  |
| **Backend**  | Node.js + Express or FastAPI (optional)                 |
| **Database** | PostgreSQL                                              |
| **Cloud**    | AWS S3, AWS RDS, Docker                                 |
| **CI/CD**    | GitHub Actions, Vercel or Netlify                       |

---

## ⚙️ How It Works

1. **📰 Ingest News** from [NewsAPI.org](https://newsapi.org/) or custom sources.
2. **🤖 Analyze with Gemini** — summaries, tags, embeddings, and fact-checking.
3. **👉 Swipe Interface** to save or skip news.
4. **💡 Chat to Explore** — ask follow-up questions about the article.
5. **🎯 Recommend** based on your swipe history using vector similarity.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/swipe-news-feed.git
cd swipe-news-feed

npm install
npm run dev
