/* EXODUS & CONQUEST · 出埃及與進迦南 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "exodus",
      "title_zh": "出埃及與進迦南",
      "title_en": "EXODUS & CONQUEST",
      "subtitle": "出–申–書",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 28,
          "maxLng": 40,
          "minLat": 24,
          "maxLat": 34,
          "Z": 8
      },
      "startDate": "出–申–書",
      "introCam": {
          "lng": 34.5,
          "lat": 28.5,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "出埃及與進迦南",
          "en": "EXODUS & CONQUEST · 出–申–書",
          "narr_zh": "我必救你脫離埃及人的苦難，領你進入美好寬闊流奶與蜜之地。",
          "narr_en": "I will bring you up out of Egypt to a land flowing with milk and honey."
      },
      "outroCam": {
          "lng": 34.5,
          "lat": 28.5,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../judges/",
          "title_zh": "士師時代",
          "title_en": "JUDGES"
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
              "name_zh": "蘭塞",
              "name_en": "Rameses",
              "type": "city",
              "lng": 31.87,
              "lat": 30.8
          },
          {
              "name_zh": "紅海",
              "name_en": "Red Sea",
              "type": "bay",
              "lng": 33,
              "lat": 28.5
          },
          {
              "name_zh": "西奈山",
              "name_en": "Mount Sinai",
              "type": "peak",
              "lng": 33.97,
              "lat": 28.54
          },
          {
              "name_zh": "加低斯",
              "name_en": "Kadesh",
              "type": "town",
              "lng": 34.45,
              "lat": 30.6
          },
          {
              "name_zh": "耶利哥",
              "name_en": "Jericho",
              "type": "fort",
              "lng": 35.46,
              "lat": 31.87
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "israel_ex",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "以色列人",
          "name_en": "Israelites",
          "track": [
              {
                  "d": 1,
                  "lng": 31.87,
                  "lat": 30.8,
                  "s": 600000,
                  "st": "retreat"
              },
              {
                  "d": 25,
                  "lng": 33,
                  "lat": 28.5,
                  "s": 600000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 33.97,
                  "lat": 28.54,
                  "s": 600000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 34.45,
                  "lat": 30.6,
                  "s": 500000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.46,
                  "lat": 31.87,
                  "s": 400000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "egypt_ex",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "埃及軍",
          "name_en": "Egyptian army",
          "track": [
              {
                  "d": 20,
                  "lng": 32.5,
                  "lat": 29.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 30,
                  "lng": 33,
                  "lat": 28.5,
                  "s": 0,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 15,
          "f": "covenant",
          "from": [
              31.87,
              30.8
          ],
          "to": [
              33,
              28.5
          ],
          "label": "出埃及",
          "kind": "retreat"
      },
      {
          "d": 90,
          "f": "covenant",
          "from": [
              34.45,
              30.6
          ],
          "to": [
              35.46,
              31.87
          ],
          "label": "過約旦",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 35,
          "lng": 33,
          "lat": 28.5,
          "kind": "landing",
          "i": 0.8
      },
      {
          "a": 85,
          "b": 100,
          "lng": 35.46,
          "lat": 31.87,
          "kind": "firefight",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "出埃及與進迦南",
          "en": "EXODUS & CONQUEST"
      }
  ];
  const notes =   {
      "summary": "出埃及與進迦南 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "以色列人在埃及受奴役；摩西領百姓出埃及，過紅海，在西奈領律法，曠野漂流四十年；約書亞率民過約旦，攻取耶利哥，開始征服迦南。",
      "leaders": "摩西、亞倫、約書亞、迦勒為核心領袖；法老與亞瑪力王為主要敵對勢力。",
      "nationalPower": "出埃及預表救贖；逾越羔羊指向上十字架的基督；律法顯明罪，引到基督；進迦南預表信徒進入屬靈安息。",
      "impact": "出埃及成為以色列國族認同的根基；新約將救恩比作從罪權勢中得釋放。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 31.87,
              "lat": 30.8,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "埃及為奴",
          "title_en": "Slavery in Egypt",
          "narration_zh": "以色列人在蘭塞地作苦工，哀聲達到神面前。",
          "narration_en": "Israel groaned under bondage in the land of Rameses.",
          "focus": [
              "israel_ex",
              "egypt_ex"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "摩西",
                  "en": "Moses"
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
              "lng": 33,
              "lat": 28.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "過紅海",
          "title_en": "Crossing the Red Sea",
          "narration_zh": "摩西伸杖分海，以色列人走乾地過海；埃及軍追趕，海水回流淹沒軍兵。",
          "narration_en": "The sea parted for Israel; Egypt's army was swallowed by the returning waters.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "landing"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 33.97,
              "lat": 28.54,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "西奈立約",
          "title_en": "Covenant at Sinai",
          "narration_zh": "在西奈山頒布十誡與律法，立以色列為祭司國度、聖潔的國民。",
          "narration_en": "At Sinai God gave the Law and made Israel a kingdom of priests.",
          "focus": [
              "israel_ex"
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
              "lng": 34.45,
              "lat": 30.6,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "曠野四十年",
          "title_zh": "加低斯漂流",
          "title_en": "Wilderness Years",
          "narration_zh": "因不信，一代人在曠野倒斃；只有約書亞、迦勒進入應許地。",
          "narration_en": "An unbelieving generation perished; only Joshua and Caleb would enter the land.",
          "focus": [
              "israel_ex"
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
              "lng": 35.46,
              "lat": 31.87,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1400年",
          "title_zh": "攻取耶利哥",
          "title_en": "Fall of Jericho",
          "narration_zh": "約書亞率民過約旦，繞城七日，耶利哥城牆倒塌，開始征服迦南。",
          "narration_en": "Joshua led Israel across the Jordan; Jericho's walls fell — the conquest began.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "約書亞",
                  "en": "Joshua"
              }
          ],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "出埃及與進迦南",
      "title_en": "EXODUS & CONQUEST",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 34.5,
          "lat": 28.5,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
