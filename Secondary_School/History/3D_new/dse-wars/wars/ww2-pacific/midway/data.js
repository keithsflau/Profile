/* MIDWAY · 中途島海戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-midway",
      "title_zh": "中途島海戰",
      "title_en": "MIDWAY",
      "subtitle": "1942年6月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": -179.4,
          "maxLng": -175.4,
          "minLat": 26.7,
          "maxLat": 29.7,
          "Z": 8
      },
      "startDate": [
          1942,
          6,
          4
      ],
      "introCam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 900,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "中途島海戰",
          "en": "MIDWAY · 1942年6月",
          "narr_zh": "美軍以情報優勢在中途島擊沉四艘日航母。",
          "narr_en": "US intelligence enables the sinking of four Japanese carriers at Midway."
      },
      "outroCam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 1080,
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
              "name_en": "Midway Atoll",
              "name_zh": "中途島",
              "type": "island",
              "lng": -177.38,
              "lat": 28.21
          },
          {
              "name_en": "Battle area (north)",
              "name_zh": "海戰區（北）",
              "type": "bay",
              "lng": -177,
              "lat": 29
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_carrier",
          "faction": "us",
          "kind": "navy",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國特混艦隊",
          "name_en": "US Carrier Task Force",
          "track": [
              {
                  "d": 1,
                  "lng": -177.8,
                  "lat": 27.5,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": -177.2,
                  "lat": 28.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": -177.38,
                  "lat": 28.21,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_carrier",
          "faction": "jp",
          "kind": "navy",
          "crest": "anchor",
          "cf": true,
          "name_zh": "日本機動部隊",
          "name_en": "Kido Butai",
          "track": [
              {
                  "d": 1,
                  "lng": -176.5,
                  "lat": 29.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": -177,
                  "lat": 28.8,
                  "s": 40000,
                  "st": "dead"
              },
              {
                  "d": 100,
                  "lng": -176.5,
                  "lat": 29.5,
                  "s": 10000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "us",
          "from": [
              -177.8,
              27.5
          ],
          "to": [
              -177,
              28.8
          ],
          "label": "航母決戰",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "中途島海戰",
          "en": "MIDWAY"
      }
  ];
  const notes =   {
      "summary": "中途島海戰 — DSE 西史小戰役地圖。",
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
              "lng": -177.38,
              "lat": 28.21,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月4–7日",
          "title_zh": "中途島海戰",
          "title_en": "Battle of Midway",
          "narration_zh": "美軍擊沉赤城、加賀、蒼龍、飛龍，扭轉太平洋戰局。",
          "narration_en": "Four Japanese carriers lost — the Pacific war turns.",
          "focus": [
              "us_carrier",
              "jp_carrier"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "中途島海戰",
      "title_en": "MIDWAY",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 1080,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
