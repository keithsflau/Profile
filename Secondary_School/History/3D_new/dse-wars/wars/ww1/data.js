/* WWI · 第一次世界大戰 1914–1918 */
window.BATTLE_DATA = (function () {
  const CP = "cp", AP = "ap";
  const END_DAY = 365;

  const meta = {
    id: "ww1",
    title_zh: "第一次世界大戰",
    title_en: "WORLD WAR I",
    subtitle: "1914–1918",
    factionOrder: [CP, AP],
    geo: { minLng: -5.5, maxLng: 32.0, minLat: 38.0, maxLat: 55.5, Z: 6 },
    startDate: [1914, 6, 28],
    introCam: { lng: 8.0, lat: 49.5, dist: 3200, az: 0, el: 50 },
    titleCard: {
      zh: "第一次世界大戰", en: "WORLD WAR I · 1914–1918",
      narr_zh: "1914年薩拉熱窩一聲槍響，歐洲陷入四年塹壕戰浩劫。",
      narr_en: "A shot in Sarajevo in 1914 plunged Europe into four years of trench warfare.",
    },
    outroCam: { lng: 10.0, lat: 49.0, dist: 3500, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: AP,
  };

  const factions = {
    cp: { main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820, css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers", emblem: "circle", maxStrength: 200000, textLight: "#e8dcc8" },
    ap: { main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a, css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers", emblem: "shield", maxStrength: 220000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "Western Front", name_zh: "西線", type: "region", lng: 2.8, lat: 50.0, h: 0 },
      { name_en: "Eastern Front", name_zh: "東線", type: "region", lng: 22.0, lat: 52.0, h: 0 },
      { name_en: "Italian Front", name_zh: "意大利戰線", type: "region", lng: 12.5, lat: 46.0, h: 0 },
      { name_en: "Balkans", name_zh: "巴爾幹", type: "region", lng: 20.0, lat: 44.0, h: 0 },
      { name_en: "Middle East", name_zh: "中東", type: "region", lng: 35.0, lat: 32.0, h: 0 },
    ],
    points: [
      { name_en: "Sarajevo", name_zh: "薩拉熱窩", type: "city", lng: 18.41, lat: 43.86 },
      { name_en: "Paris", name_zh: "巴黎", type: "city", lng: 2.35, lat: 48.86 },
      { name_en: "Verdun", name_zh: "凡爾登", type: "fort", lng: 5.38, lat: 49.16 },
      { name_en: "Somme", name_zh: "索姆河", type: "town", lng: 2.70, lat: 49.90 },
      { name_en: "Ypres", name_zh: "伊普爾", type: "town", lng: 2.88, lat: 50.85 },
      { name_en: "Marne", name_zh: "馬恩河", type: "town", lng: 3.40, lat: 48.95 },
      { name_en: "Amiens", name_zh: "亞眠", type: "city", lng: 2.30, lat: 49.89 },
      { name_en: "Tannenberg", name_zh: "坦能堡", type: "town", lng: 20.08, lat: 53.88 },
      { name_en: "Galicia", name_zh: "加里西亞", type: "region", lng: 24.0, lat: 49.5 },
      { name_en: "Caporetto", name_zh: "卡普雷托", type: "town", lng: 13.58, lat: 46.22 },
      { name_en: "Piave", name_zh: "皮亞韋河", type: "town", lng: 12.35, lat: 45.70 },
      { name_en: "Gallipoli", name_zh: "加里波利", type: "fort", lng: 26.41, lat: 40.41 },
      { name_en: "Gaza", name_zh: "加沙", type: "city", lng: 34.47, lat: 31.50 },
      { name_en: "Palestine", name_zh: "巴勒斯坦", type: "region", lng: 35.2, lat: 31.9 },
      { name_en: "Versailles", name_zh: "凡爾賽", type: "city", lng: 2.13, lat: 48.80 },
      { name_en: "Berlin", name_zh: "柏林", type: "city", lng: 13.40, lat: 52.52 },
      { name_en: "London", name_zh: "倫敦", type: "city", lng: -0.12, lat: 51.51 },
    ],
    lines: [
      { name_en: "Western Front 1916", name_zh: "1916年西線",
        path: [[2.5,50.8],[3.0,50.2],[3.5,49.5],[4.5,49.2],[5.5,49.0]] },
    ],
  };

  const units = [
    { id: "cp_hq", faction: CP, kind: "command", crest: "eagle", cf: false,
      name_zh: "德軍總參謀部", name_en: "German GHQ", type: "Supreme Command",
      commander: { zh: "興登堡", en: "Hindenburg", rank: "元帥" },
      track: [{ d: 1, lng: 13.4, lat: 52.5, s: 0, st: "hold" }, { d: END_DAY, lng: 13.4, lat: 52.5, s: 0, st: "hold" }] },
    { id: "cp_west", faction: CP, kind: "infantry", crest: "tank", cf: true,
      name_zh: "西線德軍", name_en: "German Western Front", type: "Field Army",
      track: [{ d: 1, lng: 6.0, lat: 50.5, s: 120000, st: "attack" }, { d: 80, lng: 5.4, lat: 49.2, s: 100000, st: "hold" },
        { d: 200, lng: 5.38, lat: 49.16, s: 95000, st: "attack" }, { d: END_DAY, lng: 4.5, lat: 49.5, s: 80000, st: "retreat" }] },
    { id: "ap_west", faction: AP, kind: "infantry", crest: "anchor", cf: true,
      name_zh: "英法聯軍西線", name_en: "Anglo-French Western Front", type: "Field Army",
      track: [{ d: 1, lng: 2.5, lat: 50.5, s: 110000, st: "hold" }, { d: 50, lng: 3.4, lat: 48.95, s: 105000, st: "attack" },
        { d: 150, lng: 2.7, lat: 49.9, s: 120000, st: "attack" }, { d: END_DAY, lng: 2.3, lat: 49.89, s: 130000, st: "attack" }] },
    { id: "cp_east", faction: CP, kind: "infantry", crest: "eagle", cf: true,
      name_zh: "東線德軍", name_en: "German Eastern Front", type: "Field Army",
      track: [{ d: 30, lng: 20.08, lat: 53.88, s: 80000, st: "attack" }, { d: 100, lng: 22.0, lat: 52.0, s: 70000, st: "hold" },
        { d: END_DAY, lng: 20.5, lat: 52.5, s: 60000, st: "hold" }] },
    { id: "ap_gallipoli", faction: AP, kind: "infantry", crest: "anchor", cf: true,
      name_zh: "加里波利遠征軍", name_en: "Gallipoli Expedition", type: "Amphibious",
      track: [{ d: 120, lng: 26.41, lat: 40.41, s: 50000, st: "landing" }, { d: 200, lng: 26.41, lat: 40.41, s: 20000, st: "retreat" }] },
    { id: "ap_mideast", faction: AP, kind: "infantry", crest: "wheat", cf: true,
      name_zh: "中東遠征軍", name_en: "Middle East Corps", type: "Colonial",
      track: [{ d: 180, lng: 34.47, lat: 31.5, s: 40000, st: "attack" }, { d: 280, lng: 35.2, lat: 31.9, s: 45000, st: "hold" }] },
  ];

  const arrows = [
    { d: 1, f: CP, from: [6.0, 50.5], to: [3.4, 48.95], label: "施里芬計劃南下", kind: "march" },
    { d: 50, f: AP, from: [2.5, 50.5], to: [3.4, 48.95], label: "馬恩河反擊", kind: "attack" },
    { d: 200, f: CP, from: [5.5, 49.0], to: [5.38, 49.16], label: "凡爾登攻勢", kind: "attack" },
    { d: 150, f: AP, from: [2.3, 50.0], to: [2.7, 49.9], label: "索姆河攻勢", kind: "attack" },
    { d: 30, f: CP, from: [21.0, 54.0], to: [20.08, 53.88], label: "坦能堡包圍", kind: "attack" },
    { d: 120, f: AP, from: [28.0, 41.0], to: [26.41, 40.41], label: "加里波利登陸", kind: "landing" },
  ];

  const fronts = [
    { d: 1, path: [[2.0, 51.0], [3.0, 50.5], [4.0, 49.8], [5.5, 49.2]] },
    { d: 80, path: [[2.2, 50.8], [3.0, 50.0], [4.5, 49.5], [5.5, 49.1]] },
    { d: 200, path: [[2.5, 50.5], [3.5, 49.8], [5.0, 49.3], [5.5, 49.15]] },
    { d: 320, path: [[2.0, 50.0], [2.8, 49.5], [4.0, 49.2], [5.0, 49.0]] },
    { d: END_DAY, path: [[1.8, 49.5], [2.5, 49.0], [3.5, 48.8]] },
  ];

  const hotspots = [
    { a: 1, b: 30, lng: 18.41, lat: 43.86, kind: "firefight", i: 0.9 },
    { a: 40, b: 70, lng: 3.4, lat: 48.95, kind: "firefight", i: 1.0 },
    { a: 190, b: 230, lng: 5.38, lat: 49.16, kind: "artillery", i: 1.0 },
    { a: 140, b: 180, lng: 2.7, lat: 49.9, kind: "firefight", i: 1.0 },
    { a: 25, b: 45, lng: 20.08, lat: 53.88, kind: "firefight", i: 0.9 },
    { a: 115, b: 200, lng: 26.41, lat: 40.41, kind: "firefight", i: 0.8 },
  ];

  const weather = [
    { d: 1, night: 0.2, fog: 0.1, rain: 0.1, smoke: 0.1, zh: "1914 · 開戰", en: "1914 · outbreak" },
    { d: 200, night: 0.15, fog: 0.25, rain: 0.2, smoke: 0.6, zh: "凡爾登 · 塹壕", en: "Verdun · trenches" },
    { d: END_DAY, night: 0.1, fog: 0.1, rain: 0.1, smoke: 0.2, zh: "1918 · 終戰", en: "1918 · armistice" },
  ];

  const notes = {
    summary: "第一次世界大戰（1914–1918）以歐洲為主戰場，西線形成僵持塹壕戰；東線、意大利、巴爾幹及中東亦有重大戰事。1919年《凡爾賽和約》在戰勝國巴黎和會上簽訂。",
    caveats: ["地圖覆蓋歐洲及中東主要戰場；戰線與兵力為教學示意。", "現代衛星影像用於地形，非當年地貌。"],
    sources: "DSE 課程、BBC History、Britannica、OpenStreetMap 坐標。",
  };

  const storyboard = [
    { day: 1, hold: 8, cam: { lng: 18.41, lat: 43.86, dist: 600, az: 200, el: 48, orbit: 0.6 },
      dateLabel: "1914年6月28日", title_zh: "薩拉熱窩暗殺", title_en: "Assassination at Sarajevo",
      narration_zh: "奧匈帝國皇儲在薩拉熱窩遇刺，成為一戰導火線。",
      narration_en: "The heir to Austria-Hungary is assassinated in Sarajevo — the spark of WWI.",
      focus: ["cp_hq"], side: "cp" },
    { day: 30, hold: 9, cam: { lng: 3.4, lat: 48.95, dist: 900, az: 180, el: 44, orbit: 0.7 },
      dateLabel: "1914年9月", title_zh: "第一次馬恩河戰役", title_en: "First Battle of the Marne",
      narration_zh: "德軍逼近巴黎，英法聯軍在馬恩河阻止施里芬計劃。",
      narration_en: "Anglo-French forces halt the Schlieffen Plan at the Marne.",
      focus: ["cp_west", "ap_west"], side: "both" },
    { day: 80, hold: 8, cam: { lng: 2.8, lat: 50.5, dist: 1100, az: 0, el: 46, orbit: 0.5 },
      dateLabel: "1915年", title_zh: "西線塹壕僵持", title_en: "Trench Stalemate on the Western Front",
      narration_zh: "西線形成綿延塹壕；伊普爾等地首次使用毒氣。",
      narration_en: "Trenches stretch across the Western Front; poison gas is first used at Ypres.",
      focus: ["cp_west", "ap_west"], side: "both" },
    { day: 25, hold: 8, cam: { lng: 20.08, lat: 53.88, dist: 700, az: 220, el: 48, orbit: 0.6 },
      dateLabel: "1914年8月", title_zh: "坦能堡戰役", title_en: "Battle of Tannenberg",
      narration_zh: "德軍在東線重創俄軍，俘虜數以十萬計。",
      narration_en: "Germany crushes Russian forces at Tannenberg.",
      focus: ["cp_east"], side: "cp" },
    { day: 200, hold: 10, cam: { lng: 5.38, lat: 49.16, dist: 650, az: 200, el: 48, orbit: 0.7 },
      dateLabel: "1916年", title_zh: "凡爾登戰役", title_en: "Battle of Verdun",
      narration_zh: "「他們將不會通過」——凡爾登成為消耗戰象徵。",
      narration_en: "\"They shall not pass\" — Verdun becomes the symbol of attrition.",
      focus: ["cp_west", "ap_west"], side: "both" },
    { day: 150, hold: 9, cam: { lng: 2.7, lat: 49.9, dist: 800, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1916年7月", title_zh: "索姆河戰役", title_en: "Battle of the Somme",
      narration_zh: "協約國大規模攻勢，首日傷亡慘重。",
      narration_en: "Allied offensive on the Somme — catastrophic losses on the first day.",
      focus: ["ap_west"], side: "ap" },
    { day: 120, hold: 8, cam: { lng: 26.41, lat: 40.41, dist: 900, az: 180, el: 42, orbit: 0.6 },
      dateLabel: "1915–1916", title_zh: "加里波利戰役", title_en: "Gallipoli Campaign",
      narration_zh: "協約國企圖打通達黑海海峽，遭鄂圖曼軍擊退。",
      narration_en: "Allied landings at Gallipoli fail against Ottoman defences.",
      focus: ["ap_gallipoli"], side: "ap" },
    { day: 350, hold: 8, cam: { lng: 2.13, lat: 48.80, dist: 700, az: 0, el: 46, orbit: 0.5 },
      dateLabel: "1919年", title_zh: "凡爾賽和約", title_en: "Treaty of Versailles",
      narration_zh: "戰勝國在巴黎簽訂和約，對德實施嚴厲制裁。",
      narration_en: "Victors sign the Treaty of Versailles, imposing harsh terms on Germany.",
      focus: ["ap_west"], side: "ap" },
  ];

  const outro = {
    title_zh: "第一次世界大戰", title_en: "World War I",
    narration_zh: "一戰改變歐洲秩序，為二戰埋下伏筆。",
    narration_en: "WWI reshaped Europe and set the stage for WWII.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
