/* WWII Europe */
window.BATTLE_DATA = (function () {
  const AX = "axis", AL = "allies";
  const END_DAY = 400;

  const meta = {
    id: "ww2-europe",
    title_zh: "第二次世界大戰（歐洲）",
    title_en: "WORLD WAR II · EUROPE",
    subtitle: "1939–1945",
    factionOrder: [AX, AL],
    geo: { minLng: -6.0, maxLng: 40.0, minLat: 30.0, maxLat: 58.0, Z: 6 },
    startDate: [1939, 9, 1],
    introCam: { lng: 12.0, lat: 52.0, dist: 3400, az: 0, el: 50 },
    titleCard: {
      zh: "第二次世界大戰（歐洲）", en: "WORLD WAR II · EUROPE",
      narr_zh: "1939年德軍入侵波蘭，歐洲再度陷入世界大戰。",
      narr_en: "Germany invades Poland in 1939 — Europe is at war again.",
    },
    outroCam: { lng: 13.4, lat: 52.5, dist: 2800, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: AL,
  };

  const factions = {
    axis: { main: 0x4a4a4a, glow: 0x8b0000, dim: 0x2a2a2a, css: "#6b2020", label_zh: "軸心國", label_en: "Axis", emblem: "circle", maxStrength: 250000, textLight: "#e8d0d0" },
    allies: { main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a, css: "#1b4f72", label_zh: "同盟國", label_en: "Allies", emblem: "shield", maxStrength: 280000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "Western Europe", name_zh: "西歐", type: "region", lng: 2.0, lat: 49.0 },
      { name_en: "Eastern Europe", name_zh: "東歐", type: "region", lng: 30.0, lat: 50.0 },
      { name_en: "North Africa", name_zh: "北非", type: "region", lng: 10.0, lat: 32.0 },
    ],
    points: [
      { name_en: "Warsaw", name_zh: "華沙", type: "city", lng: 21.01, lat: 52.23 },
      { name_en: "Paris", name_zh: "巴黎", type: "city", lng: 2.35, lat: 48.86 },
      { name_en: "Dunkirk", name_zh: "敦克爾克", type: "town", lng: 2.38, lat: 51.04 },
      { name_en: "London", name_zh: "倫敦", type: "city", lng: -0.12, lat: 51.51 },
      { name_en: "Normandy", name_zh: "諾曼第", type: "region", lng: -0.5, lat: 49.3 },
      { name_en: "Stalingrad", name_zh: "斯大林格勒", type: "city", lng: 44.52, lat: 48.71 },
      { name_en: "Kursk", name_zh: "庫爾斯克", type: "town", lng: 36.19, lat: 51.73 },
      { name_en: "Leningrad", name_zh: "列寧格勒", type: "city", lng: 30.32, lat: 59.93 },
      { name_en: "Moscow", name_zh: "莫斯科", type: "city", lng: 37.62, lat: 55.76 },
      { name_en: "Berlin", name_zh: "柏林", type: "city", lng: 13.40, lat: 52.52 },
      { name_en: "El Alamein", name_zh: "阿拉曼", type: "fort", lng: 28.95, lat: 30.83 },
      { name_en: "Yalta", name_zh: "雅爾達", type: "town", lng: 34.17, lat: 44.50 },
      { name_en: "Potsdam", name_zh: "波茨坦", type: "city", lng: 13.06, lat: 52.39 },
    ],
    lines: [],
  };

  const units = [
    { id: "ax_west", faction: AX, kind: "infantry", crest: "tank", cf: true, name_zh: "西線德軍", name_en: "Wehrmacht West",
      track: [{ d: 1, lng: 21.0, lat: 52.2, s: 150000, st: "attack" }, { d: 40, lng: 2.35, lat: 48.86, s: 140000, st: "hold" },
        { d: 200, lng: 44.52, lat: 48.71, s: 120000, st: "attack" }, { d: END_DAY, lng: 13.4, lat: 52.5, s: 50000, st: "dead" }] },
    { id: "al_brit", faction: AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "英軍遠征軍", name_en: "BEF",
      track: [{ d: 30, lng: 2.38, lat: 51.04, s: 400000, st: "retreat" }, { d: 80, lng: -0.12, lat: 51.51, s: 350000, st: "hold" },
        { d: 280, lng: -0.5, lat: 49.3, s: 200000, st: "landing" }, { d: END_DAY, lng: 13.4, lat: 52.5, s: 180000, st: "attack" }] },
    { id: "ax_east", faction: AX, kind: "infantry", crest: "eagle", cf: true, name_zh: "東線德軍", name_en: "Army Group South",
      track: [{ d: 100, lng: 37.6, lat: 55.8, s: 130000, st: "attack" }, { d: 200, lng: 44.52, lat: 48.71, s: 110000, st: "attack" },
        { d: 250, lng: 44.52, lat: 48.71, s: 30000, st: "dead" }] },
    { id: "al_soviet", faction: AL, kind: "infantry", crest: "hammer", cf: true, name_zh: "蘇聯紅軍", name_en: "Red Army",
      track: [{ d: 100, lng: 37.6, lat: 55.8, s: 200000, st: "retreat" }, { d: 200, lng: 44.52, lat: 48.71, s: 180000, st: "hold" },
        { d: 250, lng: 44.52, lat: 48.71, s: 150000, st: "attack" }, { d: END_DAY, lng: 13.4, lat: 52.5, s: 200000, st: "attack" }] },
    { id: "al_africa", faction: AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "北非英軍", name_en: "8th Army",
      track: [{ d: 160, lng: 28.95, lat: 30.83, s: 80000, st: "attack" }, { d: END_DAY, lng: 28.95, lat: 30.83, s: 70000, st: "hold" }] },
  ];

  const arrows = [
    { d: 1, f: AX, from: [19.0, 52.5], to: [21.0, 52.2], label: "閃擊波蘭", kind: "attack" },
    { d: 40, f: AX, from: [6.0, 50.5], to: [2.35, 48.86], label: "閃擊法國", kind: "attack" },
    { d: 30, f: AL, from: [3.0, 50.0], to: [2.38, 51.04], label: "敦克爾克撤退", kind: "retreat" },
    { d: 200, f: AX, from: [45.0, 49.0], to: [44.52, 48.71], label: "圍攻斯大林格勒", kind: "attack" },
    { d: 280, f: AL, from: [-2.0, 50.0], to: [-0.5, 49.3], label: "諾曼第登陸", kind: "landing" },
    { d: 360, f: AL, from: [30.0, 52.0], to: [13.4, 52.5], label: "攻入柏林", kind: "attack" },
  ];

  const fronts = [
    { d: 1, path: [[20.0, 52.5], [22.0, 51.5], [24.0, 50.5]] },
    { d: 80, path: [[1.0, 51.0], [2.5, 50.0], [4.0, 49.5], [6.0, 49.0]] },
    { d: 200, path: [[35.0, 52.0], [40.0, 50.0], [44.0, 49.0], [45.0, 48.8]] },
    { d: 300, path: [[-1.0, 50.0], [2.0, 49.5], [8.0, 49.0], [12.0, 48.5]] },
    { d: END_DAY, path: [[12.0, 52.5], [13.0, 52.4], [13.5, 52.5]] },
  ];

  const hotspots = [
    { a: 1, b: 20, lng: 21.01, lat: 52.23, kind: "firefight", i: 1.0 },
    { a: 35, b: 50, lng: 2.38, lat: 51.04, kind: "firefight", i: 0.9 },
    { a: 195, b: 255, lng: 44.52, lat: 48.71, kind: "firefight", i: 1.0 },
    { a: 275, b: 310, lng: -0.5, lat: 49.3, kind: "landing", i: 1.0 },
    { a: 350, b: 380, lng: 13.4, lat: 52.5, kind: "firefight", i: 1.0 },
  ];

  const weather = [
    { d: 1, night: 0.15, fog: 0.1, rain: 0.1, smoke: 0.2, zh: "1939 · 開戰", en: "1939 · outbreak" },
    { d: 200, night: 0.2, fog: 0.3, rain: 0.15, smoke: 0.8, zh: "斯大林格勒 · 廢墟", en: "Stalingrad ruins" },
    { d: END_DAY, night: 0.1, fog: 0.1, rain: 0.1, smoke: 0.3, zh: "1945 · 勝利", en: "1945 · victory" },
  ];

  const notes = {
    summary: "二戰歐洲戰場：德國閃擊波蘭、法國陷落、不列顛空戰、巴巴羅薩行動、斯大林格勒轉折、諾曼第登陸、柏林陷落。",
    caveats: ["蘇聯、美英同屬反軸心同盟，地圖上以「同盟國」色標示意。", "戰線為概括示意。"],
    sources: "DSE 課程、Britannica、ISW 風格示意。",
  };

  const storyboard = [
    { day: 1, hold: 9, cam: { lng: 21.01, lat: 52.23, dist: 700, az: 200, el: 46, orbit: 0.7 },
      dateLabel: "1939年9月1日", title_zh: "入侵波蘭", title_en: "Invasion of Poland",
      narration_zh: "德軍閃擊波蘭，二戰在歐洲爆發。",
      narration_en: "Germany blitzes Poland — WWII begins in Europe.",
      focus: ["ax_west"], side: "axis" },
    { day: 40, hold: 8, cam: { lng: 2.35, lat: 48.86, dist: 900, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1940年6月", title_zh: "法國陷落", title_en: "Fall of France",
      narration_zh: "巴黎淪陷，維希政府成立。",
      narration_en: "Paris falls; the Vichy regime is established.",
      focus: ["ax_west"], side: "axis" },
    { day: 30, hold: 8, cam: { lng: 2.38, lat: 51.04, dist: 650, az: 180, el: 42, orbit: 0.7 },
      dateLabel: "1940年5–6月", title_zh: "敦克爾克大撤退", title_en: "Evacuation of Dunkirk",
      narration_zh: "英軍從敦克爾克海灘撤離逾三十萬人。",
      narration_en: "Over 300,000 troops are evacuated from Dunkirk.",
      focus: ["al_brit"], side: "allies" },
    { day: 200, hold: 10, cam: { lng: 44.52, lat: 48.71, dist: 750, az: 220, el: 48, orbit: 0.7 },
      dateLabel: "1942–1943", title_zh: "斯大林格勒", title_en: "Battle of Stalingrad",
      narration_zh: "東線決戰，德軍第六集團軍覆滅，戰爭轉折。",
      narration_en: "The German 6th Army is destroyed — the turning point.",
      focus: ["ax_east", "al_soviet"], side: "both" },
    { day: 160, hold: 8, cam: { lng: 28.95, lat: 30.83, dist: 900, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1942年", title_zh: "阿拉曼戰役", title_en: "Second Battle of El Alamein",
      narration_zh: "蒙哥馬利在北非擊敗隆美爾。",
      narration_en: "Montgomery defeats Rommel in North Africa.",
      focus: ["al_africa"], side: "allies" },
    { day: 280, hold: 10, cam: { lng: -0.5, lat: 49.3, dist: 800, az: 180, el: 44, orbit: 0.7 },
      dateLabel: "1944年6月6日", title_zh: "諾曼第登陸", title_en: "D-Day · Normandy",
      narration_zh: "盟軍登陸法國，開闢第二戰場。",
      narration_en: "Allied forces land in France, opening the Second Front.",
      focus: ["al_brit"], side: "allies" },
    { day: 360, hold: 9, cam: { lng: 13.4, lat: 52.5, dist: 700, az: 0, el: 46, orbit: 0.6 },
      dateLabel: "1945年5月", title_zh: "柏林陷落", title_en: "Fall of Berlin",
      narration_zh: "蘇軍攻入柏林，德國無條件投降。",
      narration_en: "Soviet forces take Berlin; Germany surrenders.",
      focus: ["al_soviet"], side: "allies" },
    { day: 380, hold: 8, cam: { lng: 34.17, lat: 44.5, dist: 900, az: 200, el: 42, orbit: 0.5 },
      dateLabel: "1945年2月", title_zh: "雅爾達會議", title_en: "Yalta Conference",
      narration_zh: "美英蘇首腦商討戰後秩序。",
      narration_en: "Roosevelt, Churchill and Stalin plan the post-war order.",
      focus: ["al_soviet"], side: "allies" },
  ];

  const outro = {
    title_zh: "歐洲戰場結束", title_en: "War in Europe Ends",
    narration_zh: "二戰重塑國際秩序，聯合國成立，冷戰即將開始。",
    narration_en: "WWII reshapes the world — the UN is born and the Cold War looms.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
