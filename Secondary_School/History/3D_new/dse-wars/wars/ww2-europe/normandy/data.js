/* D-DAY · 諾曼第登陸 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-normandy",
      "title_zh": "諾曼第登陸",
      "title_en": "D-DAY",
      "subtitle": "1944年6月6日",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": -2.05,
          "maxLng": 0.45,
          "minLat": 48.45,
          "maxLat": 50.25,
          "Z": 10
      },
      "startDate": [
          1944,
          6,
          6
      ],
      "introCam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "諾曼第登陸",
          "en": "D-DAY · 1944年6月6日",
          "narr_zh": "盟軍在諾曼第五處海灘登陸。",
          "narr_en": "Allied forces land on five beaches in Normandy."
      },
      "outroCam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 696,
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
              "name_en": "Omaha Beach",
              "name_zh": "奧馬哈海灘",
              "type": "bay",
              "lng": -0.85,
              "lat": 49.37
          },
          {
              "name_en": "Utah Beach",
              "name_zh": "猶他海灘",
              "type": "bay",
              "lng": -1.18,
              "lat": 49.42
          },
          {
              "name_en": "Caen",
              "name_zh": "卡昂",
              "type": "city",
              "lng": -0.37,
              "lat": 49.18
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_allied",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "盟軍登陸部隊",
          "name_en": "Allied Landing Force",
          "track": [
              {
                  "d": 1,
                  "lng": -1.5,
                  "lat": 49.5,
                  "s": 150000,
                  "st": "landing"
              },
              {
                  "d": 50,
                  "lng": -0.85,
                  "lat": 49.37,
                  "s": 130000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": -0.37,
                  "lat": 49.18,
                  "s": 120000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "ax_atlantic",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "大西洋壁壘守軍",
          "name_en": "Atlantic Wall",
          "track": [
              {
                  "d": 1,
                  "lng": -0.8,
                  "lat": 49.35,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": -0.5,
                  "lat": 49.3,
                  "s": 20000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "allies",
          "from": [
              -1.5,
              49.5
          ],
          "to": [
              -0.85,
              49.37
          ],
          "label": "D-Day 登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 50,
          "lng": -0.85,
          "lat": 49.37,
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
          "zh": "諾曼第登陸",
          "en": "D-DAY"
      }
  ];
  const notes =   {
      "summary": "諾曼第登陸 — DSE 西史小戰役地圖。",
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
              "lng": -0.85,
              "lat": 49.37,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年6月6日",
          "title_zh": "諾曼第登陸",
          "title_en": "D-Day Landings",
          "narration_zh": "奧馬哈海灘傷亡慘重，但盟軍最終建立灘頭陣地。",
          "narration_en": "Heavy losses at Omaha — but the Allies secure a foothold.",
          "focus": [
              "al_allied"
          ],
          "side": "allies"
      }
  ];
  const outro =   {
      "title_zh": "諾曼第登陸",
      "title_en": "D-DAY",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
