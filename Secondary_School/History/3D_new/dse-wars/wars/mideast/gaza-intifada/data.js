/* GAZA & INTIFADA · 加沙與因提法達 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-gaza",
      "title_zh": "加沙與因提法達",
      "title_en": "GAZA & INTIFADA",
      "subtitle": "1993–2000",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 33.45,
          "maxLng": 35.95,
          "minLat": 30.7,
          "maxLat": 32.7,
          "Z": 10
      },
      "startDate": [
          1993,
          9,
          13
      ],
      "introCam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "加沙與因提法達",
          "en": "GAZA & INTIFADA · 1993–2000",
          "narr_zh": "奧斯陸協議後，2000年爆發第二次因提法達。",
          "narr_en": "After Oslo, the Second Intifada erupts in 2000."
      },
      "outroCam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "arab": {
          "main": 3042094,
          "glow": 5025616,
          "dim": 1720346,
          "css": "#2e6b2e",
          "label_zh": "阿拉伯聯軍",
          "label_en": "Arab Coalition",
          "emblem": "circle",
          "maxStrength": 80000,
          "textLight": "#d4ecd4"
      },
      "isr": {
          "main": 1402304,
          "glow": 4367861,
          "dim": 867706,
          "css": "#1565c0",
          "label_zh": "以色列",
          "label_en": "Israel",
          "emblem": "shield",
          "maxStrength": 70000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Gaza",
              "name_zh": "加沙",
              "type": "city",
              "lng": 34.47,
              "lat": 31.5
          },
          {
              "name_en": "West Bank",
              "name_zh": "約旦河西岸",
              "type": "region",
              "lng": 35.3,
              "lat": 31.95
          },
          {
              "name_en": "Jerusalem",
              "name_zh": "耶路撒冷",
              "type": "city",
              "lng": 35.21,
              "lat": 31.77
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_gaza",
          "faction": "isr",
          "kind": "infantry",
          "crest": "trident",
          "cf": true,
          "name_zh": "以色列國防軍",
          "name_en": "IDF",
          "track": [
              {
                  "d": 1,
                  "lng": 34.78,
                  "lat": 32.09,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_gaza",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "巴勒斯坦武裝",
          "name_en": "Palestinian Factions",
          "track": [
              {
                  "d": 1,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 20000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.3,
                  "lat": 31.95,
                  "s": 25000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 22000,
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
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "加沙與因提法達",
          "en": "GAZA & INTIFADA"
      }
  ];
  const notes =   {
      "summary": "加沙與因提法達 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": 35.25,
              "lat": 32.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1993年",
          "title_zh": "奧斯陸協議",
          "title_en": "Oslo Accords",
          "narration_zh": "巴以秘密和談，確立自治政府框架。",
          "narration_en": "Secret talks establish the Palestinian Authority framework.",
          "focus": [
              "isr_gaza"
          ],
          "side": "isr"
      },
      {
          "day": 90,
          "hold": 9,
          "cam": {
              "lng": 34.47,
              "lat": 31.5,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "2000年",
          "title_zh": "第二次因提法達",
          "title_en": "Second Intifada",
          "narration_zh": "加沙與西岸爆發大規模起義與衝突。",
          "narration_en": "Major uprising and conflict in Gaza and the West Bank.",
          "focus": [
              "ar_gaza"
          ],
          "side": "arab"
      }
  ];
  const outro =   {
      "title_zh": "加沙與因提法達",
      "title_en": "GAZA & INTIFADA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
