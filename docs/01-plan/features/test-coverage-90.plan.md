---
name: test-coverage-90
description: 테스트 코드 작성 및 90% 커버리지 달성
status: in-progress
created: 2026-03-26T06:30:12Z
updated: 2026-03-26T06:30:12Z
---

## Executive Summary

| 항목 | 내용 |
|------|------|
| Feature | 테스트 코드 작성 (90% 커버리지) |
| 시작일 | 2026-03-26 |
| 예상 범위 | 13개 소스 파일, ~15개 테스트 파일 |

### Value Delivered (4-Perspective)

| 관점 | 내용 |
|------|------|
| Problem | 테스트 코드가 전혀 없어 코드 변경 시 회귀 버그 감지 불가 |
| Solution | Vitest + React Testing Library 기반 테스트 스위트 구축, 90% 커버리지 달성 |
| Function UX Effect | 모든 컴포넌트 렌더링, 사용자 인터랙션, 상태 전이, 데이터 처리 로직 검증 |
| Core Value | 안정적인 배포 파이프라인 확보 및 리팩토링 안전망 구축 |

## Context Anchor

| 항목 | 내용 |
|------|------|
| WHY | 현재 테스트 코드 0%, 코드 변경 시 회귀 버그를 수동으로만 확인 가능 |
| WHO | 프로젝트 개발자 (코드 변경 시 안전하게 배포하고 싶은 사람) |
| RISK | UI 컴포넌트의 MUI/Framer Motion 의존성으로 테스트 환경 설정 복잡도 |
| SUCCESS | 테스트 커버리지 90% 이상 달성, `npm test` 한 번에 전체 검증 가능 |
| SCOPE | src/ 디렉토리 내 13개 소스 파일 대상 |

## 1. 배경 및 목표

### 1.1 현재 상태
- React + TypeScript + Vite 기반 심리테스트 웹앱
- 테스트 프레임워크 미설정, 테스트 코드 0%
- 소스 파일 13개 (컴포넌트 7개, 타입 2개, 테마 1개, 앱 루트 2개, 메인 1개)

### 1.2 목표
- Vitest + React Testing Library 테스트 환경 구축
- 90% 이상 테스트 커버리지 달성
- CI에서 `npm test`로 전체 검증 가능

## 2. 테스트 대상 파일 분석

### 2.1 컴포넌트 파일 (UI + 인터랙션)

| 파일 | 역할 | 테스트 포인트 |
|------|------|--------------|
| `Layout.tsx` | 레이아웃 컨테이너 | 렌더링, children 전달 |
| `LovebirdIllustration.tsx` | SVG 일러스트레이션 | variant/color/size/animated 조합별 렌더링 |
| `StartPage.tsx` | 시작 페이지 | 렌더링, onStart 콜백 |
| `QuestionPage.tsx` | 시나리오 질문 페이지 | 렌더링, 옵션 클릭 시 onSelectOption 호출 |
| `QuestionPage-score.tsx` | 점수 기반 질문 페이지 | 렌더링, 프로그레스바, 옵션 클릭 시 score 전달 |
| `ResultPage.tsx` | 결과 페이지 | 렌더링, confetti 애니메이션, onRestart 콜백 |
| `ResultPage-parrot.tsx` | 앵무새 궁합 결과 페이지 | 렌더링, traits/compatibility 표시, onRestart |
| `TestSelectPage.tsx` | 테스트 선택 페이지 | 렌더링, 카드 클릭 시 테스트 타입 전달, 소셜 링크 |

### 2.2 로직/타입 파일

| 파일 | 역할 | 테스트 포인트 |
|------|------|--------------|
| `types.ts` | 시나리오 타입 정의 | TypeScript 타입 검증 (컴파일 타임) |
| `types-score.ts` | 점수 기반 타입 정의 | TypeScript 타입 검증 (컴파일 타임) |
| `theme.ts` | MUI 테마 설정 | 테마 값 검증 (palette, typography, shape) |

### 2.3 앱 루트 파일 (통합 테스트)

| 파일 | 역할 | 테스트 포인트 |
|------|------|--------------|
| `App.tsx` | 시나리오 기반 앱 | 시작→질문→결과 전체 플로우, 상태 전이 |
| `App-score.tsx` | 점수 기반 앱 (메인) | 테스트 선택→시작→질문→결과 전체 플로우, 점수 계산, 결과 매칭 |
| `main.tsx` | 엔트리포인트 | 렌더링 호출 확인 |

## 3. 테스트 전략

### 3.1 테스트 프레임워크 설정

```
devDependencies 추가:
- vitest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- jsdom
- @vitest/coverage-v8
```

### 3.2 테스트 파일 구조

```
src/
├── __tests__/
│   ├── setup.ts                    # 테스트 setup (jest-dom matchers)
│   ├── App.test.tsx                # App 통합 테스트
│   ├── App-score.test.tsx          # App-score 통합 테스트
│   ├── theme.test.ts               # 테마 설정 검증
│   └── main.test.tsx               # 엔트리포인트 테스트
├── components/
│   └── __tests__/
│       ├── Layout.test.tsx
│       └── LovebirdIllustration.test.tsx
└── pages/
    └── __tests__/
        ├── StartPage.test.tsx
        ├── QuestionPage.test.tsx
        ├── QuestionPage-score.test.tsx
        ├── ResultPage.test.tsx
        ├── ResultPage-parrot.test.tsx
        └── TestSelectPage.test.tsx
```

### 3.3 테스트 유형별 전략

#### Unit Tests (컴포넌트별)
- **렌더링 테스트**: 컴포넌트가 크래시 없이 렌더링되는지
- **Props 테스트**: 다양한 props 조합에 대한 렌더링 확인
- **인터랙션 테스트**: 클릭/터치 이벤트 시 콜백 함수 호출 확인
- **조건부 렌더링**: imageUrl 유무, summary 유무 등에 따른 분기

#### Integration Tests (앱 레벨)
- **App.tsx**: startNodeId → 질문 노드 탐색 → 결과 노드 도달 전체 플로우
- **App-score.tsx**: 테스트 선택 → 질문 응답(점수 누적) → 결과 매칭 플로우
- **점수 계산 로직**: totalScore 누적 및 scoreRange 매칭 검증

#### Theme Tests
- palette 색상값 검증
- typography 설정 검증
- component override 검증

### 3.4 모킹 전략

| 대상 | 방법 |
|------|------|
| `framer-motion` | `AnimatePresence`/`motion.div`를 pass-through 컴포넌트로 모킹 |
| `window.innerWidth` | `vi.stubGlobal`로 스텁 |
| JSON 데이터 | 실제 데이터 사용 (데이터가 작고 안정적) |
| `setTimeout` | `vi.useFakeTimers` 사용 (confetti 애니메이션) |

### 3.5 커버리지 목표

| 메트릭 | 목표 |
|--------|------|
| Statements | ≥ 90% |
| Branches | ≥ 90% |
| Functions | ≥ 90% |
| Lines | ≥ 90% |

## 4. 구현 순서

### Phase 1: 환경 설정
1. Vitest + Testing Library 패키지 설치
2. `vitest.config.ts` 설정 (jsdom, coverage)
3. `src/__tests__/setup.ts` 생성 (jest-dom matchers)
4. `package.json` scripts 추가 (`test`, `test:coverage`)

### Phase 2: 단순 컴포넌트 테스트 (의존성 낮은 순)
5. `theme.test.ts` - 테마 값 검증
6. `Layout.test.tsx` - children 렌더링
7. `LovebirdIllustration.test.tsx` - variant/color 조합
8. `StartPage.test.tsx` - 렌더링 + 클릭
9. `TestSelectPage.test.tsx` - 카드 클릭 + 소셜 링크

### Phase 3: 페이지 컴포넌트 테스트
10. `QuestionPage.test.tsx` - 질문/옵션 렌더링 + 클릭
11. `QuestionPage-score.test.tsx` - 프로그레스바 + 점수 전달
12. `ResultPage.test.tsx` - 결과 표시 + confetti + restart
13. `ResultPage-parrot.test.tsx` - traits/compatibility + restart

### Phase 4: 통합 테스트
14. `App.test.tsx` - 시나리오 기반 전체 플로우
15. `App-score.test.tsx` - 점수 기반 전체 플로우 (lovebird + parrot)
16. `main.test.tsx` - 엔트리포인트

### Phase 5: 커버리지 확인 및 보완
17. `npm run test:coverage` 실행
18. 90% 미달 영역 보완 테스트 추가

## 5. 성공 기준

| 기준 | 조건 |
|------|------|
| 테스트 통과 | 모든 테스트 PASS |
| 커버리지 | Statements, Branches, Functions, Lines 모두 ≥ 90% |
| CI 호환 | `npm test` 한 명령으로 전체 실행 가능 |
| 실행 시간 | 전체 테스트 30초 이내 |

## 6. 리스크 및 대응

| 리스크 | 대응 |
|--------|------|
| framer-motion 테스트 호환성 | 모킹으로 우회, 애니메이션 로직은 테스트 제외 |
| MUI 컴포넌트 내부 구조 변경 | role/text 기반 쿼리로 구현 세부사항 비의존 |
| SVG 렌더링 (LovebirdIllustration) | DOM 구조 존재 확인으로 테스트 |
| window 객체 의존 (QuestionPage) | vi.stubGlobal로 모킹 |
