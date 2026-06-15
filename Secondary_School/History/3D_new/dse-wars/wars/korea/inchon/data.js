/* INCHON LANDING · 仁川登陸 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-inchon",
      "title_zh": "仁川登陸",
      "title_en": "INCHON LANDING",
      "subtitle": "1950年9月15日",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.72,
          "maxLng": 127.52,
          "minLat": 36.76,
          "maxLat": 38.16,
          "Z": 11
      },
      "startDate": [
          1950,
          9,
          15
      ],
      "introCam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "仁川登陸",
          "en": "INCHON LANDING · 1950年9月15日",
          "narr_zh": "聯合國軍在仁川登陸，切斷北韓補給。",
          "narr_en": "UN amphibious landing at Inchon cuts North Korean supply lines."
      },
      "outroCam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "nk": {
          "main": 9109504,
          "glow": 14423100,
          "dim": 5898240,
          "css": "#8b0000",
          "label_zh": "北韓／志願軍",
          "label_en": "North Korea / PVA",
          "emblem": "circle",
          "maxStrength": 100000,
          "textLight": "#ffd9d2"
      },
      "un": {
          "main": 1718894,
          "glow": 4886745,
          "dim": 862279,
          "css": "#1a3a6e",
          "label_zh": "聯合國軍",
          "label_en": "UN Forces",
          "emblem": "shield",
          "maxStrength": 110000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Inchon",
              "name_zh": "仁川",
              "type": "town",
              "lng": 126.62,
              "lat": 37.46
          },
          {
              "name_en": "Seoul",
              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },
          {
              "name_en": "Wolmi-do",
              "name_zh": "月尾島",
              "type": "fort",
              "lng": 126.6,
              "lat": 37.47
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "un_inchon",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "聯合國登陸部隊",
          "name_en": "UN Landing Force",
          "track": [
              {
                  "d": 1,
                  "lng": 126.3,
                  "lat": 37.3,
                  "s": 70000,
                  "st": "landing"
              },
              {
                  "d": 40,
                  "lng": 126.62,
                  "lat": 37.46,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 110000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "nk_inchon",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓守軍",
          "name_en": "KPA Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 126.7,
                  "lat": 37.5,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 127,
                  "lat": 37.8,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "un",
          "from": [
              126.3,
              37.3
          ],
          "to": [
              126.62,
              37.46
          ],
          "label": "仁川登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 60,
          "lng": 126.62,
          "lat": 37.46,
          "kind": "landing",
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
          "zh": "仁川登陸",
          "en": "INCHON LANDING"
      }
  ];
  const notes =   {
      "summary": "仁川登陸 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 10,
          "cam": {
              "lng": 126.62,
              "lat": 37.46,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年9月15日",
          "title_zh": "仁川登陸",
          "title_en": "Inchon Landing",
          "narration_zh": "麥克阿瑟策劃的兩棲作戰扭轉戰局。",
          "narration_en": "MacArthur's gamble turns the tide of the war.",
          "focus": [
              "un_inchon"
          ],
          "side": "un"
      }
  ];
  const outro =   {
      "title_zh": "仁川登陸",
      "title_en": "INCHON LANDING",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
