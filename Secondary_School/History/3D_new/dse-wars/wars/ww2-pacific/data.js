/* WWII Pacific · 西太平洋與東南亞戰場（珍珠港、中途島見字幕說明） */
window.BATTLE_DATA = (function () {
  const JP = "jp", US = "us";
  const END_DAY = 300;

  const meta = {
    id: "ww2-pacific",
    title_zh: "第二次世界大戰（太平洋）",
    title_en: "WORLD WAR II · PACIFIC",
    subtitle: "1941–1945",
    factionOrder: [JP, US],
    geo: { minLng: 118.0, maxLng: 165.0, minLat: -12.0, maxLat: 38.0, Z: 6 },
    startDate: [1941, 12, 7],
    introCam: { lng: 135.0, lat: 22.0, dist: 3000, az: 0, el: 50 },
    titleCard: {
      zh: "太平洋戰爭", en: "THE PACIFIC WAR",
      narr_zh: "珍珠港（夏威夷）遇襲後，日本南進菲律賓與南洋；美軍跳島反攻直迫本土。",
      narr_en: "After Pearl Harbor, Japan advances on the Philippines and SE Asia; the US island-hops toward Japan.",
    },
    outroCam: { lng: 136.0, lat: 34.0, dist: 3200, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: JP,
  };

  const factions = {
    jp: { main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000, css: "#8b0000", label_zh: "日本", label_en: "Japan", emblem: "circle", maxStrength: 180000, textLight: "#ffd9d2" },
    us: { main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847, css: "#1a3a6e", label_zh: "美國", label_en: "United States", emblem: "shield", maxStrength: 220000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "Southwest Pacific", name_zh: "西南太平洋", type: "region", lng: 145.0, lat: -5.0 },
      { name_en: "Japan", name_zh: "日本列島", type: "region", lng: 137.0, lat: 34.0 },
    ],
    points: [
      { name_en: "Singapore", name_zh: "新加坡", type: "city", lng: 103.82, lat: 1.35 },
      { name_en: "Manila", name_zh: "馬尼拉", type: "city", lng: 120.98, lat: 14.60 },
      { name_en: "Guadalcanal", name_zh: "瓜達爾卡納爾", type: "island", lng: 160.15, lat: -9.55 },
      { name_en: "Iwo Jima", name_zh: "硫磺島", type: "island", lng: 141.32, lat: 24.78 },
      { name_en: "Okinawa", name_zh: "沖繩", type: "island", lng: 127.68, lat: 26.21 },
      { name_en: "Hiroshima", name_zh: "廣島", type: "city", lng: 132.46, lat: 34.39 },
      { name_en: "Nagasaki", name_zh: "長崎", type: "city", lng: 129.87, lat: 32.75 },
      { name_en: "Tokyo", name_zh: "東京", type: "city", lng: 139.69, lat: 35.69 },
      { name_en: "Pearl Harbor", name_zh: "珍珠港", type: "fort", lng: 121.0, lat: 14.0 },
      { name_en: "Midway", name_zh: "中途島", type: "island", lng: 162.0, lat: 5.0 },
    ],
    lines: [],
  };

  const units = [
    { id: "jp_navy", faction: JP, kind: "navy", crest: "anchor", cf: true, name_zh: "日本聯合艦隊", name_en: "Combined Fleet",
      track: [{ d: 1, lng: 139.69, lat: 35.69, s: 80000, st: "attack" }, { d: 30, lng: 120.98, lat: 14.60, s: 70000, st: "attack" },
        { d: 60, lng: 162.0, lat: 5.0, s: 50000, st: "dead" }, { d: END_DAY, lng: 139.69, lat: 35.69, s: 10000, st: "hold" }] },
    { id: "us_pacific", faction: US, kind: "navy", crest: "anchor", cf: true, name_zh: "美國太平洋艦隊", name_en: "US Pacific Fleet",
      track: [{ d: 1, lng: 121.0, lat: 14.0, s: 70000, st: "hold" }, { d: 60, lng: 162.0, lat: 5.0, s: 90000, st: "attack" },
        { d: 150, lng: 160.15, lat: -9.55, s: 80000, st: "attack" }, { d: END_DAY, lng: 127.68, lat: 26.21, s: 120000, st: "attack" }] },
    { id: "jp_island", faction: JP, kind: "infantry", crest: "wings", cf: true, name_zh: "日本守備隊", name_en: "Japanese Garrison",
      track: [{ d: 30, lng: 120.98, lat: 14.60, s: 40000, st: "hold" }, { d: 150, lng: 160.15, lat: -9.55, s: 30000, st: "hold" },
        { d: 220, lng: 127.68, lat: 26.21, s: 20000, st: "dead" }] },
    { id: "us_marines", faction: US, kind: "infantry", crest: "anchor", cf: true, name_zh: "美國海軍陸戰隊", name_en: "US Marines",
      track: [{ d: 150, lng: 160.15, lat: -9.55, s: 40000, st: "landing" }, { d: 200, lng: 141.32, lat: 24.78, s: 50000, st: "attack" },
        { d: 240, lng: 127.68, lat: 26.21, s: 60000, st: "attack" }] },
  ];

  const arrows = [
    { d: 1, f: JP, from: [139.69, 35.69], to: [121.0, 14.0], label: "偷襲珍珠港後南進", kind: "attack" },
    { d: 30, f: JP, from: [135.0, 30.0], to: [120.98, 14.60], label: "攻陷菲律賓", kind: "attack" },
    { d: 150, f: US, from: [163.0, -7.0], to: [160.15, -9.55], label: "瓜島登陸", kind: "landing" },
    { d: 270, f: US, from: [130.0, 33.0], to: [132.46, 34.39], label: "原子彈", kind: "attack" },
  ];

  const fronts = [
    { d: 30, path: [[140.0, 35.0], [130.0, 28.0], [125.0, 20.0], [122.0, 15.0]] },
    { d: 150, path: [[162.0, 5.0], [158.0, 0.0], [155.0, -5.0]] },
    { d: END_DAY, path: [[128.0, 27.0], [132.0, 30.0], [136.0, 34.0]] },
  ];

  const hotspots = [
    { a: 25, b: 40, lng: 120.98, lat: 14.60, kind: "firefight", i: 1.0 },
    { a: 145, b: 175, lng: 160.15, lat: -9.55, kind: "firefight", i: 0.9 },
    { a: 195, b: 210, lng: 141.32, lat: 24.78, kind: "firefight", i: 1.0 },
    { a: 265, b: 275, lng: 132.46, lat: 34.39, kind: "explosion", i: 1.0 },
  ];

  const weather = [
    { d: 1, night: 0.3, fog: 0.05, rain: 0.0, smoke: 0.4, zh: "開戰", en: "Outbreak" },
    { d: END_DAY, night: 0.1, fog: 0.1, rain: 0.1, smoke: 0.4, zh: "1945 · 終戰", en: "1945 · surrender" },
  ];

  const notes = {
    summary: "太平洋戰爭：珍珠港（夏威夷，地圖外）、中途島海戰、瓜島、硫磺島、沖繩、廣島長崎原子彈。本地圖覆蓋東南亞至日本列島。",
    caveats: ["珍珠港、中途島真實位置在日期變更線以西，本圖以菲律賓—所羅門—日本軸線呈現跳島戰。", "島嶼戰役為示意。"],
    sources: "DSE 課程、US Naval History、Britannica。",
  };

  const storyboard = [
    { day: 1, hold: 9, cam: { lng: 121.0, lat: 14.0, dist: 900, az: 200, el: 48, orbit: 0.7 },
      dateLabel: "1941年12月7日", title_zh: "偷襲珍珠港", title_en: "Attack on Pearl Harbor",
      narration_zh: "日軍偷襲夏威夷珍珠港（地圖外），美國對日宣戰；日軍同時南攻菲律賓。",
      narration_en: "Japan strikes Pearl Harbor (off this map); the US declares war as Japan pushes south.",
      focus: ["jp_navy", "us_pacific"], side: "both" },
    { day: 30, hold: 8, cam: { lng: 120.98, lat: 14.60, dist: 700, az: 180, el: 44, orbit: 0.6 },
      dateLabel: "1942年初", title_zh: "菲律賓陷落", title_en: "Fall of the Philippines",
      narration_zh: "馬尼拉淪陷，美菲守軍撤退至巴丹。",
      narration_en: "Manila falls; US-Filipino forces retreat to Bataan.",
      focus: ["jp_island"], side: "jp" },
    { day: 60, hold: 8, cam: { lng: 162.0, lat: 5.0, dist: 1000, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1942年6月", title_zh: "中途島海戰", title_en: "Battle of Midway",
      narration_zh: "太平洋中部海戰，美軍擊沉四艘日航母，戰爭轉折。",
      narration_en: "US sinks four Japanese carriers at Midway — the turning point.",
      focus: ["us_pacific"], side: "us" },
    { day: 150, hold: 8, cam: { lng: 160.15, lat: -9.55, dist: 750, az: 180, el: 42, orbit: 0.7 },
      dateLabel: "1942–1943", title_zh: "瓜達爾卡納爾", title_en: "Guadalcanal Campaign",
      narration_zh: "盟軍首次反攻，奪取所羅門群島戰略據點。",
      narration_en: "Allied counter-offensive begins in the Solomons.",
      focus: ["us_marines", "jp_island"], side: "both" },
    { day: 200, hold: 8, cam: { lng: 141.32, lat: 24.78, dist: 650, az: 200, el: 46, orbit: 0.6 },
      dateLabel: "1945年2月", title_zh: "硫磺島", title_en: "Battle of Iwo Jima",
      narration_zh: "慘烈島嶼戰，美軍傷亡沉重。",
      narration_en: "Bloody island fighting — heavy US casualties.",
      focus: ["us_marines"], side: "us" },
    { day: 270, hold: 9, cam: { lng: 132.46, lat: 34.39, dist: 700, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1945年8月6日", title_zh: "廣島原子彈", title_en: "Atomic Bomb · Hiroshima",
      narration_zh: "「小男孩」投下，加速戰爭結束，亦開啟核時代。",
      narration_en: "\"Little Boy\" is dropped — the nuclear age begins.",
      focus: ["us_pacific"], side: "us" },
    { day: END_DAY, hold: 8, cam: { lng: 139.69, lat: 35.69, dist: 1200, az: 0, el: 46, orbit: 0.5 },
      dateLabel: "1945年8月15日", title_zh: "日本投降", title_en: "Japanese Surrender",
      narration_zh: "天皇宣布無條件投降，太平洋戰爭結束。",
      narration_en: "Japan surrenders unconditionally.",
      focus: ["us_pacific"], side: "us" },
  ];

  const outro = {
    title_zh: "太平洋戰爭結束", title_en: "The Pacific War Ends",
    narration_zh: "二戰全面結束，亞太秩序重組。",
    narration_en: "WWII ends — the Asia-Pacific order is remade.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
