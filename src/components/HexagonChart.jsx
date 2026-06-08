export default function HexagonChart({ virtueScores }) {
  const size = 280
  const cx = size / 2
  const cy = size / 2
  const maxR = 100
  const levels = [2, 4, 6, 8, 10]
  const n = virtueScores.length

  function getPoint(index, value, max = 10) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = (value / max) * maxR
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  function getLabelPoint(index) {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = maxR + 28
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  const gridPolygons = levels.map(level => {
    const points = virtueScores.map((_, i) => {
      const p = getPoint(i, level)
      return `${p.x},${p.y}`
    }).join(' ')
    return { level, points }
  })

  const dataPoints = virtueScores.map((v, i) => getPoint(i, v.score))
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  const axisLines = virtueScores.map((_, i) => {
    const end = getPoint(i, 10)
    return { x1: cx, y1: cy, x2: end.x, y2: end.y }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="hexagon-svg">
      {gridPolygons.map(({ level, points }) => (
        <polygon
          key={level}
          points={points}
          fill="none"
          stroke="var(--grid-color)"
          strokeWidth={level === 10 ? 1 : 0.5}
          opacity={level === 10 ? 0.4 : 0.2}
        />
      ))}

      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke="var(--grid-color)"
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      <polygon
        points={dataPolygon}
        fill="url(#hexGrad)"
        stroke="var(--accent-color)"
        strokeWidth={2}
        opacity={0.85}
      />

      <defs>
        <radialGradient id="hexGrad">
          <stop offset="0%" stopColor="var(--accent-color)" stopOpacity={0.6} />
          <stop offset="100%" stopColor="var(--accent-color)" stopOpacity={0.15} />
        </radialGradient>
      </defs>

      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y}
          r={4}
          fill={virtueScores[i].score > 0 ? virtueScores[i].color : 'var(--grid-color)'}
          stroke="var(--bg-color)"
          strokeWidth={2}
        />
      ))}

      {virtueScores.map((v, i) => {
        const lp = getLabelPoint(i)
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="chart-label"
          >
            {v.emoji}
          </text>
        )
      })}

      {virtueScores.map((v, i) => {
        const lp = getLabelPoint(i)
        const offset = i === 0 ? -14 : i <= n / 2 ? 14 : 14
        return (
          <text
            key={`name-${i}`}
            x={lp.x}
            y={lp.y + offset}
            textAnchor="middle"
            dominantBaseline="middle"
            className="chart-name"
          >
            {v.score > 0 ? v.score.toFixed(1) : '—'}
          </text>
        )
      })}
    </svg>
  )
}
