/* THE CRUSADES · 十字軍東征 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "crusades",
      "title_zh": "十字軍東征",
      "title_en": "THE CRUSADES",
      "subtitle": "1095–1291",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": 17.5,
          "maxLng": 42.5,
          "minLat": 27.5,
          "maxLat": 42.5,
          "Z": 6
      },
      "startDate": "1095–1291",
      "introCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "十字軍東征",
          "en": "THE CRUSADES · 1095–1291",
          "narr_zh": "教皇烏爾班二世號召收復聖地；十字軍多次遠征耶路撒冷。",
          "narr_en": "Pope Urban II called for the recovery of the Holy Land."
      },
      "outroCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../church-schism/",
          "title_zh": "教會分裂史",
          "title_en": "GREAT SCHISM"
      }
  };
  const factions = {
    "church": {
      main: 0x9b7ec8, glow: 0xc4a8e8, dim: 0x6b4c9a,
      css: "#9b7ec8", label_zh: "教會", label_en: "Church",
      emblem: "shield", maxStrength: 50000, textLight: "#f0e8ff"
    },
    "empire": {
      main: 0x8b6914, glow: 0xc9a227, dim: 0x5c4810,
      css: "#8b6914", label_zh: "帝國／異教", label_en: "Empire / Other",
      emblem: "circle", maxStrength: 120000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.23,
              "lat": 31.78
          },
          {
              "name_zh": "安條克",
              "name_en": "Antioch",
              "type": "city",
              "lng": 36.2,
              "lat": 36.2
          },
          {
              "name_zh": "阿卡",
              "name_en": "Acre",
              "type": "fort",
              "lng": 35.08,
              "lat": 32.93
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "crusaders",
          "faction": "church",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "十字軍",
          "name_en": "Crusaders",
          "track": [
              {
                  "d": 1,
                  "lng": 12,
                  "lat": 43,
                  "s": 50000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 40000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ayyubids",
          "faction": "empire",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "穆斯林聯軍",
          "name_en": "Muslim forces",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 32,
                  "s": 60000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 55000,
                  "st": "attack"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 90,
          "lng": 35.2,
          "lat": 31.8,
          "kind": "firefight",
          "i": 0.8
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "十字軍東征",
          "en": "THE CRUSADES"
      }
  ];
  const notes =   {
      "summary": "十字軍東征 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "1095年烏爾班二世在克萊蒙號召收復聖地；第一次十字軍1099年攻陷耶路撒冷；此後兩百年間多次遠征，阿卡陷落（1291）標誌結束。",
      "leaders": "烏爾班二世、理查一世、薩拉丁、鮑德溫一世；十字軍諸侯與阿尤布王朝穆斯林領袖。",
      "nationalPower": "十字軍混合宗教熱忱與政治利益；對猶太人與穆斯林造成慘痛傷害，亦加深東西方教會裂痕。",
      "impact": "聖地戰爭塑造中世紀歐洲與中東關係；留下複雜的歷史與信仰反思。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 12.5,
              "lat": 41.9,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1095年",
          "title_zh": "克萊蒙號召",
          "title_en": "Council of Clermont",
          "narration_zh": "教皇烏爾班二世號召收復被穆斯林佔據的聖地耶路撒冷。",
          "narration_en": "Pope Urban II called for the recovery of Jerusalem from Muslim rule.",
          "focus": [
              "crusaders"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 36.2,
              "lat": 36.2,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1097–1098年",
          "title_zh": "安條克圍城",
          "title_en": "Siege of Antioch",
          "narration_zh": "十字軍圍攻安條克，經艱苦戰役奪取，繼續南下。",
          "narration_en": "Crusaders besieged and captured Antioch, then marched south.",
          "focus": [
              "crusaders",
              "ayyubids"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1099年",
          "title_zh": "攻陷耶路撒冷",
          "title_en": "Jerusalem Captured",
          "narration_zh": "第一次十字軍攻陷耶路撒冷，建立耶路撒冷王國。",
          "narration_en": "The First Crusade captured Jerusalem — the Latin Kingdom was established.",
          "focus": [
              "crusaders"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1187年",
          "title_zh": "哈丁與薩拉丁",
          "title_en": "Hattin and Saladin",
          "narration_zh": "薩拉丁在哈丁大敗十字軍，同年收復耶路撒冷。",
          "narration_en": "Saladin defeated the crusaders at Hattin and recaptured Jerusalem.",
          "focus": [
              "ayyubids"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "薩拉丁",
                  "en": "Saladin"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 35.08,
              "lat": 32.93,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1291年",
          "title_zh": "阿卡陷落",
          "title_en": "Fall of Acre",
          "narration_zh": "阿卡城陷落，十字軍在聖地的據點終告瓦解。",
          "narration_en": "Acre fell — the last major crusader stronghold in the Holy Land was lost.",
          "focus": [
              "ayyubids"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "十字軍東征",
      "title_en": "THE CRUSADES",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
