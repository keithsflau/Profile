import { useState, useEffect } from 'react'
import { Heart, Activity, CheckCircle2, XCircle, AlertCircle, Stethoscope, Clipboard } from 'lucide-react'

// Mock Data - Levels with typos
const levels = [
  {
    id: 1,
    patientName: "陳大文的週記",
    // Original: "今天天氣很差，我心情十分煩燥。既使下雨，我仍然堅持去圖書館溫習。我必須辯別哪些資料是正確的，才能完成報告。"
    content: "今天天氣很差，我心情十分煩燥。既使下雨，我仍然堅持去圖書館溫習。我必須辯別哪些資料是正確的，才能完成報告。",
    typos: [
      {
        charIndex: 13,
        wrongChar: "燥",
        correctChar: "躁",
        options: ["躁", "燥", "噪"],
        explanation: "『躁』是指心情不安、煩亂；『燥』是指乾燥。這裡形容心情應該用『躁』。"
      },
      {
        charIndex: 15,
        wrongChar: "既",
        correctChar: "即",
        options: ["即", "既", "幾"],
        explanation: "『即使』是表示假設的連詞，意思是『就算』。『既』通常用於『既然』，表示已經發生的情況。"
      },
      {
        charIndex: 35,
        wrongChar: "辯",
        correctChar: "辨",
        options: ["辨", "辯", "辦"],
        explanation: "『辨』別是用刀分開，指分辨、區別；『辯』是用言語，指辯論。這裡是指分辨資料，應該用『辨』。"
      }
    ]
  },
  {
    id: 2,
    patientName: "李小明的作文",
    // Original: "這本小說的內容很豐復，反應了當時的社會面貌。讀者讀後反映熱烈，紛紛在網上發表意見。"
    content: "這本小說的內容很豐復，反應了當時的社會面貌。讀者讀後反映熱烈，紛紛在網上發表意見。",
    typos: [
      {
        charIndex: 9,
        wrongChar: "復",
        correctChar: "富",
        options: ["富", "復", "福"],
        explanation: "『豐富』形容豐裕充足。『復』有還原、再的意思，如『復習』。這裡應該用『富』。"
      },
      {
        charIndex: 12,
        wrongChar: "應",
        correctChar: "映",
        options: ["映", "應", "因"],
        explanation: "『反映』是指把客觀情況表現出來（如鏡子反射）；『反應』是指受刺激後的活動。這裡指小說表現了社會面貌，應由『反映』。"
      },
      {
        charIndex: 27,
        wrongChar: "映",
        correctChar: "應",
        options: ["應", "映", "膺"],
        explanation: "這裡指讀者閱讀後的『反應』（Response/Reaction），而不是『反映』（Reflect）。"
      }
    ]
  },
  {
    id: 3,
    patientName: "張小華的日記",
    // Original: "我們不應已貌取人，而要懂得欣賞別人的內在美。盡管外表平凡，也可以有出色的表現。"
    content: "我們不應已貌取人，而要懂得欣賞別人的內在美。盡管外表平凡，也可以有出色的表現。",
    typos: [
      {
        charIndex: 4,
        wrongChar: "已",
        correctChar: "以",
        options: ["以", "已", "己"],
        explanation: "『以貌取人』是成語，意思是用外貌來判斷人的品質。『以』是用、憑藉的意思；『已』是已經。"
      },
      {
        charIndex: 22,
        wrongChar: "盡",
        correctChar: "儘",
        options: ["儘", "盡", "僅"],
        explanation: "『儘管』表示姑且承認某種事實，下文往往有『但是』、『仍然』等轉折詞。在繁體字中，『儘』管的『儘』與『盡』頭的『盡』是有區別的。"
      }
    ]
  }
]

function App() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [health, setHealth] = useState(100)
  const [fixedTypos, setFixedTypos] = useState(new Set())
  const [selectedCharIndex, setSelectedCharIndex] = useState(null)
  const [showToast, setShowToast] = useState(null)
  const [showExplanation, setShowExplanation] = useState(null)
  const [score, setScore] = useState(0)

  const level = levels[currentLevel]
  const remainingTypos = level.typos.filter(t => !fixedTypos.has(t.charIndex))
  const isComplete = remainingTypos.length === 0
  const isGameOver = health <= 0

  // Reset game state when level changes
  useEffect(() => {
    setHealth(100)
    setFixedTypos(new Set())
    setSelectedCharIndex(null)
    setShowToast(null)
    setShowExplanation(null)
  }, [currentLevel])

  const handleCharClick = (index) => {
    if (isComplete || isGameOver) return

    const typo = level.typos.find(t => t.charIndex === index)
    
    if (typo && !fixedTypos.has(index)) {
      setSelectedCharIndex(index)
    } else {
      // Clicked on correct character
      setShowToast({ type: 'healthy', message: '此處組織健康' })
      setHealth(prev => Math.max(0, prev - 2))
      setTimeout(() => setShowToast(null), 1500)
    }
  }

  const handleChoiceSelect = (choice) => {
    const typo = level.typos.find(t => t.charIndex === selectedCharIndex)
    
    if (choice === typo.correctChar) {
      // Correct choice
      setFixedTypos(prev => new Set([...prev, selectedCharIndex]))
      setScore(prev => prev + 10)
      setShowExplanation(typo.explanation)
      setShowToast({ type: 'success', message: '手術成功！' })
      setTimeout(() => {
        setShowToast(null)
        setShowExplanation(null)
        setSelectedCharIndex(null)
      }, 2000)
    } else {
      // Wrong choice
      setHealth(prev => Math.max(0, prev - 15))
      setShowToast({ type: 'error', message: '手術失敗！病人失血！' })
      setTimeout(() => {
        setShowToast(null)
        setSelectedCharIndex(null)
      }, 1500)
    }
  }

  const handleNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1)
    }
  }

  const handleRestart = () => {
    setCurrentLevel(0)
    setHealth(100)
    setFixedTypos(new Set())
    setScore(0)
    setSelectedCharIndex(null)
    setShowToast(null)
    setShowExplanation(null)
  }

  const getHealthStatus = () => {
    if (health >= 70) return { text: '穩定', color: 'text-green-400' }
    if (health >= 40) return { text: '注意', color: 'text-yellow-400' }
    if (health > 0) return { text: '危險', color: 'text-orange-400' }
    return { text: '死亡', color: 'text-red-500' }
  }

  const healthStatus = getHealthStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-teal-500/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-8 h-8 text-teal-400" />
              <h1 className="text-2xl font-bold text-teal-300 text-shadow">錯別字手術室</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <span className="text-slate-400">關卡：</span>
                <span className="text-teal-300 font-semibold">{currentLevel + 1} / {levels.length}</span>
              </div>
              <div className="text-sm">
                <span className="text-slate-400">分數：</span>
                <span className="text-yellow-400 font-semibold">{score}</span>
              </div>
            </div>
          </div>
          
          {/* Health Bar */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className={`w-5 h-5 ${health > 0 ? 'text-red-500' : 'text-slate-500'}`} />
              <span className="text-sm text-slate-300">病人生命值</span>
              <span className={`text-sm font-bold ${healthStatus.color}`}>
                {health}% - {healthStatus.text}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  health >= 70 ? 'bg-green-500' :
                  health >= 40 ? 'bg-yellow-500' :
                  health > 0 ? 'bg-orange-500' : 'bg-red-600'
                }`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Patient Info */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-6 mb-6 border border-teal-500/30 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <Clipboard className="w-6 h-6 text-teal-400" />
            <h2 className="text-xl font-semibold text-teal-300">病人檔案：{level.patientName}</h2>
          </div>
          
          {/* Text Area */}
          <div className="bg-slate-900/80 rounded-lg p-6 border-2 border-slate-700 min-h-[200px]">
            <div className="text-lg leading-relaxed font-chinese">
              {level.content.split('').map((char, index) => {
                const typo = level.typos.find(t => t.charIndex === index)
                const isFixed = fixedTypos.has(index)
                const isSelected = selectedCharIndex === index
                const isTypo = typo && !isFixed
                
                return (
                  <span
                    key={index}
                    onClick={() => handleCharClick(index)}
                    className={`
                      inline-block cursor-pointer transition-all duration-200
                      ${isSelected ? 'bg-teal-500/30 scale-110' : ''}
                      ${isTypo ? 'bg-red-500/20 hover:bg-red-500/40 text-red-300' : ''}
                      ${isFixed ? 'text-green-400 font-semibold' : ''}
                      ${!isTypo && !isFixed ? 'hover:bg-slate-700/50' : ''}
                      px-1 py-0.5 rounded
                    `}
                  >
                    {isFixed && typo ? typo.correctChar : char}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-4">
            <Activity className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-slate-300">
              已修復：<span className="text-green-400 font-semibold">{fixedTypos.size}</span> / 
              <span className="text-slate-400"> {level.typos.length}</span> 處錯誤
            </span>
          </div>
        </div>

        {/* Surgery Menu Modal */}
        {selectedCharIndex !== null && !isComplete && !isGameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 border-2 border-teal-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-teal-300">發現錯誤組織</h3>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-300 mb-2">錯誤字符：</p>
                <div className="bg-red-500/20 border-2 border-red-500 rounded-lg p-4 text-center">
                  <span className="text-4xl font-bold text-red-400">
                    {level.typos.find(t => t.charIndex === selectedCharIndex)?.wrongChar}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-slate-300 mb-3">請選擇正確的治療方案：</p>
                <div className="grid grid-cols-3 gap-3">
                  {level.typos.find(t => t.charIndex === selectedCharIndex)?.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoiceSelect(option)}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 text-xl"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCharIndex(null)}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* Explanation Modal */}
        {showExplanation && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-8 max-w-lg w-full mx-4 border-2 border-green-500 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-300">手術成功！</h3>
              </div>
              <p className="text-slate-200 leading-relaxed">{showExplanation}</p>
            </div>
          </div>
        )}

        {/* Toast Messages */}
        {showToast && (
          <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-bounce ${
            showToast.type === 'success' ? 'bg-green-500' :
            showToast.type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          } text-white px-6 py-3 rounded-lg shadow-xl font-semibold`}>
            {showToast.message}
          </div>
        )}

        {/* Win/Lose Modal */}
        {(isComplete || isGameOver) && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 border-2 shadow-2xl ${
              isComplete ? 'border-green-500' : 'border-red-500'
            }`}>
              {isComplete ? (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-300 text-center mb-4">
                    手術成功！
                  </h2>
                  <p className="text-slate-300 text-center mb-6">
                    病人已完全康復！所有錯別字已修正。
                  </p>
                  <div className="text-center mb-6">
                    <p className="text-slate-400">最終分數</p>
                    <p className="text-3xl font-bold text-yellow-400">{score}</p>
                  </div>
                  {currentLevel < levels.length - 1 ? (
                    <button
                      onClick={handleNextLevel}
                      className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition-colors mb-2"
                    >
                      下一關
                    </button>
                  ) : (
                    <p className="text-center text-slate-400 mb-4">恭喜完成所有關卡！</p>
                  )}
                  <button
                    onClick={handleRestart}
                    className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg transition-colors"
                  >
                    重新開始
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center mb-4">
                    <XCircle className="w-16 h-16 text-red-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
                    手術失敗
                  </h2>
                  <p className="text-slate-300 text-center mb-6">
                    病人生命值歸零，手術失敗...
                  </p>
                  <button
                    onClick={handleRestart}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    重新開始
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-teal-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className={`w-5 h-5 ${healthStatus.color}`} />
              <span className={`text-sm font-semibold ${healthStatus.color}`}>
                病人狀態：{healthStatus.text}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              點擊文字中的錯誤字符進行手術
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
