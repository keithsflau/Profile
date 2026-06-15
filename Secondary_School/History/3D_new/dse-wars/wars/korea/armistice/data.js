/* ARMISTICE · 板門店停戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-armistice",
      "title_zh": "板門店停戰",
      "title_en": "ARMISTICE",
      "subtitle": "1953年7月27日",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.68,
          "maxLng": 127.68,
          "minLat": 37.15,
          "maxLat": 38.75,
          "Z": 11
      },
      "startDate": [
          1953,
          7,
          27
      ],
      "introCam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 550,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "板門店停戰",
          "en": "ARMISTICE · 1953年7月27日",
          "narr_zh": "雙方在板門店簽署停戰協定，半島分裂延續。",
          "narr_en": "Armistice signed at Panmunjom — Korea remains divided."
      },
      "outroCam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "nk": {
          "main": 9109504,
          "glow": 14423100,
          "dim": 5898240,
          "css": "#8b0000",
          "label_zh": "北韓／志願軍",
          "label_en": "North Korea / PVA",
          "emblem": "circle",
          "maxStrength": 100000,
          "textLight": "#ffd9d2"
      },
      "un": {
          "main": 1718894,
          "glow": 4886745,
          "dim": 862279,
          "css": "#1a3a6e",
          "label_zh": "聯合國軍",
          "label_en": "UN Forces",
          "emblem": "shield",
          "maxStrength": 110000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Panmunjom",
              "name_zh": "板門店",
              "type": "fort",
              "lng": 126.68,
              "lat": 37.95
          },
          {
              "name_en": "Kaesong",
              "name_zh": "開城",
              "type": "city",
              "lng": 126.55,
              "lat": 37.97
          }
      ],
      "lines": [
          {
              "name_zh": "軍事分界線",
              "name_en": "DMZ",
              "path": [
                  [
                      126.2,
                      38
                  ],
                  [
                      126.68,
                      38
                  ],
                  [
                      127.2,
                      38
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "un_dmz",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "聯合國軍",
          "name_en": "UN Command",
          "track": [
              {
                  "d": 1,
                  "lng": 126.7,
                  "lat": 37.9,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 126.68,
                  "lat": 37.95,
                  "s": 90000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "nk_dmz",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓軍",
          "name_en": "KPA",
          "track": [
              {
                  "d": 1,
                  "lng": 126.75,
                  "lat": 38,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 126.7,
                  "lat": 38,
                  "s": 80000,
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
          "zh": "板門店停戰",
          "en": "ARMISTICE"
      }
  ];
  const notes =   {
      "summary": "板門店停戰 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 10,
          "cam": {
              "lng": 126.68,
              "lat": 37.95,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1953年7月27日",
          "title_zh": "板門店停戰",
          "title_en": "Armistice at Panmunjom",
          "narration_zh": "三年戰爭結束，南北分裂延續至今。",
          "narration_en": "Three years of war end — division continues to this day.",
          "focus": [
              "un_dmz",
              "nk_dmz"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "板門店停戰",
      "title_en": "ARMISTICE",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
