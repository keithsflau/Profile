/* ERA OF JUDGES · 士師時代 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "judges",
      "title_zh": "士師時代",
      "title_en": "ERA OF JUDGES",
      "subtitle": "士師記",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.2,
          "maxLng": 37.2,
          "minLat": 30.7,
          "maxLat": 33.7,
          "Z": 9
      },
      "startDate": "士師記",
      "introCam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "士師時代",
          "en": "ERA OF JUDGES · 士師記",
          "narr_zh": "以色列人又行耶和華眼中看為惡的事，耶和華就把他們交在仇敵手中。",
          "narr_en": "Israel did evil again; the LORD gave them into the hand of their enemies."
      },
      "outroCam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../david/",
          "title_zh": "大衛時期",
          "title_en": "KING DAVID"
      }
  };
  const factions = {
    "covenant": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "選民／教會", label_en: "Covenant People",
      emblem: "shield", maxStrength: 80000, textLight: "#fff8e0"
    },
    "nations": {
      main: 0x5c4a72, glow: 0x8b7aa8, dim: 0x3a2f48,
      css: "#5c4a72", label_zh: "列國／仇敵", label_en: "Nations",
      emblem: "circle", maxStrength: 100000, textLight: "#e8e0f0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "米吉多",
              "name_en": "Megiddo",
              "type": "fort",
              "lng": 35.18,
              "lat": 32.58
          },
          {
              "name_zh": "基列",
              "name_en": "Gilead",
              "type": "region",
              "lng": 35.7,
              "lat": 32.4
          },
          {
              "name_zh": "以法蓮山",
              "name_en": "Ephraim",
              "type": "region",
              "lng": 35.2,
              "lat": 32.2
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "judges_is",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "以色列支派",
          "name_en": "Tribes of Israel",
          "track": [
              {
                  "d": 1,
                  "lng": 35.2,
                  "lat": 32.2,
                  "s": 40000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 35.18,
                  "lat": 32.58,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.2,
                  "lat": 32.2,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "judges_en",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "米甸／非利士",
          "name_en": "Midian / Philistines",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 31.8,
                  "s": 50000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 35.3,
                  "lat": 32,
                  "s": 30000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 80,
          "lng": 35.2,
          "lat": 32.3,
          "kind": "firefight",
          "i": 0.7
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "士師時代",
          "en": "ERA OF JUDGES"
      }
  ];
  const notes =   {
      "summary": "士師時代 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "士師時代呈現「犯罪—受壓—呼求—興起士師—太平—再犯罪」的循環；主要戰役包括底波拉抗西西拉、基甸擊米甸、參孫對非利士等。",
      "leaders": "俄陀聶、以笏、底波拉、基甸、參孫、撒母耳等士師；敵軍包括米甸人、摩押人、迦南王、非利士人。",
      "nationalPower": "士師顯明人心偏離與神恩典的介入；「各人任意而行」反映沒有王時的混亂，預示需要合神心意的君王。",
      "impact": "為大衛王朝與王國興起鋪路；新約將士師時期視為救恩歷史中管教與等候的階段。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.2,
              "lat": 32.2,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1400–1050年",
          "title_zh": "循環開始",
          "title_en": "Cycle of Apostasy",
          "narration_zh": "以色列人行耶和華眼中看為惡的事，耶和華就把他們交在仇敵手中。",
          "narration_en": "Israel did evil and the LORD gave them into enemy hands.",
          "focus": [
              "judges_is",
              "judges_en"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 35.18,
              "lat": 32.58,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1200年",
          "title_zh": "底波拉與巴拉",
          "title_en": "Deborah and Barak",
          "narration_zh": "底波拉召巴拉在他納河邊攻擊西西拉，耶和華使敵軍潰敗。",
          "narration_en": "Deborah and Barak defeated Sisera at the Kishon — the LORD routed the enemy.",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "底波拉",
                  "en": "Deborah"
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
              "lng": 35.5,
              "lat": 32,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1160年",
          "title_zh": "基甸擊米甸",
          "title_en": "Gideon vs Midian",
          "narration_zh": "基甸率三百人吹角擊破米甸大軍，「耶和華為你們爭戰」。",
          "narration_en": "Gideon's three hundred routed Midian — 'The LORD fought for you.'",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "基甸",
                  "en": "Gideon"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35,
              "lat": 31.8,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "士師末期",
          "title_zh": "參孫與非利士",
          "title_en": "Samson and Philistia",
          "narration_zh": "參孫作以色列士師，與非利士人周旋；最終在神裡同歸於盡。",
          "narration_en": "Samson judged Israel and clashed with the Philistines until his final act of faith.",
          "focus": [
              "judges_en"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "參孫",
                  "en": "Samson"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 35.2,
              "lat": 32.2,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1050年",
          "title_zh": "求立王",
          "title_en": "Demand for a King",
          "narration_zh": "士師時代末期，百姓求撒母耳立王，預示掃羅與大衛時代來臨。",
          "narration_en": "At the end of the judges era Israel demanded a king — the monarchy was near.",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "士師時代",
      "title_en": "ERA OF JUDGES",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
