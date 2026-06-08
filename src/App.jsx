import { useState, useEffect } from 'react'
import { VIRTUES, calculateVirtueScore } from './data'
import HexagonChart from './components/HexagonChart'
import VirtueDetail from './components/VirtueDetail'
import './index.css'

const STORAGE_KEY = 'hexagon_scores_v1'
const YEAR_KEY = 'hexagon_year_v1'

export default function App() {
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })
  const [activeVirtue, setActiveVirtue] = useState(null)
  const [lastReset, setLastReset] = useState(() => {
    return localStorage.getItem(YEAR_KEY) || new Date().getFullYear().toString()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  }, [scores])

  const virtueScores = VIRTUES.map(v => ({
    id: v.id,
    score: calculateVirtueScore(v, scores[v.id] || {}),
    color: v.color,
    name: v.name,
    emoji: v.emoji,
  }))

  const overallScore = (() => {
    const valid = virtueScores.filter(v => v.score > 0)
    if (valid.length === 0) return 0
    return Math.round((valid.reduce((sum, v) => sum + v.score, 0) / valid.length) * 10) / 10
  })()

  function updateScore(virtueId, itemId, value) {
    setScores(prev => ({
      ...prev,
      [virtueId]: { ...(prev[virtueId] || {}), [itemId]: value }
    }))
  }

  function handleReset() {
    if (confirm('새해 재설정하시겠습니까? 기존 점수가 초기화됩니다.')) {
      setScores({})
      setLastReset(new Date().getFullYear().toString())
      localStorage.setItem(YEAR_KEY, new Date().getFullYear().toString())
    }
  }

  const activeVirtueData = activeVirtue ? VIRTUES.find(v => v.id === activeVirtue) : null

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="logo">⬡</span>
            <div>
              <h1>육각형 인간</h1>
              <p className="header-sub">만 28세 · {lastReset}년 기준</p>
            </div>
          </div>
          <button className="reset-btn" onClick={handleReset}>새해 재설정</button>
        </div>
      </header>

      <main className="app-main">
        {!activeVirtue ? (
          <div className="dashboard">
            <div className="score-overview">
              <div className="overall-score">
                <span className="overall-number">{overallScore || '—'}</span>
                <span className="overall-label">종합 점수</span>
              </div>
              <HexagonChart virtueScores={virtueScores} />
            </div>

            <div className="virtue-grid">
              {VIRTUES.map(virtue => {
                const vs = virtueScores.find(v => v.id === virtue.id)
                const score = vs?.score || 0
                const itemScores = scores[virtue.id] || {}
                const filled = Object.values(itemScores).filter(v => v !== null && v !== '').length
                const total = virtue.items.length

                return (
                  <button
                    key={virtue.id}
                    className="virtue-card"
                    onClick={() => setActiveVirtue(virtue.id)}
                    style={{ '--virtue-color': virtue.color }}
                  >
                    <div className="virtue-card-top">
                      <span className="virtue-emoji">{virtue.emoji}</span>
                      <div className="virtue-info">
                        <span className="virtue-name">{virtue.name}</span>
                        <span className="virtue-desc">{virtue.description}</span>
                      </div>
                      <div className="virtue-score-badge" style={{ color: virtue.color }}>
                        {score > 0 ? score.toFixed(1) : '—'}
                      </div>
                    </div>
                    <div className="virtue-progress-bar">
                      <div
                        className="virtue-progress-fill"
                        style={{ width: `${(score / 10) * 100}%`, background: virtue.color }}
                      />
                    </div>
                    <div className="virtue-card-bottom">
                      <span className="virtue-filled">{filled}/{total} 항목 입력</span>
                      <span className="virtue-arrow">→</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="why-banner">
              <p className="why-text">"끝까지 버티며 곁을 지켜, 소중한 이들이 평온하게 살게 한다"</p>
              <p className="why-sub">매년 1월, 만 28세 기준으로 재설정됩니다</p>
            </div>
          </div>
        ) : (
          <VirtueDetail
            virtue={activeVirtueData}
            scores={scores[activeVirtue] || {}}
            onUpdate={(itemId, value) => updateScore(activeVirtue, itemId, value)}
            onBack={() => setActiveVirtue(null)}
            virtueScore={virtueScores.find(v => v.id === activeVirtue)?.score || 0}
          />
        )}
      </main>
    </div>
  )
}
