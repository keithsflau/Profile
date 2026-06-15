/* VUKOVAR · 武科瓦爾圍城 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-vukovar",
      "title_zh": "武科瓦爾圍城",
      "title_en": "VUKOVAR",
      "subtitle": "1991年",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 18,
          "maxLng": 20,
          "minLat": 44.55,
          "maxLat": 46.15,
          "Z": 11
      },
      "startDate": [
          1991,
          8,
          25
      ],
      "introCam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "武科瓦爾圍城",
          "en": "VUKOVAR · 1991年",
          "narr_zh": "塞族南斯拉夫軍圍攻武科瓦爾三個月。",
          "narr_en": "JNA besieges Vukovar for three months."
      },
      "outroCam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 624,
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
              "name_en": "Vukovar",
              "name_zh": "武科瓦爾",
              "type": "city",
              "lng": 19,
              "lat": 45.35
          },
          {
              "name_en": "Osijek",
              "name_zh": "奧西耶克",
              "type": "city",
              "lng": 18.69,
              "lat": 45.55
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_vuk",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "南斯拉夫人民軍",
          "name_en": "JNA",
          "track": [
              {
                  "d": 1,
                  "lng": 19.3,
                  "lat": 45.5,
                  "s": 40000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 35000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 30000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_vuk",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "克羅地亞守軍",
          "name_en": "Croatian Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 2000,
                  "st": "dead"
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
          "lng": 19,
          "lat": 45.35,
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
          "zh": "武科瓦爾圍城",
          "en": "VUKOVAR"
      }
  ];
  const notes =   {
      "summary": "武科瓦爾圍城 — DSE 西史小戰役地圖。",
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
              "lng": 19,
              "lat": 45.35,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年8–11月",
          "title_zh": "武科瓦爾圍城",
          "title_en": "Siege of Vukovar",
          "narration_zh": "城市幾乎被夷平，象徵克羅地亞獨立戰爭的殘酷。",
          "narration_en": "The city is nearly destroyed — a symbol of Croatia's war.",
          "focus": [
              "sr_vuk",
              "co_vuk"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "武科瓦爾圍城",
      "title_en": "VUKOVAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
