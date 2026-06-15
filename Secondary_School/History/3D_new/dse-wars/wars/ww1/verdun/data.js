/* VERDUN · 凡爾登戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-verdun",
      "title_zh": "凡爾登戰役",
      "title_en": "VERDUN",
      "subtitle": "1916年",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 4.58,
          "maxLng": 6.18,
          "minLat": 48.56,
          "maxLat": 49.76,
          "Z": 11
      },
      "startDate": [
          1916,
          2,
          21
      ],
      "introCam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "凡爾登戰役",
          "en": "VERDUN · 1916年",
          "narr_zh": "德軍猛攻凡爾登要塞，雙方傷亡逾七十萬。",
          "narr_en": "Germany assaults Verdun — over 700,000 casualties in months of attrition."
      },
      "outroCam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "cp": {
          "main": 6045747,
          "glow": 9136404,
          "dim": 3811360,
          "css": "#5c4033",
          "label_zh": "同盟國",
          "label_en": "Central Powers",
          "emblem": "circle",
          "maxStrength": 120000,
          "textLight": "#e8dcc8"
      },
      "ap": {
          "main": 1989258,
          "glow": 4367861,
          "dim": 867706,
          "css": "#1e5a8a",
          "label_zh": "協約國",
          "label_en": "Allied Powers",
          "emblem": "shield",
          "maxStrength": 130000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Verdun",
              "name_zh": "凡爾登",
              "type": "fort",
              "lng": 5.38,
              "lat": 49.16
          },
          {
              "name_en": "Douaumont",
              "name_zh": "杜奧蒙堡",
              "type": "fort",
              "lng": 5.44,
              "lat": 49.19
          },
          {
              "name_en": "Fleury",
              "name_zh": "弗勒里",
              "type": "town",
              "lng": 5.42,
              "lat": 49.12
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "cp_verdun",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第五集團軍",
          "name_en": "German 5th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 5.5,
                  "lat": 49.2,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 5.42,
                  "lat": 49.14,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_verdun",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "法軍第二集團軍",
          "name_en": "French 2nd Army",
          "track": [
              {
                  "d": 1,
                  "lng": 5.35,
                  "lat": 49.16,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 5.38,
                  "lat": 49.16,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "cp",
          "from": [
              5.5,
              49.2
          ],
          "to": [
              5.38,
              49.16
          ],
          "label": "猛攻凡爾登",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 10,
          "b": 100,
          "lng": 5.38,
          "lat": 49.16,
          "kind": "artillery",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.2,
          "fog": 0.3,
          "rain": 0.2,
          "smoke": 0.7,
          "zh": "凡爾登 · 塹壕",
          "en": "Verdun trenches"
      }
  ];
  const notes =   {
      "summary": "凡爾登戰役 — DSE 西史小戰役地圖。",
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
              "lng": 5.38,
              "lat": 49.16,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年2–12月",
          "title_zh": "凡爾登消耗戰",
          "title_en": "Battle of Verdun",
          "narration_zh": "貝當號召「他們將不會通過」，雙方在默茲河谷血戰。",
          "narration_en": "\"They shall not pass\" — brutal attrition in the Meuse valley.",
          "focus": [
              "cp_verdun",
              "ap_verdun"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "凡爾登戰役",
      "title_en": "VERDUN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
