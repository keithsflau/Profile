/* GALLIPOLI · 加里波利戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-gallipoli",
      "title_zh": "加里波利戰役",
      "title_en": "GALLIPOLI",
      "subtitle": "1915–1916",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 25.51,
          "maxLng": 27.31,
          "minLat": 39.71,
          "maxLat": 41.11,
          "Z": 11
      },
      "startDate": [
          1915,
          4,
          25
      ],
      "introCam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "加里波利戰役",
          "en": "GALLIPOLI · 1915–1916",
          "narr_zh": "協約國企圖打通達黑海海峽，遭鄂圖曼軍擊退。",
          "narr_en": "Allied landings fail against Ottoman defences on the Gallipoli peninsula."
      },
      "outroCam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const factions =   {
      "cp": {
          "main": 6045747,
          "glow": 9136404,
          "dim": 3811360,
          "css": "#5c4033",
          "label_zh": "同盟國",
          "label_en": "Central Powers",
          "emblem": "circle",
          "maxStrength": 120000,
          "textLight": "#e8dcc8"
      },
      "ap": {
          "main": 1989258,
          "glow": 4367861,
          "dim": 867706,
          "css": "#1e5a8a",
          "label_zh": "協約國",
          "label_en": "Allied Powers",
          "emblem": "shield",
          "maxStrength": 130000,
          "textLight": "#cfe0ff"
      }
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Gallipoli",
              "name_zh": "加里波利",
              "type": "fort",
              "lng": 26.41,
              "lat": 40.41
          },
          {
              "name_en": "Anzac Cove",
              "name_zh": "安zac 灣",
              "type": "bay",
              "lng": 26.28,
              "lat": 40.24
          },
          {
              "name_en": "Suvla Bay",
              "name_zh": "蘇弗拉灣",
              "type": "bay",
              "lng": 26.22,
              "lat": 40.32
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_gallipoli",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "安zac 遠征軍",
          "name_en": "ANZAC Corps",
          "track": [
              {
                  "d": 1,
                  "lng": 26.5,
                  "lat": 40.5,
                  "s": 40000,
                  "st": "landing"
              },
              {
                  "d": 60,
                  "lng": 26.28,
                  "lat": 40.24,
                  "s": 35000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 26.5,
                  "lat": 40.5,
                  "s": 15000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "cp_ottoman",
          "faction": "cp",
          "kind": "infantry",
          "crest": "crescent",
          "cf": true,
          "name_zh": "鄂圖曼第五集團軍",
          "name_en": "Ottoman 5th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 26.35,
                  "lat": 40.35,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 26.38,
                  "lat": 40.38,
                  "s": 45000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "ap",
          "from": [
              26.5,
              40.5
          ],
          "to": [
              26.28,
              40.24
          ],
          "label": "安zac 登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 90,
          "lng": 26.28,
          "lat": 40.24,
          "kind": "firefight",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "加里波利戰役",
          "en": "GALLIPOLI"
      }
  ];
  const notes =   {
      "summary": "加里波利戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 9,
          "cam": {
              "lng": 26.28,
              "lat": 40.24,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1915年4月25日",
          "title_zh": "加里波利登陸",
          "title_en": "Landings at Gallipoli",
          "narration_zh": "澳紐軍團在安zac 灣登陸，遭鄂圖曼軍頑強抵抗。",
          "narration_en": "ANZAC troops land at Anzac Cove — fierce Ottoman resistance.",
          "focus": [
              "ap_gallipoli",
              "cp_ottoman"
          ],
          "side": "both"
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 26.41,
              "lat": 40.41,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年1月",
          "title_zh": "撤離半島",
          "title_en": "Evacuation",
          "narration_zh": "協約國秘密撤離，遠征以失敗告終。",
          "narration_en": "Allied forces evacuate — the campaign ends in failure.",
          "focus": [
              "ap_gallipoli"
          ],
          "side": "ap"
      }
  ];
  const outro =   {
      "title_zh": "加里波利戰役",
      "title_en": "GALLIPOLI",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 26.41,
          "lat": 40.41,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, storyboard, outro, END_DAY };
})();
