import { useState, useEffect } from 'react'

const DIARY_KEY = 'hexagon_diary_v1'

export default function DailyLog({ virtueScores }) {
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(DIARY_KEY)
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })
  const [todayText, setTodayText] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [view, setView] = useState('write')

  useEffect(() => {
    localStorage.setItem(DIARY_KEY, JSON.stringify(entries))
  }, [entries])

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  })

  const todayKey = new Date().toISOString().split('T')[0]
  const todayEntry = entries.find(e => e.date === todayKey)

  async function analyzeWithAI(text) {
    setLoading(true)
    setError(null)
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      if (!apiKey) throw new Error('API 키가 설정되지 않았습니다')

      const scoresContext = virtueScores
        .map(v => `${v.emoji} ${v.name}: ${v.score > 0 ? v.score.toFixed(1) + '점' : '미측정'}`)
        .join('\n')

      const prompt = `당신은 "육각형 인간" 자기계발 코치입니다.
사용자의 현재 덕목 점수:
${scoresContext}

오늘 사용자가 한 일:
${text}

위 내용을 분석해서 아래 형식으로 응답해주세요. 반드시 JSON 형식으로만 응답하고 다른 텍스트는 포함하지 마세요:

{
  "summary": "오늘 하루 한 줄 요약 (20자 이내)",
  "virtueImpact": [
    {"virtue": "덕목명", "emoji": "이모지", "impact": "positive/negative/neutral", "reason": "이유 (20자 이내)"}
  ],
  "strengths": ["잘한 점 1", "잘한 점 2"],
  "improvements": ["부족한 점 1", "부족한 점 2"],
  "tomorrow": ["내일 할 일 추천 1", "내일 할 일 추천 2", "내일 할 일 추천 3"],
  "message": "오늘 하루에 대한 한마디 격려 (WHY: 끝까지 버티며 곁을 지켜, 소중한 이들이 평온하게 살게 한다 기반으로)"
}`

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
          temperature: 0.7
        })
      })

      if (!res.ok) throw new Error(`API 오류: ${res.status}`)
      const data = await res.json()
      const content = data.choices[0].message.content.trim()
      const clean = content.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      setAnalysis(parsed)

      const newEntry = {
        date: todayKey,
        text,
        analysis: parsed,
        createdAt: new Date().toISOString()
      }
      setEntries(prev => {
        const filtered = prev.filter(e => e.date !== todayKey)
        return [newEntry, ...filtered].slice(0, 30)
      })
      setView('analysis')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit() {
    if (!todayText.trim()) return
    analyzeWithAI(todayText.trim())
  }

  function ImpactBadge({ impact }) {
    const config = {
      positive: { color: '#22c55e', label: '↑ 향상' },
      negative: { color: '#ef4444', label: '↓ 부족' },
      neutral: { color: '#888', label: '→ 유지' }
    }
    const c = config[impact] || config.neutral
    return (
      <span style={{
        fontSize: '0.68rem', color: c.color,
        border: `1px solid ${c.color}`,
        borderRadius: '4px', padding: '2px 6px'
      }}>{c.label}</span>
    )
  }

  return (
    <div className="daily-log">
      <div className="daily-tabs">
        <button
          className={`daily-tab ${view === 'write' ? 'active' : ''}`}
          onClick={() => setView('write')}
        >오늘 기록</button>
        <button
          className={`daily-tab ${view === 'analysis' ? 'active' : ''}`}
          onClick={() => { setView('analysis'); if (todayEntry) setAnalysis(todayEntry.analysis) }}
        >AI 분석</button>
        <button
          className={`daily-tab ${view === 'history' ? 'active' : ''}`}
          onClick={() => setView('history')}
        >기록 보기</button>
      </div>

      {view === 'write' && (
        <div className="write-view">
          <div className="date-badge">{today}</div>
          {todayEntry && (
            <div className="today-done">
              ✓ 오늘 기록 완료 —
              <button className="rewrite-btn" onClick={() => { setTodayText(todayEntry.text); }}>
                다시 쓰기
              </button>
            </div>
          )}
          <textarea
            className="diary-textarea"
            placeholder={`오늘 뭘 했는지 자유롭게 적어줘.\n\n예시:\n- 오전에 헬스장 가서 벤치 80kg 3세트 했어\n- 점심에 지예랑 밥 먹었고\n- 퇴근 후 책 30분 읽었어\n- 근데 저녁에 화를 좀 냈어...\n- 11시에 잠들었어`}
            value={todayText}
            onChange={e => setTodayText(e.target.value)}
            rows={10}
          />
          {error && <div className="error-msg">⚠ {error}</div>}
          <button
            className="analyze-btn"
            onClick={handleSubmit}
            disabled={loading || !todayText.trim()}
          >
            {loading ? '분석 중...' : 'AI 분석 받기 →'}
          </button>
        </div>
      )}

      {view === 'analysis' && (
        <div className="analysis-view">
          {!analysis ? (
            <div className="no-analysis">
              <p>오늘 기록을 먼저 작성해줘</p>
              <button className="analyze-btn small" onClick={() => setView('write')}>기록 쓰기 →</button>
            </div>
          ) : (
            <>
              <div className="analysis-summary">{analysis.summary}</div>

              <div className="analysis-section">
                <h4>덕목별 영향</h4>
                <div className="impact-grid">
                  {analysis.virtueImpact?.map((v, i) => (
                    <div key={i} className="impact-item">
                      <span className="impact-emoji">{v.emoji}</span>
                      <div className="impact-info">
                        <span className="impact-virtue">{v.virtue}</span>
                        <span className="impact-reason">{v.reason}</span>
                      </div>
                      <ImpactBadge impact={v.impact} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="analysis-section">
                <h4>잘한 점</h4>
                <ul className="analysis-list positive">
                  {analysis.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="analysis-section">
                <h4>부족한 점</h4>
                <ul className="analysis-list negative">
                  {analysis.improvements?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="analysis-section">
                <h4>내일 할 일</h4>
                <ul className="analysis-list tomorrow">
                  {analysis.tomorrow?.map((s, i) => <li key={i}><span className="tomorrow-num">{i + 1}</span>{s}</li>)}
                </ul>
              </div>

              <div className="analysis-message">
                "{analysis.message}"
              </div>
            </>
          )}
        </div>
      )}

      {view === 'history' && (
        <div className="history-view">
          {entries.length === 0 ? (
            <p className="no-history">아직 기록이 없어</p>
          ) : (
            entries.map(entry => (
              <div key={entry.date} className="history-item"
                onClick={() => { setAnalysis(entry.analysis); setView('analysis') }}>
                <div className="history-date">
                  {new Date(entry.date).toLocaleDateString('ko-KR', {
                    month: 'long', day: 'numeric', weekday: 'short'
                  })}
                </div>
                <div className="history-summary">{entry.analysis?.summary || entry.text.slice(0, 30) + '...'}</div>
                <div className="history-impacts">
                  {entry.analysis?.virtueImpact?.filter(v => v.impact === 'positive').length > 0 && (
                    <span className="history-badge positive">
                      ↑ {entry.analysis.virtueImpact.filter(v => v.impact === 'positive').length}개 향상
                    </span>
                  )}
                  {entry.analysis?.virtueImpact?.filter(v => v.impact === 'negative').length > 0 && (
                    <span className="history-badge negative">
                      ↓ {entry.analysis.virtueImpact.filter(v => v.impact === 'negative').length}개 부족
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
