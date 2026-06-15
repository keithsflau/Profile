/* FALL OF JUDAH · 猶大亡國 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "judah-fall",
      "title_zh": "猶大亡國",
      "title_en": "FALL OF JUDAH",
      "subtitle": "586 BC",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.73,
          "maxLng": 36.73,
          "minLat": 30.53,
          "maxLat": 33.03,
          "Z": 11
      },
      "startDate": "586 BC",
      "introCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "猶大亡國",
          "en": "FALL OF JUDAH · 586 BC",
          "narr_zh": "巴比倫王尼布甲尼撒攻破耶路撒冷，焚燒聖殿。",
          "narr_en": "Nebuchadnezzar destroyed Jerusalem and burned the temple."
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
          "href": "../jesus/",
          "title_zh": "耶穌生平",
          "title_en": "LIFE OF JESUS"
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
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "fort",
              "lng": 35.23,
              "lat": 31.78
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "jerusalem",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "耶路撒冷",
          "name_en": "Jerusalem",
          "track": [
              {
                  "d": 1,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 90,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 0,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "babylon",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "巴比倫軍",
          "name_en": "Babylonian army",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 32,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 80000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 50,
          "b": 100,
          "lng": 35.23,
          "lat": 31.78,
          "kind": "artillery",
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
          "zh": "猶大亡國",
          "en": "FALL OF JUDAH"
      }
  ];
  const notes =   {
      "summary": "猶大亡國 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "猶大屢次背叛，尼布甲尼撒多次攻耶路撒冷；最終城陷、聖殿被焚、百姓被擄巴比倫，開始七十年被擄期。",
      "leaders": "約雅敬、西底家為末代猶大王；尼布甲尼撒、巴比倫軍；耶利米、以西結預言審判與盼望。",
      "nationalPower": "聖殿被毀顯明神離開因罪玷污的敬拜；新約指向基督作真正的殿；被擄促使悔改與新約應許。",
      "impact": "被擄結束以斯拉、尼希米歸回重建；為彌賽亞降生時的猶太地景奠定基礎。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前597年",
          "title_zh": "首次被擄",
          "title_en": "First Deportation",
          "narration_zh": "尼布甲尼撒攻耶路撒冷，擄去約雅敬與貴胄。",
          "narration_en": "Nebuchadnezzar took Jehoiachin and nobles to Babylon.",
          "focus": [
              "jerusalem",
              "babylon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前586年前",
          "title_zh": "西底家叛變",
          "title_en": "Zedekiah's Revolt",
          "narration_zh": "西底家背約投靠埃及，巴比倫大軍再圍耶路撒冷。",
          "narration_en": "Zedekiah rebelled; Babylon's army returned to besiege Jerusalem.",
          "focus": [
              "babylon"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "西底家",
                  "en": "Zedekiah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "城牆被破",
          "title_en": "Walls Breached",
          "narration_zh": "城圍一年半，饑荒極甚，城被攻陷；西底家眾子被殺，他被剜眼。",
          "narration_en": "After eighteen months the city fell; Zedekiah's sons were killed, his eyes put out.",
          "focus": [
              "jerusalem"
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
          "day": 72,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "聖殿被焚",
          "title_en": "Temple Destroyed",
          "narration_zh": "尼布甲尼撒焚燒耶和華殿與城內大戶房屋，拆毀城牆。",
          "narration_en": "Nebuchadnezzar burned the LORD's temple and tore down the walls.",
          "focus": [
              "jerusalem"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 92,
          "hold": 8,
          "cam": {
              "lng": 44.42,
              "lat": 32.54,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前586年",
          "title_zh": "被擄巴比倫",
          "title_en": "Exile to Babylon",
          "narration_zh": "百姓被擄至巴比倫，「我們曾在錫安琴旁懸掛琴瑟」；七十年為期。",
          "narration_en": "The people were exiled to Babylon — seventy years as Jeremiah had foretold.",
          "focus": [
              "babylon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "猶大亡國",
      "title_en": "FALL OF JUDAH",
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
