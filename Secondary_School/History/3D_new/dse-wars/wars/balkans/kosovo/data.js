/* KOSOVO WAR · 科索沃戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-kosovo",
      "title_zh": "科索沃戰爭",
      "title_en": "KOSOVO WAR",
      "subtitle": "1998–1999",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 19.75,
          "maxLng": 22.25,
          "minLat": 41.6,
          "maxLat": 43.6,
          "Z": 10
      },
      "startDate": [
          1998,
          3,
          5
      ],
      "introCam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "科索沃戰爭",
          "en": "KOSOVO WAR · 1998–1999",
          "narr_zh": "塞族鎮壓科索沃阿族，北約轟炸塞爾維亞。",
          "narr_en": "Serb crackdown in Kosovo leads to NATO bombing."
      },
      "outroCam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 744,
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
              "name_en": "Pristina",
              "name_zh": "普里什蒂納",
              "type": "city",
              "lng": 21.17,
              "lat": 42.66
          },
          {
              "name_en": "Belgrade",
              "name_zh": "貝爾格萊德",
              "type": "city",
              "lng": 20.46,
              "lat": 44.79
          },
          {
              "name_en": "Peć",
              "name_zh": "佩奇",
              "type": "town",
              "lng": 20.29,
              "lat": 42.66
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_kos",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "塞爾維亞軍警",
          "name_en": "Serb Security Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 21.17,
                  "lat": 42.66,
                  "s": 35000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 20.46,
                  "lat": 44.79,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 42.6,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "co_kos",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "科索沃解放軍",
          "name_en": "KLA",
          "track": [
              {
                  "d": 1,
                  "lng": 21,
                  "lat": 42.6,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 21.17,
                  "lat": 42.66,
                  "s": 20000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 70,
          "b": 95,
          "lng": 20.46,
          "lat": 44.79,
          "kind": "air",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "科索沃戰爭",
          "en": "KOSOVO WAR"
      }
  ];
  const notes =   {
      "summary": "科索沃戰爭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 40,
          "hold": 9,
          "cam": {
              "lng": 21.17,
              "lat": 42.66,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1998–1999",
          "title_zh": "科索沃危機",
          "title_en": "Kosovo Crisis",
          "narration_zh": "阿族難民潮與塞族鎮壓引發國際介入。",
          "narration_en": "Refugee crisis and Serb crackdown prompt international action.",
          "focus": [
              "sr_kos",
              "co_kos"
          ],
          "side": "both"
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 20.46,
              "lat": 44.79,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1999年3–6月",
          "title_zh": "北約轟炸",
          "title_en": "NATO Bombing",
          "narration_zh": "北約空襲迫使塞軍從科索沃撤離。",
          "narration_en": "NATO air campaign forces Serb withdrawal.",
          "focus": [
              "sr_kos"
          ],
          "side": "sr"
      }
  ];
  const outro =   {
      "title_zh": "科索沃戰爭",
      "title_en": "KOSOVO WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
