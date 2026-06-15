/* THE SOMME · 索姆河戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-somme",
      "title_zh": "索姆河戰役",
      "title_en": "THE SOMME",
      "subtitle": "1916年7月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 1.8,
          "maxLng": 3.6,
          "minLat": 49.3,
          "maxLat": 50.5,
          "Z": 10
      },
      "startDate": [
          1916,
          7,
          1
      ],
      "introCam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "索姆河戰役",
          "en": "THE SOMME · 1916年7月",
          "narr_zh": "協約國發動索姆河攻勢，首日陣亡逾兩萬人。",
          "narr_en": "Allied offensive on the Somme — over 20,000 British dead on day one."
      },
      "outroCam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 780,
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
              "name_en": "Somme",
              "name_zh": "索姆河",
              "type": "town",
              "lng": 2.7,
              "lat": 49.9
          },
          {
              "name_en": "Albert",
              "name_zh": "阿爾貝",
              "type": "city",
              "lng": 2.65,
              "lat": 50
          },
          {
              "name_en": "Thiepval",
              "name_zh": "蒂耶普瓦勒",
              "type": "fort",
              "lng": 2.68,
              "lat": 50.05
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_somme",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英法聯軍",
          "name_en": "Anglo-French",
          "track": [
              {
                  "d": 1,
                  "lng": 2.55,
                  "lat": 50,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 2.75,
                  "lat": 49.92,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "cp_somme",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍防線",
          "name_en": "German Defences",
          "track": [
              {
                  "d": 1,
                  "lng": 2.85,
                  "lat": 49.88,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 2.82,
                  "lat": 49.9,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 5,
          "f": "ap",
          "from": [
              2.55,
              50
          ],
          "to": [
              2.75,
              49.92
          ],
          "label": "7月1日攻勢",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 40,
          "lng": 2.7,
          "lat": 49.9,
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
          "zh": "索姆河戰役",
          "en": "THE SOMME"
      }
  ];
  const notes =   {
      "summary": "索姆河戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 5,
          "hold": 9,
          "cam": {
              "lng": 2.7,
              "lat": 49.9,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年7月1日",
          "title_zh": "索姆河首日",
          "title_en": "First Day on the Somme",
          "narration_zh": "英軍在索姆河發動大規模攻勢，傷亡極其慘重。",
          "narration_en": "The British launch a massive attack — catastrophic casualties.",
          "focus": [
              "ap_somme"
          ],
          "side": "ap"
      }
  ];
  const outro =   {
      "title_zh": "索姆河戰役",
      "title_en": "THE SOMME",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
