/* IWO JIMA · 硫磺島戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-iwo",
      "title_zh": "硫磺島戰役",
      "title_en": "IWO JIMA",
      "subtitle": "1945年2–3月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 140.57,
          "maxLng": 142.07,
          "minLat": 24.18,
          "maxLat": 25.38,
          "Z": 11
      },
      "startDate": [
          1945,
          2,
          19
      ],
      "introCam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "硫磺島戰役",
          "en": "IWO JIMA · 1945年2–3月",
          "narr_zh": "美軍傷亡慘重攻佔硫磺島。",
          "narr_en": "US Marines take Iwo Jima at terrible cost."
      },
      "outroCam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "jp": {
          "main": 9109504,
          "glow": 14423100,
          "dim": 5898240,
          "css": "#8b0000",
          "label_zh": "日本",
          "label_en": "Japan",
          "emblem": "circle",
          "maxStrength": 90000,
          "textLight": "#ffd9d2"
      },
      "us": {
          "main": 1718894,
          "glow": 4886745,
          "dim": 862279,
          "css": "#1a3a6e",
          "label_zh": "美國",
          "label_en": "United States",
          "emblem": "shield",
          "maxStrength": 110000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Iwo Jima",
              "name_zh": "硫磺島",
              "type": "island",
              "lng": 141.32,
              "lat": 24.78
          },
          {
              "name_en": "Mount Suribachi",
              "name_zh": "折鉢山",
              "type": "peak",
              "lng": 141.29,
              "lat": 24.75
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_iwo",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國海軍陸戰隊",
          "name_en": "US Marines",
          "track": [
              {
                  "d": 1,
                  "lng": 141.4,
                  "lat": 24.85,
                  "s": 50000,
                  "st": "landing"
              },
              {
                  "d": 80,
                  "lng": 141.29,
                  "lat": 24.75,
                  "s": 45000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 141.32,
                  "lat": 24.78,
                  "s": 40000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_iwo",
          "faction": "jp",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日本守備隊",
          "name_en": "Japanese Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 141.32,
                  "lat": 24.78,
                  "s": 22000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 141.29,
                  "lat": 24.75,
                  "s": 2000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "us",
          "from": [
              141.4,
              24.85
          ],
          "to": [
              141.29,
              24.75
          ],
          "label": "攻佔折鉢山",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 141.29,
          "lat": 24.75,
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
          "zh": "硫磺島戰役",
          "en": "IWO JIMA"
      }
  ];
  const notes =   {
      "summary": "硫磺島戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 40,
          "hold": 10,
          "cam": {
              "lng": 141.29,
              "lat": 24.75,
              "dist": 450,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年2月23日",
          "title_zh": "硫磺島升旗",
          "title_en": "Flag Raising on Iwo Jima",
          "narration_zh": "美軍在折鉢山升起國旗，成為二戰經典影像。",
          "narration_en": "Marines raise the flag on Mount Suribachi — an iconic image.",
          "focus": [
              "us_iwo"
          ],
          "side": "us"
      }
  ];
  const outro =   {
      "title_zh": "硫磺島戰役",
      "title_en": "IWO JIMA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
