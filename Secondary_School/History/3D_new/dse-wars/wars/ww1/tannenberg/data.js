/* TANNENBERG · 坦能堡戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-tannenberg",
      "title_zh": "坦能堡戰役",
      "title_en": "TANNENBERG",
      "subtitle": "1914年8月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 18.83,
          "maxLng": 21.33,
          "minLat": 52.88,
          "maxLat": 54.88,
          "Z": 10
      },
      "startDate": [
          1914,
          8,
          26
      ],
      "introCam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "坦能堡戰役",
          "en": "TANNENBERG · 1914年8月",
          "narr_zh": "興登堡與魯登道夫在東線包圍俄軍第一集團軍。",
          "narr_en": "Hindenburg and Ludendorff encircle the Russian 1st Army."
      },
      "outroCam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 840,
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
              "name_en": "Tannenberg",
              "name_zh": "坦能堡",
              "type": "town",
              "lng": 20.08,
              "lat": 53.88
          },
          {
              "name_en": "Allenstein",
              "name_zh": "阿倫施泰因",
              "type": "city",
              "lng": 20.45,
              "lat": 53.78
          },
          {
              "name_en": "Olsztynek",
              "name_zh": "奧爾什丁內克",
              "type": "town",
              "lng": 20.28,
              "lat": 53.58
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "cp_east",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第八集團軍",
          "name_en": "German 8th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 20.5,
                  "lat": 54,
                  "s": 70000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 20.08,
                  "lat": 53.88,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 20.2,
                  "lat": 53.7,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_russia",
          "faction": "ap",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "俄軍第一集團軍",
          "name_en": "Russian 1st Army",
          "track": [
              {
                  "d": 1,
                  "lng": 21.2,
                  "lat": 54.2,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 20.3,
                  "lat": 53.9,
                  "s": 50000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 20.5,
                  "lat": 53.5,
                  "s": 20000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "cp",
          "from": [
              20.5,
              54
          ],
          "to": [
              20.08,
              53.88
          ],
          "label": "雙重包圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 25,
          "b": 80,
          "lng": 20.08,
          "lat": 53.88,
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
          "zh": "坦能堡戰役",
          "en": "TANNENBERG"
      }
  ];
  const notes =   {
      "summary": "坦能堡戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 30,
          "hold": 10,
          "cam": {
              "lng": 20.08,
              "lat": 53.88,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月26–30日",
          "title_zh": "坦能堡包圍戰",
          "title_en": "Encirclement at Tannenberg",
          "narration_zh": "德軍以少勝多，俘虜俄軍逾九萬。",
          "narration_en": "Germany wins a stunning encirclement — 90,000 Russians captured.",
          "focus": [
              "cp_east",
              "ap_russia"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "坦能堡戰役",
      "title_en": "TANNENBERG",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 20.08,
          "lat": 53.88,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
