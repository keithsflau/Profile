/* DIVIDED KINGDOM · 國度分裂 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "split",
      "title_zh": "國度分裂",
      "title_en": "DIVIDED KINGDOM",
      "subtitle": "王上12",
      "factionOrder": [
          "north",
          "south"
      ],
      "geo": {
          "minLng": 33.2,
          "maxLng": 37.2,
          "minLat": 30,
          "maxLat": 34,
          "Z": 9
      },
      "startDate": "王上12",
      "introCam": {
          "lng": 35.2,
          "lat": 32,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "國度分裂",
          "en": "DIVIDED KINGDOM · 王上12",
          "narr_zh": "於是以色列人背叛大衛家；北方十支派立耶羅波安為王。",
          "narr_en": "Israel rebelled against the house of David; Jeroboam became king of the north."
      },
      "outroCam": {
          "lng": 35.2,
          "lat": 32,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../prophets/",
          "title_zh": "先知時序與地點",
          "title_en": "PROPHETS"
      }
  };
  const factions = {
    "north": {
      main: 0x4a7ab5, glow: 0x7aa8d8, dim: 0x2d4d73,
      css: "#4a7ab5", label_zh: "北國以色列", label_en: "Northern Israel",
      emblem: "circle", maxStrength: 60000, textLight: "#e0eef8"
    },
    "south": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "南國猶大", label_en: "Kingdom of Judah",
      emblem: "shield", maxStrength: 50000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.23,
              "lat": 31.78
          },
          {
              "name_zh": "示劍",
              "name_en": "Shechem",
              "type": "town",
              "lng": 35.28,
              "lat": 32.21
          },
          {
              "name_zh": "撒瑪利亞",
              "name_en": "Samaria",
              "type": "city",
              "lng": 35.19,
              "lat": 32.27
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "judah",
          "faction": "south",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "猶大國",
          "name_en": "Kingdom of Judah",
          "track": [
              {
                  "d": 1,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 40000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 35000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "israel_n",
          "faction": "north",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "以色列國",
          "name_en": "Kingdom of Israel",
          "track": [
              {
                  "d": 1,
                  "lng": 35.28,
                  "lat": 32.21,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 35.19,
                  "lat": 32.27,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "國度分裂",
          "en": "DIVIDED KINGDOM"
      }
  ];
  const notes =   {
      "summary": "國度分裂 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "羅波安拒納老臣忠告，加重百姓轕軛；北方十支派在示劍叛變，立耶羅波安為王；耶羅波安設但與伯特利金牛犢，陷北國於罪。",
      "leaders": "羅波安、耶羅波安、先知亞希雅；南國猶大仍守大衛家，北國以色列十九王朝更迭。",
      "nationalPower": "分裂反映人心悖逆與敬拜中心被扭曲；耶羅波安罪惡成為北國敗壞的標誌。",
      "impact": "南北分裂直至被擄；猶大線保存彌賽亞譜系。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.28,
              "lat": 32.21,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "示劍會議",
          "title_en": "Assembly at Shechem",
          "narration_zh": "以色列眾人請羅波安減輕父親所加的重軛。",
          "narration_en": "Israel asked Rehoboam to lighten the heavy yoke of Solomon.",
          "focus": [
              "judah",
              "israel_n"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "羅波安",
                  "en": "Rehoboam"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 35.28,
              "lat": 32.21,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "十支派叛變",
          "title_en": "Ten Tribes Rebel",
          "narration_zh": "羅波安聽少年人建議，宣告加重責打；北方說：我們與大衛有什麼分兒！",
          "narration_en": "Rehoboam refused wisely; the north cried: 'What share have we in David?'",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶羅波安",
                  "en": "Jeroboam"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "猶大留守",
          "title_en": "Judah Remains",
          "narration_zh": "只有猶大支派與便雅憫仍歸大衛家，羅波安作耶路撒冷王。",
          "narration_en": "Only Judah and Benjamin stayed with the house of David in Jerusalem.",
          "focus": [
              "judah"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.19,
              "lat": 32.27,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂後",
          "title_zh": "撒瑪利亞為都",
          "title_en": "Samaria as Capital",
          "narration_zh": "耶羅波安定都撒瑪利亞，北國以色列歷史由此展開。",
          "narration_en": "Jeroboam established Samaria — northern Israel's history unfolded.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 35.2,
              "lat": 32,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂後",
          "title_zh": "金牛犢之罪",
          "title_en": "Calves of Bethel",
          "narration_zh": "耶羅波安在但和伯特利設金牛犢，使百姓陷於偶像敬拜。",
          "narration_en": "Jeroboam set up golden calves at Dan and Bethel — idolatry gripped the north.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "國度分裂",
      "title_en": "DIVIDED KINGDOM",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.2,
          "lat": 32,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
