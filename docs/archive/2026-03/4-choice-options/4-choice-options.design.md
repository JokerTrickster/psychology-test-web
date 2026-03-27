---
name: 4-choice-options
description: 점수 기반 심리 테스트 4지선 전환 설계 (Option A - 최소 변경)
status: in-progress
created: 2026-03-26T23:53:42Z
updated: 2026-03-26T23:53:42Z
---

## Context Anchor

| Key | Value |
|-----|-------|
| WHY | 2지선 극단 선택 → 사용자 불만. 4지선으로 세밀한 성격 분류 가능 |
| WHO | 심리 테스트 웹 사용자 전체 |
| RISK | 결과 scoreRange 재조정 필요, 기존 데이터 호환성 |
| SUCCESS | 5개 테스트 모두 4지선 작동, 결과 정상 표시, 모바일 레이아웃 유지 |
| SCOPE | 점수 기반 테스트 5개만 (트리 기반 data.json 제외) |

## 1. Overview

Option A (최소 변경) 선택. 기존 코드 구조를 최대한 유지하며 3곳만 수정:
1. 타입 정의 (튜플 → 배열)
2. UI 컴포넌트 (2버튼 → 4버튼 동적 렌더링)
3. JSON 데이터 (선택지 확장 + scoreRange 재조정)

## 2. 파일 변경 목록

| # | 파일 | 변경 유형 | 설명 |
|---|------|----------|------|
| 1 | `src/types-score.ts` | 수정 | 튜플 → 배열 타입 변경 |
| 2 | `src/pages/QuestionPage-score.tsx` | 수정 | 4버튼 레이아웃 + 동적 라벨 |
| 3 | `src/scenario/score-data.json` | 수정 | 10문항 4지선 + scoreRange 재조정 |
| 4 | `src/scenario/parrot-data.json` | 수정 | 5문항 4지선 + scoreRange 재조정 |
| 5 | `src/scenario/office-data.json` | 수정 | 5문항 4지선 + scoreRange 재조정 |
| 6 | `src/scenario/job-data.json` | 수정 | 5문항 4지선 + scoreRange 재조정 |
| 7 | `src/scenario/mbti-data.json` | 수정 | 5문항 4지선 + scoreRange 재조정 |
| 8 | `src/pages/QuestionPage-score.test.tsx` | 수정 | 4지선 렌더링 테스트 |
| 9 | `src/App-score.test.tsx` | 수정 | 4지선 점수 합산 테스트 |

## 3. 상세 설계

### 3.1 타입 변경 — `types-score.ts`

```typescript
// Before
options: [ScoreOption, ScoreOption]; // 항상 2개의 선택지 (A, B)

// After
options: ScoreOption[]; // 2~4개의 선택지
```

변경 이유: 튜플 `[ScoreOption, ScoreOption]`은 정확히 2개만 허용. 배열로 바꿔 4개 이상도 지원.
`ScoreOption` 인터페이스는 변경 없음 (`score: number`는 이미 +2/-2 지원).

### 3.2 UI 변경 — `QuestionPage-score.tsx`

#### 3.2.1 라벨 동적 생성
```typescript
// Before
const label = index === 0 ? 'A' : 'B';

// After
const labels = ['A', 'B', 'C', 'D'];
const label = labels[index] || String.fromCharCode(65 + index);
```

#### 3.2.2 birdColors 확장
```typescript
// Before
const birdColors = ['pepe-green', 'pepe-yellow'];

// After
const birdColors = ['pepe-green', 'pepe-yellow', 'violet-butter', 'yellowface-green'];
```

#### 3.2.3 버튼 크기 조정 (모바일 4개 수용)
```
변경 포인트:
- padding: xs '16px 20px' → '10px 14px' (4개가 화면에 들어가도록)
- minHeight: xs '56px' → '48px'
- fontSize: xs '1rem' → '0.88rem'
- gap: xs 1.2 → 0.8
- A/B/C/D 원형 라벨: xs '32px' → '26px'
- pb (bottom padding for fixed area): 기존 유지 (4개도 수용 가능)
```

#### 3.2.4 모바일 하단 고정 영역
기존 `position: fixed` 구조 유지. 4개 버튼이 모바일 화면 하단에 세로로 쌓임.
`pb` (question text 영역)을 `calc(280px + env(safe-area-inset-bottom))`로 증가시켜 가림 방지.

### 3.3 데이터 변경 — JSON 5개

#### 3.3.1 선택지 확장 패턴

각 질문의 기존 2개 선택지를 기반으로 4개로 확장:

```json
// Before (2지선)
{
  "text": "처음 본 사람과 금방 수다를 떤다",
  "score": 1
},
{
  "text": "친해질 때까지 시간이 꽤 걸린다",
  "score": -1
}

// After (4지선)
{
  "text": "처음 본 사람이랑도 바로 수다 떨 수 있다! 새 친구 만드는 게 즐겁다",
  "score": 2
},
{
  "text": "어색하지만 먼저 말을 걸어보는 편이다",
  "score": 1
},
{
  "text": "상대방이 먼저 다가와주면 천천히 마음을 연다",
  "score": -1
},
{
  "text": "낯선 사람과 대화는 정말 어렵다. 친해지려면 오래 걸린다",
  "score": -2
}
```

**원칙**:
- +2: 기존 +1 선택지를 더 강하게 표현
- +1: 기존 +1 선택지를 완화하여 표현
- -1: 기존 -1 선택지를 완화하여 표현
- -2: 기존 -1 선택지를 더 강하게 표현

#### 3.3.2 scoreRange 재조정

**5문항 테스트** (parrot, office, job, mbti):
| 결과 # | 현재 범위 | 새 범위 | 성격 |
|--------|----------|---------|------|
| 1 | [-5, -3] | [-10, -5] | 매우 부정적 |
| 2 | [-2, -1] | [-4, -2] | 약간 부정적 |
| 3 | [0, 0] | [-1, 1] | 중립 |
| 4 | [1, 2] | [2, 4] | 약간 긍정적 |
| 5 | [3, 5] | [5, 10] | 매우 긍정적 |

**10문항 테스트** (score-data, 결과 26개):
- 현재: -15 ~ +15 범위, 대부분 1점 간격
- 새 범위: 각 scoreRange를 비례적으로 ×1.5 확장 (반올림)
- 26개 결과가 -20 ~ +20 전체를 커버하도록 조정
- 경계값 겹침/빈틈 없이 연속 배치

비례 확장 공식:
```
newMin = round(oldMin * 20/15)
newMax = round(oldMax * 20/15)
```

실제 매핑:

| 결과 | 현재 | 새 범위 |
|------|------|---------|
| 카카포 | [-15,-13] | [-20,-17] |
| 아프리카 회색앵무 | [-12,-11] | [-16,-15] |
| 케아 | [-10,-9] | [-14,-12] |
| 피오누스 | [-8,-8] | [-11,-11] |
| 뉴기니아 | [-7,-7] | [-10,-10] |
| 세네갈 | [-6,-6] | [-9,-8] |
| 메이어스 | [-5,-5] | [-7,-7] |
| 빗창앵무 | [-4,-4] | [-6,-5] |
| 추초앵무 | [-3,-3] | [-4,-4] |
| 도라지앵무 | [-2,-2] | [-3,-3] |
| 비둘기 | [-1,-1] | [-2,-2] |
| 왕관앵무 | [0,0] | [-1,1] |
| 십자매 | [1,1] | [2,2] |
| 카카이키 | [2,2] | [3,3] |
| 사랑앵무 | [3,3] | [4,4] |
| 목도리앵무 | [4,4] | [5,6] |
| 장미앵무 | [5,5] | [7,7] |
| 오색청해앵무 | [6,6] | [8,9] |
| 유리앵무 | [7,7] | [10,10] |
| 퀘이커 | [8,8] | [11,11] |
| 모란앵무 | [9,9] | [12,12] |
| 한스마카우 | [10,10] | [13,14] |
| 코뉴어 | [11,11] | [15,15] |
| 카이큐 | [12,12] | [16,16] |
| 아마존 앵무 | [13,13] | [17,17] |
| 금강앵무 | [14,14] | [18,19] |
| 코카투 | [15,15] | [20,20] |

검증: -20~+20 전체 범위 빈틈 없이 커버됨.

## 4. 변경하지 않는 파일

| 파일 | 이유 |
|------|------|
| `src/App-score.tsx` | 점수 합산 로직 변경 없음 (`handleSelectOption(score: number)` 그대로) |
| `src/scenario/data.json` | 트리 기반, scope 밖 |
| `src/pages/QuestionPage.tsx` | 트리 기반 전용 |
| `src/pages/ResultPage*.tsx` | 결과 표시 변경 없음 |
| `src/types.ts` | 트리 기반 타입, 변경 없음 |

## 5. 위험 요소 및 대응

| 위험 | 영향 | 대응 |
|------|------|------|
| scoreRange 빈틈으로 결과 없음 | 에러 화면 표시 | 전체 범위 커버 검증 후 배포 |
| 모바일에서 4버튼 잘림 | UX 저하 | 버튼 크기 축소 + 실기기 테스트 |
| 선택지 텍스트가 너무 길면 줄바꿈 | 레이아웃 깨짐 | 각 선택지 25자 이내 권장 |

## 6. 테스트 전략

### 6.1 수정할 테스트
- `QuestionPage-score.test.tsx`: mock 데이터에 options 4개로 변경, A/B/C/D 라벨 확인
- `App-score.test.tsx`: 점수 합산 시 +2/-2 포함 테스트, 결과 매칭 범위 테스트

### 6.2 수동 검증
- 각 테스트별 전체 플로우 (5개 × 1회)
- 모바일 화면에서 4버튼 표시 확인
- 극단 점수(최저/최고) 시 결과 정상 확인

## 7. Implementation Guide

### 7.1 구현 순서

| Step | 파일 | 작업 | 의존성 |
|------|------|------|--------|
| 1 | `types-score.ts` | 튜플 → 배열 | 없음 |
| 2 | `QuestionPage-score.tsx` | 4버튼 레이아웃 | Step 1 |
| 3 | `score-data.json` | 4지선 데이터 + scoreRange | Step 1 |
| 4 | `parrot-data.json` | 4지선 데이터 + scoreRange | Step 1 |
| 5 | `office-data.json` | 4지선 데이터 + scoreRange | Step 1 |
| 6 | `job-data.json` | 4지선 데이터 + scoreRange | Step 1 |
| 7 | `mbti-data.json` | 4지선 데이터 + scoreRange | Step 1 |
| 8 | `QuestionPage-score.test.tsx` | 테스트 수정 | Step 2 |
| 9 | `App-score.test.tsx` | 테스트 수정 | Step 3-7 |

### 7.2 Session Guide

이 작업은 1세션으로 충분. 모듈 분리 불필요.

| Module | Files | Est. Lines |
|--------|-------|------------|
| module-1: 타입+UI | types-score.ts, QuestionPage-score.tsx | ~20 |
| module-2: 데이터 | JSON 5개 | ~300 (선택지 텍스트 작성) |
| module-3: 테스트 | test 2개 | ~30 |
