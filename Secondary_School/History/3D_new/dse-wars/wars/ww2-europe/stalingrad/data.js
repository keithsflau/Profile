/* STALINGRAD · 斯大林格勒戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-stalingrad",
      "title_zh": "斯大林格勒戰役",
      "title_en": "STALINGRAD",
      "subtitle": "1942–1943",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 43.27,
          "maxLng": 45.77,
          "minLat": 47.71,
          "maxLat": 49.71,
          "Z": 10
      },
      "startDate": [
          1942,
          8,
          23
      ],
      "introCam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "斯大林格勒戰役",
          "en": "STALINGRAD · 1942–1943",
          "narr_zh": "德軍圍攻斯大林格勒，蘇軍反攻合圍德軍。",
          "narr_en": "Germany besieges Stalingrad — the Red Army encircles the 6th Army."
      },
      "outroCam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "axis": {
          "main": 4868682,
          "glow": 9109504,
          "dim": 2763306,
          "css": "#6b2020",
          "label_zh": "軸心國",
          "label_en": "Axis",
          "emblem": "circle",
          "maxStrength": 150000,
          "textLight": "#e8d0d0"
      },
      "allies": {
          "main": 1789810,
          "glow": 3447003,
          "dim": 867706,
          "css": "#1b4f72",
          "label_zh": "同盟國",
          "label_en": "Allies",
          "emblem": "shield",
          "maxStrength": 160000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Stalingrad",
              "name_zh": "斯大林格勒",
              "type": "city",
              "lng": 44.52,
              "lat": 48.71
          },
          {
              "name_en": "Volga River",
              "name_zh": "伏爾加河",
              "type": "bay",
              "lng": 44.55,
              "lat": 48.72
          },
          {
              "name_en": "Mamayev Kurgan",
              "name_zh": "馬馬耶夫山崗",
              "type": "fort",
              "lng": 44.54,
              "lat": 48.74
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ax_6th",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第六集團軍",
          "name_en": "German 6th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 44.6,
                  "lat": 48.8,
                  "s": 110000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 20000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "al_red",
          "faction": "allies",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "蘇聯第62集團軍",
          "name_en": "Soviet 62nd Army",
          "track": [
              {
                  "d": 1,
                  "lng": 44.5,
                  "lat": 48.7,
                  "s": 100000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 130000,
                  "st": "attack"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "axis",
          "from": [
              44.6,
              48.8
          ],
          "to": [
              44.52,
              48.71
          ],
          "label": "巷戰圍城",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 100,
          "lng": 44.52,
          "lat": 48.71,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.25,
          "fog": 0.3,
          "rain": 0.1,
          "smoke": 0.8,
          "zh": "斯大林格勒廢墟",
          "en": "Stalingrad ruins"
      }
  ];
  const notes =   {
      "summary": "斯大林格勒戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 20,
          "hold": 10,
          "cam": {
              "lng": 44.52,
              "lat": 48.71,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年8–11月",
          "title_zh": "圍攻斯大林格勒",
          "title_en": "Siege of Stalingrad",
          "narration_zh": "德軍逐屋爭奪，伏爾加河成最後防線。",
          "narration_en": "House-to-house fighting — the Volga is the last line.",
          "focus": [
              "ax_6th",
              "al_red"
          ],
          "side": "both"
      },
      {
          "day": 90,
          "hold": 9,
          "cam": {
              "lng": 44.52,
              "lat": 48.71,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1943年2月",
          "title_zh": "德軍投降",
          "title_en": "German Surrender",
          "narration_zh": "保盧斯元帥率第六集團軍投降，東線戰爭轉折。",
          "narration_en": "Paulus surrenders — the turning point on the Eastern Front.",
          "focus": [
              "al_red"
          ],
          "side": "allies"
      }
  ];
  const outro =   {
      "title_zh": "斯大林格勒戰役",
      "title_en": "STALINGRAD",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
