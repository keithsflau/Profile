/** Base map definitions for 14 Bible / church-history journey maps */
module.exports = function buildCatalog(ctx) {
  const { geoBox, cam, baseMap, COV, NAT, NORTH, SOUTH, CHURCH, EMPIRE } = ctx;

  return [
    {
      slug: "abraham",
      title_zh: "亞伯拉罕生平",
      title_en: "ABRAHAM",
      blurb: "蒙召、遷徙、應許之地",
      period: "約公元前2000年",
      places: "吾珥 · 哈蘭 · 迦南 · 埃及",
      data: baseMap("abraham", "亞伯拉罕生平", "ABRAHAM'S JOURNEY", "創12–25章", geoBox(40, 32, 18, 8, 6), COV, NAT, [35.5, 32], {
        narr_zh: "耶和華對亞伯蘭說：你要離開本地本族，往我所要指示你的地去。",
        narr_en: "The LORD said to Abram: Go from your country to the land I will show you.",
        points: [
          { name_zh: "吾珥", name_en: "Ur", type: "city", lng: 46.1, lat: 30.96 },
          { name_zh: "哈蘭", name_en: "Haran", type: "city", lng: 39.02, lat: 36.86 },
          { name_zh: "示劍", name_en: "Shechem", type: "town", lng: 35.28, lat: 32.21 },
          { name_zh: "希伯崙", name_en: "Hebron", type: "town", lng: 35.1, lat: 31.53 },
          { name_zh: "摩利亞", name_en: "Moriah", type: "peak", lng: 35.23, lat: 31.78 },
        ],
        units: [
          { id: "abram", faction: "covenant", kind: "command", crest: "shield", cf: true, name_zh: "亞伯蘭一家", name_en: "Abram's household", track: [{ d: 1, lng: 46.1, lat: 30.96, s: 0, st: "hold" }, { d: 30, lng: 39.02, lat: 36.86, s: 0, st: "hold" }, { d: 60, lng: 35.28, lat: 32.21, s: 0, st: "hold" }, { d: 100, lng: 35.1, lat: 31.53, s: 0, st: "hold" }] },
        ],
        arrows: [
          { d: 20, f: "covenant", from: [46.1, 30.96], to: [39.02, 36.86], label: "離開吾珥", kind: "retreat" },
          { d: 50, f: "covenant", from: [39.02, 36.86], to: [35.28, 32.21], label: "進入迦南", kind: "attack" },
        ],
        hotspots: [{ a: 1, b: 100, lng: 35.2, lat: 32, kind: "firefight", i: 0.3 }],
      }),
    },
    {
      slug: "exodus-canaan",
      title_zh: "出埃及與進迦南",
      title_en: "EXODUS & CONQUEST",
      blurb: "出埃及、曠野、約書亞征戰",
      period: "約公元前1446–1400年",
      places: "蘭塞 · 紅海 · 西奈 · 加低斯 · 耶利哥",
      data: baseMap("exodus", "出埃及與進迦南", "EXODUS & CONQUEST", "出–申–書", geoBox(34, 29, 12, 10, 8), COV, NAT, [34.5, 28.5], {
        narr_zh: "我必救你脫離埃及人的苦難，領你進入美好寬闊流奶與蜜之地。",
        narr_en: "I will bring you up out of Egypt to a land flowing with milk and honey.",
        points: [
          { name_zh: "蘭塞", name_en: "Rameses", type: "city", lng: 31.87, lat: 30.8 },
          { name_zh: "紅海", name_en: "Red Sea", type: "bay", lng: 33.0, lat: 28.5 },
          { name_zh: "西奈山", name_en: "Mount Sinai", type: "peak", lng: 33.97, lat: 28.54 },
          { name_zh: "加低斯", name_en: "Kadesh", type: "town", lng: 34.45, lat: 30.6 },
          { name_zh: "耶利哥", name_en: "Jericho", type: "fort", lng: 35.46, lat: 31.87 },
        ],
        units: [
          { id: "israel_ex", faction: "covenant", kind: "infantry", crest: "shield", cf: true, name_zh: "以色列人", name_en: "Israelites", track: [{ d: 1, lng: 31.87, lat: 30.8, s: 600000, st: "retreat" }, { d: 25, lng: 33.0, lat: 28.5, s: 600000, st: "hold" }, { d: 50, lng: 33.97, lat: 28.54, s: 600000, st: "hold" }, { d: 80, lng: 34.45, lat: 30.6, s: 500000, st: "hold" }, { d: 100, lng: 35.46, lat: 31.87, s: 400000, st: "attack" }] },
          { id: "egypt_ex", faction: "nations", kind: "infantry", crest: "circle", cf: true, name_zh: "埃及軍", name_en: "Egyptian army", track: [{ d: 20, lng: 32.5, lat: 29.5, s: 80000, st: "attack" }, { d: 30, lng: 33.0, lat: 28.5, s: 0, st: "dead" }] },
        ],
        arrows: [
          { d: 15, f: "covenant", from: [31.87, 30.8], to: [33.0, 28.5], label: "出埃及", kind: "retreat" },
          { d: 90, f: "covenant", from: [34.45, 30.6], to: [35.46, 31.87], label: "過約旦", kind: "attack" },
        ],
        hotspots: [{ a: 20, b: 35, lng: 33.0, lat: 28.5, kind: "landing", i: 0.8 }, { a: 85, b: 100, lng: 35.46, lat: 31.87, kind: "firefight", i: 0.9 }],
      }),
    },
    {
      slug: "judges",
      title_zh: "士師時代",
      title_en: "JUDGES",
      blurb: "循環犯罪、壓制、興起士師",
      period: "約公元前1400–1050年",
      places: "迦南全地 · 米吉多 · 基列",
      data: baseMap("judges", "士師時代", "ERA OF JUDGES", "士師記", geoBox(35.2, 32.2, 4, 3, 9), COV, NAT, [35.2, 32.2], {
        narr_zh: "以色列人又行耶和華眼中看為惡的事，耶和華就把他們交在仇敵手中。",
        narr_en: "Israel did evil again; the LORD gave them into the hand of their enemies.",
        points: [
          { name_zh: "米吉多", name_en: "Megiddo", type: "fort", lng: 35.18, lat: 32.58 },
          { name_zh: "基列", name_en: "Gilead", type: "region", lng: 35.7, lat: 32.4 },
          { name_zh: "以法蓮山", name_en: "Ephraim", type: "region", lng: 35.2, lat: 32.2 },
        ],
        units: [
          { id: "judges_is", faction: "covenant", kind: "infantry", crest: "shield", cf: true, name_zh: "以色列支派", name_en: "Tribes of Israel", track: [{ d: 1, lng: 35.2, lat: 32.2, s: 40000, st: "hold" }, { d: 50, lng: 35.18, lat: 32.58, s: 60000, st: "attack" }, { d: 100, lng: 35.2, lat: 32.2, s: 50000, st: "hold" }] },
          { id: "judges_en", faction: "nations", kind: "infantry", crest: "circle", cf: true, name_zh: "米甸／非利士", name_en: "Midian / Philistines", track: [{ d: 1, lng: 35.5, lat: 31.8, s: 50000, st: "attack" }, { d: 60, lng: 35.3, lat: 32.0, s: 30000, st: "retreat" }] },
        ],
        hotspots: [{ a: 30, b: 80, lng: 35.2, lat: 32.3, kind: "firefight", i: 0.7 }],
      }),
    },
    {
      slug: "david",
      title_zh: "大衛時期",
      title_en: "KING DAVID",
      blurb: "牧童、掃羅、統一、建都",
      period: "約公元前1010–970年",
      places: "伯利恆 · 以拉谷 · 耶路撒冷",
      data: baseMap("david", "大衛時期", "KING DAVID", "撒上–撒下", geoBox(35.2, 31.7, 3, 2.5, 10), COV, NAT, [35.23, 31.78], {
        narr_zh: "大衛作以色列眾人的王，又作猶大人的王七年零六個月。",
        narr_en: "David reigned over all Israel and Judah.",
        points: [
          { name_zh: "伯利恆", name_en: "Bethlehem", type: "town", lng: 35.2, lat: 31.7 },
          { name_zh: "以拉谷", name_en: "Valley of Elah", type: "town", lng: 34.98, lat: 31.7 },
          { name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", lng: 35.23, lat: 31.78 },
        ],
        units: [
          { id: "david_army", faction: "covenant", kind: "infantry", crest: "shield", cf: true, name_zh: "大衛軍隊", name_en: "David's forces", track: [{ d: 1, lng: 35.2, lat: 31.7, s: 1000, st: "hold" }, { d: 40, lng: 34.98, lat: 31.7, s: 3000, st: "attack" }, { d: 80, lng: 35.23, lat: 31.78, s: 50000, st: "hold" }] },
          { id: "philistines", faction: "nations", kind: "infantry", crest: "circle", cf: true, name_zh: "非利士人", name_en: "Philistines", track: [{ d: 35, lng: 34.95, lat: 31.72, s: 20000, st: "attack" }, { d: 50, lng: 34.9, lat: 31.65, s: 5000, st: "retreat" }] },
        ],
        hotspots: [{ a: 35, b: 55, lng: 34.98, lat: 31.7, kind: "firefight", i: 0.8 }],
      }),
    },
    {
      slug: "solomon",
      title_zh: "所羅門時期",
      title_en: "KING SOLOMON",
      blurb: "智慧、聖殿、繁榮與衰落",
      period: "約公元前970–931年",
      places: "耶路撒冷 · 聖殿山",
      data: baseMap("solomon", "所羅門時期", "KING SOLOMON", "王上1–11", geoBox(35.23, 31.78, 2.5, 2, 11), COV, NAT, [35.23, 31.78], {
        narr_zh: "所羅門在耶路撒冷作以色列眾人的王；他作王四十年。",
        narr_en: "Solomon reigned in Jerusalem over all Israel forty years.",
        points: [
          { name_zh: "聖殿山", name_en: "Temple Mount", type: "fort", lng: 35.235, lat: 31.778 },
          { name_zh: "推羅", name_en: "Tyre", type: "city", lng: 35.2, lat: 33.27 },
        ],
        units: [
          { id: "solomon", faction: "covenant", kind: "command", crest: "shield", cf: true, name_zh: "所羅門王國", name_en: "Solomon's kingdom", track: [{ d: 1, lng: 35.23, lat: 31.78, s: 80000, st: "hold" }, { d: 100, lng: 35.23, lat: 31.78, s: 90000, st: "hold" }] },
        ],
      }),
    },
    {
      slug: "kingdom-split",
      title_zh: "國度分裂",
      title_en: "KINGDOM DIVIDED",
      blurb: "南北分裂、羅波安與耶羅波安",
      period: "公元前931年",
      places: "耶路撒冷 · 示劍 · 撒瑪利亞",
      data: baseMap("split", "國度分裂", "DIVIDED KINGDOM", "王上12", geoBox(35.2, 32, 4, 4, 9), null, null, [35.2, 32], {
        factions: { north: NORTH, south: SOUTH },
        factionOrder: ["north", "south"],
        narr_zh: "於是以色列人背叛大衛家；北方十支派立耶羅波安為王。",
        narr_en: "Israel rebelled against the house of David; Jeroboam became king of the north.",
        points: [
          { name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", lng: 35.23, lat: 31.78 },
          { name_zh: "示劍", name_en: "Shechem", type: "town", lng: 35.28, lat: 32.21 },
          { name_zh: "撒瑪利亞", name_en: "Samaria", type: "city", lng: 35.19, lat: 32.27 },
        ],
        units: [
          { id: "judah", faction: "south", kind: "infantry", crest: "shield", cf: true, name_zh: "猶大國", name_en: "Kingdom of Judah", track: [{ d: 1, lng: 35.23, lat: 31.78, s: 40000, st: "hold" }, { d: 100, lng: 35.23, lat: 31.78, s: 35000, st: "hold" }] },
          { id: "israel_n", faction: "north", kind: "infantry", crest: "circle", cf: true, name_zh: "以色列國", name_en: "Kingdom of Israel", track: [{ d: 1, lng: 35.28, lat: 32.21, s: 50000, st: "hold" }, { d: 50, lng: 35.19, lat: 32.27, s: 55000, st: "hold" }] },
        ],
      }),
    },
    {
      slug: "prophets",
      title_zh: "先知時序與地點",
      title_en: "PROPHETS",
      blurb: "以賽亞至瑪拉基的先知路線",
      period: "公元前8–5世紀",
      places: "耶路撒冷 · 撒瑪利亞 · 巴比倫",
      data: baseMap("prophets", "先知時序", "PROPHETS TIMELINE", "先知書", geoBox(38, 32, 14, 8, 7), COV, NAT, [35.2, 32.2], {
        narr_zh: "耶和華的話臨到先知，在猶大與以色列宣告審判與安慰。",
        narr_en: "The word of the LORD came to the prophets in Judah and Israel.",
        points: [
          { name_zh: "撒瑪利亞", name_en: "Samaria", type: "city", lng: 35.19, lat: 32.27 },
          { name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", lng: 35.23, lat: 31.78 },
          { name_zh: "巴比倫", name_en: "Babylon", type: "city", lng: 44.42, lat: 32.54 },
          { name_zh: "尼尼微", name_en: "Nineveh", type: "city", lng: 43.15, lat: 36.35 },
        ],
        units: [
          { id: "prophets", faction: "covenant", kind: "command", crest: "shield", cf: false, name_zh: "先知", name_en: "Prophets", track: [{ d: 1, lng: 35.19, lat: 32.27, s: 0, st: "hold" }, { d: 50, lng: 35.23, lat: 31.78, s: 0, st: "hold" }, { d: 100, lng: 44.42, lat: 32.54, s: 0, st: "hold" }] },
        ],
      }),
    },
    {
      slug: "israel-fall",
      title_zh: "以色列亡國",
      title_en: "FALL OF ISRAEL",
      blurb: "撒瑪利亞陷落，被擄亞述",
      period: "公元前722年",
      places: "撒瑪利亞",
      data: baseMap("israel-fall", "以色列亡國", "FALL OF ISRAEL", "722 BC", geoBox(35.19, 32.27, 3, 2.5, 10), COV, NAT, [35.19, 32.27], {
        narr_zh: "亞述王攻陷撒瑪利亞，將以色列人擄去亞述。",
        narr_en: "The king of Assyria captured Samaria and deported Israel.",
        points: [{ name_zh: "撒瑪利亞", name_en: "Samaria", type: "fort", lng: 35.19, lat: 32.27 }],
        units: [
          { id: "samaria", faction: "covenant", kind: "infantry", crest: "shield", cf: true, name_zh: "撒瑪利亞", name_en: "Samaria", track: [{ d: 1, lng: 35.19, lat: 32.27, s: 30000, st: "hold" }, { d: 80, lng: 35.19, lat: 32.27, s: 5000, st: "dead" }] },
          { id: "assyria", faction: "nations", kind: "infantry", crest: "circle", cf: true, name_zh: "亞述軍", name_en: "Assyrian army", track: [{ d: 1, lng: 35.5, lat: 33, s: 80000, st: "attack" }, { d: 100, lng: 35.19, lat: 32.27, s: 70000, st: "hold" }] },
        ],
        hotspots: [{ a: 40, b: 100, lng: 35.19, lat: 32.27, kind: "firefight", i: 1 }],
      }),
    },
    {
      slug: "judah-fall",
      title_zh: "猶大國亡國",
      title_en: "FALL OF JUDAH",
      blurb: "耶路撒冷陷落，被擄巴比倫",
      period: "公元前586年",
      places: "耶路撒冷",
      data: baseMap("judah-fall", "猶大亡國", "FALL OF JUDAH", "586 BC", geoBox(35.23, 31.78, 3, 2.5, 11), COV, NAT, [35.23, 31.78], {
        narr_zh: "巴比倫王尼布甲尼撒攻破耶路撒冷，焚燒聖殿。",
        narr_en: "Nebuchadnezzar destroyed Jerusalem and burned the temple.",
        points: [{ name_zh: "耶路撒冷", name_en: "Jerusalem", type: "fort", lng: 35.23, lat: 31.78 }],
        units: [
          { id: "jerusalem", faction: "covenant", kind: "infantry", crest: "shield", cf: true, name_zh: "耶路撒冷", name_en: "Jerusalem", track: [{ d: 1, lng: 35.23, lat: 31.78, s: 25000, st: "hold" }, { d: 90, lng: 35.23, lat: 31.78, s: 0, st: "dead" }] },
          { id: "babylon", faction: "nations", kind: "infantry", crest: "circle", cf: true, name_zh: "巴比倫軍", name_en: "Babylonian army", track: [{ d: 1, lng: 35.5, lat: 32, s: 100000, st: "attack" }, { d: 100, lng: 35.23, lat: 31.78, s: 80000, st: "hold" }] },
        ],
        hotspots: [{ a: 50, b: 100, lng: 35.23, lat: 31.78, kind: "artillery", i: 0.9 }],
      }),
    },
    {
      slug: "jesus",
      title_zh: "耶穌生平",
      title_en: "LIFE OF JESUS",
      blurb: "降生、事工、受難、復活",
      period: "公元1世紀",
      places: "伯利恆 · 加利利 · 耶路撒冷",
      data: baseMap("jesus", "耶穌生平", "LIFE OF JESUS", "四福音", geoBox(35.2, 32, 4, 3, 10), COV, NAT, [35.23, 31.78], {
        narr_zh: "道成了肉身，住在我們中間，充充滿滿地有恩典有真理。",
        narr_en: "The Word became flesh and dwelt among us.",
        points: [
          { name_zh: "伯利恆", name_en: "Bethlehem", type: "town", lng: 35.2, lat: 31.7 },
          { name_zh: "拿撒勒", name_en: "Nazareth", type: "town", lng: 35.3, lat: 32.7 },
          { name_zh: "迦百農", name_en: "Capernaum", type: "town", lng: 35.58, lat: 32.88 },
          { name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", lng: 35.23, lat: 31.78 },
        ],
        units: [
          { id: "jesus", faction: "covenant", kind: "command", crest: "shield", cf: true, name_zh: "耶穌與門徒", name_en: "Jesus & disciples", track: [{ d: 1, lng: 35.2, lat: 31.7, s: 0, st: "hold" }, { d: 30, lng: 35.58, lat: 32.88, s: 0, st: "hold" }, { d: 80, lng: 35.23, lat: 31.78, s: 0, st: "hold" }] },
        ],
      }),
    },
    {
      slug: "paul",
      title_zh: "保羅傳福音",
      title_en: "PAUL'S JOURNEYS",
      blurb: "三次宣教旅程與羅馬",
      period: "公元46–67年",
      places: "安提阿 · 小亞細亞 · 希臘 · 羅馬",
      data: baseMap("paul", "保羅傳福音", "PAUL'S JOURNEYS", "使徒行傳", geoBox(25, 38, 30, 20, 6), COV, NAT, [36.2, 36.2], {
        narr_zh: "保羅行程滿了耶穌的見證，在外邦建立教會。",
        narr_en: "Paul bore witness to Jesus and planted churches among the nations.",
        points: [
          { name_zh: "安提阿", name_en: "Antioch", type: "city", lng: 36.2, lat: 36.2 },
          { name_zh: "以弗所", name_en: "Ephesus", type: "city", lng: 27.34, lat: 37.94 },
          { name_zh: "哥林多", name_en: "Corinth", type: "city", lng: 22.93, lat: 37.94 },
          { name_zh: "羅馬", name_en: "Rome", type: "city", lng: 12.5, lat: 41.9 },
        ],
        units: [
          { id: "paul", faction: "covenant", kind: "command", crest: "shield", cf: true, name_zh: "保羅一行", name_en: "Paul's party", track: [{ d: 1, lng: 36.2, lat: 36.2, s: 0, st: "hold" }, { d: 35, lng: 27.34, lat: 37.94, s: 0, st: "hold" }, { d: 65, lng: 22.93, lat: 37.94, s: 0, st: "hold" }, { d: 100, lng: 12.5, lat: 41.9, s: 0, st: "hold" }] },
        ],
        arrows: [
          { d: 10, f: "covenant", from: [36.2, 36.2], to: [27.34, 37.94], label: "第一次宣教", kind: "attack" },
          { d: 70, f: "covenant", from: [22.93, 37.94], to: [12.5, 41.9], label: "赴羅馬", kind: "attack" },
        ],
      }),
    },
    {
      slug: "gospel-europe",
      title_zh: "福音傳遍歐洲",
      title_en: "GOSPEL TO EUROPE",
      blurb: "早期教會擴展至東歐",
      period: "1–10世紀",
      places: "羅馬 · 君士坦丁堡 · 基輔",
      data: baseMap("gospel-eu", "福音傳遍歐洲", "GOSPEL IN EUROPE", "教會史", geoBox(25, 48, 35, 25, 5), null, null, [28, 45], {
        factions: { church: CHURCH, empire: EMPIRE },
        factionOrder: ["church", "empire"],
        narr_zh: "福音從耶路撒冷傳至羅馬，再擴展至東歐與斯拉夫地區。",
        narr_en: "The gospel spread from Jerusalem to Rome and into Eastern Europe.",
        points: [
          { name_zh: "羅馬", name_en: "Rome", type: "city", lng: 12.5, lat: 41.9 },
          { name_zh: "君士坦丁堡", name_en: "Constantinople", type: "city", lng: 28.98, lat: 41.01 },
          { name_zh: "基輔", name_en: "Kiev", type: "city", lng: 30.52, lat: 50.45 },
        ],
        units: [
          { id: "church", faction: "church", kind: "command", crest: "shield", cf: true, name_zh: "教會擴展", name_en: "Church expansion", track: [{ d: 1, lng: 12.5, lat: 41.9, s: 0, st: "hold" }, { d: 50, lng: 28.98, lat: 41.01, s: 0, st: "hold" }, { d: 100, lng: 30.52, lat: 50.45, s: 0, st: "hold" }] },
        ],
      }),
    },
    {
      slug: "crusades",
      title_zh: "十字軍東征",
      title_en: "CRUSADES",
      blurb: "1095–1291年聖地遠征",
      period: "1095–1291",
      places: "耶路撒冷 · 安條克 · 阿卡",
      data: baseMap("crusades", "十字軍東征", "THE CRUSADES", "1095–1291", geoBox(30, 35, 25, 15, 6), null, null, [35.23, 31.78], {
        factions: { church: CHURCH, empire: EMPIRE },
        factionOrder: ["church", "empire"],
        narr_zh: "教皇烏爾班二世號召收復聖地；十字軍多次遠征耶路撒冷。",
        narr_en: "Pope Urban II called for the recovery of the Holy Land.",
        points: [
          { name_zh: "耶路撒冷", name_en: "Jerusalem", type: "city", lng: 35.23, lat: 31.78 },
          { name_zh: "安條克", name_en: "Antioch", type: "city", lng: 36.2, lat: 36.2 },
          { name_zh: "阿卡", name_en: "Acre", type: "fort", lng: 35.08, lat: 32.93 },
        ],
        units: [
          { id: "crusaders", faction: "church", kind: "infantry", crest: "shield", cf: true, name_zh: "十字軍", name_en: "Crusaders", track: [{ d: 1, lng: 12, lat: 43, s: 50000, st: "attack" }, { d: 60, lng: 35.23, lat: 31.78, s: 40000, st: "hold" }] },
          { id: "ayyubids", faction: "empire", kind: "infantry", crest: "circle", cf: true, name_zh: "穆斯林聯軍", name_en: "Muslim forces", track: [{ d: 1, lng: 35.5, lat: 32, s: 60000, st: "hold" }, { d: 80, lng: 35.23, lat: 31.78, s: 55000, st: "attack" }] },
        ],
        hotspots: [{ a: 40, b: 90, lng: 35.2, lat: 31.8, kind: "firefight", i: 0.8 }],
      }),
    },
    {
      slug: "church-schism",
      title_zh: "教會分裂史",
      title_en: "GREAT SCHISM",
      blurb: "1054東西教會分裂",
      period: "1054年起",
      places: "羅馬 · 君士坦丁堡",
      data: baseMap("schism", "教會分裂", "CHURCH SCHISM", "1054 AD", geoBox(20, 45, 25, 20, 5), null, null, [20, 42], {
        factions: { church: CHURCH, empire: EMPIRE },
        factionOrder: ["church", "empire"],
        narr_zh: "1054年羅馬與君士坦丁堡互相開除教籍，東西教會正式分裂。",
        narr_en: "In 1054 Rome and Constantinople excommunicated each other.",
        points: [
          { name_zh: "羅馬", name_en: "Rome", type: "city", lng: 12.5, lat: 41.9 },
          { name_zh: "君士坦丁堡", name_en: "Constantinople", type: "city", lng: 28.98, lat: 41.01 },
        ],
        units: [
          { id: "rome_ch", faction: "church", kind: "command", crest: "shield", cf: true, name_zh: "羅馬教會", name_en: "Roman Church", track: [{ d: 1, lng: 12.5, lat: 41.9, s: 0, st: "hold" }, { d: 100, lng: 12.5, lat: 41.9, s: 0, st: "hold" }] },
          { id: "constantinople", faction: "empire", kind: "command", crest: "circle", cf: true, name_zh: "君士坦丁堡教會", name_en: "Constantinople Church", track: [{ d: 1, lng: 28.98, lat: 41.01, s: 0, st: "hold" }, { d: 100, lng: 28.98, lat: 41.01, s: 0, st: "hold" }] },
        ],
      }),
    },
  ];
};
