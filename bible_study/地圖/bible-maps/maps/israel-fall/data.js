/* FALL OF ISRAEL · 以色列亡國 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "israel-fall",
      "title_zh": "以色列亡國",
      "title_en": "FALL OF ISRAEL",
      "subtitle": "722 BC",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.69,
          "maxLng": 36.69,
          "minLat": 31.02,
          "maxLat": 33.52,
          "Z": 10
      },
      "startDate": "722 BC",
      "introCam": {
          "lng": 35.19,
          "lat": 32.27,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "以色列亡國",
          "en": "FALL OF ISRAEL · 722 BC",
          "narr_zh": "亞述王攻陷撒瑪利亞，將以色列人擄去亞述。",
          "narr_en": "The king of Assyria captured Samaria and deported Israel."
      },
      "outroCam": {
          "lng": 35.19,
          "lat": 32.27,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../judah-fall/",
          "title_zh": "猶大國亡國",
          "title_en": "FALL OF JUDAH"
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
              "type": "fort",
              "lng": 35.19,
              "lat": 32.27
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "samaria",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "撒瑪利亞",
          "name_en": "Samaria",
          "track": [
              {
                  "d": 1,
                  "lng": 35.19,
                  "lat": 32.27,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.19,
                  "lat": 32.27,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "assyria",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "亞述軍",
          "name_en": "Assyrian army",
          "track": [
              {
                  "d": 1,
                  "lng": 35.5,
                  "lat": 33,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.19,
                  "lat": 32.27,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 100,
          "lng": 35.19,
          "lat": 32.27,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "以色列亡國",
          "en": "FALL OF ISRAEL"
      }
  ];
  const notes =   {
      "summary": "以色列亡國 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "北國以色列經十九王朝更迭，終於亞述王撒珥根二世圍攻撒瑪利亞三年，城陷後百姓被擄散至亞述各城。",
      "leaders": "何細亞為末代以色列王；亞述諸王為征服者；先知何西亞、阿摩司曾預告審判。",
      "nationalPower": "亡國是長期偶像與背約的後果；「我必追趕他們，卻追不上」顯明神的離棄。",
      "impact": "北國十支派被擄後融入外邦；猶大仍保存大衛譜系與敬拜中心。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.19,
              "lat": 32.27,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前722年前",
          "title_zh": "北國末期",
          "title_en": "Final Years of Israel",
          "narration_zh": "北國罪惡滿盈，何細亞背叛亞述，引來大軍圍攻。",
          "narration_en": "Israel's sin was full; Hoshea's revolt brought Assyrian invasion.",
          "focus": [
              "samaria",
              "assyria"
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
              "lng": 35.19,
              "lat": 32.27,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前724年",
          "title_zh": "圍攻撒瑪利亞",
          "title_en": "Siege of Samaria",
          "narration_zh": "亞述王圍困撒瑪利亞三年，城內饑荒極甚。",
          "narration_en": "Assyria besieged Samaria for three years — famine ravaged the city.",
          "focus": [
              "assyria"
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
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.19,
              "lat": 32.27,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "城陷",
          "title_en": "City Falls",
          "narration_zh": "撒瑪利亞城被攻取，以色列王何細亞被囚。",
          "narration_en": "Samaria fell; King Hoshea was imprisoned.",
          "focus": [
              "samaria"
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
              "lng": 35.5,
              "lat": 33.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "被擄分散",
          "title_en": "Deportation",
          "narration_zh": "亞述王將以色列人擄到亞述各地，又從外邦遷人入撒瑪利亞。",
          "narration_en": "Israelites were deported across Assyria; foreigners settled Samaria.",
          "focus": [
              "assyria"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 92,
          "hold": 8,
          "cam": {
              "lng": 35.19,
              "lat": 32.27,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "北國終結",
          "title_en": "End of Northern Kingdom",
          "narration_zh": "以色列國滅亡，只剩南國猶大；先知預言的審判應驗。",
          "narration_en": "The northern kingdom ended — only Judah remained; prophetic judgment was fulfilled.",
          "focus": [
              "samaria"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "以色列亡國",
      "title_en": "FALL OF ISRAEL",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.19,
          "lat": 32.27,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
