/* PROPHETS TIMELINE · 先知時序 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "prophets",
      "title_zh": "先知時序",
      "title_en": "PROPHETS TIMELINE",
      "subtitle": "先知書",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 31,
          "maxLng": 45,
          "minLat": 28,
          "maxLat": 36,
          "Z": 7
      },
      "startDate": "先知書",
      "introCam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "先知時序",
          "en": "PROPHETS TIMELINE · 先知書",
          "narr_zh": "耶和華的話臨到先知，在猶大與以色列宣告審判與安慰。",
          "narr_en": "The word of the LORD came to the prophets in Judah and Israel."
      },
      "outroCam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../israel-fall/",
          "title_zh": "以色列亡國",
          "title_en": "FALL OF ISRAEL"
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
              "name_zh": "撒瑪利亞",
              "name_en": "Samaria",
              "type": "city",
              "lng": 35.19,
              "lat": 32.27
          },
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.23,
              "lat": 31.78
          },
          {
              "name_zh": "巴比倫",
              "name_en": "Babylon",
              "type": "city",
              "lng": 44.42,
              "lat": 32.54
          },
          {
              "name_zh": "尼尼微",
              "name_en": "Nineveh",
              "type": "city",
              "lng": 43.15,
              "lat": 36.35
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "prophets",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": false,
          "name_zh": "先知",
          "name_en": "Prophets",
          "track": [
              {
                  "d": 1,
                  "lng": 35.19,
                  "lat": 32.27,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 44.42,
                  "lat": 32.54,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "先知時序",
          "en": "PROPHETS TIMELINE"
      }
  ];
  const notes =   {
      "summary": "先知時序 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "先知從北國以利亞、以利沙，到南國以賽亞、耶利米、以西結等，在審判與安慰中傳達耶和華的話；部分被擄至巴比倫仍發預言。",
      "leaders": "以利亞、以利沙、阿摩司、何西亞、以賽亞、彌迦、耶利米、以西結、但以理、哈該、撒迦利亞、瑪拉基。",
      "nationalPower": "先知呼籲悔改，預告審判與復興；彌賽亞預言貫穿其中，指向受苦與榮耀的君王。",
      "impact": "先知書成為舊約神學高峰；新約證實預言在基督身上應驗。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.19,
              "lat": 32.27,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前9世紀",
          "title_zh": "北國先知",
          "title_en": "Northern Prophets",
          "narration_zh": "以利亞在迦密山對抗巴力先知；以利沙接續其工。",
          "narration_en": "Elijah confronted Baal on Carmel; Elisha continued his ministry.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以利亞",
                  "en": "Elijah"
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
              "lng": 35.23,
              "lat": 31.78,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前8世紀",
          "title_zh": "南國大先知",
          "title_en": "Major Prophets of Judah",
          "narration_zh": "以賽亞在耶路撒冷預言童女懷孕生子；彌迦預告伯利恆出生的君王。",
          "narration_en": "Isaiah foretold a virgin-born son; Micah named Bethlehem as Messiah's birthplace.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以賽亞",
                  "en": "Isaiah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前7–6世紀",
          "title_zh": "耶利米與審判",
          "title_en": "Jeremiah's Warning",
          "narration_zh": "耶利米呼籲猶大悔改，預言聖殿與城將被毀，卻應許新約。",
          "narration_en": "Jeremiah warned of Jerusalem's fall yet promised a new covenant.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶利米",
                  "en": "Jeremiah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 44.42,
              "lat": 32.54,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "被擄期",
          "title_zh": "巴比倫先知",
          "title_en": "Prophets in Exile",
          "narration_zh": "以西結在巴比倫見異象；但以理在宮中見證；預言復歸與彌賽國度。",
          "narration_en": "Ezekiel and Daniel prophesied in Babylon — visions of restoration and God's kingdom.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以西結",
                  "en": "Ezekiel"
              },
              {
                  "zh": "但以理",
                  "en": "Daniel"
              }
          ],
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
          "dateLabel": "約前5世紀",
          "title_zh": "歸回與瑪拉基",
          "title_en": "Return and Malachi",
          "narration_zh": "哈該、撒迦利亞鼓勵重建聖殿；瑪拉基預告以利亞再來，舊約先知聲音止息。",
          "narration_en": "Haggai and Zechariah urged temple rebuilding; Malachi closed the prophetic era.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "先知時序",
      "title_en": "PROPHETS TIMELINE",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.2,
          "lat": 32.2,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
