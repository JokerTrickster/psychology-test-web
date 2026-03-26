---
name: parrot-compatibility-test
description: 모란도란 앵무새 성격 궁합 심리테스트 상세 설계
status: in-progress
created: 2026-03-26T01:53:13Z
updated: 2026-03-26T01:53:13Z
architecture: Option C - Pragmatic Balance
---

## Context Anchor

| Key | Value |
|-----|-------|
| **WHY** | 다양한 심리테스트 콘텐츠로 사용자 재방문율 높이기 |
| **WHO** | 앵무새/모란도란에 관심 있는 일반 사용자 |
| **RISK** | 데이터/이미지가 사용자 전달 의존, 새 UI 스타일 추가로 코드량 증가 |
| **SUCCESS** | 테스트 선택 → 5질문 완료 → 5마리 중 1마리 결과 정상 표시 |
| **SCOPE** | 새 테스트 데이터 + 테스트 선택 화면 + 질문 페이지(재사용) + 새 결과 페이지 스타일 |

---

## 1. Overview

선택된 아키텍처: **Option C — Pragmatic Balance**

기존 `App-score.tsx`의 상태 관리 패턴을 유지하면서, 테스트 타입 상태를 추가하고 테스트 선택 화면과 새 결과 페이지만 별도 컴포넌트로 분리한다. React Router 없이 상태 기반 페이지 전환.

## 2. Architecture

### 2.1 상태 흐름도

```
[testType: null] → TestSelectPage
                     ├── "lovebird" 선택 → 기존 흐름 (StartPage → QuestionPage → ResultPage)
                     └── "parrot" 선택 → [currentQuestionIndex: 0]
                                          → QuestionPage-score (재사용, parrot-data)
                                          → ResultPage-parrot (새 스타일)
```

### 2.2 상태 관리

```typescript
// App-score.tsx 에 추가될 상태
type TestType = 'lovebird' | 'parrot' | null;

const [testType, setTestType] = useState<TestType>(null);
// 기존 상태 유지
const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
const [totalScore, setTotalScore] = useState<number>(0);
const [answers, setAnswers] = useState<number[]>([]);
```

### 2.3 페이지 전환 로직

```
testType === null          → TestSelectPage 렌더링
testType === 'lovebird'    → 기존 흐름 (StartPage → Question → Result)
testType === 'parrot'      → parrot 흐름 (Question → ResultPage-parrot)
  - currentQuestionIndex === -1  → 시작 대기 (바로 0으로 전환)
  - currentQuestionIndex 0~4     → QuestionPage-score (parrotData 사용)
  - currentQuestionIndex >= 5    → ResultPage-parrot
```

## 3. File Structure

### 3.1 신규 파일

| 파일 | 설명 | 크기 예상 |
|------|------|-----------|
| `src/pages/TestSelectPage.tsx` | 테스트 선택 화면 | ~120줄 |
| `src/pages/ResultPage-parrot.tsx` | 새 결과 페이지 (차별화된 스타일) | ~200줄 |
| `src/scenario/parrot-data.json` | 5질문 + 5결과 데이터 | ~80줄 |
| `public/images/parrots/` | 앵무새 이미지 5장 | (사용자 제공) |

### 3.2 수정 파일

| 파일 | 변경 내용 | 영향도 |
|------|-----------|--------|
| `src/App-score.tsx` | testType 상태 추가, 조건부 렌더링, parrot 데이터 import | Medium |

### 3.3 재사용 파일 (변경 없음)

| 파일 | 재사용 방식 |
|------|-------------|
| `src/pages/QuestionPage-score.tsx` | parrot 테스트에서도 동일하게 사용 |
| `src/pages/StartPage.tsx` | lovebird 테스트 시작 시 기존과 동일 사용 |
| `src/pages/ResultPage.tsx` | lovebird 테스트 결과 시 기존과 동일 사용 |
| `src/types-score.ts` | ScoreScenario, Question, BirdResult 타입 재사용 |
| `src/components/Layout.tsx` | 전체 레이아웃 유지 |
| `src/components/LovebirdIllustration.tsx` | 장식 일러스트 재사용 |

## 4. Component Design

### 4.1 TestSelectPage

```typescript
interface TestSelectPageProps {
  onSelectTest: (type: 'lovebird' | 'parrot') => void;
}
```

**UI 구성**:
- 상단: 타이틀 "어떤 테스트를 해볼까?" + 장식 일러스트
- 중앙: 두 개의 카드형 버튼
  - 카드 1: "나는 어떤 앵무새일까?" (기존 테스트) — 초록 그라데이션
  - 카드 2: "나랑 궁합 좋은 모란도란은?" (새 테스트) — 다른 색상 그라데이션
- 각 카드: 아이콘/일러스트 + 테스트 제목 + 간단 설명
- 모바일: 세로 배치, 데스크톱: 가로 배치

### 4.2 ResultPage-parrot

```typescript
interface ResultPageParrotProps {
  result: BirdResult;
  onRestart: () => void;  // TestSelectPage로 복귀
}
```

**기존 ResultPage와 차별화 포인트**:
- 색상 테마: 기존(초록+노랑) → 새 테스트(보라+핑크 또는 파랑+주황 등 — 구현 시 결정)
- 레이아웃: 이미지를 더 크게, 성격 궁합 강조 텍스트
- 상단 배지: "테스트 완료!" → "당신의 궁합 앵무새는!"
- confetti 색상 변경
- "다시하기" 버튼 → TestSelectPage로 복귀 (다른 테스트도 선택 가능)
- traits 목록 표시 (태그 스타일)
- compatibility 정보 표시

### 4.3 App-score.tsx 변경사항

**추가할 로직**:
```typescript
// 1. parrot 데이터 import
import parrotData from './scenario/parrot-data.json';

// 2. testType 상태 추가
const [testType, setTestType] = useState<TestType>(null);

// 3. 현재 시나리오 동적 결정
const currentScenario = testType === 'parrot' ? parrotData : scoreData;

// 4. 테스트 선택 핸들러
const handleSelectTest = (type: TestType) => {
  setTestType(type);
  if (type === 'parrot') {
    setCurrentQuestionIndex(0); // parrot은 바로 질문 시작
  }
  // lovebird는 기존 StartPage 표시 (-1 유지)
};

// 5. 재시작 핸들러 수정
const handleRestart = () => {
  setTestType(null);  // 테스트 선택 화면으로
  setCurrentQuestionIndex(-1);
  setTotalScore(0);
  setAnswers([]);
};

// 6. renderContent 수정
// testType === null → <TestSelectPage />
// testType === 'lovebird' → 기존 로직
// testType === 'parrot' → QuestionPage + ResultPage-parrot
```

## 5. Data Structure

### 5.1 parrot-data.json

기존 `score-data.json`과 동일한 `ScoreScenario` 타입 사용:

```json
{
  "questions": [
    {
      "id": "pq1",
      "text": "(사용자 제공 예정)",
      "category": "사교성",
      "options": [
        { "text": "선택지 A", "score": 1 },
        { "text": "선택지 B", "score": -1 }
      ]
    }
    // ... 총 5개 질문
  ],
  "results": [
    {
      "name": "로또",
      "scoreRange": [-5, -3],
      "summary": "(사용자 제공 예정)",
      "description": "(사용자 제공 예정)",
      "traits": [],
      "compatibility": [],
      "imageUrl": "/images/parrots/lotto.png"
    },
    {
      "name": "럭키",
      "scoreRange": [-2, -1],
      "summary": "",
      "description": "",
      "traits": [],
      "compatibility": [],
      "imageUrl": "/images/parrots/lucky.png"
    },
    {
      "name": "짹슨",
      "scoreRange": [0, 0],
      "summary": "",
      "description": "",
      "traits": [],
      "compatibility": [],
      "imageUrl": "/images/parrots/jackson.png"
    },
    {
      "name": "마이클",
      "scoreRange": [1, 2],
      "summary": "",
      "description": "",
      "traits": [],
      "compatibility": [],
      "imageUrl": "/images/parrots/michael.png"
    },
    {
      "name": "스타",
      "scoreRange": [3, 5],
      "summary": "",
      "description": "",
      "traits": [],
      "compatibility": [],
      "imageUrl": "/images/parrots/star.png"
    }
  ]
}
```

### 5.2 점수 분배

5질문 × (±1) = 총 점수 범위 **-5 ~ +5** (11단계)

| 점수 구간 | 앵무새 | 확률 |
|-----------|--------|------|
| -5 ~ -3 | 로또 | 3/11 (27%) |
| -2 ~ -1 | 럭키 | 2/11 (18%) |
| 0 | 짹슨 | 1/11 (9%) |
| 1 ~ 2 | 마이클 | 2/11 (18%) |
| 3 ~ 5 | 스타 | 3/11 (27%) |

> 실제 매핑은 사용자 제공 데이터에 따라 조정 가능

## 6. UI/UX Design

### 6.1 TestSelectPage 스타일

- 배경: 기존 Layout의 그라데이션 배경 그대로 사용
- 카드 디자인:
  - 기존 테스트 카드: 초록 계열 (`#7EC850` → `#5CA632`)
  - 새 테스트 카드: 다른 색상 (예: `#6B8FD4` → `#4A6FA5` 파랑 또는 `#E8A87C` → `#D4845E` 주황)
- 카드 호버 효과: scale(1.02) + boxShadow 강조
- 모바일: 카드 세로 배치, full-width
- 데스크톱: 카드 가로 배치, 50% width

### 6.2 ResultPage-parrot 차별화

| 요소 | 기존 ResultPage | ResultPage-parrot |
|------|----------------|-------------------|
| 상단 배지 | "테스트 완료!" | "당신의 궁합 앵무새는!" |
| 색상 테마 | 초록+노랑 | 보라+핑크 (또는 구현 시 결정) |
| confetti | 하트+별 (초록+노랑) | 깃털+하트 (보라+핑크) |
| 이미지 크기 | 작음 (95~170px) | 더 큼 (150~250px) |
| 추가 정보 | 설명만 | 설명 + traits 태그 + 궁합 정보 |
| "다시하기" | 같은 테스트 재시작 | 테스트 선택 화면으로 |
| 커플 일러스트 | 있음 | 없음 (앵무새 이미지에 집중) |

## 7. Error Handling

| 시나리오 | 처리 |
|----------|------|
| 점수에 해당하는 결과 없음 | 가장 가까운 점수 구간의 결과 반환 |
| 이미지 로드 실패 | alt 텍스트 표시 + placeholder 색상 박스 |
| parrot-data.json 형식 오류 | 빌드 타임에 TypeScript로 검증 |

## 8. Mobile Responsiveness

기존 패턴 그대로 적용:
- `xs` (320px~): 카드 세로 배치, 풀폭 버튼, fixed bottom 버튼
- `sm` (600px+): 카드 가로 배치, 넉넉한 패딩
- `md` (900px+): 최대 너비 제한 (Layout의 600px)

## 9. Animation

기존 `AnimatePresence` + `motion.div` 패턴 동일 적용:
- 페이지 전환: fade + translateY (0.3~0.4s)
- 카드 등장: staggered fade-in (0.1s 간격)
- confetti: 기존 confettiFall 키프레임 재활용 (색상만 변경)

## 10. Dependencies

추가 의존성 없음. 기존 스택 그대로:
- React 19 + TypeScript
- MUI v7
- Framer Motion
- Vite

## 11. Implementation Guide

### 11.1 구현 순서

| 순서 | 작업 | 파일 | 의존 |
|------|------|------|------|
| 1 | parrot-data.json 생성 (플레이스홀더) | `src/scenario/parrot-data.json` | 없음 |
| 2 | TestSelectPage 컴포넌트 구현 | `src/pages/TestSelectPage.tsx` | 없음 |
| 3 | ResultPage-parrot 컴포넌트 구현 | `src/pages/ResultPage-parrot.tsx` | 없음 |
| 4 | App-score.tsx 수정 (통합) | `src/App-score.tsx` | 1, 2, 3 |
| 5 | 이미지 추가 + 데이터 교체 | `public/images/parrots/`, `parrot-data.json` | 사용자 전달 |

### 11.2 Module Map

| Module | 파일 | 설명 |
|--------|------|------|
| module-1 | `parrot-data.json` | 테스트 데이터 구조 |
| module-2 | `TestSelectPage.tsx` | 테스트 선택 UI |
| module-3 | `ResultPage-parrot.tsx` | 새 결과 페이지 |
| module-4 | `App-score.tsx` | 상태 관리 + 통합 |

### 11.3 Session Guide

**권장: 1세션으로 충분** (전체 ~500줄 추가/수정)

```
Session 1: 전체 구현
  - module-1: parrot-data.json (플레이스홀더)
  - module-2: TestSelectPage.tsx
  - module-3: ResultPage-parrot.tsx
  - module-4: App-score.tsx 통합
```

데이터/이미지는 사용자 전달 후 별도 세션에서 교체.
