/* GOSPEL IN EUROPE · 福音傳遍歐洲 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "gospel-eu",
      "title_zh": "福音傳遍歐洲",
      "title_en": "GOSPEL IN EUROPE",
      "subtitle": "教會史",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": 7.5,
          "maxLng": 42.5,
          "minLat": 35.5,
          "maxLat": 60.5,
          "Z": 5
      },
      "startDate": "教會史",
      "introCam": {
          "lng": 28,
          "lat": 45,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "福音傳遍歐洲",
          "en": "GOSPEL IN EUROPE · 教會史",
          "narr_zh": "福音從耶路撒冷傳至羅馬，再擴展至東歐與斯拉夫地區。",
          "narr_en": "The gospel spread from Jerusalem to Rome and into Eastern Europe."
      },
      "outroCam": {
          "lng": 28,
          "lat": 45,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../crusades/",
          "title_zh": "十字軍東征",
          "title_en": "CRUSADES"
      }
  };
  const factions = {
    "church": {
      main: 0x9b7ec8, glow: 0xc4a8e8, dim: 0x6b4c9a,
      css: "#9b7ec8", label_zh: "教會", label_en: "Church",
      emblem: "shield", maxStrength: 50000, textLight: "#f0e8ff"
    },
    "empire": {
      main: 0x8b6914, glow: 0xc9a227, dim: 0x5c4810,
      css: "#8b6914", label_zh: "帝國／異教", label_en: "Empire / Other",
      emblem: "circle", maxStrength: 120000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "羅馬",
              "name_en": "Rome",
              "type": "city",
              "lng": 12.5,
              "lat": 41.9
          },
          {
              "name_zh": "君士坦丁堡",
              "name_en": "Constantinople",
              "type": "city",
              "lng": 28.98,
              "lat": 41.01
          },
          {
              "name_zh": "基輔",
              "name_en": "Kiev",
              "type": "city",
              "lng": 30.52,
              "lat": 50.45
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "church",
          "faction": "church",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "教會擴展",
          "name_en": "Church expansion",
          "track": [
              {
                  "d": 1,
                  "lng": 12.5,
                  "lat": 41.9,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 28.98,
                  "lat": 41.01,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 30.52,
                  "lat": 50.45,
                  "s": 0,
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
          "zh": "福音傳遍歐洲",
          "en": "GOSPEL IN EUROPE"
      }
  ];
  const notes =   {
      "summary": "福音傳遍歐洲 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "使徒時代後，福音經羅馬大道與商路傳播；君士坦丁合法化後教會擴展；東羅馬與傳教士將信仰帶至斯拉夫與基輔羅斯。",
      "leaders": "初期教父、波利卡普、愛任紐；君士坦丁大帝；西里爾與美多德兄弟；弗拉基米爾大公。",
      "nationalPower": "教會承接大使命，在帝國與蠻族世界中見證基督；正教傳統在東歐扎根，與拉丁西教並行發展。",
      "impact": "福音塑造歐洲文明；俄羅斯正教成為該地區文化與信仰核心。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 12.5,
              "lat": 41.9,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1–3世紀",
          "title_zh": "羅馬帝國傳播",
          "title_en": "Gospel in the Empire",
          "narration_zh": "保羅及眾使徒在羅馬帝國各城建立教會；逼迫中信仰仍擴展。",
          "narration_en": "Apostles and missionaries planted churches across the Roman Empire despite persecution.",
          "focus": [
              "church"
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
              "lng": 12.5,
              "lat": 41.9,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "313年",
          "title_zh": "合法化",
          "title_en": "Legalization",
          "narration_zh": "君士坦丁頒《米蘭詔書》，基督教獲合法地位，公開傳播加速。",
          "narration_en": "The Edict of Milan legalized Christianity — public proclamation accelerated.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 28.98,
              "lat": 41.01,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "4世紀",
          "title_zh": "君士坦丁堡",
          "title_en": "Constantinople",
          "narration_zh": "君士坦丁堡成為東羅馬帝國與東方教會中心，神學與禮儀傳統發展。",
          "narration_en": "Constantinople became the center of Eastern Christianity and theology.",
          "focus": [
              "church"
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
              "lng": 24,
              "lat": 42.7,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "9世紀",
          "title_zh": "斯拉夫宣教",
          "title_en": "Mission to the Slavs",
          "narration_zh": "西里爾與美多德兄弟向斯拉夫民族傳福音，創制斯拉夫文字。",
          "narration_en": "Cyril and Methodius evangelized the Slavs and created the Slavic alphabet.",
          "focus": [
              "church"
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
              "lng": 30.52,
              "lat": 50.45,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "10世紀",
          "title_zh": "基輔羅斯歸主",
          "title_en": "Christianization of Rus",
          "narration_zh": "弗拉基米爾大公受洗，基輔羅斯正式皈依正教，福音深入東歐。",
          "narration_en": "Prince Vladimir's baptism brought Kievan Rus into Orthodox Christianity.",
          "focus": [
              "church"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "福音傳遍歐洲",
      "title_en": "GOSPEL IN EUROPE",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 28,
          "lat": 45,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
