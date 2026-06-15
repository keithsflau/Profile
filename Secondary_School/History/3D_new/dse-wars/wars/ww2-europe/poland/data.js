/* INVASION OF POLAND · 入侵波蘭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-poland",
      "title_zh": "入侵波蘭",
      "title_en": "INVASION OF POLAND",
      "subtitle": "1939年9月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 19.25,
          "maxLng": 22.75,
          "minLat": 50.95,
          "maxLat": 53.45,
          "Z": 9
      },
      "startDate": [
          1939,
          9,
          1
      ],
      "introCam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 680,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "入侵波蘭",
          "en": "INVASION OF POLAND · 1939年9月",
          "narr_zh": "德軍閃擊波蘭，蘇聯亦從東線出兵。",
          "narr_en": "Germany blitzes Poland; the USSR invades from the east."
      },
      "outroCam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 816,
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
              "name_en": "Warsaw",
              "name_zh": "華沙",
              "type": "city",
              "lng": 21.01,
              "lat": 52.23
          },
          {
              "name_en": "Modlin",
              "name_zh": "莫德林",
              "type": "fort",
              "lng": 20.72,
              "lat": 52.44
          },
          {
              "name_en": "Kraków",
              "name_zh": "克拉科夫",
              "type": "city",
              "lng": 19.94,
              "lat": 50.06
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ax_poland",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "德軍南方集團軍",
          "name_en": "Army Group South",
          "track": [
              {
                  "d": 1,
                  "lng": 19.5,
                  "lat": 52.5,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 21.01,
                  "lat": 52.23,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 52.2,
                  "s": 90000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "al_poland",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "波蘭軍",
          "name_en": "Polish Army",
          "track": [
              {
                  "d": 1,
                  "lng": 21.5,
                  "lat": 52.5,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 21.01,
                  "lat": 52.23,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 52.2,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "axis",
          "from": [
              19.5,
              52.5
          ],
          "to": [
              21.01,
              52.23
          ],
          "label": "閃擊華沙",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 80,
          "lng": 21.01,
          "lat": 52.23,
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
          "zh": "入侵波蘭",
          "en": "INVASION OF POLAND"
      }
  ];
  const notes =   {
      "summary": "入侵波蘭 — DSE 西史小戰役地圖。",
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
              "lng": 21.01,
              "lat": 52.23,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1939年9月1日",
          "title_zh": "入侵波蘭",
          "title_en": "Invasion of Poland",
          "narration_zh": "德軍以裝甲部隊快速突破，波蘭陷落。",
          "narration_en": "Panzer divisions break through — Poland falls within weeks.",
          "focus": [
              "ax_poland"
          ],
          "side": "axis"
      }
  ];
  const outro =   {
      "title_zh": "入侵波蘭",
      "title_en": "INVASION OF POLAND",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 21.01,
          "lat": 52.23,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
