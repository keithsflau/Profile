/* CHOSIN RESERVOIR · 長津湖戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-chosin",
      "title_zh": "長津湖戰役",
      "title_en": "CHOSIN RESERVOIR",
      "subtitle": "1950年11–12月",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.9,
          "maxLng": 128.4,
          "minLat": 39.45,
          "maxLat": 41.45,
          "Z": 10
      },
      "startDate": [
          1950,
          11,
          27
      ],
      "introCam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "長津湖戰役",
          "en": "CHOSIN RESERVOIR · 1950年11–12月",
          "narr_zh": "志願軍在嚴冬圍攻美軍陸戰一師。",
          "narr_en": "PVA forces encircle US Marines at Chosin in brutal winter."
      },
      "outroCam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "nk": {
          "main": 9109504,
          "glow": 14423100,
          "dim": 5898240,
          "css": "#8b0000",
          "label_zh": "北韓／志願軍",
          "label_en": "North Korea / PVA",
          "emblem": "circle",
          "maxStrength": 100000,
          "textLight": "#ffd9d2"
      },
      "un": {
          "main": 1718894,
          "glow": 4886745,
          "dim": 862279,
          "css": "#1a3a6e",
          "label_zh": "聯合國軍",
          "label_en": "UN Forces",
          "emblem": "shield",
          "maxStrength": 110000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Chosin Reservoir",
              "name_zh": "長津湖",
              "type": "town",
              "lng": 127.15,
              "lat": 40.45
          },
          {
              "name_en": "Hagaru-ri",
              "name_zh": "下碣隅里",
              "type": "fort",
              "lng": 127.12,
              "lat": 40.38
          },
          {
              "name_en": "Hungnam",
              "name_zh": "興南",
              "type": "town",
              "lng": 127.63,
              "lat": 39.83
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "nk_chosin",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "志願軍第9兵團",
          "name_en": "PVA 9th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 127.5,
                  "lat": 40.8,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 127.15,
                  "lat": 40.45,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 127.2,
                  "lat": 40.3,
                  "s": 80000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "un_chosin",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美陸戰一師",
          "name_en": "US 1st Marine Division",
          "track": [
              {
                  "d": 1,
                  "lng": 127.15,
                  "lat": 40.45,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 127.12,
                  "lat": 40.38,
                  "s": 20000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 127.63,
                  "lat": 39.83,
                  "s": 18000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "nk",
          "from": [
              127.5,
              40.8
          ],
          "to": [
              127.15,
              40.45
          ],
          "label": "長津湖包圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.35,
          "fog": 0.2,
          "rain": 0,
          "smoke": 0.3,
          "zh": "長津湖嚴冬",
          "en": "Chosin winter"
      }
  ];
  const notes =   {
      "summary": "長津湖戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 30,
          "hold": 10,
          "cam": {
              "lng": 127.15,
              "lat": 40.45,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年11–12月",
          "title_zh": "長津湖戰役",
          "title_en": "Battle of Chosin Reservoir",
          "narration_zh": "零下三十度嚴冬，美軍突破重圍撤向興南。",
          "narration_en": "In -30°C, Marines fight their way to Hungnam.",
          "focus": [
              "un_chosin",
              "nk_chosin"
          ],
          "side": "both"
      }
  ];
  const outro =   {
      "title_zh": "長津湖戰役",
      "title_en": "CHOSIN RESERVOIR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
