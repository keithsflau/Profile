/* KING SOLOMON · 所羅門時期 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "solomon",
      "title_zh": "所羅門時期",
      "title_en": "KING SOLOMON",
      "subtitle": "王上1–11",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.98,
          "maxLng": 36.48,
          "minLat": 30.78,
          "maxLat": 32.78,
          "Z": 11
      },
      "startDate": "王上1–11",
      "introCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "所羅門時期",
          "en": "KING SOLOMON · 王上1–11",
          "narr_zh": "所羅門在耶路撒冷作以色列眾人的王；他作王四十年。",
          "narr_en": "Solomon reigned in Jerusalem over all Israel forty years."
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
          "href": "../kingdom-split/",
          "title_zh": "國度分裂",
          "title_en": "KINGDOM DIVIDED"
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
              "name_zh": "聖殿山",
              "name_en": "Temple Mount",
              "type": "fort",
              "lng": 35.235,
              "lat": 31.778
          },
          {
              "name_zh": "推羅",
              "name_en": "Tyre",
              "type": "city",
              "lng": 35.2,
              "lat": 33.27
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "solomon",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "所羅門王國",
          "name_en": "Solomon's kingdom",
          "track": [
              {
                  "d": 1,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.23,
                  "lat": 31.78,
                  "s": 90000,
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
          "zh": "所羅門時期",
          "en": "KING SOLOMON"
      }
  ];
  const notes =   {
      "summary": "所羅門時期 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "所羅門繼承大衛王位；在耶路撒冷建聖殿，國力達頂峰；與推羅合作，示巴女王來朝；晚年離棄耶和華，國勢埋下分裂種子。",
      "leaders": "所羅門、大衛、推羅希蘭、示巴女王；先知拿單與亞希雅預言分裂。",
      "nationalPower": "所羅門求智慧治理；聖殿為耶和華名居住之地，預表基督與教會；箴言與傳道書見證智慧與虛空。",
      "impact": "所羅門的繁榮與敗壞成為後世警戒；聖殿成為敬拜中心直至被毀。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.23,
              "lat": 31.78,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前970年",
          "title_zh": "繼位求智慧",
          "title_en": "Wisdom Requested",
          "narration_zh": "所羅門在基遍獻祭，求智慧治理百姓；神賜他智慧、尊榮與財富。",
          "narration_en": "Solomon asked for wisdom to govern; God gave wisdom, honor, and riches.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "所羅門",
                  "en": "Solomon"
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
              "lng": 35.235,
              "lat": 31.778,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前966年",
          "title_zh": "建造聖殿",
          "title_en": "Building the Temple",
          "narration_zh": "大衛預備材料，所羅門在聖殿山建耶和華殿，七年建成。",
          "narration_en": "Solomon built the LORD's temple on Mount Moriah over seven years.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.2,
              "lat": 33.27,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "所羅門年間",
          "title_zh": "與推羅合作",
          "title_en": "Alliance with Tyre",
          "narration_zh": "所羅門與推羅王希蘭合作，建殿並發展海上貿易。",
          "narration_en": "Solomon partnered with Hiram of Tyre for the temple and maritime trade.",
          "focus": [
              "solomon"
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
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "所羅門年間",
          "title_zh": "示巴女王",
          "title_en": "Queen of Sheba",
          "narration_zh": "示巴女王聽聞所羅門的智慧，前來觀看，稱頌耶和華。",
          "narration_en": "The Queen of Sheba came to test Solomon's wisdom and praised the LORD.",
          "focus": [
              "solomon"
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
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前931年",
          "title_zh": "晚年離棄",
          "title_en": "Turning Away",
          "narration_zh": "所羅門為外邦妃嬪建丘壇，心偏離耶和華；神預告國度將分裂。",
          "narration_en": "Solomon's heart turned; God foretold the kingdom would be torn away.",
          "focus": [
              "solomon"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "所羅門時期",
      "title_en": "KING SOLOMON",
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
