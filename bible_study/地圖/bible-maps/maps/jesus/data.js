/* LIFE OF JESUS · 耶穌生平 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "jesus",
      "title_zh": "耶穌生平",
      "title_en": "LIFE OF JESUS",
      "subtitle": "四福音",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.2,
          "maxLng": 37.2,
          "minLat": 30.5,
          "maxLat": 33.5,
          "Z": 10
      },
      "startDate": "四福音",
      "introCam": {
          "lng": 35.23,
          "lat": 31.78,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "耶穌生平",
          "en": "LIFE OF JESUS · 四福音",
          "narr_zh": "道成了肉身，住在我們中間，充充滿滿地有恩典有真理。",
          "narr_en": "The Word became flesh and dwelt among us."
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
          "href": "../paul/",
          "title_zh": "保羅傳福音",
          "title_en": "PAUL'S JOURNEYS"
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
              "name_zh": "拿撒勒",
              "name_en": "Nazareth",
              "type": "town",
              "lng": 35.3,
              "lat": 32.7
          },
          {
              "name_zh": "迦百農",
              "name_en": "Capernaum",
              "type": "town",
              "lng": 35.58,
              "lat": 32.88
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
          "id": "jesus",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "耶穌與門徒",
          "name_en": "Jesus & disciples",
          "track": [
              {
                  "d": 1,
                  "lng": 35.2,
                  "lat": 31.7,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 30,
                  "lng": 35.58,
                  "lat": 32.88,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.23,
                  "lat": 31.78,
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
          "zh": "耶穌生平",
          "en": "LIFE OF JESUS"
      }
  ];
  const notes =   {
      "summary": "耶穌生平 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "耶穌在伯利恆降生，在拿撒勒成長；在加利利開始公開事工，呼召門徒；在耶路撒冷受難、埋葬、第三日復活。",
      "leaders": "耶穌、馬利亞、約瑟、施洗約翰、十二門徒、彼拉多、猶太領袖。",
      "nationalPower": "道成肉身；耶穌宣告天國近了；十字架成就救贖；復活戰勝死亡，顯明祂是神的兒子。",
      "impact": "基督生平是救恩歷史的中心；教會建立在復活見證之上；大使命差遣門徒往普天下去。"
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
          "dateLabel": "約公元前4年",
          "title_zh": "伯利恆降生",
          "title_en": "Birth at Bethlehem",
          "narration_zh": "馬利亞在伯利恆生下耶穌；天使報喜，牧羊人來拜。",
          "narration_en": "Jesus was born in Bethlehem — angels announced good news to shepherds.",
          "focus": [
              "jesus"
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
              "lng": 35.3,
              "lat": 32.7,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "成長",
          "title_zh": "拿撒勒成長",
          "title_en": "Growing in Nazareth",
          "narration_zh": "耶穌在拿撒勒長大，智慧與身量一齊增長，神和人喜愛祂。",
          "narration_en": "Jesus grew in wisdom and stature in Nazareth, favored by God and man.",
          "focus": [
              "jesus"
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
              "lng": 35.58,
              "lat": 32.88,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元27–30年",
          "title_zh": "加利利事工",
          "title_en": "Ministry in Galilee",
          "narration_zh": "耶穌在迦百農呼召門徒，醫病、趕鬼、講道，天國的福音傳開。",
          "narration_en": "At Capernaum Jesus called disciples, healed, taught — the gospel of the kingdom spread.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶穌",
                  "en": "Jesus"
              }
          ],
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
          "dateLabel": "公元30年",
          "title_zh": "耶路撒冷受難",
          "title_en": "Passion Week",
          "narration_zh": "耶穌騎驢進城，最後晚餐，客西馬尼禱告，被釘十字架。",
          "narration_en": "Triumphal entry, Last Supper, Gethsemane — then the cross.",
          "focus": [
              "jesus"
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
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元30年",
          "title_zh": "復活",
          "title_en": "Resurrection",
          "narration_zh": "第三日從死裡復活，向門徒顯現，吩咐他們作祂見證直到地極。",
          "narration_en": "On the third day He rose, appeared to disciples, and commissioned them to the ends of the earth.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "耶穌生平",
      "title_en": "LIFE OF JESUS",
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
