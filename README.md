# Aditya Bansal - Personal Portfolio

A responsive personal portfolio with project search, light/dark mode and an AI chatbot that answers questions about my work.

**Live website:** https://portfolio-woad-eta-64.vercel.app

## Technologies
HTML, CSS, JavaScript, Groq API (Llama 3.1), Vercel serverless functions, GitHub

## Features
- Sections: Home, About, Skills, Projects, Contact, AI Chatbot
- 5 project cards with GitHub repo and live links
- Search projects by name or technology
- Light/dark mode (remembered between visits)
- AI chatbot grounded in my portfolio information, with a clear error message if the API fails
- API key kept secret on the server (never in GitHub)

## Setup
1. Clone the repository.
2. Create a free API key at console.groq.com.
3. In Vercel: Project Settings > Environment Variables, add `GROQ_API_KEY` with your key, then redeploy.
4. For local testing, run `vercel dev` (the chatbot needs the serverless function).

## Author
Aditya Bansal - [GitHub](https://github.com/aditya3-1-0-8) - [LinkedIn](https://www.linkedin.com/in/aditya-bansal-39b106373)
