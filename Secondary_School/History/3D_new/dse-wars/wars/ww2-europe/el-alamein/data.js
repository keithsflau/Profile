/* EL ALAMEIN · 阿拉曼戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-alamein",
      "title_zh": "阿拉曼戰役",
      "title_en": "EL ALAMEIN",
      "subtitle": "1942年10–11月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 27.7,
          "maxLng": 30.2,
          "minLat": 29.83,
          "maxLat": 31.83,
          "Z": 10
      },
      "startDate": [
          1942,
          10,
          23
      ],
      "introCam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "阿拉曼戰役",
          "en": "EL ALAMEIN · 1942年10–11月",
          "narr_zh": "蒙哥馬利在北非擊敗隆美爾，扭轉北非戰局。",
          "narr_en": "Montgomery defeats Rommel — the North African turning point."
      },
      "outroCam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 840,
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
              "name_en": "El Alamein",
              "name_zh": "阿拉曼",
              "type": "fort",
              "lng": 28.95,
              "lat": 30.83
          },
          {
              "name_en": "Alexandria",
              "name_zh": "亞歷山大港",
              "type": "city",
              "lng": 29.92,
              "lat": 31.2
          },
          {
              "name_en": "Qattara Depression",
              "name_zh": "蓋塔拉洼地",
              "type": "region",
              "lng": 28.5,
              "lat": 29.5
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_8th",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英第八集團軍",
          "name_en": "8th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 29.5,
                  "lat": 30.9,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 28.95,
                  "lat": 30.83,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 28.5,
                  "lat": 30.7,
                  "s": 95000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "ax_afrika",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "非洲軍團",
          "name_en": "Afrika Korps",
          "track": [
              {
                  "d": 1,
                  "lng": 28.7,
                  "lat": 30.75,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 28.3,
                  "lat": 30.5,
                  "s": 40000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "allies",
          "from": [
              29.5,
              30.9
          ],
          "to": [
              28.95,
              30.83
          ],
          "label": "第二次阿拉曼",
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
          "zh": "阿拉曼戰役",
          "en": "EL ALAMEIN"
      }
  ];
  const notes =   {
      "summary": "阿拉曼戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 30,
          "hold": 9,
          "cam": {
              "lng": 28.95,
              "lat": 30.83,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10–11月",
          "title_zh": "第二次阿拉曼戰役",
          "title_en": "Second Battle of El Alamein",
          "narration_zh": "蒙哥馬利以壓倒性火力突破德意防線。",
          "narration_en": "Montgomery breaks through with overwhelming firepower.",
          "focus": [
              "al_8th",
              "ax_afrika"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "阿拉曼戰役",
      "title_en": "EL ALAMEIN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
