/* NORTH KOREAN INVASION · 北韓南侵 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-invasion",
      "title_zh": "北韓南侵",
      "title_en": "NORTH KOREAN INVASION",
      "subtitle": "1950年6月",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.75,
          "maxLng": 129.25,
          "minLat": 36,
          "maxLat": 39,
          "Z": 9
      },
      "startDate": [
          1950,
          6,
          25
      ],
      "introCam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "北韓南侵",
          "en": "NORTH KOREAN INVASION · 1950年6月",
          "narr_zh": "北韓大軍越過三八線，迅速攻占漢城。",
          "narr_en": "North Korean forces cross the 38th parallel and seize Seoul."
      },
      "outroCam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 900,
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
              "name_en": "38th Parallel",
              "name_zh": "三八線",
              "type": "fort",
              "lng": 127,
              "lat": 38
          },
          {
              "name_en": "Seoul",
              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },
          {
              "name_en": "Pusan",
              "name_zh": "釜山",
              "type": "city",
              "lng": 129.04,
              "lat": 35.18
          }
      ],
      "lines": [
          {
              "name_zh": "三八線",
              "name_en": "38th Parallel",
              "path": [
                  [
                      125.5,
                      38
                  ],
                  [
                      127,
                      38
                  ],
                  [
                      128.5,
                      38
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "nk_army",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓人民軍",
          "name_en": "KPA",
          "track": [
              {
                  "d": 1,
                  "lng": 127,
                  "lat": 38,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 30,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 85000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 128.5,
                  "lat": 36,
                  "s": 70000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "un_army",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "韓軍／聯合國軍",
          "name_en": "ROK / UN",
          "track": [
              {
                  "d": 1,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 30,
                  "lng": 129.04,
                  "lat": 35.18,
                  "s": 50000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 129,
                  "lat": 35.2,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "nk",
          "from": [
              127,
              38
          ],
          "to": [
              126.98,
              37.57
          ],
          "label": "越線南侵",
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
          "zh": "北韓南侵",
          "en": "NORTH KOREAN INVASION"
      }
  ];
  const notes =   {
      "summary": "北韓南侵 — DSE 西史小戰役地圖。",
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
              "lng": 127,
              "lat": 38,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年6月25日",
          "title_zh": "北韓南侵",
          "title_en": "North Korean Invasion",
          "narration_zh": "北韓坦克部隊突破三八線。",
          "narration_en": "North Korean armour breaks through the 38th parallel.",
          "focus": [
              "nk_army"
          ],
          "side": "nk"
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": 129.04,
              "lat": 35.18,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年夏",
          "title_zh": "釜山防線",
          "title_en": "Pusan Perimeter",
          "narration_zh": "聯合國軍被壓縮至半島南端。",
          "narration_en": "UN forces compressed into the Pusan bridgehead.",
          "focus": [
              "un_army"
          ],
          "side": "un"
      }
  ];
  const outro =   {
      "title_zh": "北韓南侵",
      "title_en": "NORTH KOREAN INVASION",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 127,
          "lat": 37.5,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
