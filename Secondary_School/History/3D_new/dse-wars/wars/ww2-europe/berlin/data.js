/* BATTLE OF BERLIN · 柏林戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-berlin",
      "title_zh": "柏林戰役",
      "title_en": "BATTLE OF BERLIN",
      "subtitle": "1945年4–5月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 12.4,
          "maxLng": 14.4,
          "minLat": 51.72,
          "maxLat": 53.32,
          "Z": 10
      },
      "startDate": [
          1945,
          4,
          16
      ],
      "introCam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "柏林戰役",
          "en": "BATTLE OF BERLIN · 1945年4–5月",
          "narr_zh": "蘇軍圍攻柏林，希特勒自殺，德國無條件投降。",
          "narr_en": "Soviet forces storm Berlin — Germany surrenders unconditionally."
      },
      "outroCam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "axis": {
          "main": 4868682,
          "glow": 9109504,
          "dim": 2763306,
          "css": "#6b2020",
          "label_zh": "軸心國",
          "label_en": "Axis",
          "emblem": "circle",
          "maxStrength": 150000,
          "textLight": "#e8d0d0"
      },
      "allies": {
          "main": 1789810,
          "glow": 3447003,
          "dim": 867706,
          "css": "#1b4f72",
          "label_zh": "同盟國",
          "label_en": "Allies",
          "emblem": "shield",
          "maxStrength": 160000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Berlin",
              "name_zh": "柏林",
              "type": "city",
              "lng": 13.4,
              "lat": 52.52
          },
          {
              "name_en": "Reichstag",
              "name_zh": "國會大廈",
              "type": "fort",
              "lng": 13.38,
              "lat": 52.52
          },
          {
              "name_en": "Potsdam",
              "name_zh": "波茨坦",
              "type": "city",
              "lng": 13.06,
              "lat": 52.39
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_soviet",
          "faction": "allies",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "蘇聯第一白俄羅斯方面軍",
          "name_en": "1st Belorussian Front",
          "track": [
              {
                  "d": 1,
                  "lng": 14,
                  "lat": 52.6,
                  "s": 150000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 13.4,
                  "lat": 52.52,
                  "s": 180000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 13.38,
                  "lat": 52.52,
                  "s": 200000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ax_berlin",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "柏林守軍",
          "name_en": "Berlin Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 13.4,
                  "lat": 52.52,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 13.38,
                  "lat": 52.52,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "allies",
          "from": [
              14,
              52.6
          ],
          "to": [
              13.38,
              52.52
          ],
          "label": "攻入國會大廈",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 100,
          "lng": 13.38,
          "lat": 52.52,
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
          "zh": "柏林戰役",
          "en": "BATTLE OF BERLIN"
      }
  ];
  const notes =   {
      "summary": "柏林戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 60,
          "hold": 10,
          "cam": {
              "lng": 13.38,
              "lat": 52.52,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年4月30日–5月2日",
          "title_zh": "柏林陷落",
          "title_en": "Fall of Berlin",
          "narration_zh": "蘇軍在國會大廈升起紅旗，德國於5月8日投降。",
          "narration_en": "The Red Flag flies over the Reichstag — Germany surrenders 8 May.",
          "focus": [
              "al_soviet"
          ],
          "side": "allies"
      }
  ];
  const outro =   {
      "title_zh": "柏林戰役",
      "title_en": "BATTLE OF BERLIN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 13.4,
          "lat": 52.52,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
