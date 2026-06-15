/* SARAJEVO SIEGE · 薩拉熱窩圍城 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-sarajevo",
      "title_zh": "薩拉熱窩圍城",
      "title_en": "SARAJEVO SIEGE",
      "subtitle": "1992–1996",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 17.41,
          "maxLng": 19.41,
          "minLat": 43.06,
          "maxLat": 44.66,
          "Z": 11
      },
      "startDate": [
          1992,
          4,
          5
      ],
      "introCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 550,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "薩拉熱窩圍城",
          "en": "SARAJEVO SIEGE · 1992–1996",
          "narr_zh": "波黑首都被塞族部隊圍城逾三年。",
          "narr_en": "Bosnia's capital is besieged for over three years."
      },
      "outroCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "sr": {
          "main": 6045747,
          "glow": 9127187,
          "dim": 3811360,
          "css": "#6b3030",
          "label_zh": "塞族部隊",
          "label_en": "Serb Forces",
          "emblem": "circle",
          "maxStrength": 50000,
          "textLight": "#e8dcc8"
      },
      "co": {
          "main": 1789810,
          "glow": 3447003,
          "dim": 867706,
          "css": "#1b4f72",
          "label_zh": "克／波黑／科索沃",
          "label_en": "Croat / Bosniak / Kosovo",
          "emblem": "shield",
          "maxStrength": 45000,
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
              "name_en": "Mount Igman",
              "name_zh": "伊格曼山",
              "type": "peak",
              "lng": 18.25,
              "lat": 43.75
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_sar",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "塞族部隊",
          "name_en": "Serb Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 18.6,
                  "lat": 44,
                  "s": 35000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 18.45,
                  "lat": 43.88,
                  "s": 30000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_sar",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "波黑守軍",
          "name_en": "Bosniak Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 28000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 18.41,
          "lat": 43.86,
          "kind": "artillery",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.25,
          "fog": 0.2,
          "rain": 0.15,
          "smoke": 0.7,
          "zh": "薩拉熱窩圍城",
          "en": "Siege of Sarajevo"
      }
  ];
  const notes =   {
      "summary": "薩拉熱窩圍城 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 50,
          "hold": 10,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1992–1996",
          "title_zh": "薩拉熱窩圍城",
          "title_en": "Siege of Sarajevo",
          "narration_zh": "狙擊與炮擊令平民死傷慘重。",
          "narration_en": "Snipers and shelling kill thousands of civilians.",
          "focus": [
              "sr_sar",
              "co_sar"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "薩拉熱窩圍城",
      "title_en": "SARAJEVO SIEGE",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
