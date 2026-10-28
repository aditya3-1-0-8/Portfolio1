// Vercel serverless function. The secret key stays on the server (environment variable).
const PORTFOLIO_INFO = `
You are the portfolio assistant for Aditya Bansal. Answer ONLY using the information below.
If the answer is not in it, say you don't have that information and suggest emailing Aditya.
Keep answers short, friendly and in plain English. Refer to Aditya in the third person.

ABOUT: Aditya Bansal is a first-year B.Tech engineering student at JECRC University, Jaipur (graduating 2029). He wants to become a data analyst and is strong in statistics. He also plays Clash of Clans (Town Hall 18).
SKILLS: Python, PostgreSQL, NoSQL, statistics, data analysis, Git and GitHub, HTML, CSS, JavaScript.
CONTACT: Email adityabansalzzzz09@gmail.com. LinkedIn: https://www.linkedin.com/in/aditya-bansal-39b106373. GitHub: https://github.com/aditya3-1-0-8

PROJECTS (5):
1. Python Programs Collection - factorial (loop-based, rejects negative numbers), Fibonacci (prints first N numbers), and structure-to-dictionary conversion (turns a list of tuples and a class object into dictionaries). Repo: https://github.com/aditya3-1-0-8/python-programs-collection
2. Messy Python Code Improvement - a messy grade-report script cleaned up with AI help: clear variable names, direct loops instead of index loops, built-in sum(), a get_grade() function instead of nested if/else, and a main() function. Repo: https://github.com/aditya3-1-0-8/messy-python-code-improvement
3. Bug Fixing Using Cursor AI - a program finding the highest mark and average had two bugs: the loop skipped the first element (range started at 1), and the average wrongly subtracted 1. Cursor AI helped find and fix both. Repo: https://github.com/aditya3-1-0-8/bug-fixing-cursor-ai
4. Interactive Quiz Application - a 6-question multiple-choice quiz on Python, statistics and SQL with instant feedback and a final score. Built with HTML, CSS, JavaScript. Repo: https://github.com/aditya3-1-0-8/interactive-quiz-app Live: https://interactive-quiz-app-tau.vercel.app
5. Book Reading List Application - add books with title and author, mark them finished, remove them, and filter by All / To read / Finished. The list is saved in the browser using localStorage. Built with HTML, CSS, JavaScript, deployed on Vercel. Repo: https://github.com/aditya3-1-0-8/book-reading-list Live: https://book-reading-list-psi.vercel.app
`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  const key = process.env.GROQ_API_KEY;
  if (!key) return res.status(500).json({ error: "Server is missing GROQ_API_KEY" });

  let message = req.body && req.body.message;
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ error: "Message required" });
  message = message.slice(0, 500);

  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: PORTFOLIO_INFO },
          { role: "user", content: message }
        ]
      })
    });
    if (!r.ok) return res.status(502).json({ error: "Groq error " + r.status });
    const data = await r.json();
    return res.status(200).json({ reply: data.choices[0].message.content });
  } catch (e) {
    return res.status(502).json({ error: "Could not reach Groq" });
  }
};
