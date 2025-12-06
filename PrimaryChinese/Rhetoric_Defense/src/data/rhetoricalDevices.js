// 修辭手法資料庫
export const rhetoricalDevices = [
  // 擬人 (Personification)
  { sentence: "太陽對我微笑", type: "Personification", chinese: "擬人" },
  { sentence: "風兒輕輕地撫摸著我的臉", type: "Personification", chinese: "擬人" },
  { sentence: "月亮害羞地躲在雲後", type: "Personification", chinese: "擬人" },
  { sentence: "花朵在風中跳舞", type: "Personification", chinese: "擬人" },
  { sentence: "海浪憤怒地拍打著海岸", type: "Personification", chinese: "擬人" },
  { sentence: "樹葉在秋風中低語", type: "Personification", chinese: "擬人" },
  { sentence: "星星眨著眼睛", type: "Personification", chinese: "擬人" },
  { sentence: "時間悄悄地溜走了", type: "Personification", chinese: "擬人" },
  
  // 比喻 (Metaphor)
  { sentence: "時間是金錢", type: "Metaphor", chinese: "比喻" },
  { sentence: "書本是知識的鑰匙", type: "Metaphor", chinese: "比喻" },
  { sentence: "老師是園丁", type: "Metaphor", chinese: "比喻" },
  { sentence: "知識是海洋", type: "Metaphor", chinese: "比喻" },
  { sentence: "友誼是一座橋樑", type: "Metaphor", chinese: "比喻" },
  { sentence: "生活是一場旅程", type: "Metaphor", chinese: "比喻" },
  { sentence: "記憶是時光的寶盒", type: "Metaphor", chinese: "比喻" },
  { sentence: "夢想是翅膀", type: "Metaphor", chinese: "比喻" },
  
  // 誇張 (Exaggeration)
  { sentence: "我餓得可以吃下一頭牛", type: "Exaggeration", chinese: "誇張" },
  { sentence: "他跑得比風還快", type: "Exaggeration", chinese: "誇張" },
  { sentence: "這本書重得像座山", type: "Exaggeration", chinese: "誇張" },
  { sentence: "我等了一萬年", type: "Exaggeration", chinese: "誇張" },
  { sentence: "他的聲音響徹雲霄", type: "Exaggeration", chinese: "誇張" },
  { sentence: "我累得骨頭都要散架了", type: "Exaggeration", chinese: "誇張" },
  { sentence: "這間房間小得像螞蟻窩", type: "Exaggeration", chinese: "誇張" },
  { sentence: "他高興得飛上了天", type: "Exaggeration", chinese: "誇張" },
  
  // 排比 (Parallelism)
  { sentence: "春天來了，花開了，鳥兒叫了，大地醒了", type: "Parallelism", chinese: "排比" },
  { sentence: "讀書要專心，寫字要認真，思考要深入", type: "Parallelism", chinese: "排比" },
  { sentence: "我愛藍天，我愛白雲，我愛綠草", type: "Parallelism", chinese: "排比" },
  { sentence: "時間是金錢，時間是生命，時間是機會", type: "Parallelism", chinese: "排比" },
  { sentence: "我們要勇敢，我們要堅強，我們要堅持", type: "Parallelism", chinese: "排比" },
  { sentence: "山高，水長，路遠", type: "Parallelism", chinese: "排比" },
  { sentence: "學習要勤奮，工作要努力，生活要快樂", type: "Parallelism", chinese: "排比" },
  { sentence: "昨天已過去，今天要珍惜，明天要努力", type: "Parallelism", chinese: "排比" },
];

// 修辭類型配置
export const deviceTypes = [
  { type: "Personification", chinese: "擬人", color: "#8B4513" },
  { type: "Metaphor", chinese: "比喻", color: "#4169E1" },
  { type: "Exaggeration", chinese: "誇張", color: "#DC143C" },
  { type: "Parallelism", chinese: "排比", color: "#228B22" },
];

// 獲取隨機修辭例句
export const getRandomDevice = () => {
  const randomIndex = Math.floor(Math.random() * rhetoricalDevices.length);
  return rhetoricalDevices[randomIndex];
};
