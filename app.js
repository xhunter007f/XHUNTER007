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
  const coverIds = {"Grand Theft Auto V":271590,"Red Dead Redemption 2":1174180,"God of War":1593500,"Marvel's Spider-Man":1817070,"The Last of Us Part II":2531310,"Uncharted 4: A Thief's End":1659420,"Ghost of Tsushima":2215430,"Horizon Zero Dawn":1151640,"Mortal Kombat 11":976310,"EA SPORTS FC 26":3405690,"Marvel's Spider-Man 2":2651280,"God of War Ragnarök":2322010,"Horizon Forbidden West":2420110,"Astro Bot":0,"Gran Turismo 7":0,"NBA 2K26":3472040,"Call of Duty: Black Ops 7":1938090,"Hogwarts Legacy":990080};
  const coverOverrides = {"Astro Bot":"https://images.launchbox-app.com/r2_ac676906-f8de-483c-946d-78eedb3c7999.jpg","Gran Turismo 7":"https://images.launchbox-app.com/4211ae53-61d4-4377-808f-e92d878ca5ed.jpg","Ghost of Yōtei":"https://images.launchbox-app.com/0eca21b8-50a9-4918-81d9-f8003e27df20.png","EA SPORTS FC 26|PS4":"https://store974.com/cdn/shop/files/fcps41.png?crop=center&height=1100&v=1758783957&width=1100","EA SPORTS FC 26|PS5":"https://videogamesplus.ca/cdn/shop/files/FC26ps53DPFTfront_us_ca_RGB_1024x1024.jpg?v=1752690592","NBA 2K26|PS5":"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7da74f3b-bdfa-4372-af9c-322aa3ece311.png"};
  const coverUrl = id => id ? `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg` : "";
  Object.assign(coverIds,{
    "Sekiro: Shadows Die Twice":814380,"Dark Souls III":374320,"Elden Ring":1245620,"Persona 5 Royal":1687950,
    "Final Fantasy VII Remake Intergrade":1462040,"Resident Evil 2":883710,"Resident Evil 4":2050650,"Devil May Cry 5":601150,
    "NieR:Automata":524220,"Death Stranding":1190460,"Days Gone":1259420,"Detroit: Become Human":1222140,
    "The Witcher 3: Wild Hunt":292030,"Cyberpunk 2077":1091500,"DOOM Eternal":782330,"Far Cry 5":552520,
    "Assassin's Creed Odyssey":812140,"Watch Dogs 2":447040,"Shadow of the Tomb Raider":750920,"Rise of the Tomb Raider":391220,
    "Middle-earth: Shadow of War":356190,"Monster Hunter: World":582010,"Street Fighter V":310950,"TEKKEN 7":389730,
    "Crash Bandicoot N. Sane Trilogy":731490,"Spyro Reignited Trilogy":996580,"Cuphead":268910,"Hollow Knight":367520,
    "Celeste":504230,"Control":870780,"Mafia: Definitive Edition":1030840,"Lies of P":1627720,"Outlast 2":414700,
    "A Plague Tale: Innocence":752590,"Battlefield 1":1238840,"Resident Evil 7: Biohazard":418370,
    "Returnal":1649240,"Ratchet & Clank: Rift Apart":1895880,"FINAL FANTASY XVI":2515020,"FINAL FANTASY VII REBIRTH":2909400,
    "Stellar Blade":3489700,"Black Myth: Wukong":2358720,"Silent Hill 2":2124490,"Resident Evil Village":1196590,
    "Dead Space":1693980,"The Last of Us Part I":1888930,"UNCHARTED: Legacy of Thieves Collection":1659420,
    "Death Stranding Director's Cut":1850570,"HELLDIVERS 2":553850,"Dragon's Dogma 2":2054970,"Rise of the Ronin":2346430,
    "Wo Long: Fallen Dynasty":1448440,"Lords of the Fallen":1501750,"ARMORED CORE VI FIRES OF RUBICON":1888160,
    "TEKKEN 8":1778820,"Street Fighter 6":1364780,"Mortal Kombat 1":1971870,"Suicide Squad: Kill the Justice League":315210,
    "Prince of Persia: The Lost Crown":2751000,"Sonic X Shadow Generations":2513280,"Metaphor: ReFantazio":2679460,
    "Persona 3 Reload":2161700,"Like a Dragon: Infinite Wealth":2072450,"Baldur's Gate 3":1086940,"Diablo IV":2344520,
    "Assassin's Creed Shadows":3159330,"Indiana Jones and the Great Circle":2677660,"DOOM: The Dark Ages":3017860,
    "The Crew Motorfest":2698940,"F1 25":3059520,"Remnant II":1282100,"Granblue Fantasy: Relink":881020,
    "Avatar: Frontiers of Pandora":2840770
  });
  const expansionGames = [
    ...[
      ["Bloodborne","Action"],["Sekiro: Shadows Die Twice","Action"],["Dark Souls III","Action"],["Elden Ring","Action"],
      ["Persona 5 Royal","Adventure"],["Final Fantasy VII Remake Intergrade","Adventure"],["Resident Evil 2","Action"],
      ["Resident Evil 4","Action"],["Devil May Cry 5","Action"],["NieR:Automata","Action"],["Death Stranding","Adventure"],
      ["Days Gone","Action"],["inFAMOUS Second Son","Action"],["Ratchet & Clank","Adventure"],["Detroit: Become Human","Adventure"],
      ["Until Dawn","Adventure"],["The Witcher 3: Wild Hunt","Adventure"],["Cyberpunk 2077","Open World"],["DOOM Eternal","Action"],
      ["Far Cry 5","Open World"],["Assassin's Creed Odyssey","Adventure"],["Watch Dogs 2","Open World"],
      ["Shadow of the Tomb Raider","Adventure"],["Rise of the Tomb Raider","Adventure"],["Middle-earth: Shadow of War","Action"],
      ["Monster Hunter: World","Action"],["Street Fighter V","Action"],["TEKKEN 7","Action"],["Crash Bandicoot N. Sane Trilogy","Adventure"],
      ["Spyro Reignited Trilogy","Adventure"],["Cuphead","Action"],["Hollow Knight","Adventure"],["Celeste","Adventure"],
      ["Control","Action"],["Mafia: Definitive Edition","Open World"],["Lies of P","Action"],["Outlast 2","Action"],
      ["A Plague Tale: Innocence","Adventure"],["Battlefield 1","Action"],["Resident Evil 7: Biohazard","Action"]
    ].map((x,i)=>({id:"ps4-extra-"+i,name:x[0],platform:"PS4",genre:x[1],image:"",link:"",description:""})),
    ...[
      ["Demon's Souls","Action"],["Returnal","Action"],["Ratchet & Clank: Rift Apart","Adventure"],["FINAL FANTASY XVI","Adventure"],
      ["FINAL FANTASY VII REBIRTH","Adventure"],["Stellar Blade","Action"],["Black Myth: Wukong","Action"],["Silent Hill 2","Action"],
      ["Alan Wake 2","Adventure"],["Resident Evil Village","Action"],["Dead Space","Action"],["The Last of Us Part I","Adventure"],
      ["UNCHARTED: Legacy of Thieves Collection","Adventure"],["Death Stranding Director's Cut","Adventure"],["HELLDIVERS 2","Action"],
      ["Dragon's Dogma 2","Adventure"],["Rise of the Ronin","Action"],["Wo Long: Fallen Dynasty","Action"],["Lords of the Fallen","Action"],
      ["ARMORED CORE VI FIRES OF RUBICON","Action"],["TEKKEN 8","Action"],["Street Fighter 6","Action"],["Mortal Kombat 1","Action"],
      ["Suicide Squad: Kill the Justice League","Action"],["Prince of Persia: The Lost Crown","Adventure"],
      ["Sonic X Shadow Generations","Adventure"],["Metaphor: ReFantazio","Adventure"],["Persona 3 Reload","Adventure"],
      ["Like a Dragon: Infinite Wealth","Adventure"],["Baldur's Gate 3","Adventure"],["Diablo IV","Action"],
      ["Assassin's Creed Shadows","Adventure"],["Indiana Jones and the Great Circle","Adventure"],["DOOM: The Dark Ages","Action"],
      ["The Crew Motorfest","Racing"],["F1 25","Racing"],["Remnant II","Action"],["Granblue Fantasy: Relink","Adventure"],
      ["Avatar: Frontiers of Pandora","Adventure"],["Alan Wake 2","Adventure"]
    ].map((x,i)=>({id:"ps5-extra-"+i,name:x[0],platform:"PS5",genre:x[1],image:"",link:"",description:""}))
  ];
  expansionGames.forEach(x=>{x.image=coverFor(x.name,x.platform);});
  const initialCatalog=[...starterGames,...expansionGames];
  const coverFor = (name,platform) => coverOverrides[`${name}|${platform}`] || coverOverrides[name] || coverUrl(coverIds[name]) || "";
  starterGames.forEach(x=>{x.image=coverFor(x.name,x.platform);});
  let games = loadGames();
  function loadGames(){
    try {
      const raw=localStorage.getItem(KEY);
      if(raw===null){localStorage.setItem(KEY,JSON.stringify(initialCatalog));return initialCatalog;}
      const data=JSON.parse(raw);
      if(!Array.isArray(data)||data.length===0){localStorage.setItem(KEY,JSON.stringify(initialCatalog));return initialCatalog;}
      const merged=[...data];
      const known=new Set(merged.map(x=>String(x.id)));
      expansionGames.forEach(x=>{if(!known.has(String(x.id)))merged.push({...x});});
      return merged.map(x=>({...x,image:(!x.image||/^https:\/\/shared\.fastly\.steamstatic\.com\/store_item_assets\/steam\/apps\/|^https:\/\/gmedia\.playstation\.com\/is\/image\/SIEPDC\//.test(x.image))?(coverFor(x.name,x.platform)||x.image):x.image}));
    } catch {localStorage.setItem(KEY,JSON.stringify(initialCatalog));return initialCatalog;}
  }
  function save(){ localStorage.setItem(KEY,JSON.stringify(games)); render(); }
  function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);}
  function render(){
    $("gameCount").textContent=games.length;
    $("adminCount").textContent=`${games.length} لعبة`;
    const q=$("searchInput").value.trim().toLowerCase(), p=$("platformFilter").value, g=$("genreFilter").value;
    const filtered=games.filter(x=>(x.name||"").toLowerCase().includes(q)&&(!p||x.platform===p)&&(!g||x.genre===g));
    $("gamesGrid").innerHTML=filtered.map(x=>`<article class="game-card game-card-clickable" data-details="${esc(x.id)}" tabindex="0" role="button" aria-label="عرض تفاصيل ${esc(x.name)}"><div class="game-cover">${x.image?`<img src="${esc(x.image)}" alt="${esc(x.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false">`:""}<span class="cover-placeholder" ${x.image?'hidden':''}>XH007</span><span class="platform-tag">${esc(x.platform)}</span></div><div class="game-info"><h3>${esc(x.name)}</h3><div class="game-meta"><span>${esc(x.genre)}</span><span>✦</span><span>اضغط للتفاصيل</span></div></div></article>`).join("");
    $("emptyState").hidden=filtered.length!==0;
    $("gamesGrid").style.display=filtered.length?"grid":"none";
    $("adminList").innerHTML=games.length?games.map(x=>`<div class="admin-row"><img class="admin-thumb" src="${esc(x.image||"")}" onerror="this.style.visibility='hidden'" alt=""><div class="admin-row-info"><b>${esc(x.name)}</b><small>${esc(x.platform)} · ${esc(x.genre)}</small></div><button class="mini-btn" data-edit="${x.id}">تعديل</button><button class="mini-btn delete" data-delete="${x.id}">حذف</button></div>`).join(""):`<p class="muted">لا توجد ألعاب مضافة حتى الآن.</p>`;
  }
  function openAdmin(){dialog.showModal();}
  function resetForm(){ $("gameForm").reset();$("editId").value="";$("saveGame").textContent="حفظ اللعبة";$("cancelEdit").hidden=true; }
  function startEdit(id){const x=games.find(g=>g.id===id);if(!x)return;$("editId").value=x.id;$("gameName").value=x.name;$("gamePlatform").value=x.platform;$("gameGenre").value=x.genre;$("gameImage").value=x.image||"";$("gameLink").value=x.link||"";$("gameDescription").value=x.description||"";$("saveGame").textContent="حفظ التعديلات";$("cancelEdit").hidden=false;$("gameName").focus();$("managePanel").scrollIntoView({behavior:"smooth"});}
  const detailsDialog=$("detailsDialog");
  let activeDetailsId=null;
  function showDetails(id){const x=games.find(g=>String(g.id)===String(id));if(!x)return;activeDetailsId=x.id;$("detailsTitle").textContent=x.name;const cover=$("detailsCover");cover.src=x.image||"";cover.hidden=!x.image;$("detailsPlatform").textContent=x.platform;$("detailsGenre").textContent=x.genre||"غير محدد";$("detailsDescription").textContent=x.description||"لا يوجد وصف مضاف لهذه اللعبة.";const link=$("detailsLink");link.hidden=false;link.href=`game.html?id=${encodeURIComponent(x.id)}`;link.textContent="فتح صفحة اللعبة ↗";$("detailsNoLink").hidden=true;detailsDialog.showModal();}
  $("gamesGrid").addEventListener("click",e=>{const card=e.target.closest("[data-details]");if(card)showDetails(card.dataset.details);});
  $("gamesGrid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-details]")){e.preventDefault();showDetails(e.target.dataset.details);}});
  $("closeDetails").addEventListener("click",()=>detailsDialog.close());
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