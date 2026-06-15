/* ABRAHAM'S JOURNEY · 亞伯拉罕生平 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "abraham",
      "title_zh": "亞伯拉罕生平",
      "title_en": "ABRAHAM'S JOURNEY",
      "subtitle": "創12–25章",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 31,
          "maxLng": 49,
          "minLat": 28,
          "maxLat": 36,
          "Z": 6
      },
      "startDate": "創12–25章",
      "introCam": {
          "lng": 35.5,
          "lat": 32,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "亞伯拉罕生平",
          "en": "ABRAHAM'S JOURNEY · 創12–25章",
          "narr_zh": "耶和華對亞伯蘭說：你要離開本地本族，往我所要指示你的地去。",
          "narr_en": "The LORD said to Abram: Go from your country to the land I will show you."
      },
      "outroCam": {
          "lng": 35.5,
          "lat": 32,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../exodus-canaan/",
          "title_zh": "出埃及與進迦南",
          "title_en": "EXODUS & CONQUEST"
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
              "name_zh": "吾珥",
              "name_en": "Ur",
              "type": "city",
              "lng": 46.1,
              "lat": 30.96
          },
          {
              "name_zh": "哈蘭",
              "name_en": "Haran",
              "type": "city",
              "lng": 39.02,
              "lat": 36.86
          },
          {
              "name_zh": "示劍",
              "name_en": "Shechem",
              "type": "town",
              "lng": 35.28,
              "lat": 32.21
          },
          {
              "name_zh": "希伯崙",
              "name_en": "Hebron",
              "type": "town",
              "lng": 35.1,
              "lat": 31.53
          },
          {
              "name_zh": "摩利亞",
              "name_en": "Moriah",
              "type": "peak",
              "lng": 35.23,
              "lat": 31.78
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "abram",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "亞伯蘭一家",
          "name_en": "Abram's household",
          "track": [
              {
                  "d": 1,
                  "lng": 46.1,
                  "lat": 30.96,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 30,
                  "lng": 39.02,
                  "lat": 36.86,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 35.28,
                  "lat": 32.21,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.1,
                  "lat": 31.53,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "covenant",
          "from": [
              46.1,
              30.96
          ],
          "to": [
              39.02,
              36.86
          ],
          "label": "離開吾珥",
          "kind": "retreat"
      },
      {
          "d": 50,
          "f": "covenant",
          "from": [
              39.02,
              36.86
          ],
          "to": [
              35.28,
              32.21
          ],
          "label": "進入迦南",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 35.2,
          "lat": 32,
          "kind": "firefight",
          "i": 0.3
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "亞伯拉罕生平",
          "en": "ABRAHAM'S JOURNEY"
      }
  ];
  const notes =   {
      "summary": "亞伯拉罕生平 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "亞伯蘭蒙召離開吾珥，經哈蘭遷往迦南；因饑荒下埃及，後分別與羅得，在希伯崙居住；在摩利亞獻以撒，見證信心順服。",
      "leaders": "亞伯蘭／亞伯拉罕為信心之父；撒萊、羅得、麥基洗德、以撒均為關鍵人物。耶和華與他立約，應許土地與後裔。",
      "nationalPower": "耶和華與亞伯蘭立約：「我要使你成為大國，地上萬族因你得福。」應許之地的預表指向基督與新約信徒的產業。",
      "impact": "亞伯拉罕的旅程奠定選民歷史起點；新約視他為因信稱義的楷模（羅4；加3）。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 46.1,
              "lat": 30.96,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "吾珥的呼召",
          "title_en": "Call from Ur",
          "narration_zh": "耶和華對亞伯蘭說：你要離開本地、本族、父家，往我所要指示你的地去。",
          "narration_en": "The LORD called Abram to leave Ur for the land He would show him.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "亞伯蘭",
                  "en": "Abram"
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
              "lng": 39.02,
              "lat": 36.86,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "停留哈蘭",
          "title_en": "Sojourn in Haran",
          "narration_zh": "亞伯蘭帶著妻子撒萊與姪兒羅得，從哈蘭往迦南地去。",
          "narration_en": "Abram departed Haran with Sarai and Lot toward Canaan.",
          "focus": [
              "abram"
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
              "lng": 35.28,
              "lat": 32.21,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "進入迦南",
          "title_en": "Entering Canaan",
          "narration_zh": "亞伯蘭經過示劍，耶和華顯現應許：「我要將這地賜給你的後裔。」",
          "narration_en": "At Shechem the LORD promised the land to Abram's offspring.",
          "focus": [
              "abram"
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
              "lng": 35.1,
              "lat": 31.53,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "希伯崙居住",
          "title_en": "Dwelling in Hebron",
          "narration_zh": "亞伯蘭在希伯崙築壇；與羅得分地，羅得選約旦平原，亞伯蘭仍住迦南。",
          "narration_en": "Abram settled near Hebron and parted from Lot, who chose the Jordan plain.",
          "focus": [
              "abram"
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
              "lng": 35.23,
              "lat": 31.78,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前2000年",
          "title_zh": "摩利亞獻以撒",
          "title_en": "Isaac on Moriah",
          "narration_zh": "耶和華試驗亞伯拉罕，命他在摩利亞獻以撒；耶和華預備羊羔，堅立永約。",
          "narration_en": "On Moriah Abraham offered Isaac in faith; God provided a ram and confirmed the covenant.",
          "focus": [
              "abram"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "亞伯拉罕",
                  "en": "Abraham"
              },
              {
                  "zh": "以撒",
                  "en": "Isaac"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "亞伯拉罕生平",
      "title_en": "ABRAHAM'S JOURNEY",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.5,
          "lat": 32,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
