(() => {
  const KEY = "xhunter007_games_v1";
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const gameId = params.get("id");
  let games = [];
  try { games = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch {}
  const game = games.find(item => String(item.id) === String(gameId));
  const message = text => { $("gamePageMessage").textContent = text; };
  if (!game) {
    $("pageGameName").textContent = "اللعبة غير موجودة";
    $("pageGamePlatform").textContent = "ارجع للمكتبة وافتح اللعبة مرة أخرى.";
    $("saveGameInfo").disabled = true;
    $("saveAndOpenGame").disabled = true;
    $("addGameLink").disabled = true;
    $("addYoutubeLink").disabled = true;
    message("لم نعثر على بيانات اللعبة في هذا المتصفح.");
    return;
  }
  document.title = game.name + " | XHUNTER007";
  $("pageGameName").textContent = game.name;
  $("pageGamePlatform").textContent = (game.platform || "") + (game.genre ? " · " + game.genre : "");
  $("pageGameLink").value = game.link || "";
  $("pageGameDescription").value = game.description || "";
  if (game.image) { $("pageGameCover").src = game.image; $("pageGameCover").hidden = false; }

  // Keep older saved links, while storing every newly added link in the game's own record.
  game.links = Array.isArray(game.links) ? game.links : (game.link ? [game.link] : []);
  game.youtubeLinks = Array.isArray(game.youtubeLinks) ? game.youtubeLinks : [];

  function validHttpUrl(value) {
    try { const url = new URL(value); return url.protocol === "https:" || url.protocol === "http:"; }
    catch { return false; }
  }
  function validYoutubeUrl(value) {
    if (!validHttpUrl(value)) return false;
    try {
      const url = new URL(value);
      return /(^|\\.)youtube\\.com$|(^|\\.)youtu\\.be$/i.test(url.hostname);
    } catch { return false; }
  }
  function iconItem(url, type, index) {
    const isYoutube = type === "youtube";
    const label = isYoutube ? "شرح يوتيوب " + (index + 1) : "رابط " + (index + 1);
    const icon = isYoutube ? "▶" : "↗";
    const item = document.createElement("div");
    item.className = "game-link-item";
    const anchor = document.createElement("a");
    anchor.className = "game-link-icon " + (isYoutube ? "youtube-icon" : "");
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.title = label + " — " + url;
    anchor.setAttribute("aria-label", label);
    anchor.innerHTML = '<span aria-hidden="true">' + icon + '</span><small>' + label + '</small>';
    const remove = document.createElement("button");
    remove.className = "game-link-remove";
    remove.type = "button";
    remove.textContent = "×";
    remove.title = "حذف " + label;
    remove.setAttribute("aria-label", "حذف " + label);
    remove.addEventListener("click", () => {
      const list = isYoutube ? game.youtubeLinks : game.links;
      list.splice(index, 1);
      persist();
      renderLinks();
      message("تم حذف " + label + ".");
    });
    item.append(anchor, remove);
    return item;
  }
  function renderLinks() {
    const linksBox = $("gameLinksList");
    const youtubeBox = $("youtubeLinksList");
    linksBox.replaceChildren();
    youtubeBox.replaceChildren();
    game.links.forEach((url, index) => linksBox.append(iconItem(url, "link", index)));
    game.youtubeLinks.forEach((url, index) => youtubeBox.append(iconItem(url, "youtube", index)));
    if (!game.links.length) linksBox.innerHTML = '<p class="small-note">لم تضف روابط بعد.</p>';
    if (!game.youtubeLinks.length) youtubeBox.innerHTML = '<p class="small-note">لم تضف فيديو شرح بعد.</p>';
  }
  function persist() {
    localStorage.setItem(KEY, JSON.stringify(games));
  }
  $("addGameLink").addEventListener("click", () => {
    const field = $("newGameLink");
    const url = field.value.trim();
    if (!validHttpUrl(url)) { message("اكتب رابطًا صحيحًا يبدأ بـ https:// أو http://"); field.focus(); return; }
    game.links.push(url);
    if (!game.link) game.link = url;
    persist();
    field.value = "";
    renderLinks();
    message("تمت إضافة الرابط كأيقونة.");
  });
  $("addYoutubeLink").addEventListener("click", () => {
    const field = $("newYoutubeLink");
    const url = field.value.trim();
    if (!validYoutubeUrl(url)) { message("أدخل رابط فيديو من YouTube صحيحًا."); field.focus(); return; }
    game.youtubeLinks.push(url);
    persist();
    field.value = "";
    renderLinks();
    message("تمت إضافة شرح يوتيوب كأيقونة.");
  });
  function save() {
    const link = $("pageGameLink").value.trim();
    if (link && !validHttpUrl(link)) {
      message("الرابط غير صحيح. لازم يبدأ بـ https:// أو http://");
      $("pageGameLink").focus();
      return false;
    }
    game.link = link;
    game.description = $("pageGameDescription").value.trim();
    if (link && !game.links.includes(link)) game.links.unshift(link);
    persist();
    renderLinks();
    message("تم حفظ الرابط والوصف بنجاح.");
    return true;
  }
  $("saveGameInfo").addEventListener("click", () => { if (save()) message("تم حفظ الرابط والوصف بنجاح."); });
  $("saveAndOpenGame").addEventListener("click", () => {
    if (!save()) return;
    if (!game.link) { message("اكتب رابط اللعبة أولاً، ثم اضغط حفظ وفتح."); $("pageGameLink").focus(); return; }
    location.href = game.link;
  });
  renderLinks();
})();