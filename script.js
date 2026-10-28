const GH = "https://github.com/aditya3-1-0-8/";
const projects = [
  {title:"Python Programs Collection",desc:"Factorial, Fibonacci and structure-to-dictionary conversion programs, with a clear README explaining each one.",tech:["Python","Git"],repo:GH+"python-programs-collection",live:""},
  {title:"Messy Python Code Improvement",desc:"A messy Python script cleaned up with AI assistance: better names, structure and comments.",tech:["Python","AI tools"],repo:GH+"messy-python-code-improvement",live:""},
  {title:"Bug Fixing Using Cursor AI",desc:"A buggy program found and corrected with Cursor AI, with notes on what was wrong and how it was fixed.",tech:["Python","Cursor AI"],repo:GH+"bug-fixing-cursor-ai",live:""},
  {title:"Interactive Quiz Application",desc:"A quiz app that asks questions, checks answers and shows your score.",tech:["HTML","CSS","JavaScript"],repo:GH+"interactive-quiz-app",live:""},
  {title:"Book Reading List Application",desc:"Add books to a reading list, mark them as read and remove them.",tech:["HTML","CSS","JavaScript","Vercel"],repo:GH+"book-reading-list",live:""}
];
const grid = document.getElementById("grid"), count = document.getElementById("count"), search = document.getElementById("search");
function render(list){
  grid.innerHTML = "";
  list.forEach(p=>{
    const c = document.createElement("article"); c.className = "card";
    c.innerHTML = `<h3></h3><p></p><div class="tags"></div><div class="links"></div>`;
    c.querySelector("h3").textContent = p.title;
    c.querySelector("p").textContent = p.desc;
    p.tech.forEach(t=>{const s=document.createElement("span");s.textContent=t;c.querySelector(".tags").appendChild(s)});
    const l = c.querySelector(".links");
    l.innerHTML = `<a class="btn" target="_blank" rel="noopener" href="${p.repo}">GitHub repo</a>` + (p.live ? `<a class="btn ghost" target="_blank" rel="noopener" href="${p.live}">Live app</a>` : "");
    grid.appendChild(c);
  });
  count.textContent = list.length ? `Showing ${list.length} of ${projects.length} projects` : "No projects match your search. Try “Python”, “Quiz” or “Book”.";
}
search.addEventListener("input", ()=>{
  const q = search.value.trim().toLowerCase();
  render(projects.filter(p=>(p.title+" "+p.desc+" "+p.tech.join(" ")).toLowerCase().includes(q)));
});
render(projects);

const root = document.documentElement, btn = document.getElementById("themeBtn");
function setTheme(t){root.dataset.theme=t;btn.textContent=t==="dark"?"Light mode":"Dark mode";try{localStorage.setItem("theme",t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem("theme")}catch(e){}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark":"light"));
btn.addEventListener("click", ()=>setTheme(root.dataset.theme==="dark"?"light":"dark"));

// Chatbot: talks to our own server function (added in a later step), never directly to Groq.
const form = document.getElementById("chatForm"), input = document.getElementById("chatInput"), log = document.getElementById("log");
function add(text, cls){const d=document.createElement("div");d.className="msg "+cls;d.textContent=text;log.appendChild(d);log.scrollTop=log.scrollHeight;return d}
form.addEventListener("submit", async e=>{
  e.preventDefault();
  const q = input.value.trim(); if(!q) return;
  add(q,"user"); input.value="";
  const wait = add("Thinking...","bot");
  try{
    const r = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q})});
    if(!r.ok) throw new Error("Status "+r.status);
    const data = await r.json();
    wait.textContent = data.reply || "I don't have an answer for that.";
  }catch(err){
    wait.textContent = "Sorry, the chatbot couldn't reach the server. Check your internet connection and try again in a moment.";
    wait.classList.add("err");
  }
});
