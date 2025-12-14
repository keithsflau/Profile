// App State
const state = {
    currentTab: 'reading',
    currentParagraph: 0,
    isPlaying: false,
    isPaused: false,
    currentCharIndex: 0,
    writingMode: 'practice',
    writingProgress: {
        current: 0,
        total: 20,
        correct: 0,
        incorrect: 0
    },
    currentWritingWord: null,
    quizProgress: {
        current: 0,
        total: 10,
        score: 0
    }
};

// Handwriting Canvas State
const canvasState = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    strokes: [],
    currentStroke: [],
    tool: 'pen', // 'pen' or 'eraser'
    penSize: 5,
    penColor: '#000000',
    eraserSize: 20
};


// Vocabulary Data
const vocabulary = [
    { word: '濫竽充數', pinyin: 'laam6 wu1 cung1 sou3', meaning: '比喻沒有真才實學的人混在行家裡面充數，或以次充好' },
    { word: '戰國', pinyin: 'zin3 gwok3', meaning: '中國歷史上的一個時期（公元前475年-公元前221年）' },
    { word: '齊國', pinyin: 'cai4 gwok3', meaning: '戰國時期的一個諸侯國' },
    { word: '宣王', pinyin: 'syun1 wong4', meaning: '齊國的國君' },
    { word: '樂隊', pinyin: 'ngok6 deoi6', meaning: '演奏音樂的團隊' },
    { word: '吹奏', pinyin: 'ceoi1 zau3', meaning: '用嘴吹樂器發聲' },
    { word: '悠揚', pinyin: 'jau4 joeng4', meaning: '形容聲音婉轉動聽' },
    { word: '悅耳', pinyin: 'jyut6 ji5', meaning: '聽起來很舒服，令人愉快' },
    { word: '報酬', pinyin: 'bou3 cau4', meaning: '工作後得到的金錢或物品' },
    { word: '優厚', pinyin: 'jau1 hau5', meaning: '（待遇）很好，很豐富' },
    { word: '假扮', pinyin: 'gaa2 baan6', meaning: '裝扮成別的樣子' },
    { word: '混進', pinyin: 'wan6 zeon3', meaning: '混入，偷偷進入' },
    { word: '賣力', pinyin: 'maai6 lik6', meaning: '盡力，努力' },
    { word: '繼承', pinyin: 'gai3 sing4', meaning: '接受並延續（地位、財產等）' },
    { word: '獨奏', pinyin: 'duk6 zau3', meaning: '一個人單獨演奏' },
    { word: '召來', pinyin: 'ziu6 loi4', meaning: '叫人過來' },
    { word: '露出馬腳', pinyin: 'lou6 ceot1 maa5 goek3', meaning: '比喻暴露了真相或缺點' },
    { word: '一旦', pinyin: 'jat1 daan6', meaning: '一但，如果' },
    { word: '偷偷地', pinyin: 'tau1 tau1 dei6', meaning: '暗中，秘密地' },
    { word: '溜走', pinyin: 'lau6 zau2', meaning: '偷偷跑掉' }
];

// Writing Practice Words
const writingWords = [
    '宣王', '樂隊', '吹奏', '悠揚', '悅耳', 
    '報酬', '優厚', '假扮', '混進', '賣力',
    '繼承', '獨奏', '召來', '暴露', '偷偷',
    '溜走', '齊國', '戰國', '樂師', '演奏'
];

// Quiz Questions
const quizQuestions = [
    {
        question: '齊宣王最喜歡聽什麼樂器？',
        options: ['琴', '竽', '笛', '鼓'],
        correct: 1
    },
    {
        question: '齊宣王的樂隊有多少名樂師？',
        options: ['一百名', '兩百名', '三百名', '四百名'],
        correct: 2
    },
    {
        question: '南郭先生為什麼要混進樂隊？',
        options: ['喜歡音樂', '報酬優厚', '宣王邀請', '學習吹竽'],
        correct: 1
    },
    {
        question: '南郭先生在樂隊裡做什麼？',
        options: ['真的吹竽', '假裝吹竽', '指揮樂隊', '什麼都不做'],
        correct: 1
    },
    {
        question: '為什麼別人不知道南郭先生不會吹竽？',
        options: ['他很努力學習', '樂隊人太多', '他真的會吹', '大家都知道'],
        correct: 1
    },
    {
        question: '齊宣王的兒子喜歡聽什麼？',
        options: ['合奏', '獨奏', '不喜歡音樂', '只喜歡唱歌'],
        correct: 1
    },
    {
        question: '新國君要求樂師怎樣演奏？',
        options: ['一起吹奏', '一個一個吹奏', '不需要吹奏', '隨便吹奏'],
        correct: 1
    },
    {
        question: '南郭先生聽到新國君的要求後有什麼感覺？',
        options: ['很開心', '很害怕', '很興奮', '沒感覺'],
        correct: 1
    },
    {
        question: '南郭先生最後怎麼樣？',
        options: ['繼續留在樂隊', '被國君發現', '偷偷溜走了', '努力學習吹竽'],
        correct: 2
    },
    {
        question: '這個故事告訴我們什麼道理？',
        options: ['要努力賺錢', '不能濫竽充數', '音樂很重要', '要服從國君'],
        correct: 1
    }
];

// Text-to-Speech Configuration for Cantonese
const cantoneseSpeech = {
    lang: 'zh-HK',
    rate: 0.9,  // 更自然的語速
    pitch: 1.1,  // 稍微提高音調，更有活力
    volume: 1.0
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    renderVocabulary();
});

function initializeApp() {
    // Check for Web Speech API support
    if (!('speechSynthesis' in window)) {
        alert('你的瀏覽器不支援語音功能，請使用 Chrome 或 Edge 瀏覽器。');
    }
    
    // Initialize first tab
    showTab('reading');
}

function setupEventListeners() {
    // Tab Navigation
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            showTab(tabName);
        });
    });

    // Reading Section
    document.getElementById('playAllBtn')?.addEventListener('click', playAllText);
    document.getElementById('prevParagraph')?.addEventListener('click', () => changeParagraph(-1));
    document.getElementById('nextParagraph')?.addEventListener('click', () => changeParagraph(1));
    document.getElementById('pauseBtn')?.addEventListener('click', togglePause);

    // Character click to speak
    document.querySelectorAll('.char').forEach(char => {
        char.addEventListener('click', () => {
            const text = char.dataset.char;
            if (text) speakCantonese(text, char);
        });
    });

    // Paragraph click to speak - 整段朗讀
    document.querySelectorAll('.paragraph').forEach((para, index) => {
        para.addEventListener('click', () => {
            state.currentParagraph = index;
            playParagraph(index);
        });
    });

    // Writing Practice
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = e.target.dataset.mode;
            setWritingMode(mode);
        });
    });

    document.getElementById('listenBtn')?.addEventListener('click', playCurrentWord);
    document.getElementById('submitWriting')?.addEventListener('click', checkWriting);
    document.getElementById('manualInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkWriting();
    });

    // Handwriting Canvas Controls
    document.getElementById('recognizeBtn')?.addEventListener('click', recognizeHandwriting);
    document.getElementById('undoBtn')?.addEventListener('click', undoStroke);
    document.getElementById('clearBtn')?.addEventListener('click', clearCanvas);
    document.getElementById('eraserBtn')?.addEventListener('click', () => setTool('eraser'));
    document.getElementById('penBtn')?.addEventListener('click', () => setTool('pen'));
    document.getElementById('penSize')?.addEventListener('input', (e) => {
        canvasState.penSize = parseInt(e.target.value);
        document.getElementById('penSizeValue').textContent = e.target.value;
    });

    // Quiz
    document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
}

// Tab Navigation
function showTab(tabName) {
    state.currentTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName)?.classList.add('active');

    // Initialize tab-specific features
    if (tabName === 'writing') {
        initializeWritingPractice();
    }

    updateProgress();
}

// Speech Functions - 改進版，更自然流暢
function speakCantonese(text, element = null) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = cantoneseSpeech.lang;
    utterance.rate = cantoneseSpeech.rate;
    utterance.pitch = cantoneseSpeech.pitch;
    utterance.volume = cantoneseSpeech.volume;

    if (element) {
        element.classList.add('speaking');
        utterance.onend = () => {
            element.classList.remove('speaking');
        };
    }

    window.speechSynthesis.speak(utterance);
}

function playAllText() {
    const paragraphs = document.querySelectorAll('.paragraph');
    state.currentParagraph = 0;
    state.isPlaying = true;
    state.isPaused = false;
    
    playParagraphSequence(paragraphs, 0);
}

// 改進版：把長段落拆成短句，像讀詞語那樣自然
function playParagraphSequence(paragraphs, index) {
    if (index >= paragraphs.length || !state.isPlaying || state.isPaused) {
        state.isPlaying = false;
        // Clear all highlights
        document.querySelectorAll('.paragraph').forEach(p => p.classList.remove('active'));
        return;
    }

    state.currentParagraph = index;
    highlightParagraph(index);
    
    const paragraph = paragraphs[index];
    const fullText = paragraph.textContent;
    
    // 把段落拆成短句（按標點符號）
    const sentences = splitIntoSentences(fullText);
    
    // 逐句朗讀
    playSentencesSequentially(sentences, 0, () => {
        // 所有句子讀完後，停頓一下再讀下一段
        setTimeout(() => {
            playParagraphSequence(paragraphs, index + 1);
        }, 1000);
    });
}

// 將段落拆分成短句
function splitIntoSentences(text) {
    // 按標點符號拆分（。！？，、：；）
    const sentences = text.split(/([。！？，、：；])/);
    const result = [];
    
    for (let i = 0; i < sentences.length; i += 2) {
        if (sentences[i] && sentences[i].trim()) {
            // 組合句子和標點
            const sentence = sentences[i] + (sentences[i + 1] || '');
            result.push(sentence.trim());
        }
    }
    
    return result.filter(s => s.length > 0);
}

// 逐句朗讀
function playSentencesSequentially(sentences, index, onComplete) {
    if (index >= sentences.length) {
        if (onComplete) onComplete();
        return;
    }

    const sentence = sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = cantoneseSpeech.lang;
    utterance.rate = cantoneseSpeech.rate;
    utterance.pitch = cantoneseSpeech.pitch;
    utterance.volume = cantoneseSpeech.volume;

    utterance.onend = () => {
        // 短句之間稍微停頓，更自然
        const pauseDuration = sentence.match(/[。！？]/) ? 500 : 200;
        setTimeout(() => {
            playSentencesSequentially(sentences, index + 1, onComplete);
        }, pauseDuration);
    };

    window.speechSynthesis.speak(utterance);
}

function playParagraph(index) {
    const paragraphs = document.querySelectorAll('.paragraph');
    if (index >= 0 && index < paragraphs.length) {
        highlightParagraph(index);
        const fullText = paragraphs[index].textContent;
        
        // 同樣拆成短句朗讀
        const sentences = splitIntoSentences(fullText);
        playSentencesSequentially(sentences, 0, null);
    }
}

function highlightParagraph(index) {
    document.querySelectorAll('.paragraph').forEach((p, i) => {
        p.classList.toggle('active', i === index);
    });
}

function changeParagraph(direction) {
    const paragraphs = document.querySelectorAll('.paragraph');
    state.currentParagraph = Math.max(0, Math.min(paragraphs.length - 1, state.currentParagraph + direction));
    playParagraph(state.currentParagraph);
}

function togglePause() {
    if (window.speechSynthesis.speaking) {
        if (state.isPaused) {
            window.speechSynthesis.resume();
            state.isPaused = false;
            document.getElementById('pauseBtn').innerHTML = '⏸️ 暫停';
        } else {
            window.speechSynthesis.pause();
            state.isPaused = true;
            document.getElementById('pauseBtn').innerHTML = '▶️ 繼續';
        }
    }
}

// Vocabulary Section
function renderVocabulary() {
    const vocabGrid = document.getElementById('vocabGrid');
    if (!vocabGrid) return;

    vocabGrid.innerHTML = vocabulary.map(item => `
        <div class="vocab-card">
            <div class="vocab-word">${item.word}</div>
            <div class="vocab-pinyin">${item.pinyin}</div>
            <div class="vocab-meaning">${item.meaning}</div>
            <button class="vocab-audio-btn" onclick="speakCantonese('${item.word}')">
                🔊 聽讀音
            </button>
        </div>
    `).join('');
}

// Writing Practice
function initializeWritingPractice() {
    initializeCanvas();
    if (state.writingProgress.current === 0) {
        nextWritingWord();
    }
}

// Handwriting Canvas Functions
function initializeCanvas() {
    canvasState.canvas = document.getElementById('writingCanvas');
    if (!canvasState.canvas) return;

    canvasState.ctx = canvasState.canvas.getContext('2d');
    
    // Set canvas size to match display size
    const rect = canvasState.canvas.getBoundingClientRect();
    canvasState.canvas.width = rect.width;
    canvasState.canvas.height = rect.height;

    // Setup drawing context
    canvasState.ctx.lineCap = 'round';
    canvasState.ctx.lineJoin = 'round';

    // Mouse events
    canvasState.canvas.addEventListener('mousedown', startDrawing);
    canvasState.canvas.addEventListener('mousemove', draw);
    canvasState.canvas.addEventListener('mouseup', stopDrawing);
    canvasState.canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvasState.canvas.addEventListener('touchstart', handleTouchStart);
    canvasState.canvas.addEventListener('touchmove', handleTouchMove);
    canvasState.canvas.addEventListener('touchend', stopDrawing);

    // Initialize pen button as active
    document.getElementById('penBtn')?.classList.add('active');
}

function startDrawing(e) {
    canvasState.isDrawing = true;
    const coords = getCanvasCoordinates(e);
    canvasState.lastX = coords.x;
    canvasState.lastY = coords.y;
    canvasState.currentStroke = [];
    
    // Hide placeholder
    document.getElementById('canvasPlaceholder')?.classList.add('hidden');
}

function draw(e) {
    if (!canvasState.isDrawing) return;
    
    e.preventDefault();
    const coords = getCanvasCoordinates(e);
    
    canvasState.ctx.beginPath();
    canvasState.ctx.moveTo(canvasState.lastX, canvasState.lastY);
    canvasState.ctx.lineTo(coords.x, coords.y);
    
    if (canvasState.tool === 'pen') {
        canvasState.ctx.strokeStyle = canvasState.penColor;
        canvasState.ctx.lineWidth = canvasState.penSize;
        canvasState.ctx.globalCompositeOperation = 'source-over';
    } else {
        canvasState.ctx.strokeStyle = '#FFFFFF';
        canvasState.ctx.lineWidth = canvasState.eraserSize;
        canvasState.ctx.globalCompositeOperation = 'destination-out';
    }
    
    canvasState.ctx.stroke();
    
    // Save stroke point
    canvasState.currentStroke.push({
        x1: canvasState.lastX,
        y1: canvasState.lastY,
        x2: coords.x,
        y2: coords.y,
        tool: canvasState.tool,
        size: canvasState.tool === 'pen' ? canvasState.penSize : canvasState.eraserSize,
        color: canvasState.penColor
    });
    
    canvasState.lastX = coords.x;
    canvasState.lastY = coords.y;
}

function stopDrawing() {
    if (canvasState.isDrawing && canvasState.currentStroke.length > 0) {
        canvasState.strokes.push([...canvasState.currentStroke]);
    }
    canvasState.isDrawing = false;
    canvasState.currentStroke = [];
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvasState.canvas.dispatchEvent(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvasState.canvas.dispatchEvent(mouseEvent);
}

function getCanvasCoordinates(e) {
    const rect = canvasState.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function clearCanvas() {
    if (!canvasState.ctx) return;
    
    canvasState.ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
    canvasState.strokes = [];
    canvasState.currentStroke = [];
    
    // Show placeholder
    document.getElementById('canvasPlaceholder')?.classList.remove('hidden');
}

function undoStroke() {
    if (canvasState.strokes.length === 0) return;
    
    canvasState.strokes.pop();
    redrawCanvas();
}

function redrawCanvas() {
    if (!canvasState.ctx) return;
    
    canvasState.ctx.clearRect(0, 0, canvasState.canvas.width, canvasState.canvas.height);
    
    if (canvasState.strokes.length === 0) {
        document.getElementById('canvasPlaceholder')?.classList.remove('hidden');
        return;
    }
    
    canvasState.strokes.forEach(stroke => {
        stroke.forEach(point => {
            canvasState.ctx.beginPath();
            canvasState.ctx.moveTo(point.x1, point.y1);
            canvasState.ctx.lineTo(point.x2, point.y2);
            
            if (point.tool === 'pen') {
                canvasState.ctx.strokeStyle = point.color;
                canvasState.ctx.lineWidth = point.size;
                canvasState.ctx.globalCompositeOperation = 'source-over';
            } else {
                canvasState.ctx.strokeStyle = '#FFFFFF';
                canvasState.ctx.lineWidth = point.size;
                canvasState.ctx.globalCompositeOperation = 'destination-out';
            }
            
            canvasState.ctx.stroke();
        });
    });
}

function setTool(tool) {
    canvasState.tool = tool;
    
    // Update button states
    document.getElementById('penBtn')?.classList.toggle('active', tool === 'pen');
    document.getElementById('eraserBtn')?.classList.toggle('active', tool === 'eraser');
    
    // Update cursor
    canvasState.canvas.style.cursor = tool === 'pen' ? 'crosshair' : 'pointer';
}

// OCR手寫識別功能
async function recognizeHandwriting() {
    if (!canvasState.canvas || canvasState.strokes.length === 0) {
        alert('請先在畫布上寫字！');
        return;
    }

    const recognizeBtn = document.getElementById('recognizeBtn');
    const manualInput = document.getElementById('manualInput');
    
    // 禁用按鈕並顯示載入中
    recognizeBtn.disabled = true;
    recognizeBtn.innerHTML = '⏳ 識別中...';

    try {
        // 將畫布轉換為圖片
        const imageData = canvasState.canvas.toDataURL('image/png');
        
        // 使用Tesseract.js進行OCR識別（繁體中文）
        const result = await Tesseract.recognize(
            imageData,
            'chi_tra', // 繁體中文
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        recognizeBtn.innerHTML = `⏳ ${progress}%`;
                    }
                }
            }
        );

        // 取得識別的文字
        let recognizedText = result.data.text.trim();
        
        // 移除空格和換行
        recognizedText = recognizedText.replace(/\s+/g, '');
        
        if (recognizedText) {
            // 將識別結果填入文字框
            manualInput.value = recognizedText;
            manualInput.focus();
            
            // 語音提示
            speakCantonese('已識別');
        } else {
            alert('未能識別到文字，請寫清楚一點或手動輸入。');
        }
        
    } catch (error) {
        console.error('OCR識別錯誤:', error);
        alert('識別失敗，請手動輸入答案。');
    } finally {
        // 恢復按鈕
        recognizeBtn.disabled = false;
        recognizeBtn.innerHTML = '🔍 識別文字';
    }
}


function setWritingMode(mode) {
    state.writingMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Reset progress
    state.writingProgress = {
        current: 0,
        total: 20,
        correct: 0,
        incorrect: 0
    };
    
    updateWritingUI();
    nextWritingWord();
}

function playCurrentWord() {
    if (state.currentWritingWord) {
        speakCantonese(state.currentWritingWord);
    }
}

function checkWriting() {
    const input = document.getElementById('manualInput').value.trim();
    const feedbackArea = document.getElementById('feedbackArea');

    if (!input) {
        feedbackArea.textContent = '請先寫字或輸入答案！';
        feedbackArea.className = 'feedback-area';
        return;
    }

    const isCorrect = input === state.currentWritingWord;

    if (isCorrect) {
        state.writingProgress.correct++;
        feedbackArea.textContent = `✅ 正確！答案是「${state.currentWritingWord}」`;
        feedbackArea.className = 'feedback-area correct';
        speakCantonese('正確');
    } else {
        state.writingProgress.incorrect++;
        feedbackArea.textContent = `❌ 錯誤！正確答案是「${state.currentWritingWord}」，你寫了「${input}」`;
        feedbackArea.className = 'feedback-area incorrect';
        speakCantonese('錯誤');
    }

    state.writingProgress.current++;
    updateWritingUI();

    setTimeout(() => {
        nextWritingWord();
    }, 2500);
}

function nextWritingWord() {
    if (state.writingProgress.current >= state.writingProgress.total) {
        showWritingComplete();
        return;
    }

    // Get random word
    const randomIndex = Math.floor(Math.random() * writingWords.length);
    state.currentWritingWord = writingWords[randomIndex];

    // Update UI
    const currentWordEl = document.getElementById('currentWord');
    const manualInput = document.getElementById('manualInput');
    const feedbackArea = document.getElementById('feedbackArea');

    if (state.writingMode === 'practice') {
        currentWordEl.textContent = state.currentWritingWord;
    } else {
        currentWordEl.textContent = '❓';
    }

    manualInput.value = '';
    manualInput.focus();
    feedbackArea.textContent = '';
    feedbackArea.className = 'feedback-area';

    // Clear canvas
    clearCanvas();

    updateWritingUI();
}


function updateWritingUI() {
    document.getElementById('correctCount').textContent = state.writingProgress.correct;
    document.getElementById('incorrectCount').textContent = state.writingProgress.incorrect;
    document.getElementById('writingProgress').textContent = 
        `${state.writingProgress.current}/${state.writingProgress.total}`;
    
    updateProgress();
}

function showWritingComplete() {
    const feedbackArea = document.getElementById('feedbackArea');
    const accuracy = ((state.writingProgress.correct / state.writingProgress.total) * 100).toFixed(1);
    
    feedbackArea.innerHTML = `
        <div style="padding: 2rem;">
            <h3 style="font-size: 2rem; margin-bottom: 1rem;">🎉 測試完成！</h3>
            <p style="font-size: 1.5rem; margin-bottom: 1rem;">
                正確率：${accuracy}%
            </p>
            <p style="font-size: 1.2rem;">
                ${accuracy >= 80 ? '太棒了！繼續努力！' : '加油！多多練習會更好！'}
            </p>
        </div>
    `;
    feedbackArea.className = 'feedback-area correct';
}

// Quiz Section
function startQuiz() {
    state.quizProgress = {
        current: 0,
        total: quizQuestions.length,
        score: 0
    };

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const quizArea = document.getElementById('quizArea');
    const currentQ = state.quizProgress.current;

    if (currentQ >= state.quizProgress.total) {
        showQuizComplete();
        return;
    }

    const question = quizQuestions[currentQ];

    quizArea.innerHTML = `
        <div class="quiz-question">
            <div class="question-number">問題 ${currentQ + 1} / ${state.quizProgress.total}</div>
            <div class="question-text">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join('')}
            </div>
            <div class="quiz-nav">
                <button class="quiz-nav-btn" onclick="submitQuizAnswer()">提交答案</button>
            </div>
        </div>
    `;

    // Setup option selection
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', (e) => {
            document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });
}

function submitQuizAnswer() {
    const selected = document.querySelector('.quiz-option.selected');
    if (!selected) {
        alert('請先選擇一個答案！');
        return;
    }

    const selectedIndex = parseInt(selected.dataset.index);
    const question = quizQuestions[state.quizProgress.current];

    // Show correct/incorrect
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        option.style.pointerEvents = 'none';
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    if (selectedIndex === question.correct) {
        state.quizProgress.score++;
        speakCantonese('正確');
    } else {
        speakCantonese('錯誤');
    }

    state.quizProgress.current++;

    setTimeout(() => {
        renderQuizQuestion();
        updateProgress();
    }, 2000);
}

function showQuizComplete() {
    const quizArea = document.getElementById('quizArea');
    const percentage = (state.quizProgress.score / state.quizProgress.total * 100).toFixed(1);

    quizArea.innerHTML = `
        <div class="quiz-start">
            <h3 style="font-size: 2.5rem; margin-bottom: 2rem;">🎊 測驗完成！</h3>
            <p style="font-size: 2rem; margin-bottom: 1rem; color: var(--accent-color);">
                得分：${state.quizProgress.score} / ${state.quizProgress.total}
            </p>
            <p style="font-size: 1.5rem; margin-bottom: 2rem;">
                正確率：${percentage}%
            </p>
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                ${percentage >= 80 ? '太棒了！你對課文的理解很好！' : 
                  percentage >= 60 ? '不錯！再溫習一下會更好！' : 
                  '加油！多讀幾次課文吧！'}
            </p>
            <button class="start-quiz-btn" onclick="startQuiz()">重新測驗</button>
        </div>
    `;

    speakCantonese(percentage >= 80 ? '太棒了' : '加油');
}

// Progress Tracking
function updateProgress() {
    let totalProgress = 0;
    const weights = {
        reading: 25,
        vocabulary: 25,
        writing: 25,
        quiz: 25
    };

    // Calculate progress for each section
    if (state.currentTab === 'reading') {
        const paragraphs = document.querySelectorAll('.paragraph');
        totalProgress += (state.currentParagraph / paragraphs.length) * weights.reading;
    }

    if (state.writingProgress.current > 0) {
        totalProgress += (state.writingProgress.current / state.writingProgress.total) * weights.writing;
    }

    if (state.quizProgress.current > 0) {
        totalProgress += (state.quizProgress.current / state.quizProgress.total) * weights.quiz;
    }

    document.getElementById('progressFill').style.width = `${totalProgress}%`;
}

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
