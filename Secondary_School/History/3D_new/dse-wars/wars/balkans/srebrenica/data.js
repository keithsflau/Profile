/* SREBRENICA · 斯雷布雷尼察 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-srebrenica",
      "title_zh": "斯雷布雷尼察",
      "title_en": "SREBRENICA",
      "subtitle": "1995年7月",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 18.29,
          "maxLng": 20.29,
          "minLat": 43.3,
          "maxLat": 44.9,
          "Z": 11
      },
      "startDate": [
          1995,
          7,
          11
      ],
      "introCam": {
          "lng": 19.29,
          "lat": 44.1,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "斯雷布雷尼察",
          "en": "SREBRENICA · 1995年7月",
          "narr_zh": "波塞族部隊攻占聯合國安全區，逾八千男性被殺。",
          "narr_en": "Bosnian Serb forces seize a UN safe area — over 8,000 men and boys killed."
      },
      "outroCam": {
          "lng": 19.29,
          "lat": 44.1,
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
              "name_en": "Srebrenica",
              "name_zh": "斯雷布雷尼察",
              "type": "town",
              "lng": 19.29,
              "lat": 44.1
          },
          {
              "name_en": "Potočari",
              "name_zh": "波托查里",
              "type": "town",
              "lng": 19.22,
              "lat": 44.09
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_sreb",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "波塞族部隊",
          "name_en": "Bosnian Serb Army",
          "track": [
              {
                  "d": 1,
                  "lng": 19.5,
                  "lat": 44.2,
                  "s": 20000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 18000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_sreb",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "穆斯林守軍／難民",
          "name_en": "Muslim Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 8000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 1000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "斯雷布雷尼察",
          "en": "SREBRENICA"
      }
  ];
  const notes =   {
      "summary": "斯雷布雷尼察 — DSE 西史小戰役地圖。",
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
              "lng": 19.29,
              "lat": 44.1,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年7月11–22日",
          "title_zh": "斯雷布雷尼察大屠殺",
          "title_en": "Srebrenica Massacre",
          "narration_zh": "國際法庭裁定為種族滅絕罪行。",
          "narration_en": "International courts rule it genocide.",
          "focus": [
              "sr_sreb"
          ],
          "side": "sr"
      }
  ];
  const outro =   {
      "title_zh": "斯雷布雷尼察",
      "title_en": "SREBRENICA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 19.29,
          "lat": 44.1,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
