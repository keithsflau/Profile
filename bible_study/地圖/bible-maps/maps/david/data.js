/* KING DAVID · 大衛時期 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "david",
      "title_zh": "大衛時期",
      "title_en": "KING DAVID",
      "subtitle": "撒上–撒下",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.7,
          "maxLng": 36.7,
          "minLat": 30.45,
          "maxLat": 32.95,
          "Z": 10
      },
      "startDate": "撒上–撒下",
      "introCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "大衛時期",
          "en": "KING DAVID · 撒上–撒下",
          "narr_zh": "大衛作以色列眾人的王，又作猶大人的王七年零六個月。",
          "narr_en": "David reigned over all Israel and Judah."
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
          "href": "../solomon/",
          "title_zh": "所羅門時期",
          "title_en": "KING SOLOMON"
      }
  };
  const factions = {
    "covenant": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "選民／教會", label_en: "Covenant People",
      emblem: "shield", maxStrength: 80000, textLight: "#fff8e0"
    },
    "nations": {
      main: 0x5c4a72, glow: 0x8b7aa8, dim: 0x3a2f48,
      css: "#5c4a72", label_zh: "列國／仇敵", label_en: "Nations",
      emblem: "circle", maxStrength: 100000, textLight: "#e8e0f0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "伯利恆",
              "name_en": "Bethlehem",
              "type": "town",
              "lng": 35.2,
              "lat": 31.7
          },
          {
              "name_zh": "以拉谷",
              "name_en": "Valley of Elah",
              "type": "town",
              "lng": 34.98,
              "lat": 31.7
          },
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.23,
              "lat": 31.78
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "david_army",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "大衛軍隊",
          "name_en": "David's forces",
          "track": [
              {
                  "d": 1,
                  "lng": 35.2,
                  "lat": 31.7,
                  "s": 1000,
                  "st": "hold"
              },
              {
                  "d": 40,
                  "lng": 34.98,
                  "lat": 31.7,
                  "s": 3000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "philistines",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "非利士人",
          "name_en": "Philistines",
          "track": [
              {
                  "d": 35,
                  "lng": 34.95,
                  "lat": 31.72,
                  "s": 20000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 34.9,
                  "lat": 31.65,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 35,
          "b": 55,
          "lng": 34.98,
          "lat": 31.7,
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
          "zh": "大衛時期",
          "en": "KING DAVID"
      }
  ];
  const notes =   {
      "summary": "大衛時期 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "大衛從伯利恆牧童被膏；在以拉谷擊殺歌利亞；躲避掃羅多年後作猶大王，再統一全以色列，建都耶路撒冷。",
      "leaders": "大衛、約拿單、掃羅、撒母耳、押沙龍為主要人物；非利士為主要外敵。",
      "nationalPower": "大衛為合神心意的人；神與他立約，應許彌賽亞出自大衛家；其詩篇見證敬拜與悔改。",
      "impact": "大衛王朝成為彌賽亞盼望的載體；耶路撒冷成為聖城與聖殿中心。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.2,
              "lat": 31.7,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1020年",
          "title_zh": "伯利恆牧童",
          "title_en": "Shepherd of Bethlehem",
          "narration_zh": "撒母耳在伯利恆膏大衛；耶和華說：我尋得合我心意的人。",
          "narration_en": "Samuel anointed David at Bethlehem — 'A man after God's own heart.'",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "大衛",
                  "en": "David"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 34.98,
              "lat": 31.7,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1010年",
          "title_zh": "擊殺歌利亞",
          "title_en": "David and Goliath",
          "narration_zh": "大衛在以拉谷用機弦石擊倒非利士巨人歌利亞，耶和華得勝。",
          "narration_en": "David struck down Goliath in the Valley of Elah — victory belonged to the LORD.",
          "focus": [
              "david_army",
              "philistines"
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
              "lng": 35.1,
              "lat": 31.75,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1010–1003年",
          "title_zh": "躲避掃羅",
          "title_en": "Fleeing Saul",
          "narration_zh": "大衛被掃羅追逼，卻兩次不害受膏者，等候神時候。",
          "narration_en": "David fled Saul yet twice spared the LORD's anointed.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1003年",
          "title_zh": "作猶大王",
          "title_en": "King of Judah",
          "narration_zh": "掃羅陣亡後，大衛先在希伯崙作猶大王七年半。",
          "narration_en": "After Saul's death David reigned over Judah at Hebron for seven and a half years.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1000年",
          "title_zh": "統一建都",
          "title_en": "United Kingdom",
          "narration_zh": "大衛攻取耶路撒冷作京城，迎約櫃入城，籌建聖殿。",
          "narration_en": "David captured Jerusalem as capital and brought the ark — planning the temple.",
          "focus": [
              "david_army"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "大衛",
                  "en": "David"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "大衛時期",
      "title_en": "KING DAVID",
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
