import { calculateItemScore } from '../data'

export default function VirtueDetail({ virtue, scores, onUpdate, onBack, virtueScore }) {
  if (!virtue) return null

  function getScore(item) {
    if (item.inputType === 'composite') {
      const subScores = item.subItems.map(sub => {
        const subVal = scores[`${item.id}_${sub.id}`]
        if (!subVal && subVal !== 0) return null
        const v = parseFloat(subVal)
        if (isNaN(v)) return null
        if (sub.isInverse) {
          for (const level of sub.levels) {
            if (v <= level.max) return level.score
          }
          return sub.levels[sub.levels.length - 1].score
        }
        if (sub.isSelect) return v
        const sorted = [...sub.levels].sort((a, b) => b.min - a.min)
        for (const level of sorted) {
          if (v >= level.min) return level.score
        }
        return 2
      }).filter(s => s !== null)
      if (subScores.length === 0) return null
      return Math.round((subScores.reduce((a, b) => a + b, 0) / subScores.length) * 10) / 10
    }
    const val = scores[item.id]
    if (val === null || val === undefined || val === '') return null
    if (item.inputType === 'select') return parseFloat(val)
    return calculateItemScore(item, val)
  }

  function ScoreBar({ score }) {
    if (score === null) return <div className="score-bar-empty">미입력</div>
    const pct = ((score - 2) / 8) * 100
    const color = score >= 8 ? '#22c55e' : score >= 6 ? '#f59e0b' : score >= 4 ? '#f97316' : '#ef4444'
    return (
      <div className="score-bar-wrap">
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
        <span className="score-bar-value" style={{ color }}>{score.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="virtue-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>← 돌아가기</button>
        <div className="detail-title">
          <span style={{ fontSize: '2rem' }}>{virtue.emoji}</span>
          <div>
            <h2>{virtue.name}</h2>
            <p className="detail-desc">{virtue.description}</p>
          </div>
          <div className="detail-score" style={{ color: virtue.color }}>
            {virtueScore > 0 ? virtueScore.toFixed(1) : '—'}
            <span className="detail-score-label">/ 10</span>
          </div>
        </div>
      </div>

      <div className="items-list">
        {virtue.items.map(item => {
          const itemScore = getScore(item)
          const weight = item.weight ? `(${Math.round(item.weight * 100)}%)` : ''

          return (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <div>
                  <h3 className="item-name">{item.name} <span className="item-weight">{weight}</span></h3>
                  <p className="item-desc">{item.description}</p>
                  {item.source && <p className="item-source">출처: {item.source}</p>}
                </div>
                <ScoreBar score={itemScore} />
              </div>

              {item.inputType === 'number' && (
                <div className="input-wrap">
                  <input
                    type="number"
                    className="score-input"
                    placeholder={item.placeholder}
                    value={scores[item.id] || ''}
                    onChange={e => onUpdate(item.id, e.target.value)}
                  />
                  <span className="input-unit">{item.unit}</span>
                </div>
              )}

              {item.inputType === 'select' && (
                <div className="select-options">
                  {item.levels.map(level => (
                    <button
                      key={level.score}
                      className={`option-btn ${scores[item.id] == level.score ? 'selected' : ''}`}
                      style={scores[item.id] == level.score ? { '--btn-color': virtue.color } : {}}
                      onClick={() => onUpdate(item.id, level.score)}
                    >
                      <span className="option-score">{level.score}점</span>
                      <span className="option-label">{level.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {item.inputType === 'composite' && (
                <div className="composite-wrap">
                  {item.subItems.map(sub => (
                    <div key={sub.id} className="sub-item">
                      <label className="sub-label">{sub.name}</label>
                      {sub.isSelect ? (
                        <div className="select-options sub-select">
                          {sub.levels.map(level => (
                            <button
                              key={level.score}
                              className={`option-btn small ${scores[`${item.id}_${sub.id}`] == level.score ? 'selected' : ''}`}
                              style={scores[`${item.id}_${sub.id}`] == level.score ? { '--btn-color': virtue.color } : {}}
                              onClick={() => onUpdate(`${item.id}_${sub.id}`, level.score)}
                            >
                              <span className="option-score">{level.score}점</span>
                              <span className="option-label">{level.label}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="input-wrap">
                          <input
                            type="number"
                            className="score-input"
                            placeholder={sub.placeholder}
                            value={scores[`${item.id}_${sub.id}`] || ''}
                            onChange={e => onUpdate(`${item.id}_${sub.id}`, e.target.value)}
                          />
                          <span className="input-unit">{sub.unit}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="levels-guide">
                {item.inputType !== 'select' && item.levels && (
                  <details>
                    <summary className="levels-summary">기준 보기</summary>
                    <div className="levels-list">
                      {item.levels.map(level => (
                        <div key={level.score} className="level-row">
                          <span className="level-score">{level.score}점</span>
                          <span className="level-label">{level.label}</span>
                          {level.description && <span className="level-desc">{level.description}</span>}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
