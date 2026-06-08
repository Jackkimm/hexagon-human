export const VIRTUES = [
  {
    id: 'health',
    name: '건강',
    emoji: '💪',
    color: '#22c55e',
    description: '만 28세 남성 상위 기준',
    scoringMode: 'average',
    items: [
      {
        id: 'cardio',
        name: '심폐지구력',
        description: '쿠퍼 테스트 (12분 달리기)',
        unit: 'm',
        source: 'ACSM / Cooper Institute',
        inputType: 'number',
        placeholder: '12분 달리기 거리 (m)',
        levels: [
          { score: 10, label: '3,400m 이상', min: 3400, description: '상위 5% (95th percentile)' },
          { score: 8, label: '3,000m 이상', min: 3000, description: '상위 10% (90th percentile)' },
          { score: 6, label: '2,700m 이상', min: 2700, description: '상위 25% (75th percentile)' },
          { score: 4, label: '2,400m 이상', min: 2400, description: '상위 50% (50th percentile)' },
          { score: 2, label: '2,400m 미만', min: 0, description: '하위 50%' },
        ],
      },
      {
        id: 'strength',
        name: '근력',
        description: '3대 운동 합산 (체중 70kg 기준)',
        unit: 'kg',
        source: '일반인 + 운동하는 사람 모집단',
        inputType: 'number',
        placeholder: '3대 운동 합산 무게 (kg)',
        levels: [
          { score: 10, label: '420kg 이상', min: 420, description: '상위 5~10% (고급)' },
          { score: 8, label: '350kg 이상', min: 350, description: '상위 25% (중상급)' },
          { score: 6, label: '297kg 이상', min: 297, description: '상위 50% (중급)' },
          { score: 4, label: '209kg 이상', min: 209, description: '하위 50% (초급)' },
          { score: 2, label: '209kg 미만', min: 0, description: '입문' },
        ],
      },
      {
        id: 'flexibility',
        name: '유연성',
        description: '앉아서 윗몸 앞으로 굽히기',
        unit: 'cm',
        source: 'Canadian Health Measures Survey / ACSM',
        inputType: 'number',
        placeholder: '측정값 (cm)',
        levels: [
          { score: 10, label: '39.7cm 이상', min: 39.7, description: '상위 5% (95th percentile)' },
          { score: 8, label: '33.4cm 이상', min: 33.4, description: '상위 25% (75th percentile)' },
          { score: 6, label: '24.5cm 이상', min: 24.5, description: '상위 50% (50th percentile)' },
          { score: 4, label: '15.4cm 이상', min: 15.4, description: '상위 75% (25th percentile)' },
          { score: 2, label: '15.4cm 미만', min: -99, description: '하위 25%' },
        ],
      },
      {
        id: 'endurance',
        name: '근지구력',
        description: '풀업 + 푸시업 + 플랭크 평균',
        unit: '점',
        source: 'ACSM / Navy / Chase & Brigham',
        inputType: 'composite',
        subItems: [
          { id: 'pullup', name: '풀업', unit: '개', placeholder: '개수',
            levels: [
              { score: 10, min: 20, label: '20개 이상' },
              { score: 8, min: 15, label: '15개 이상' },
              { score: 6, min: 10, label: '10개 이상' },
              { score: 4, min: 5, label: '5개 이상' },
              { score: 2, min: 0, label: '5개 미만' },
            ]
          },
          { id: 'pushup', name: '푸시업', unit: '개', placeholder: '개수',
            levels: [
              { score: 10, min: 50, label: '50개 이상' },
              { score: 8, min: 36, label: '36개 이상' },
              { score: 6, min: 29, label: '29개 이상' },
              { score: 4, min: 22, label: '22개 이상' },
              { score: 2, min: 0, label: '22개 미만' },
            ]
          },
          { id: 'plank', name: '플랭크', unit: '초', placeholder: '초',
            levels: [
              { score: 10, min: 180, label: '3분 이상' },
              { score: 8, min: 120, label: '2분 이상' },
              { score: 6, min: 95, label: '1분 35초 이상' },
              { score: 4, min: 84, label: '1분 24초 이상' },
              { score: 2, min: 0, label: '1분 24초 미만' },
            ]
          },
        ],
      },
      {
        id: 'recovery',
        name: '회복/수면',
        description: '안정시 심박수 + 수면',
        unit: '점',
        source: 'WHOOP / CDC 수면 연구',
        inputType: 'composite',
        subItems: [
          { id: 'rhr', name: '안정시 심박수', unit: 'bpm', placeholder: 'bpm',
            levels: [
              { score: 10, max: 44, label: '45 미만' },
              { score: 8, max: 49, label: '45~50' },
              { score: 6, max: 59, label: '51~60' },
              { score: 4, max: 69, label: '61~70' },
              { score: 2, max: 999, label: '71 이상' },
            ],
            isInverse: true,
          },
          { id: 'sleep', name: '수면 점수', unit: '점', placeholder: '1~10점',
            levels: [
              { score: 10, min: 9.5, label: '7~9시간 + 규칙적 + 개운함' },
              { score: 8, min: 7.5, label: '7~9시간 + 대체로 규칙적' },
              { score: 6, min: 5.5, label: '7시간+ 또는 불규칙' },
              { score: 4, min: 3.5, label: '6~7시간 + 불규칙' },
              { score: 2, min: 0, label: '6시간 미만' },
            ],
            isSelect: true,
          },
        ],
      },
    ],
  },
  {
    id: 'money',
    name: '돈',
    emoji: '💰',
    color: '#f59e0b',
    description: '한국 만 28세 기준',
    scoringMode: 'weighted',
    items: [
      {
        id: 'income',
        name: '소득',
        description: '연봉 / 총수입',
        unit: '만원',
        weight: 0.25,
        source: '국세청 근로소득 백분위',
        inputType: 'number',
        placeholder: '연봉 (만원)',
        levels: [
          { score: 10, label: '1억 이상', min: 10000, description: '20대 상위 1~3%' },
          { score: 8, label: '7,000만원 이상', min: 7000, description: '상위 10%' },
          { score: 6, label: '5,000만원 이상', min: 5000, description: '상위 25%' },
          { score: 4, label: '3,500만원 이상', min: 3500, description: '평균 수준' },
          { score: 2, label: '3,500만원 미만', min: 0, description: '평균 이하' },
        ],
      },
      {
        id: 'assets',
        name: '순자산',
        description: '자산 - 부채',
        unit: '만원',
        weight: 0.25,
        source: '통계청 2025 가계금융복지조사',
        inputType: 'number',
        placeholder: '순자산 (만원)',
        levels: [
          { score: 10, label: '3억 이상', min: 30000, description: '20대 상위 5%' },
          { score: 8, label: '1억 5천 이상', min: 15000, description: '상위 15%' },
          { score: 6, label: '7,000만원 이상', min: 7000, description: '상위 30%' },
          { score: 4, label: '3,000만원 이상', min: 3000, description: '평균 수준' },
          { score: 2, label: '3,000만원 미만', min: 0, description: '평균 이하' },
        ],
      },
      {
        id: 'investment',
        name: '투자수익률',
        description: '연간 포트폴리오 수익률',
        unit: '%',
        weight: 0.20,
        source: 'S&P500 / JPMorgan 연구',
        inputType: 'number',
        placeholder: '연간 수익률 (%)',
        levels: [
          { score: 10, label: '연 20% 이상', min: 20, description: '상위 1% 투자자' },
          { score: 8, label: '연 15% 이상', min: 15, description: '상위 5%' },
          { score: 6, label: '연 10% 이상', min: 10, description: 'S&P500 장기 평균 이기기' },
          { score: 4, label: '연 5% 이상', min: 5, description: '인플레이션 이김' },
          { score: 2, label: '5% 미만', min: -999, description: '저축만 하는 수준' },
        ],
      },
      {
        id: 'savings',
        name: '저축률',
        description: '월 수입 대비 저축 비율',
        unit: '%',
        weight: 0.15,
        source: 'Federal Reserve / Financial Samurai',
        inputType: 'number',
        placeholder: '저축률 (%)',
        levels: [
          { score: 10, label: '40% 이상', min: 40, description: '상위 1% / FIRE 달성권' },
          { score: 8, label: '30% 이상', min: 30, description: '상위 5%' },
          { score: 6, label: '20% 이상', min: 20, description: '권장 수준' },
          { score: 4, label: '10% 이상', min: 10, description: '최소 권장' },
          { score: 2, label: '10% 미만', min: 0, description: '평균 이하' },
        ],
      },
      {
        id: 'cashflow',
        name: '현금흐름 다각화',
        description: '총수입 중 수동소득 비율',
        unit: '%',
        weight: 0.15,
        source: '재무 독립 연구',
        inputType: 'number',
        placeholder: '수동소득 비율 (%)',
        levels: [
          { score: 10, label: '30% 이상', min: 30, description: '배당, 임대, 사업소득' },
          { score: 8, label: '20% 이상', min: 20, description: '배당 + 부업' },
          { score: 6, label: '10% 이상', min: 10, description: '소액 배당이라도 있음' },
          { score: 4, label: '1~10%', min: 1, description: '시작 단계' },
          { score: 2, label: '0%', min: 0, description: '근로소득 100% 의존' },
        ],
      },
    ],
  },
  {
    id: 'relationship',
    name: '관계',
    emoji: '🤝',
    color: '#ec4899',
    description: '던바 이론 기반',
    scoringMode: 'average',
    items: [
      {
        id: 'partner',
        name: '연인/배우자',
        description: '관계의 질, 친밀도, 소통',
        inputType: 'select',
        levels: [
          { score: 10, label: '주 3회↑ 깊은 대화 + 갈등 24h 내 해결 + 목표 공유', description: '매우 건강한 관계' },
          { score: 8, label: '주 2회↑ 대화 + 갈등 해결 노력 있음', description: '건강한 관계' },
          { score: 6, label: '관계는 있으나 소통 부족', description: '보통' },
          { score: 4, label: '관계는 있으나 갈등 미해결 많음', description: '개선 필요' },
          { score: 2, label: '관계 없음 또는 심각한 갈등', description: '위기' },
        ],
      },
      {
        id: 'friends',
        name: '진짜 친구',
        description: '던바 5명 기준 깊이',
        inputType: 'select',
        levels: [
          { score: 10, label: '5명+ 월 1회↑ 만남 + 고민 털어놓을 수 있음', description: '최상' },
          { score: 8, label: '3~4명 + 정기적 만남', description: '좋음' },
          { score: 6, label: '2~3명 + 가끔 만남', description: '보통' },
          { score: 4, label: '1~2명', description: '부족' },
          { score: 2, label: '0명', description: '고립' },
        ],
      },
      {
        id: 'family',
        name: '가족',
        description: '가족 관계의 질',
        inputType: 'select',
        levels: [
          { score: 10, label: '주 1회↑ 연락 + 갈등 없음 + 서로 지지', description: '매우 건강' },
          { score: 8, label: '격주 연락 + 대체로 긍정적', description: '건강' },
          { score: 6, label: '월 1회 연락 + 보통 관계', description: '보통' },
          { score: 4, label: '연락 드물고 갈등 있음', description: '개선 필요' },
          { score: 2, label: '단절 또는 심각한 갈등', description: '위기' },
        ],
      },
      {
        id: 'network',
        name: '네트워크',
        description: '150명 기준 사회적 자본',
        inputType: 'select',
        levels: [
          { score: 10, label: '150명↑ + 다양한 분야 + 상호 도움', description: '최상' },
          { score: 8, label: '100명↑ + 커리어 연결 가능', description: '좋음' },
          { score: 6, label: '50명↑ + 일부 분야 연결', description: '보통' },
          { score: 4, label: '20명↑', description: '부족' },
          { score: 2, label: '20명 미만', description: '고립' },
        ],
      },
      {
        id: 'community',
        name: '커뮤니티',
        description: '소속감, 기여도',
        inputType: 'select',
        levels: [
          { score: 10, label: '2개↑ 소속 + 정기 참여 + 리더 역할', description: '최상' },
          { score: 8, label: '1~2개 소속 + 정기 참여', description: '좋음' },
          { score: 6, label: '1개 소속 + 가끔 참여', description: '보통' },
          { score: 4, label: '소속은 있으나 거의 참여 안 함', description: '부족' },
          { score: 2, label: '소속 없음', description: '없음' },
        ],
      },
    ],
  },
  {
    id: 'growth',
    name: '성장',
    emoji: '🧠',
    color: '#8b5cf6',
    description: '방향 × 속도 균형',
    scoringMode: 'average',
    items: [
      {
        id: 'career',
        name: '커리어 성장',
        description: '작년 대비 직업적 성장',
        inputType: 'select',
        levels: [
          { score: 10, label: '연봉 20%↑ 또는 직급 상승 또는 창업 성공', description: '고성장' },
          { score: 8, label: '연봉 10%↑ 또는 명확한 커리어 성장', description: '성장' },
          { score: 6, label: '현상유지 + 새로운 스킬 습득', description: '유지' },
          { score: 4, label: '현상유지 + 성장 없음', description: '정체' },
          { score: 2, label: '커리어 후퇴 또는 방향 없음', description: '후퇴' },
        ],
      },
      {
        id: 'learning',
        name: '학습량',
        description: '연간 독서 + 강의 + 루틴',
        inputType: 'select',
        levels: [
          { score: 10, label: '연 18권↑ + 강의 1개↑ + 주 5회↑ 학습', description: '상위 5%' },
          { score: 8, label: '연 12권↑ + 주 4회↑ 학습', description: '상위 25%' },
          { score: 6, label: '연 6권↑ + 주 3회↑ 학습', description: '평균 이상' },
          { score: 4, label: '연 3권↑ 또는 불규칙', description: '부족' },
          { score: 2, label: '거의 학습 없음', description: '없음' },
        ],
      },
      {
        id: 'goals',
        name: '목표 달성률',
        description: '연초 목표 달성 비율',
        inputType: 'number',
        placeholder: '목표 달성률 (%)',
        unit: '%',
        levels: [
          { score: 10, label: '80% 이상', min: 80, description: '구체적·측정가능한 목표 포함' },
          { score: 8, label: '60~80%', min: 60, description: '좋음' },
          { score: 6, label: '40~60%', min: 40, description: '보통' },
          { score: 4, label: '20~40%', min: 20, description: '부족' },
          { score: 2, label: '20% 미만 또는 목표 없음', min: 0, description: '없음' },
        ],
      },
      {
        id: 'challenge',
        name: '도전/경험',
        description: '컴포트존 밖 도전',
        inputType: 'select',
        levels: [
          { score: 10, label: '연 3개↑ 새로운 도전 + 실패 경험도 있음', description: '최상' },
          { score: 8, label: '연 2개 새로운 도전', description: '좋음' },
          { score: 6, label: '연 1개 새로운 도전', description: '보통' },
          { score: 4, label: '도전 시도했으나 포기', description: '부족' },
          { score: 2, label: '컴포트존에만 머묾', description: '없음' },
        ],
      },
      {
        id: 'influence',
        name: '영향력',
        description: '주변에 긍정적 영향',
        inputType: 'select',
        levels: [
          { score: 10, label: '팀 리더 + 멘토링 + 외부 영향력', description: '최상' },
          { score: 8, label: '팀 내 리더 또는 멘토링', description: '좋음' },
          { score: 6, label: '주변에 긍정적 영향 주는 편', description: '보통' },
          { score: 4, label: '영향력 거의 없음', description: '부족' },
          { score: 2, label: '부정적 영향을 주는 편', description: '개선 필요' },
        ],
      },
    ],
  },
  {
    id: 'mental',
    name: '멘탈',
    emoji: '🧘',
    color: '#06b6d4',
    description: '감정조절 특화 설계',
    scoringMode: 'weighted',
    items: [
      {
        id: 'emotion',
        name: '감정조절',
        description: '분노 조절 중심',
        weight: 0.30,
        source: 'World Psychiatry 2024 / PERCI',
        inputType: 'select',
        levels: [
          { score: 10, label: '화나도 2시간 내 진정 + 후회할 말 월 1회 미만', description: '최상' },
          { score: 8, label: '당일 내 진정 + 대부분 참음', description: '좋음' },
          { score: 6, label: '하루 이상 걸리지만 해소함', description: '보통' },
          { score: 4, label: '자주 폭발 + 후회 반복', description: '개선 필요' },
          { score: 2, label: '감정 조절 거의 안 됨', description: '위기' },
        ],
      },
      {
        id: 'resilience',
        name: '회복탄력성',
        description: '실패 후 복귀 속도',
        weight: 0.25,
        source: 'Brief Resilience Scale (BRS)',
        inputType: 'select',
        levels: [
          { score: 10, label: '큰 실패 후 1주일 내 다시 행동 시작', description: '최상' },
          { score: 8, label: '2주 내 회복', description: '좋음' },
          { score: 6, label: '한 달 내 회복', description: '보통' },
          { score: 4, label: '한 달 이상 걸림', description: '부족' },
          { score: 2, label: '회복 못 하고 무너짐', description: '위기' },
        ],
      },
      {
        id: 'equanimity',
        name: '평정심',
        description: '일상 안정감',
        weight: 0.20,
        inputType: 'select',
        levels: [
          { score: 10, label: '명상/루틴 매일 + 작은 일에 흔들리지 않음', description: '최상' },
          { score: 8, label: '주 5회↑ 루틴 + 대체로 안정적', description: '좋음' },
          { score: 6, label: '가끔 루틴 + 보통 안정감', description: '보통' },
          { score: 4, label: '루틴 없음 + 자주 흔들림', description: '부족' },
          { score: 2, label: '만성 불안/스트레스 상태', description: '위기' },
        ],
      },
      {
        id: 'focus',
        name: '집중력',
        description: '딥워크 가능 시간',
        weight: 0.15,
        inputType: 'select',
        levels: [
          { score: 10, label: '하루 딥워크 4시간↑ + 폰 없이 90분 집중', description: '최상' },
          { score: 8, label: '딥워크 2~3시간 + 60분 집중 가능', description: '좋음' },
          { score: 6, label: '딥워크 1~2시간', description: '보통' },
          { score: 4, label: '30분 이상 집중 어려움', description: '부족' },
          { score: 2, label: '집중 거의 불가', description: '위기' },
        ],
      },
      {
        id: 'selfawareness',
        name: '자기인식',
        description: '일기/회고/피드백 수용',
        weight: 0.10,
        inputType: 'select',
        levels: [
          { score: 10, label: '일기/회고 매일 + 감정 트리거 파악 + 피드백 수용', description: '최상' },
          { score: 8, label: '주 3회↑ 회고 + 대체로 자기 파악', description: '좋음' },
          { score: 6, label: '가끔 회고 + 어느 정도 자기 이해', description: '보통' },
          { score: 4, label: '회고 없음 + 자기 이해 부족', description: '부족' },
          { score: 2, label: '자기 인식 거의 없음', description: '없음' },
        ],
      },
    ],
  },
  {
    id: 'purpose',
    name: '목적',
    emoji: '🎯',
    color: '#ef4444',
    description: '"끝까지 버티며 곁을 지켜"',
    scoringMode: 'weighted',
    items: [
      {
        id: 'why',
        name: 'WHY 실천력',
        description: '끝까지 버티고 있냐',
        weight: 0.25,
        source: 'Find My WHY 리포트',
        inputType: 'select',
        levels: [
          { score: 10, label: '포기하고 싶었지만 끝낸 일 이번 달 1개↑ + WHY 말할 수 있음', description: '최상' },
          { score: 8, label: '대체로 버팀 + WHY 알고 있음', description: '좋음' },
          { score: 6, label: '가끔 흔들리지만 방향은 있음', description: '보통' },
          { score: 4, label: '자주 포기 + 방향 불명확', description: '부족' },
          { score: 2, label: 'WHY 모름 + 표류 중', description: '위기' },
        ],
      },
      {
        id: 'presence',
        name: '곁 지킴',
        description: '소중한 사람 곁에 있냐',
        weight: 0.25,
        inputType: 'select',
        levels: [
          { score: 10, label: '가족/지예에게 주 1회↑ 먼저 연락 + 위기 시 즉시 달려갈 수 있음', description: '최상' },
          { score: 8, label: '주 1회 연락 + 대체로 곁에 있음', description: '좋음' },
          { score: 6, label: '격주 연락 + 바쁘지만 챙기려 노력', description: '보통' },
          { score: 4, label: '월 1회 미만 + 자주 닿지 못함', description: '부족' },
          { score: 2, label: '단절 또는 연락 거의 없음', description: '위기' },
        ],
      },
      {
        id: 'completion',
        name: '완수력',
        description: '시작한 것을 끝내냐',
        weight: 0.20,
        inputType: 'number',
        placeholder: '분기 목표 달성률 (%)',
        unit: '%',
        levels: [
          { score: 10, label: '80% 이상 완수 + 중간 포기 없음', min: 80, description: '최상' },
          { score: 8, label: '60~80% 완수', min: 60, description: '좋음' },
          { score: 6, label: '40~60% 완수', min: 40, description: '보통' },
          { score: 4, label: '20~40% 완수', min: 20, description: '부족' },
          { score: 2, label: '20% 미만 또는 목표 없음', min: 0, description: '없음' },
        ],
      },
      {
        id: 'familypeace',
        name: '가족 평온 기여',
        description: '소중한 이들이 실제로 평온한가',
        weight: 0.20,
        inputType: 'select',
        levels: [
          { score: 10, label: '이번 달 가족/지예와 의미있는 순간 4회↑ + 가족 걱정 없이 지냄', description: '최상' },
          { score: 8, label: '월 2~3회 의미있는 순간 + 대체로 평온', description: '좋음' },
          { score: 6, label: '월 1~2회 + 보통', description: '보통' },
          { score: 4, label: '바빠서 함께하는 시간 거의 없음', description: '부족' },
          { score: 2, label: '가족 관계 갈등 또는 단절', description: '위기' },
        ],
      },
      {
        id: 'peace',
        name: '평온 지수',
        description: '지금 이 삶이 평온한가',
        weight: 0.10,
        inputType: 'select',
        levels: [
          { score: 10, label: '"고생했네, 고마워" 말할 수 있는 순간이 이번 달 있었음', description: '최상' },
          { score: 8, label: '대체로 평온 + 가끔 의미 느낌', description: '좋음' },
          { score: 6, label: '보통 + 가끔 공허함', description: '보통' },
          { score: 4, label: '자주 무력감 또는 방향 잃음', description: '부족' },
          { score: 2, label: '닿지 못하는 무력감이 일상화됨', description: '위기' },
        ],
      },
    ],
  },
]

export function calculateItemScore(item, value) {
  if (!value && value !== 0) return null
  const v = parseFloat(value)
  if (isNaN(v)) return null

  if (item.levels[0].isInverse !== undefined) {
    for (const level of item.levels) {
      if (v <= level.max) return level.score
    }
    return item.levels[item.levels.length - 1].score
  }

  for (const level of [...item.levels].sort((a, b) => b.min - a.min)) {
    if (v >= level.min) return level.score
  }
  return 2
}

export function calculateVirtueScore(virtue, scores) {
  const validScores = virtue.items.map(item => {
    const score = scores[item.id]
    if (score === null || score === undefined) return null
    return { score: parseFloat(score), weight: item.weight || 1 }
  }).filter(s => s !== null)

  if (validScores.length === 0) return 0

  if (virtue.scoringMode === 'weighted') {
    const totalWeight = validScores.reduce((sum, s) => sum + s.weight, 0)
    const weightedSum = validScores.reduce((sum, s) => sum + s.score * s.weight, 0)
    return Math.round((weightedSum / totalWeight) * 10) / 10
  } else {
    const sum = validScores.reduce((sum, s) => sum + s.score, 0)
    return Math.round((sum / validScores.length) * 10) / 10
  }
}
