/* BATTLE OF THE MARNE · 馬恩河戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-marne",
      "title_zh": "馬恩河戰役",
      "title_en": "BATTLE OF THE MARNE",
      "subtitle": "1914年9月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 2.3,
          "maxLng": 4.5,
          "minLat": 48.25,
          "maxLat": 49.65,
          "Z": 10
      },
      "startDate": [
          1914,
          9,
          6
      ],
      "introCam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "馬恩河戰役",
          "en": "BATTLE OF THE MARNE · 1914年9月",
          "narr_zh": "德軍逼近巴黎，英法聯軍在馬恩河阻止南下。",
          "narr_en": "Anglo-French forces halt the German advance at the Marne."
      },
      "outroCam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "cp": {
          "main": 6045747,
          "glow": 9136404,
          "dim": 3811360,
          "css": "#5c4033",
          "label_zh": "同盟國",
          "label_en": "Central Powers",
          "emblem": "circle",
          "maxStrength": 120000,
          "textLight": "#e8dcc8"
      },
      "ap": {
          "main": 1989258,
          "glow": 4367861,
          "dim": 867706,
          "css": "#1e5a8a",
          "label_zh": "協約國",
          "label_en": "Allied Powers",
          "emblem": "shield",
          "maxStrength": 130000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Marne River",
              "name_zh": "馬恩河",
              "type": "town",
              "lng": 3.4,
              "lat": 48.95
          },
          {
              "name_en": "Paris (east)",
              "name_zh": "巴黎東郊",
              "type": "city",
              "lng": 2.55,
              "lat": 48.86
          },
          {
              "name_en": "Meaux",
              "name_zh": "莫城",
              "type": "town",
              "lng": 2.88,
              "lat": 48.96
          }
      ],
      "lines": [
          {
              "name_zh": "9月初戰線",
              "name_en": "Early Sep front",
              "path": [
                  [
                      2.8,
                      49.2
                  ],
                  [
                      3.2,
                      49
                  ],
                  [
                      3.8,
                      48.9
                  ],
                  [
                      4.2,
                      48.85
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "cp_marne",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第一集團軍",
          "name_en": "German 1st Army",
          "track": [
              {
                  "d": 1,
                  "lng": 4,
                  "lat": 49.1,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 3.5,
                  "lat": 48.95,
                  "s": 70000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 4.2,
                  "lat": 49,
                  "s": 65000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_marne",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英法聯軍",
          "name_en": "Anglo-French Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 2.7,
                  "lat": 49,
                  "s": 75000,
                  "st": "retreat"
              },
              {
                  "d": 40,
                  "lng": 3.2,
                  "lat": 48.95,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 3,
                  "lat": 48.92,
                  "s": 95000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "cp",
          "from": [
              4,
              49.1
          ],
          "to": [
              3.4,
              48.95
          ],
          "label": "德軍南下",
          "kind": "attack"
      },
      {
          "d": 40,
          "f": "ap",
          "from": [
              2.7,
              49
          ],
          "to": [
              3.4,
              48.95
          ],
          "label": "馬恩河反擊",
          "kind": "attack"
      }
  ];
  const fronts =   [
      {
          "d": 1,
          "path": [
              [
                  3.6,
                  49.05
              ],
              [
                  3.4,
                  48.98
              ],
              [
                  3.2,
                  48.92
              ]
          ]
      },
      {
          "d": 100,
          "path": [
              [
                  3.8,
                  49.1
              ],
              [
                  3.5,
                  49
              ],
              [
                  3.2,
                  48.9
              ]
          ]
      }
  ];
  const hotspots =   [
      {
          "a": 30,
          "b": 70,
          "lng": 3.4,
          "lat": 48.95,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "馬恩河戰役",
          "en": "BATTLE OF THE MARNE"
      }
  ];
  const notes =   {
      "summary": "馬恩河戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 9,
          "cam": {
              "lng": 4,
              "lat": 49.1,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月初",
          "title_zh": "德軍逼近巴黎",
          "title_en": "Germans Near Paris",
          "narration_zh": "施里芬計劃最後階段，德軍直撲馬恩河。",
          "narration_en": "The Schlieffen Plan's final phase — Germany drives toward the Marne.",
          "focus": [
              "cp_marne"
          ],
          "side": "cp"
      },
      {
          "day": 50,
          "hold": 10,
          "cam": {
              "lng": 3.4,
              "lat": 48.95,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月6–12日",
          "title_zh": "馬恩河反擊",
          "title_en": "Counter-attack at the Marne",
          "narration_zh": "協約國在馬恩河阻止德軍，西線轉入僵持。",
          "narration_en": "The Allies stop Germany at the Marne — trench stalemate begins.",
          "focus": [
              "ap_marne",
              "cp_marne"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "馬恩河戰役",
      "title_en": "BATTLE OF THE MARNE",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
