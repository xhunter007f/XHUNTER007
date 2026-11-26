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
    message("لم نعثر على بيانات اللعبة في هذا المتصفح.");
    return;
  }
  document.title = game.name + " | XHUNTER007";
  $("pageGameName").textContent = game.name;
  $("pageGamePlatform").textContent = (game.platform || "") + (game.genre ? " · " + game.genre : "");
  $("pageGameLink").value = game.link || "";
  $("pageGameDescription").value = game.description || "";
  if (game.image) { $("pageGameCover").src = game.image; $("pageGameCover").hidden = false; }
  function save() {
    const link = $("pageGameLink").value.trim();
    if (link && !/^https?:\/\//i.test(link)) {
      message("الرابط غير صحيح. لازم يبدأ بـ https:// أو http://");
      $("pageGameLink").focus();
      return false;
    }
    game.link = link;
    game.description = $("pageGameDescription").value.trim();
    localStorage.setItem(KEY, JSON.stringify(games));
    message("تم حفظ الرابط والوصف بنجاح.");
    return true;
  }
  $("saveGameInfo").addEventListener("click", () => { if (save()) message("تم حفظ الرابط والوصف بنجاح."); });
  $("saveAndOpenGame").addEventListener("click", () => {
    if (!save()) return;
    if (!game.link) { message("اكتب رابط اللعبة أولاً، ثم اضغط حفظ وفتح."); $("pageGameLink").focus(); return; }
    location.href = game.link;
  });
})();