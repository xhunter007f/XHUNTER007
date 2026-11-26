(() => {
  const KEY = "xhunter007_games_v1";
  const $ = (id) => document.getElementById(id);
  const dialog = $("adminDialog");
  const starterGames = [
    ...[
      ["Grand Theft Auto V","Open World"],["Red Dead Redemption 2","Adventure"],["God of War","Action"],
      ["Marvel's Spider-Man","Action"],["The Last of Us Part II","Adventure"],["Uncharted 4: A Thief's End","Adventure"],
      ["Ghost of Tsushima","Action"],["Horizon Zero Dawn","Adventure"],["Mortal Kombat 11","Action"],["EA SPORTS FC 26","Sports"]
    ].map((x,i)=>({id:"ps4-"+i,name:x[0],platform:"PS4",genre:x[1],image:"",link:"",description:""})),
    ...[
      ["Marvel's Spider-Man 2","Action"],["God of War Ragnarök","Action"],["Horizon Forbidden West","Adventure"],
      ["Ghost of Yōtei","Action"],["Astro Bot","Adventure"],["Gran Turismo 7","Racing"],
      ["EA SPORTS FC 26","Sports"],["NBA 2K26","Sports"],["Call of Duty: Black Ops 7","Action"],["Hogwarts Legacy","Adventure"]
    ].map((x,i)=>({id:"ps5-"+i,name:x[0],platform:"PS5",genre:x[1],image:"",link:"",description:""}))
  ];
  let games = loadGames();
  function loadGames(){ try { const raw=localStorage.getItem(KEY); if(raw===null){localStorage.setItem(KEY,JSON.stringify(starterGames));return starterGames;} const data=JSON.parse(raw); return Array.isArray(data)?data:starterGames; } catch { return starterGames; } }
  function save(){ localStorage.setItem(KEY,JSON.stringify(games)); render(); }
  function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);}
  function render(){
    $("gameCount").textContent=games.length;
    $("adminCount").textContent=`${games.length} لعبة`;
    const q=$("searchInput").value.trim().toLowerCase(), p=$("platformFilter").value, g=$("genreFilter").value;
    const filtered=games.filter(x=>(x.name||"").toLowerCase().includes(q)&&(!p||x.platform===p)&&(!g||x.genre===g));
    $("gamesGrid").innerHTML=filtered.map(x=>`<article class="game-card"><div class="game-cover">${x.image?`<img src="${esc(x.image)}" alt="${esc(x.name)}" loading="lazy" onerror="this.remove()">`:`<span class="cover-placeholder">XH007</span>`}<span class="platform-tag">${esc(x.platform)}</span></div><div class="game-info"><h3>${esc(x.name)}</h3><div class="game-meta"><span>${esc(x.genre)}</span><span>✦</span><span>XHUNTER007</span></div>${x.description?`<p>${esc(x.description)}</p>`:""}${x.link?`<a class="btn btn-ghost game-link" href="${esc(x.link)}" target="_blank" rel="noopener noreferrer">فتح رابط اللعبة ↗</a>`:""}}</div></article>`).join("");
    $("emptyState").hidden=filtered.length!==0;
    $("gamesGrid").style.display=filtered.length?"grid":"none";
    $("adminList").innerHTML=games.length?games.map(x=>`<div class="admin-row"><img class="admin-thumb" src="${esc(x.image||"")}" onerror="this.style.visibility='hidden'" alt=""><div class="admin-row-info"><b>${esc(x.name)}</b><small>${esc(x.platform)} · ${esc(x.genre)}</small></div><button class="mini-btn" data-edit="${x.id}">تعديل</button><button class="mini-btn delete" data-delete="${x.id}">حذف</button></div>`).join(""):`<p class="muted">لا توجد ألعاب مضافة حتى الآن.</p>`;
  }
  function openAdmin(){dialog.showModal();}
  function resetForm(){ $("gameForm").reset();$("editId").value="";$("saveGame").textContent="حفظ اللعبة";$("cancelEdit").hidden=true; }
  function startEdit(id){const x=games.find(g=>g.id===id);if(!x)return;$("editId").value=x.id;$("gameName").value=x.name;$("gamePlatform").value=x.platform;$("gameGenre").value=x.genre;$("gameImage").value=x.image||"";$("gameLink").value=x.link||"";$("gameDescription").value=x.description||"";$("saveGame").textContent="حفظ التعديلات";$("cancelEdit").hidden=false;$("gameName").focus();$("managePanel").scrollIntoView({behavior:"smooth"});}
  $("openAdmin").addEventListener("click",openAdmin);$("heroAdmin").addEventListener("click",openAdmin);$("addGameTop").addEventListener("click",()=>{openAdmin();resetForm();});$("emptyAdd").addEventListener("click",()=>{openAdmin();resetForm();});
  $("gameForm").addEventListener("submit",e=>{e.preventDefault();const id=$("editId").value;const item={id:id||String(Date.now()),name:$("gameName").value.trim(),platform:$("gamePlatform").value,genre:$("gameGenre").value,image:$("gameImage").value.trim(),link:$("gameLink").value.trim(),description:$("gameDescription").value.trim()};if(!item.name)return;if(id){games=games.map(x=>x.id===id?item:x);toast("تم تحديث اللعبة");}else{games.unshift(item);toast("تمت إضافة اللعبة");}save();resetForm();});
  $("cancelEdit").addEventListener("click",resetForm);
  $("adminList").addEventListener("click",e=>{const edit=e.target.dataset.edit,del=e.target.dataset.delete;if(edit)startEdit(edit);if(del&&confirm("متأكد من حذف اللعبة؟")){games=games.filter(x=>x.id!==del);save();toast("تم حذف اللعبة");}});
  ["searchInput","platformFilter","genreFilter"].forEach(id=>$(id).addEventListener(id==="searchInput"?"input":"change",render));
  document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t===b));$("managePanel").hidden=b.dataset.tab!=="manage";$("backupPanel").hidden=b.dataset.tab!=="backup";}));
  $("exportBtn").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(games,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="XHUNTER007-games-backup.json";a.click();URL.revokeObjectURL(a.href);toast("تم تجهيز النسخة الاحتياطية");});
  $("importFile").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!Array.isArray(data)||!data.every(x=>x&&x.name))throw Error();if(confirm(`استيراد ${data.length} لعبة؟ سيتم استبدال المكتبة الحالية.`)){games=data.map(x=>({id:String(x.id||Date.now()+Math.random()),name:String(x.name),platform:["PS4","PS5"].includes(x.platform)?x.platform:"PS4",genre:x.genre||"Other",image:x.image||"",link:x.link||"",description:x.description||""}));save();toast("تم استيراد المكتبة");}}catch{toast("ملف غير صالح");}e.target.value="";});
  $("menuToggle").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
  document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>{$("mainNav").classList.remove("open");document.querySelectorAll(".nav-link").forEach(n=>n.classList.toggle("active",n===a));}));
  render();
})();