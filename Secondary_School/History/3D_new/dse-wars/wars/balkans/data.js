/* Yugoslav / Balkan wars */
window.BATTLE_DATA = (function () {
  const SR = "sr", CO = "co";
  const END_DAY = 300;

  const meta = {
    id: "balkans",
    title_zh: "巴爾幹種族衝突",
    title_en: "YUGOSLAV WARS",
    subtitle: "1991–1999",
    factionOrder: [SR, CO],
    geo: { minLng: 15.0, maxLng: 22.5, minLat: 42.0, maxLat: 46.5, Z: 8 },
    startDate: [1991, 6, 25],
    introCam: { lng: 18.5, lat: 44.5, dist: 2000, az: 0, el: 50 },
    titleCard: {
      zh: "南斯拉夫解體與種族衝突", en: "YUGOSLAV WARS · 1991–1999",
      narr_zh: "南斯拉夫解體引發克羅地亞、波斯尼亞、科索沃連環戰爭與人道災難。",
      narr_en: "Yugoslavia's breakup triggers wars in Croatia, Bosnia and Kosovo.",
    },
    outroCam: { lng: 18.4, lat: 44.0, dist: 2200, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: CO,
  };

  const factions = {
    sr: { main: 0x5c4033, glow: 0x8b4513, dim: 0x3a2820, css: "#6b3030", label_zh: "塞爾維亞／南斯拉夫軍", label_en: "Serb / JNA Forces", emblem: "circle", maxStrength: 80000, textLight: "#e8dcc8" },
    co: { main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a, css: "#1b4f72", label_zh: "克羅地亞／波黑／科索沃", label_en: "Croat / Bosniak / Kosovo", emblem: "shield", maxStrength: 70000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "Croatia", name_zh: "克羅地亞", type: "region", lng: 16.5, lat: 45.0 },
      { name_en: "Bosnia", name_zh: "波斯尼亞", type: "region", lng: 18.0, lat: 44.0 },
      { name_en: "Kosovo", name_zh: "科索沃", type: "region", lng: 21.0, lat: 42.6 },
    ],
    points: [
      { name_en: "Sarajevo", name_zh: "薩拉熱窩", type: "city", lng: 18.41, lat: 43.86 },
      { name_en: "Vukovar", name_zh: "武科瓦爾", type: "city", lng: 19.00, lat: 45.35 },
      { name_en: "Srebrenica", name_zh: "斯雷布雷尼察", type: "town", lng: 19.29, lat: 44.10 },
      { name_en: "Pristina", name_zh: "普里什蒂納", type: "city", lng: 21.17, lat: 42.66 },
      { name_en: "Belgrade", name_zh: "貝爾格萊德", type: "city", lng: 20.46, lat: 44.79 },
      { name_en: "Zagreb", name_zh: "薩格勒布", type: "city", lng: 15.98, lat: 45.81 },
      { name_en: "Dubrovnik", name_zh: "杜布羅夫尼克", type: "city", lng: 18.09, lat: 42.65 },
    ],
    lines: [],
  };

  const units = [
    { id: "sr_jna", faction: SR, kind: "infantry", crest: "eagle", cf: true, name_zh: "南斯拉夫人民軍", name_en: "JNA / Serb Forces",
      track: [{ d: 1, lng: 20.46, lat: 44.79, s: 60000, st: "attack" }, { d: 40, lng: 19.00, lat: 45.35, s: 50000, st: "attack" },
        { d: 100, lng: 18.41, lat: 43.86, s: 45000, st: "hold" }, { d: 200, lng: 19.29, lat: 44.10, s: 30000, st: "attack" },
        { d: 250, lng: 21.17, lat: 42.66, s: 40000, st: "attack" }, { d: END_DAY, lng: 20.46, lat: 44.79, s: 35000, st: "hold" }] },
    { id: "co_def", faction: CO, kind: "infantry", crest: "anchor", cf: true, name_zh: "克羅地亞／波黑守軍", name_en: "Croat / Bosniak Forces",
      track: [{ d: 1, lng: 15.98, lat: 45.81, s: 25000, st: "hold" }, { d: 40, lng: 19.00, lat: 45.35, s: 20000, st: "hold" },
        { d: 100, lng: 18.41, lat: 43.86, s: 30000, st: "hold" }, { d: 180, lng: 19.29, lat: 44.10, s: 8000, st: "dead" },
        { d: 250, lng: 21.17, lat: 42.66, s: 25000, st: "hold" }, { d: END_DAY, lng: 18.41, lat: 43.86, s: 28000, st: "hold" }] },
  ];

  const arrows = [
    { d: 1, f: SR, from: [20.46, 44.79], to: [19.00, 45.35], label: "武科瓦爾圍攻", kind: "attack" },
    { d: 100, f: SR, from: [20.0, 44.5], to: [18.41, 43.86], label: "圍城薩拉熱窩", kind: "attack" },
    { d: 200, f: SR, from: [19.5, 44.3], to: [19.29, 44.10], label: "斯雷布雷尼察", kind: "attack" },
    { d: 250, f: SR, from: [20.46, 44.79], to: [21.17, 42.66], label: "科索沃鎮壓", kind: "attack" },
  ];

  const fronts = [
    { d: 40, path: [[19.5, 45.2], [18.8, 44.5], [18.2, 43.9]] },
    { d: 120, path: [[18.6, 43.9], [18.4, 43.86], [18.2, 43.8]] },
    { d: END_DAY, path: [[21.0, 42.7], [20.0, 43.5], [18.5, 44.0]] },
  ];

  const hotspots = [
    { a: 35, b: 55, lng: 19.00, lat: 45.35, kind: "firefight", i: 1.0 },
    { a: 90, b: 180, lng: 18.41, lat: 43.86, kind: "artillery", i: 1.0 },
    { a: 195, b: 210, lng: 19.29, lat: 44.10, kind: "firefight", i: 1.0 },
    { a: 245, b: 280, lng: 21.17, lat: 42.66, kind: "firefight", i: 0.9 },
    { a: 270, b: 290, lng: 20.46, lat: 44.79, kind: "air", i: 0.8 },
  ];

  const weather = [
    { d: 1, night: 0.2, fog: 0.15, rain: 0.2, smoke: 0.4, zh: "1991 · 克羅地亞", en: "1991 Croatia" },
    { d: 100, night: 0.25, fog: 0.2, rain: 0.15, smoke: 0.7, zh: "薩拉熱窩圍城", en: "Siege of Sarajevo" },
    { d: END_DAY, night: 0.15, fog: 0.1, rain: 0.1, smoke: 0.3, zh: "1999 · 科索沃", en: "1999 Kosovo" },
  ];

  const notes = {
    summary: "南斯拉夫戰爭：斯洛文尼亞與克羅地亞獨立、波斯尼亞圍城與斯雷布雷尼察大屠殺、科索沃戰爭及北約轟炸貝爾格萊德。",
    caveats: ["多方勢力簡化為兩方色標。", "斯雷布雷尼察等事件為人道災難，地圖僅作地理示意。"],
    sources: "DSE 課程、ICTY、BBC、Britannica。",
  };

  const storyboard = [
    { day: 1, hold: 8, cam: { lng: 19.00, lat: 45.35, dist: 650, az: 200, el: 46, orbit: 0.7 },
      dateLabel: "1991年", title_zh: "克羅地亞獨立戰爭", title_en: "Croatian War of Independence",
      narration_zh: "克羅地亞宣布獨立，武科瓦爾遭受圍攻。",
      narration_en: "Croatia declares independence; Vukovar is besieged.",
      focus: ["sr_jna", "co_def"], side: "both" },
    { day: 100, hold: 10, cam: { lng: 18.41, lat: 43.86, dist: 700, az: 180, el: 48, orbit: 0.7 },
      dateLabel: "1992–1996", title_zh: "薩拉熱窩圍城", title_en: "Siege of Sarajevo",
      narration_zh: "波黑首都薩拉熱窩被圍超過三年，平民死傷慘重。",
      narration_en: "Sarajevo is besieged for over three years — civilians suffer terribly.",
      focus: ["sr_jna", "co_def"], side: "both" },
    { day: 200, hold: 9, cam: { lng: 19.29, lat: 44.10, dist: 600, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1995年7月", title_zh: "斯雷布雷尼察", title_en: "Srebrenica Massacre",
      narration_zh: "波塞族部隊攻占聯合國安全區，逾八千穆斯林男性被殺。",
      narration_en: "Bosnian Serb forces seize a UN safe area — over 8,000 Muslim men and boys are killed.",
      focus: ["sr_jna"], side: "sr" },
    { day: 220, hold: 8, cam: { lng: 18.41, lat: 43.86, dist: 800, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1995年", title_zh: "代頓協議", title_en: "Dayton Agreement",
      narration_zh: "波黑戰爭結束，建立聯邦與塞族共和國實體。",
      narration_en: "The Dayton Accords end the Bosnian War.",
      focus: ["co_def"], side: "co" },
    { day: 250, hold: 9, cam: { lng: 21.17, lat: 42.66, dist: 750, az: 220, el: 46, orbit: 0.7 },
      dateLabel: "1998–1999", title_zh: "科索沃戰爭", title_en: "Kosovo War",
      narration_zh: "塞軍鎮壓科索沃阿族；北約轟炸塞爾維亞。",
      narration_en: "Serb crackdown in Kosovo leads to NATO bombing of Serbia.",
      focus: ["sr_jna", "co_def"], side: "both" },
    { day: END_DAY, hold: 8, cam: { lng: 20.46, lat: 44.79, dist: 900, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1999年", title_zh: "貝爾格萊德轟炸", title_en: "NATO Strikes on Belgrade",
      narration_zh: "北約空襲迫使米洛舍維奇從科索沃撤軍。",
      narration_en: "NATO air strikes force Milošević to withdraw from Kosovo.",
      focus: ["sr_jna"], side: "sr" },
  ];

  const outro = {
    title_zh: "巴爾幹戰後秩序", title_en: "After the Balkan Wars",
    narration_zh: "多國介入與國際法庭審訊戰犯，但民族矛盾餘波未平。",
    narration_en: "International tribunals prosecute war crimes — ethnic tensions persist.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
