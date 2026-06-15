/* Korean War */
window.BATTLE_DATA = (function () {
  const NK = "nk", UN = "un";
  const END_DAY = 280;

  const meta = {
    id: "korea",
    title_zh: "韓戰",
    title_en: "KOREAN WAR",
    subtitle: "1950–1953",
    factionOrder: [NK, UN],
    geo: { minLng: 124.5, maxLng: 130.5, minLat: 33.5, maxLat: 43.5, Z: 8 },
    startDate: [1950, 6, 25],
    introCam: { lng: 127.5, lat: 38.5, dist: 1800, az: 0, el: 50 },
    titleCard: {
      zh: "韓戰", en: "KOREAN WAR · 1950–1953",
      narr_zh: "冷戰首場熱戰：北韓南侵，聯合國軍介入，戰線在三八線反覆拉鋸。",
      narr_en: "The Cold War's first hot war — North Korea invades; UN forces intervene.",
    },
    outroCam: { lng: 127.0, lat: 38.0, dist: 2000, az: 0, el: 48, orbit: 0.6, tween: 3.6 },
    retreatFaction: UN,
  };

  const factions = {
    nk: { main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000, css: "#8b0000", label_zh: "北韓／中國志願軍", label_en: "North Korea / PVA", emblem: "circle", maxStrength: 200000, textLight: "#ffd9d2" },
    un: { main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847, css: "#1a3a6e", label_zh: "聯合國軍", label_en: "UN Forces", emblem: "shield", maxStrength: 220000, textLight: "#cfe0ff" },
  };

  const geography = {
    regions: [
      { name_en: "North Korea", name_zh: "北韓", type: "region", lng: 127.0, lat: 40.5 },
      { name_en: "South Korea", name_zh: "南韓", type: "region", lng: 127.5, lat: 36.5 },
    ],
    points: [
      { name_en: "38th Parallel", name_zh: "三八線", type: "fort", lng: 127.0, lat: 38.0 },
      { name_en: "Seoul", name_zh: "漢城（首爾）", type: "city", lng: 126.98, lat: 37.57 },
      { name_en: "Inchon", name_zh: "仁川", type: "town", lng: 126.62, lat: 37.46 },
      { name_en: "Pusan", name_zh: "釜山", type: "city", lng: 129.04, lat: 35.18 },
      { name_en: "Chosin Reservoir", name_zh: "長津湖", type: "town", lng: 127.15, lat: 40.45 },
      { name_en: "Pyongyang", name_zh: "平壤", type: "city", lng: 125.76, lat: 39.04 },
      { name_en: "Panmunjom", name_zh: "板門店", type: "fort", lng: 126.68, lat: 37.95 },
    ],
    lines: [
      { name_en: "38th Parallel", name_zh: "三八線", path: [[124.8, 38.0], [127.0, 38.0], [129.5, 38.0]] },
    ],
  };

  const units = [
    { id: "nk_army", faction: NK, kind: "infantry", crest: "hammer", cf: true, name_zh: "北韓人民軍", name_en: "KPA",
      track: [{ d: 1, lng: 125.76, lat: 39.04, s: 90000, st: "attack" }, { d: 30, lng: 126.98, lat: 37.57, s: 85000, st: "hold" },
        { d: 80, lng: 127.0, lat: 38.0, s: 70000, st: "retreat" }, { d: 150, lng: 127.15, lat: 40.45, s: 120000, st: "attack" },
        { d: END_DAY, lng: 127.0, lat: 38.0, s: 80000, st: "hold" }] },
    { id: "un_army", faction: UN, kind: "infantry", crest: "anchor", cf: true, name_zh: "聯合國軍", name_en: "UN Command",
      track: [{ d: 1, lng: 129.04, lat: 35.18, s: 50000, st: "retreat" }, { d: 60, lng: 126.62, lat: 37.46, s: 100000, st: "landing" },
        { d: 90, lng: 125.76, lat: 39.04, s: 110000, st: "attack" }, { d: 150, lng: 127.15, lat: 40.45, s: 80000, st: "retreat" },
        { d: END_DAY, lng: 126.68, lat: 37.95, s: 90000, st: "hold" }] },
  ];

  const arrows = [
    { d: 1, f: NK, from: [125.76, 39.04], to: [126.98, 37.57], label: "越三八線南侵", kind: "attack" },
    { d: 60, f: UN, from: [126.62, 37.46], to: [126.98, 37.57], label: "仁川登陸", kind: "landing" },
    { d: 90, f: UN, from: [126.98, 37.57], to: [125.76, 39.04], label: "北上平壤", kind: "attack" },
    { d: 150, f: NK, from: [127.15, 40.45], to: [127.0, 38.0], label: "長津湖反擊", kind: "attack" },
  ];

  const fronts = [
    { d: 1, path: [[126.5, 37.5], [127.0, 37.0], [127.5, 36.5]] },
    { d: 60, path: [[126.0, 38.5], [126.5, 38.0], [127.0, 37.5]] },
    { d: 120, path: [[125.5, 39.5], [126.5, 39.0], [127.5, 38.5]] },
    { d: 200, path: [[126.5, 38.2], [127.0, 38.0], [127.5, 37.8]] },
    { d: END_DAY, path: [[126.6, 38.0], [127.0, 38.0], [127.4, 38.0]] },
  ];

  const hotspots = [
    { a: 1, b: 40, lng: 126.98, lat: 37.57, kind: "firefight", i: 1.0 },
    { a: 55, b: 70, lng: 126.62, lat: 37.46, kind: "landing", i: 1.0 },
    { a: 140, b: 170, lng: 127.15, lat: 40.45, kind: "firefight", i: 1.0 },
  ];

  const weather = [
    { d: 1, night: 0.2, fog: 0.1, rain: 0.2, smoke: 0.2, zh: "1950 · 夏", en: "Summer 1950" },
    { d: 150, night: 0.3, fog: 0.2, rain: 0.0, smoke: 0.3, zh: "長津湖 · 嚴冬", en: "Chosin · deep winter" },
    { d: END_DAY, night: 0.1, fog: 0.1, rain: 0.1, smoke: 0.1, zh: "1953 · 停戰", en: "1953 armistice" },
  ];

  const notes = {
    summary: "韓戰（1950–1953）：北韓南侵、釜山防線、仁川登陸、中國志願軍介入、長津湖、三八線僵持、板門店停戰。",
    caveats: ["中國志願軍併入北韓陣營色標示意。", "兵力與戰線為教學概括。"],
    sources: "DSE 課程、Britannica、Korean War Project。",
  };

  const storyboard = [
    { day: 1, hold: 9, cam: { lng: 127.0, lat: 38.0, dist: 900, az: 180, el: 46, orbit: 0.7 },
      dateLabel: "1950年6月25日", title_zh: "北韓南侵", title_en: "North Korean Invasion",
      narration_zh: "北韓大軍越過三八線，漢城迅速陷落。",
      narration_en: "North Korean forces cross the 38th parallel; Seoul falls quickly.",
      focus: ["nk_army"], side: "nk" },
    { day: 20, hold: 8, cam: { lng: 129.04, lat: 35.18, dist: 700, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1950年夏", title_zh: "釜山防線", title_en: "Pusan Perimeter",
      narration_zh: "聯合國軍被壓縮至半島南端釜山橋頭堡。",
      narration_en: "UN forces are compressed into the Pusan perimeter.",
      focus: ["un_army"], side: "un" },
    { day: 60, hold: 10, cam: { lng: 126.62, lat: 37.46, dist: 550, az: 200, el: 48, orbit: 0.7 },
      dateLabel: "1950年9月15日", title_zh: "仁川登陸", title_en: "Inchon Landing",
      narration_zh: "麥克阿瑟策劃仁川兩棲登陸，切斷北韓補給線。",
      narration_en: "MacArthur's Inchon landing cuts North Korean supply lines.",
      focus: ["un_army"], side: "un" },
    { day: 90, hold: 8, cam: { lng: 125.76, lat: 39.04, dist: 800, az: 0, el: 44, orbit: 0.6 },
      dateLabel: "1950年10月", title_zh: "逼近鴨綠江", title_en: "Advance to the Yalu",
      narration_zh: "聯軍北上逼近中朝邊境，中國即將介入。",
      narration_en: "UN forces advance north toward the Chinese border.",
      focus: ["un_army"], side: "un" },
    { day: 150, hold: 10, cam: { lng: 127.15, lat: 40.45, dist: 700, az: 220, el: 48, orbit: 0.7 },
      dateLabel: "1950年11–12月", title_zh: "長津湖戰役", title_en: "Battle of Chosin Reservoir",
      narration_zh: "志願軍在嚴冬重創美軍陸戰一師，聯軍南撤。",
      narration_en: "PVA forces devastate US Marines at Chosin in brutal winter.",
      focus: ["nk_army", "un_army"], side: "both" },
    { day: END_DAY, hold: 9, cam: { lng: 126.68, lat: 37.95, dist: 650, az: 0, el: 44, orbit: 0.5 },
      dateLabel: "1953年7月27日", title_zh: "板門店停戰", title_en: "Armistice at Panmunjom",
      narration_zh: "三八線附近簽署停戰協定，半島分裂延續至今。",
      narration_en: "An armistice is signed — Korea remains divided.",
      focus: ["un_army", "nk_army"], side: "both" },
  ];

  const outro = {
    title_zh: "韓戰停戰", title_en: "The Korean Armistice",
    narration_zh: "冷戰格局下，韓半島成為對峙前線。",
    narration_en: "Korea becomes a Cold War frontier.",
    cam: meta.outroCam,
  };

  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
