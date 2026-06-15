/* DUNKIRK EVACUATION · 敦克爾克撤退 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-dunkirk",
      "title_zh": "敦克爾克撤退",
      "title_en": "DUNKIRK EVACUATION",
      "subtitle": "1940年5–6月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 1.38,
          "maxLng": 3.38,
          "minLat": 50.24,
          "maxLat": 51.84,
          "Z": 10
      },
      "startDate": [
          1940,
          5,
          26
      ],
      "introCam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 600,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "敦克爾克撤退",
          "en": "DUNKIRK EVACUATION · 1940年5–6月",
          "narr_zh": "英軍從敦克爾克海灘撤離逾三十萬人。",
          "narr_en": "Over 300,000 troops evacuated from the beaches of Dunkirk."
      },
      "outroCam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 720,
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
              "name_en": "Dunkirk",
              "name_zh": "敦克爾克",
              "type": "town",
              "lng": 2.38,
              "lat": 51.04
          },
          {
              "name_en": "Calais",
              "name_zh": "加萊",
              "type": "city",
              "lng": 1.85,
              "lat": 50.95
          },
          {
              "name_en": "Dover",
              "name_zh": "多佛（英國）",
              "type": "city",
              "lng": 1.31,
              "lat": 51.13
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_bef",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英軍遠征軍",
          "name_en": "BEF",
          "track": [
              {
                  "d": 1,
                  "lng": 2.8,
                  "lat": 50.8,
                  "s": 300000,
                  "st": "retreat"
              },
              {
                  "d": 50,
                  "lng": 2.38,
                  "lat": 51.04,
                  "s": 250000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 1.31,
                  "lat": 51.13,
                  "s": 200000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ax_panzer",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "德軍裝甲部隊",
          "name_en": "Panzer Divisions",
          "track": [
              {
                  "d": 1,
                  "lng": 3.2,
                  "lat": 50.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 2.5,
                  "lat": 51,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "allies",
          "from": [
              2.8,
              50.8
          ],
          "to": [
              2.38,
              51.04
          ],
          "label": "撤向海灘",
          "kind": "retreat"
      },
      {
          "d": 50,
          "f": "allies",
          "from": [
              2.38,
              51.04
          ],
          "to": [
              1.31,
              51.13
          ],
          "label": "海峽撤離",
          "kind": "retreat"
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
          "zh": "敦克爾克撤退",
          "en": "DUNKIRK EVACUATION"
      }
  ];
  const notes =   {
      "summary": "敦克爾克撤退 — DSE 西史小戰役地圖。",
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
              "lng": 2.38,
              "lat": 51.04,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1940年5月26日–6月4日",
          "title_zh": "敦克爾克大撤退",
          "title_en": "Evacuation of Dunkirk",
          "narration_zh": "民間船隻與皇家海軍協力撤離被困英軍。",
          "narration_en": "The \"little ships\" and Royal Navy evacuate trapped troops.",
          "focus": [
              "al_bef"
          ],
          "side": "allies"
      }
  ];
  const outro =   {
      "title_zh": "敦克爾克撤退",
      "title_en": "DUNKIRK EVACUATION",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 2.38,
          "lat": 51.04,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
