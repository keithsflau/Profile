/* ATOMIC BOMBS · 廣島與長崎 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-hiroshima",
      "title_zh": "廣島與長崎",
      "title_en": "ATOMIC BOMBS",
      "subtitle": "1945年8月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 130.71,
          "maxLng": 134.21,
          "minLat": 33.14,
          "maxLat": 35.64,
          "Z": 9
      },
      "startDate": [
          1945,
          8,
          6
      ],
      "introCam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "廣島與長崎",
          "en": "ATOMIC BOMBS · 1945年8月",
          "narr_zh": "美軍投下原子彈，日本於8月15日投降。",
          "narr_en": "Atomic bombs on Hiroshima and Nagasaki — Japan surrenders 15 August."
      },
      "outroCam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 780,
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
              "name_en": "Hiroshima",
              "name_zh": "廣島",
              "type": "city",
              "lng": 132.46,
              "lat": 34.39
          },
          {
              "name_en": "Nagasaki",
              "name_zh": "長崎",
              "type": "city",
              "lng": 129.87,
              "lat": 32.75
          },
          {
              "name_en": "Tokyo",
              "name_zh": "東京",
              "type": "city",
              "lng": 139.69,
              "lat": 35.69
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_b29",
          "faction": "us",
          "kind": "navy",
          "crest": "anchor",
          "cf": false,
          "name_zh": "美軍 B-29 部隊",
          "name_en": "US B-29 Command",
          "track": [
              {
                  "d": 1,
                  "lng": 133,
                  "lat": 34.5,
                  "s": 0,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 132.46,
                  "lat": 34.39,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "us",
          "from": [
              133,
              34.5
          ],
          "to": [
              132.46,
              34.39
          ],
          "label": "「小男孩」",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 20,
          "lng": 132.46,
          "lat": 34.39,
          "kind": "explosion",
          "i": 1
      },
      {
          "a": 40,
          "b": 60,
          "lng": 129.87,
          "lat": 32.75,
          "kind": "explosion",
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
          "zh": "廣島與長崎",
          "en": "ATOMIC BOMBS"
      }
  ];
  const notes =   {
      "summary": "廣島與長崎 — DSE 西史小戰役地圖。",
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
              "lng": 132.46,
              "lat": 34.39,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月6日",
          "title_zh": "廣島原子彈",
          "title_en": "Hiroshima",
          "narration_zh": "「小男孩」投下，約十四萬人喪生，開啟核時代。",
          "narration_en": "\"Little Boy\" — ~140,000 dead; the nuclear age begins.",
          "focus": [
              "us_b29"
          ],
          "side": "us"
      },
      {
          "day": 80,
          "hold": 8,
          "cam": {
              "lng": 139.69,
              "lat": 35.69,
              "dist": 900,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月15日",
          "title_zh": "日本投降",
          "title_en": "Japanese Surrender",
          "narration_zh": "天皇宣布無條件投降，太平洋戰爭結束。",
          "narration_en": "Emperor announces unconditional surrender.",
          "focus": [
              "us_b29"
          ],
          "side": "us"
      }
  ];
  const outro =   {
      "title_zh": "廣島與長崎",
      "title_en": "ATOMIC BOMBS",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
