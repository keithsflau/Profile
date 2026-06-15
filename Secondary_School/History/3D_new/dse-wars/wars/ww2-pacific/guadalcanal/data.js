/* GUADALCANAL · 瓜達爾卡納爾戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-guadalcanal",
      "title_zh": "瓜達爾卡納爾戰役",
      "title_en": "GUADALCANAL",
      "subtitle": "1942–1943",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 158.9,
          "maxLng": 161.4,
          "minLat": -10.55,
          "maxLat": -8.55,
          "Z": 10
      },
      "startDate": [
          1942,
          8,
          7
      ],
      "introCam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "瓜達爾卡納爾戰役",
          "en": "GUADALCANAL · 1942–1943",
          "narr_zh": "美軍登陸瓜島，奪取亨德森機場。",
          "narr_en": "US Marines land on Guadalcanal and seize Henderson Field."
      },
      "outroCam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "jp": {
          "main": 9109504,
          "glow": 14423100,
          "dim": 5898240,
          "css": "#8b0000",
          "label_zh": "日本",
          "label_en": "Japan",
          "emblem": "circle",
          "maxStrength": 90000,
          "textLight": "#ffd9d2"
      },
      "us": {
          "main": 1718894,
          "glow": 4886745,
          "dim": 862279,
          "css": "#1a3a6e",
          "label_zh": "美國",
          "label_en": "United States",
          "emblem": "shield",
          "maxStrength": 110000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Guadalcanal",
              "name_zh": "瓜達爾卡納爾",
              "type": "island",
              "lng": 160.15,
              "lat": -9.55
          },
          {
              "name_en": "Henderson Field",
              "name_zh": "亨德森機場",
              "type": "fort",
              "lng": 160.05,
              "lat": -9.43
          },
          {
              "name_en": "Tulagi",
              "name_zh": "圖拉吉",
              "type": "island",
              "lng": 160.14,
              "lat": -9.1
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_marines",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國海軍陸戰隊",
          "name_en": "US Marines",
          "track": [
              {
                  "d": 1,
                  "lng": 160.3,
                  "lat": -9.7,
                  "s": 40000,
                  "st": "landing"
              },
              {
                  "d": 60,
                  "lng": 160.05,
                  "lat": -9.43,
                  "s": 45000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 160.15,
                  "lat": -9.55,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_garrison",
          "faction": "jp",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日本守備隊",
          "name_en": "Japanese Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 160.1,
                  "lat": -9.5,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 160.2,
                  "lat": -9.6,
                  "s": 8000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "us",
          "from": [
              160.3,
              -9.7
          ],
          "to": [
              160.05,
              -9.43
          ],
          "label": "瓜島登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 160.05,
          "lat": -9.43,
          "kind": "firefight",
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
          "zh": "瓜達爾卡納爾戰役",
          "en": "GUADALCANAL"
      }
  ];
  const notes =   {
      "summary": "瓜達爾卡納爾戰役 — DSE 西史小戰役地圖。",
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
              "lng": 160.05,
              "lat": -9.43,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年8月",
          "title_zh": "瓜島登陸",
          "title_en": "Landings on Guadalcanal",
          "narration_zh": "盟軍首次反攻，控制亨德森機場成關鍵。",
          "narration_en": "Allied counter-offensive begins — Henderson Field is critical.",
          "focus": [
              "us_marines"
          ],
          "side": "us"
      }
  ];
  const outro =   {
      "title_zh": "瓜達爾卡納爾戰役",
      "title_en": "GUADALCANAL",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
