/* CHURCH SCHISM · 教會分裂 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "schism",
      "title_zh": "教會分裂",
      "title_en": "CHURCH SCHISM",
      "subtitle": "1054 AD",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": 7.5,
          "maxLng": 32.5,
          "minLat": 35,
          "maxLat": 55,
          "Z": 5
      },
      "startDate": "1054 AD",
      "introCam": {
          "lng": 20,
          "lat": 42,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "教會分裂",
          "en": "CHURCH SCHISM · 1054 AD",
          "narr_zh": "1054年羅馬與君士坦丁堡互相開除教籍，東西教會正式分裂。",
          "narr_en": "In 1054 Rome and Constantinople excommunicated each other."
      },
      "outroCam": {
          "lng": 20,
          "lat": 42,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
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
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "rome_ch",
          "faction": "church",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "羅馬教會",
          "name_en": "Roman Church",
          "track": [
              {
                  "d": 1,
                  "lng": 12.5,
                  "lat": 41.9,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 12.5,
                  "lat": 41.9,
                  "s": 0,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "constantinople",
          "faction": "empire",
          "kind": "command",
          "crest": "circle",
          "cf": true,
          "name_zh": "君士坦丁堡教會",
          "name_en": "Constantinople Church",
          "track": [
              {
                  "d": 1,
                  "lng": 28.98,
                  "lat": 41.01,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 28.98,
                  "lat": 41.01,
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
          "zh": "教會分裂",
          "en": "CHURCH SCHISM"
      }
  ];
  const notes =   {
      "summary": "教會分裂 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "東羅馬與羅馬教會在教宗權柄、和子句、禮儀等問題上長期分歧；1054年雙方互相開除教籍，東西教會正式分裂。",
      "leaders": "羅馬教宗利奧九世、君士坦丁堡牧首米海尔一世；後續東正教與羅馬天主教各自發展。",
      "nationalPower": "分裂反映文化、語言與教會政治差異；雙方均宣稱使徒傳承，神學與禮儀傳統逐漸分化。",
      "impact": "1054年分裂影響至今；宗教改革後西方基督教進一步分化；當代有對話與修復關係的努力。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 12.5,
              "lat": 41.9,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "4–10世紀",
          "title_zh": "分歧累積",
          "title_en": "Growing Division",
          "narration_zh": "羅馬與君士坦丁堡在教宗權柄、教義與禮儀上漸生分歧。",
          "narration_en": "Rome and Constantinople diverged over papal authority, doctrine, and liturgy.",
          "focus": [
              "rome_ch"
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
              "lng": 28.98,
              "lat": 41.01,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "11世紀",
          "title_zh": "和子句爭議",
          "title_en": "Filioque Controversy",
          "narration_zh": "西方加入「和子」條文，東方認為違反大公會議決議，矛盾加劇。",
          "narration_en": "The Western Filioque clause deepened Eastern opposition.",
          "focus": [
              "constantinople"
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
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1054年7月",
          "title_zh": "互相開除教籍",
          "title_en": "Mutual Excommunication",
          "narration_zh": "利奧九世使者與君士坦丁堡牧首互相開除教籍，東西分裂公開化。",
          "narration_en": "Legates of Leo IX and Patriarch Michael excommunicated each other — the schism was formalized.",
          "focus": [
              "rome_ch",
              "constantinople"
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
              "lng": 12.5,
              "lat": 41.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1054年後",
          "title_zh": "天主教發展",
          "title_en": "Roman Catholic Path",
          "narration_zh": "羅馬教會在中世紀強化教宗權威，發展拉丁禮儀與經院神學。",
          "narration_en": "Rome strengthened papal authority and developed Latin scholastic theology.",
          "focus": [
              "rome_ch"
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
              "lng": 28.98,
              "lat": 41.01,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1054年後",
          "title_zh": "東正教傳統",
          "title_en": "Eastern Orthodox Path",
          "narration_zh": "君士坦丁堡為首的東正教保留希臘禮儀，強調大公會議與教父傳統。",
          "narration_en": "Constantinople-led Orthodoxy preserved Greek liturgy and conciliar tradition.",
          "focus": [
              "constantinople"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "教會分裂",
      "title_en": "CHURCH SCHISM",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 20,
          "lat": 42,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
