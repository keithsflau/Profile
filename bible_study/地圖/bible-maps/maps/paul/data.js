/* PAUL'S JOURNEYS · 保羅傳福音 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "paul",
      "title_zh": "保羅傳福音",
      "title_en": "PAUL'S JOURNEYS",
      "subtitle": "使徒行傳",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 10,
          "maxLng": 40,
          "minLat": 28,
          "maxLat": 48,
          "Z": 6
      },
      "startDate": "使徒行傳",
      "introCam": {
          "lng": 36.2,
          "lat": 36.2,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "保羅傳福音",
          "en": "PAUL'S JOURNEYS · 使徒行傳",
          "narr_zh": "保羅行程滿了耶穌的見證，在外邦建立教會。",
          "narr_en": "Paul bore witness to Jesus and planted churches among the nations."
      },
      "outroCam": {
          "lng": 36.2,
          "lat": 36.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../gospel-europe/",
          "title_zh": "福音傳遍歐洲",
          "title_en": "GOSPEL TO EUROPE"
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
              "name_zh": "安提阿",
              "name_en": "Antioch",
              "type": "city",
              "lng": 36.2,
              "lat": 36.2
          },
          {
              "name_zh": "以弗所",
              "name_en": "Ephesus",
              "type": "city",
              "lng": 27.34,
              "lat": 37.94
          },
          {
              "name_zh": "哥林多",
              "name_en": "Corinth",
              "type": "city",
              "lng": 22.93,
              "lat": 37.94
          },
          {
              "name_zh": "羅馬",
              "name_en": "Rome",
              "type": "city",
              "lng": 12.5,
              "lat": 41.9
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "paul",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "保羅一行",
          "name_en": "Paul's party",
          "track": [
              {
                  "d": 1,
                  "lng": 36.2,
                  "lat": 36.2,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 35,
                  "lng": 27.34,
                  "lat": 37.94,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 65,
                  "lng": 22.93,
                  "lat": 37.94,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 12.5,
                  "lat": 41.9,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 10,
          "f": "covenant",
          "from": [
              36.2,
              36.2
          ],
          "to": [
              27.34,
              37.94
          ],
          "label": "第一次宣教",
          "kind": "attack"
      },
      {
          "d": 70,
          "f": "covenant",
          "from": [
              22.93,
              37.94
          ],
          "to": [
              12.5,
              41.9
          ],
          "label": "赴羅馬",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "保羅傳福音",
          "en": "PAUL'S JOURNEYS"
      }
  ];
  const notes =   {
      "summary": "保羅傳福音 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "保羅（掃羅）在大馬士革路上遇復活主後歸主；三次宣教旅程橫越小亞細亞、希臘，建立眾教會；最終在羅馬為主作證。",
      "leaders": "保羅、巴拿巴、西拉、提摩太、路加；彼拉多、猶太領袖、羅馬官員；各城會眾與反對者。",
      "nationalPower": "因信稱義的福音傳向外邦；保羅書信闡明因信與教會論；「我當得的報應已經在了」見證忠心到底。",
      "impact": "保羅開闢歐洲宣教路線；其書信構成新約神學重要部分；羅馬教會成為帝國中心據點。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 36.2,
              "lat": 36.2,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元46年",
          "title_zh": "安提阿差遣",
          "title_en": "Sent from Antioch",
          "narration_zh": "安提阿教會按手差遣保羅與巴拿巴，開始第一次宣教旅程。",
          "narration_en": "The church at Antioch sent Paul and Barnabas on the first missionary journey.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "保羅",
                  "en": "Paul"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 27.34,
              "lat": 37.94,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第一次宣教",
          "title_zh": "以弗所與加拉太",
          "title_en": "Ephesus and Galatia",
          "narration_zh": "保羅在小亞細亞傳道，各城有人歸主，也遭遇逼迫。",
          "narration_en": "Paul preached across Asia Minor — converts and persecution followed.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 22.93,
              "lat": 37.94,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第二次宣教",
          "title_zh": "哥林多建立教會",
          "title_en": "Church in Corinth",
          "narration_zh": "保羅在哥林多住了一年半，建立教會，寫哥林多前後書。",
          "narration_en": "Paul stayed eighteen months in Corinth, planting the church and writing letters.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 23.7,
              "lat": 37.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "第三次宣教",
          "title_zh": "以弗所三年",
          "title_en": "Three Years in Ephesus",
          "narration_zh": "保羅在以弗所勞苦作工，「兩年的工夫，叫一切住在亞細亞的人都聽見主道」。",
          "narration_en": "Two years in Ephesus — all Asia heard the word of the Lord.",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 12.5,
              "lat": 41.9,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元60–67年",
          "title_zh": "羅馬見證",
          "title_en": "Witness in Rome",
          "narration_zh": "保羅為上告羅馬，在該撒家裡和別處傳福音，「我當得的報應已經在了」。",
          "narration_en": "Paul appealed to Caesar and preached in Rome — 'I have finished the race.'",
          "focus": [
              "paul"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "保羅",
                  "en": "Paul"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "保羅傳福音",
      "title_en": "PAUL'S JOURNEYS",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 36.2,
          "lat": 36.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
