/* SIX-DAY WAR · 六日戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-sixday",
      "title_zh": "六日戰爭",
      "title_en": "SIX-DAY WAR",
      "subtitle": "1967年6月",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 32.75,
          "maxLng": 36.25,
          "minLat": 30,
          "maxLat": 33,
          "Z": 9
      },
      "startDate": [
          1967,
          6,
          5
      ],
      "introCam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "六日戰爭",
          "en": "SIX-DAY WAR · 1967年6月",
          "narr_zh": "以色列六日內擊敗埃及、敘利亞、約旦。",
          "narr_en": "Israel defeats Egypt, Syria and Jordan in six days."
      },
      "outroCam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "arab": {
          "main": 3042094,
          "glow": 5025616,
          "dim": 1720346,
          "css": "#2e6b2e",
          "label_zh": "阿拉伯聯軍",
          "label_en": "Arab Coalition",
          "emblem": "circle",
          "maxStrength": 80000,
          "textLight": "#d4ecd4"
      },
      "isr": {
          "main": 1402304,
          "glow": 4367861,
          "dim": 867706,
          "css": "#1565c0",
          "label_zh": "以色列",
          "label_en": "Israel",
          "emblem": "shield",
          "maxStrength": 70000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Jerusalem",
              "name_zh": "耶路撒冷",
              "type": "city",
              "lng": 35.21,
              "lat": 31.77
          },
          {
              "name_en": "Golan Heights",
              "name_zh": "戈蘭高地",
              "type": "fort",
              "lng": 35.75,
              "lat": 33.05
          },
          {
              "name_en": "Sinai",
              "name_zh": "西奈半島",
              "type": "region",
              "lng": 33.5,
              "lat": 29.5
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_67",
          "faction": "isr",
          "kind": "infantry",
          "crest": "trident",
          "cf": true,
          "name_zh": "以色列國防軍",
          "name_en": "IDF",
          "track": [
              {
                  "d": 1,
                  "lng": 34.78,
                  "lat": 32.09,
                  "s": 50000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 35.75,
                  "lat": 33.05,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 33.5,
                  "lat": 29.5,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_67",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "埃及敘利亞聯軍",
          "name_en": "Egyptian-Syrian Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 33,
                  "lat": 30,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 32,
                  "lat": 30.5,
                  "s": 30000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "isr",
          "from": [
              34.78,
              32.09
          ],
          "to": [
              35.75,
              33.05
          ],
          "label": "攻占戈蘭",
          "kind": "attack"
      },
      {
          "d": 40,
          "f": "isr",
          "from": [
              34.5,
              31.5
          ],
          "to": [
              33.5,
              29.5
          ],
          "label": "西奈攻勢",
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
          "zh": "六日戰爭",
          "en": "SIX-DAY WAR"
      }
  ];
  const notes =   {
      "summary": "六日戰爭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 20,
          "hold": 10,
          "cam": {
              "lng": 35.75,
              "lat": 33.05,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1967年6月5–10日",
          "title_zh": "六日戰爭",
          "title_en": "Six-Day War",
          "narration_zh": "以色列先發制人，占領西奈、戈蘭、西岸與加沙。",
          "narration_en": "Pre-emptive strike — Israel seizes Sinai, Golan, West Bank and Gaza.",
          "focus": [
              "isr_67"
          ],
          "side": "isr"
      }
  ];
  const outro =   {
      "title_zh": "六日戰爭",
      "title_en": "SIX-DAY WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 34.5,
          "lat": 31.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
