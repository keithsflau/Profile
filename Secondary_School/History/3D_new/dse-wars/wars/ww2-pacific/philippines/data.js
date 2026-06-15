/* PHILIPPINES · 菲律賓戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-philippines",
      "title_zh": "菲律賓戰役",
      "title_en": "PHILIPPINES",
      "subtitle": "1941–1942",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 119.48,
          "maxLng": 122.48,
          "minLat": 13.35,
          "maxLat": 15.85,
          "Z": 9
      },
      "startDate": [
          1941,
          12,
          8
      ],
      "introCam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 680,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "菲律賓戰役",
          "en": "PHILIPPINES · 1941–1942",
          "narr_zh": "日軍攻陷菲律賓，美菲守軍撤退至巴丹。",
          "narr_en": "Japan conquers the Philippines — US-Filipino forces retreat to Bataan."
      },
      "outroCam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 816,
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
              "name_en": "Manila",
              "name_zh": "馬尼拉",
              "type": "city",
              "lng": 120.98,
              "lat": 14.6
          },
          {
              "name_en": "Bataan",
              "name_zh": "巴丹半島",
              "type": "fort",
              "lng": 120.45,
              "lat": 14.65
          },
          {
              "name_en": "Corregidor",
              "name_zh": "科雷希多島",
              "type": "fort",
              "lng": 120.58,
              "lat": 14.38
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "jp_ph",
          "faction": "jp",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "日本第14軍",
          "name_en": "Japanese 14th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 121.5,
                  "lat": 15,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 120.98,
                  "lat": 14.6,
                  "s": 55000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 120.45,
                  "lat": 14.65,
                  "s": 50000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "us_ph",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美菲守軍",
          "name_en": "US-Filipino Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 120.98,
                  "lat": 14.6,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 120.45,
                  "lat": 14.65,
                  "s": 30000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 120.58,
                  "lat": 14.38,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "jp",
          "from": [
              121.5,
              15
          ],
          "to": [
              120.98,
              14.6
          ],
          "label": "攻陷馬尼拉",
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
          "zh": "菲律賓戰役",
          "en": "PHILIPPINES"
      }
  ];
  const notes =   {
      "summary": "菲律賓戰役 — DSE 西史小戰役地圖。",
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
              "lng": 120.98,
              "lat": 14.6,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1941年12月",
          "title_zh": "菲律賓陷落",
          "title_en": "Fall of the Philippines",
          "narration_zh": "珍珠港後日軍迅速南攻；馬尼拉於1942年1月淪陷。",
          "narration_en": "After Pearl Harbor, Japan pushes south — Manila falls January 1942.",
          "focus": [
              "jp_ph"
          ],
          "side": "jp"
      }
  ];
  const outro =   {
      "title_zh": "菲律賓戰役",
      "title_en": "PHILIPPINES",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
