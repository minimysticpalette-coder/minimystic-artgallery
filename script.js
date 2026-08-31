const menu=document.querySelector(".menu"),nav=document.querySelector(".nav");
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const filters=document.querySelectorAll(".filter"),cards=document.querySelectorAll(".card");
filters.forEach(f=>f.addEventListener("click",()=>{filters.forEach(x=>x.classList.remove("active"));f.classList.add("active");const cat=f.dataset.filter;cards.forEach(c=>c.style.display=cat==="all"||c.dataset.category.includes(cat)?"":"none")}));

const box=document.querySelector(".lightbox"),boxImg=box.querySelector("img"),boxTitle=box.querySelector("h2"),boxDesc=box.querySelector("p");
document.querySelectorAll(".art").forEach(a=>a.addEventListener("click",()=>{boxImg.src=a.dataset.image;boxImg.alt=a.dataset.title;boxTitle.textContent=a.dataset.title;boxDesc.textContent=a.dataset.description;box.classList.add("open");box.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}));
function close(){box.classList.remove("open");box.setAttribute("aria-hidden","true");document.body.style.overflow=""}
document.querySelector(".close").addEventListener("click",close);box.addEventListener("click",e=>{if(e.target===box)close()});document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
document.getElementById("year").textContent=new Date().getFullYear();
