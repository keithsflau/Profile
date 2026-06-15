/* SARAJEVO · 薩拉熱窩暗殺 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-sarajevo",
      "title_zh": "薩拉熱窩暗殺",
      "title_en": "SARAJEVO",
      "subtitle": "1914年6月28日",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 18.01,
          "maxLng": 18.81,
          "minLat": 43.51,
          "maxLat": 44.21,
          "Z": 12
      },
      "startDate": [
          1914,
          6,
          28
      ],
      "introCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "薩拉熱窩暗殺",
          "en": "SARAJEVO · 1914年6月28日",
          "narr_zh": "1914年6月28日，斐迪南大公在薩拉熱窩遇刺。",
          "narr_en": "Archduke Franz Ferdinand is assassinated in Sarajevo, 28 June 1914."
      },
      "outroCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 624,
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
              "name_en": "Sarajevo",
              "name_zh": "薩拉熱窩",
              "type": "city",
              "lng": 18.41,
              "lat": 43.86
          },
          {
              "name_en": "Latin Bridge",
              "name_zh": "拉丁橋",
              "type": "town",
              "lng": 18.43,
              "lat": 43.86
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_sarajevo",
          "faction": "ap",
          "kind": "command",
          "crest": "anchor",
          "cf": false,
          "name_zh": "奧匈皇室隨行",
          "name_en": "Austrian Royal Party",
          "track": [
              {
                  "d": 1,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 0,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "cp",
          "from": [
              18.43,
              43.86
          ],
          "to": [
              18.41,
              43.86
          ],
          "label": "普林西普開槍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 18.41,
          "lat": 43.86,
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
          "zh": "薩拉熱窩暗殺",
          "en": "SARAJEVO"
      }
  ];
  const notes =   {
      "summary": "薩拉熱窩暗殺 — DSE 西史小戰役地圖。",
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
              "lng": 18.41,
              "lat": 43.86,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年6月28日",
          "title_zh": "薩拉熱窩暗殺",
          "title_en": "Assassination at Sarajevo",
          "narration_zh": "塞族民族主義者普林西普刺殺奧匈皇儲，觸發七月危機。",
          "narration_en": "Gavrilo Princip assassinates the heir — the July Crisis begins.",
          "focus": [
              "ap_sarajevo"
          ],
          "side": "ap"
      }
  ];
  const outro =   {
      "title_zh": "薩拉熱窩暗殺",
      "title_en": "SARAJEVO",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
