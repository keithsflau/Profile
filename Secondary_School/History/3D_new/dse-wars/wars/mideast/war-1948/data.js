/* 1948 WAR · 第一次中東戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-1948",
      "title_zh": "第一次中東戰爭",
      "title_en": "1948 WAR",
      "subtitle": "1948年",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 33.75,
          "maxLng": 36.25,
          "minLat": 30.8,
          "maxLat": 32.8,
          "Z": 10
      },
      "startDate": [
          1948,
          5,
          14
      ],
      "introCam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "第一次中東戰爭",
          "en": "1948 WAR · 1948年",
          "narr_zh": "以色列宣布建國，阿拉伯五國聯軍進攻。",
          "narr_en": "Israel declares independence — five Arab armies attack."
      },
      "outroCam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 744,
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
              "name_en": "Tel Aviv",
              "name_zh": "特拉維夫",
              "type": "city",
              "lng": 34.78,
              "lat": 32.09
          },
          {
              "name_en": "Latrun",
              "name_zh": "拉特倫",
              "type": "fort",
              "lng": 34.98,
              "lat": 31.84
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_48",
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
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.21,
                  "lat": 31.77,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_48",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "阿拉伯聯軍",
          "name_en": "Arab Armies",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 31.5,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.3,
                  "lat": 31.6,
                  "s": 40000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "arab",
          "from": [
              35.5,
              31.5
          ],
          "to": [
              34.78,
              32.09
          ],
          "label": "聯軍進攻",
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
          "zh": "第一次中東戰爭",
          "en": "1948 WAR"
      }
  ];
  const notes =   {
      "summary": "第一次中東戰爭 — DSE 西史小戰役地圖。",
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
              "lng": 35.21,
              "lat": 31.77,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1948年5月",
          "title_zh": "建國戰爭",
          "title_en": "1948 Arab-Israeli War",
          "narration_zh": "以色列在獨立次日即遭鄰國圍攻。",
          "narration_en": "Israel is attacked by neighbouring states the day after independence.",
          "focus": [
              "isr_48",
              "ar_48"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "第一次中東戰爭",
      "title_en": "1948 WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 35.21,
          "lat": 31.77,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
