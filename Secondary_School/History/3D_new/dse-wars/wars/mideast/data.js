/* Arab-Israeli / Middle East conflicts */
window.BATTLE_DATA = (function () {
  const AR = "arab", IS = "isr";
  const END_DAY = 350;

  const meta = {
    id: "mideast",
    title_zh: "以巴／中東戰爭",
    title_en: "ARAB-ISRAELI CONFLICTS",
    subtitle: "1948–2000",
    factionOrder: [AR, IS],
    geo: { minLng: 32.0, maxLng: 37.5, minLat: 28.5, maxLat: 34.5, Z: 8 },
    startDate: [1948, 5, 14],
    introCam: { lng: 35.0, lat: 31.8, dist: 2200, az: 0, el: 50 },
    titleCard: {
      zh: "以巴／中東戰爭", en: "ARAB-ISRAELI CONFLICTS",
      narr_zh: "以色列建國引發阿以戰爭；領土、難民與耶路撒冷地位爭議延續半世紀。",
      narr_en: "Israel's founding sparks wars with Arab states — land, refugees and Jerusalem remain unresolved.",
    },
    outroCam: { lng: 35.2, lat: 31.5, dist: 2500, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: AR,
  };

  const factions = {
    arab: { main: 0x2e6b2e, glow: 0x4caf50, dim: 0x1a401a, css: "#2e6b2e", label_zh: "阿拉伯聯軍", label_en: "Arab Coalition", emblem: "circle", maxStrength: 150000, textLight: "#d4ecd4" },
    isr: { main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a, css: "#1565c0", label_zh: "以色列", label_en: "Israel", emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "West Bank", name_zh: "約旦河西岸", type: "region", lng: 35.3, lat: 31.9 },
      { name_en: "Gaza Strip", name_zh: "加沙地帶", type: "region", lng: 34.4, lat: 31.5 },
      { name_en: "Sinai", name_zh: "西奈半島", type: "region", lng: 33.5, lat: 29.5 },
    ],
    points: [
      { name_en: "Jerusalem", name_zh: "耶路撒冷", type: "city", lng: 35.21, lat: 31.77 },
      { name_en: "Tel Aviv", name_zh: "特拉維夫", type: "city", lng: 34.78, lat: 32.09 },
      { name_en: "Gaza", name_zh: "加沙", type: "city", lng: 34.47, lat: 31.50 },
      { name_en: "West Bank", name_zh: "約旦河西岸", type: "region", lng: 35.30, lat: 31.95 },
      { name_en: "Golan Heights", name_zh: "戈蘭高地", type: "fort", lng: 35.75, lat: 33.05 },
      { name_en: "Suez Canal", name_zh: "蘇伊士運河", type: "fort", lng: 32.35, lat: 30.45 },
      { name_en: "Sinai", name_zh: "西奈半島", type: "region", lng: 33.80, lat: 29.50 },
      { name_en: "Lebanon", name_zh: "黎巴嫩", type: "region", lng: 35.5, lat: 33.9 },
      { name_en: "Oslo", name_zh: "奧斯陸（和談）", type: "town", lng: 35.25, lat: 32.5 },
    ],
    lines: [
      { name_en: "Pre-1967 border", name_zh: "1967年前邊界", path: [[34.2, 31.5], [35.0, 31.8], [35.5, 32.5]] },
    ],
  };

  const units = [
    { id: "isr_idf", faction: IS, kind: "infantry", crest: "trident", cf: true, name_zh: "以色列國防軍", name_en: "IDF",
      track: [{ d: 1, lng: 34.78, lat: 32.09, s: 30000, st: "hold" }, { d: 80, lng: 35.21, lat: 31.77, s: 50000, st: "attack" },
        { d: 150, lng: 35.75, lat: 33.05, s: 60000, st: "attack" }, { d: 220, lng: 33.80, lat: 29.50, s: 80000, st: "attack" },
        { d: END_DAY, lng: 35.21, lat: 31.77, s: 70000, st: "hold" }] },
    { id: "ar_coalition", faction: AR, kind: "infantry", crest: "eagle", cf: true, name_zh: "阿拉伯聯軍", name_en: "Arab Armies",
      track: [{ d: 1, lng: 35.0, lat: 31.5, s: 60000, st: "attack" }, { d: 80, lng: 35.21, lat: 31.77, s: 40000, st: "retreat" },
        { d: 220, lng: 32.35, lat: 30.45, s: 90000, st: "attack" }, { d: 250, lng: 32.35, lat: 30.45, s: 50000, st: "retreat" },
        { d: END_DAY, lng: 34.47, lat: 31.50, s: 30000, st: "hold" }] },
  ];

  const arrows = [
    { d: 1, f: AR, from: [35.5, 31.5], to: [34.78, 32.09], label: "第一次中東戰爭", kind: "attack" },
    { d: 150, f: IS, from: [34.78, 32.09], to: [35.75, 33.05], label: "六日戰爭", kind: "attack" },
    { d: 220, f: AR, from: [32.35, 30.45], to: [33.80, 29.50], label: "贖罪日戰爭", kind: "attack" },
    { d: 300, f: IS, from: [35.5, 33.5], to: [35.5, 33.9], label: "入侵黎巴嫩", kind: "attack" },
  ];

  const fronts = [
    { d: 1, path: [[35.0, 31.8], [35.2, 31.7], [35.4, 31.6]] },
    { d: 150, path: [[35.5, 33.0], [35.3, 32.0], [34.5, 31.5]] },
    { d: END_DAY, path: [[35.2, 31.9], [34.8, 31.6], [34.4, 31.5]] },
  ];

  const hotspots = [
    { a: 1, b: 60, lng: 35.21, lat: 31.77, kind: "firefight", i: 1.0 },
    { a: 145, b: 165, lng: 35.75, lat: 33.05, kind: "firefight", i: 1.0 },
    { a: 215, b: 255, lng: 32.35, lat: 30.45, kind: "firefight", i: 1.0 },
    { a: 280, b: 320, lng: 34.47, lat: 31.50, kind: "firefight", i: 0.8 },
  ];

  const weather = [
    { d: 1, night: 0.2, fog: 0.05, rain: 0.05, smoke: 0.3, zh: "1948 · 建國戰爭", en: "1948 war" },
    { d: END_DAY, night: 0.15, fog: 0.1, rain: 0.05, smoke: 0.2, zh: "和談與衝突", en: "Peace and conflict" },
  ];

  const notes = {
    summary: "阿以衝突：1948建國戰爭、1956蘇伊士危機、1967六日戰爭、1973贖罪日戰爭、1980s黎巴嫩、1993奧斯陸協議、2000因提法達。",
    caveats: ["多場戰爭壓縮於單一時間軸；阿拉伯陣營含埃及、敘利亞、約旦等概括表示。", "2000年後事件為延伸背景。"],
    sources: "DSE 課程、BBC、Britannica。",
  };

  const storyboard = [
    { day: 1, hold: 9, cam: { lng: 35.21, lat: 31.77, dist: 700, az: 200, el: 46, orbit: 0.7 },
      dateLabel: "1948年", title_zh: "第一次中東戰爭", title_en: "1948 Arab-Israeli War",
      narration_zh: "以色列宣布建國，阿拉伯聯軍進攻；耶路撒冷成爭奪焦點。",
      narration_en: "Israel declares independence; Arab armies attack — Jerusalem is fiercely contested.",
      focus: ["isr_idf", "ar_coalition"], side: "both" },
    { day: 100, hold: 8, cam: { lng: 32.35, lat: 30.45, dist: 900, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1956年", title_zh: "蘇伊士危機", title_en: "Suez Crisis",
      narration_zh: "埃及國有化蘇伊士運河，英法以聯手出兵。",
      narration_en: "Egypt nationalises the Suez Canal; Britain, France and Israel intervene.",
      focus: ["ar_coalition"], side: "arab" },
    { day: 150, hold: 10, cam: { lng: 35.75, lat: 33.05, dist: 750, az: 180, el: 48, orbit: 0.7 },
      dateLabel: "1967年6月", title_zh: "六日戰爭", title_en: "Six-Day War",
      narration_zh: "以色列先發制人，占領西奈、戈蘭高地、約旦河西岸與加沙。",
      narration_en: "Israel launches a pre-emptive strike, seizing Sinai, Golan, West Bank and Gaza.",
      focus: ["isr_idf"], side: "isr" },
    { day: 220, hold: 9, cam: { lng: 33.80, lat: 29.50, dist: 1000, az: 0, el: 42, orbit: 0.6 },
      dateLabel: "1973年10月", title_zh: "贖罪日戰爭", title_en: "Yom Kippur War",
      narration_zh: "埃及敘利亞在贖罪日突襲，以軍初期受挫後反擊。",
      narration_en: "Egypt and Syria attack on Yom Kippur; Israel recovers after early setbacks.",
      focus: ["ar_coalition", "isr_idf"], side: "both" },
    { day: 320, hold: 8, cam: { lng: 35.25, lat: 32.5, dist: 800, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1993年", title_zh: "奧斯陸協議", title_en: "Oslo Accords",
      narration_zh: "巴以秘密和談，確立自治政府框架（地圖上標示和談象徵點）。",
      narration_en: "Secret talks lead to the Oslo framework for Palestinian self-rule.",
      focus: ["isr_idf"], side: "isr" },
    { day: END_DAY, hold: 8, cam: { lng: 34.47, lat: 31.50, dist: 650, az: 200, el: 46, orbit: 0.6 },
      dateLabel: "2000年", title_zh: "第二次因提法達", title_en: "Second Intifada",
      narration_zh: "約旦河西岸與加沙爆發大規模巴勒斯坦起義。",
      narration_en: "A major Palestinian uprising erupts in the West Bank and Gaza.",
      focus: ["ar_coalition"], side: "arab" },
  ];

  const outro = {
    title_zh: "中東和平仍未實現", title_en: "Peace Remains Elusive",
    narration_zh: "領土、難民與耶路撒冷地位仍是核心爭議。",
    narration_en: "Territory, refugees and Jerusalem remain at the heart of the conflict.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
