---
name: test-coverage-90
description: 테스트 코드 작성 및 90% 커버리지 달성 - Design
status: in-progress
created: 2026-03-26T06:37:40Z
updated: 2026-03-26T06:37:40Z
architecture: Option C — Pragmatic Balance
---

## Context Anchor

| 항목 | 내용 |
|------|------|
| WHY | 현재 테스트 코드 0%, 코드 변경 시 회귀 버그를 수동으로만 확인 가능 |
| WHO | 프로젝트 개발자 (코드 변경 시 안전하게 배포하고 싶은 사람) |
| RISK | UI 컴포넌트의 MUI/Framer Motion 의존성으로 테스트 환경 설정 복잡도 |
| SUCCESS | 테스트 커버리지 90% 이상 달성, `npm test` 한 번에 전체 검증 가능 |
| SCOPE | src/ 디렉토리 내 13개 소스 파일 대상 |

## 1. Overview

심리테스트 웹앱의 전체 소스 코드에 대한 테스트 스위트를 구축한다. Vitest + React Testing Library를 사용하며, Pragmatic Balance 구조(소스 옆 테스트 + 공통 설정 분리)를 채택한다.

## 2. Architecture: Option C — Pragmatic Balance

### 2.1 파일 구조

```
src/
├── test/                              # 공통 테스트 설정
│   ├── setup.ts                       # jest-dom matchers, framer-motion mock
│   └── test-utils.tsx                 # ThemeProvider wrapper + custom render
│
├── App.tsx
├── App.test.tsx                       # App 통합 테스트
├── App-score.tsx
├── App-score.test.tsx                 # App-score 통합 테스트
├── theme.ts
├── theme.test.ts                      # 테마 값 검증
├── main.tsx
├── main.test.tsx                      # 엔트리포인트 테스트
│
├── components/
│   ├── Layout.tsx
│   ├── Layout.test.tsx                # Layout 렌더링 테스트
│   ├── LovebirdIllustration.tsx
│   └── LovebirdIllustration.test.tsx  # SVG variant/color 테스트
│
└── pages/
    ├── StartPage.tsx
    ├── StartPage.test.tsx
    ├── QuestionPage.tsx
    ├── QuestionPage.test.tsx
    ├── QuestionPage-score.tsx
    ├── QuestionPage-score.test.tsx
    ├── ResultPage.tsx
    ├── ResultPage.test.tsx
    ├── ResultPage-parrot.tsx
    ├── ResultPage-parrot.test.tsx
    ├── TestSelectPage.tsx
    └── TestSelectPage.test.tsx
```

### 2.2 패키지 의존성

```json
{
  "devDependencies": {
    "vitest": "^3.x",
    "@testing-library/react": "^16.x",
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/user-event": "^14.x",
    "jsdom": "^26.x",
    "@vitest/coverage-v8": "^3.x"
  }
}
```

## 3. Vitest Configuration

### 3.1 vitest.config.ts (별도 파일 또는 vite.config.ts 통합)

```typescript
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
        'src/vite-env.d.ts',
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
```

### 3.2 package.json scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## 4. Test Setup (src/test/setup.ts)

```typescript
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, exit, variants, ...htmlProps } = props;
      return <div {...htmlProps}>{children}</div>;
    },
  },
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## 5. Custom Render Wrapper (src/test/test-utils.tsx)

```typescript
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme';

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
```

## 6. 컴포넌트별 테스트 설계

### 6.1 theme.test.ts
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| palette.primary.main 색상값 | `#7EC850` |
| palette.secondary.main 색상값 | `#FFE84D` |
| typography.fontFamily 설정 | `"Jua"` 포함 |
| shape.borderRadius | `28` |
| MuiButton root borderRadius | `50px` |
| shadows 배열 길이 | 25개 |

### 6.2 Layout.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| children 렌더링 | 전달된 children이 DOM에 표시됨 |
| Container 존재 | MUI Container가 렌더링됨 |

### 6.3 LovebirdIllustration.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| sitting variant 렌더링 | SVG 요소 존재 |
| flying variant 렌더링 | 날개(wing) ellipse 존재 |
| couple variant 렌더링 | 2마리 새 + 하트 SVG |
| 6가지 color 각각 | 올바른 fill 색상 적용 |
| animated=true | wiggle/float 클래스 적용 |
| animated=false | 애니메이션 클래스 없음 |
| size (number) | width/height 적용 |
| size (responsive object) | 객체 전달 시 렌더링 |

### 6.4 StartPage.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 제목 렌더링 | "나는 어떤 앵무새일까?" 텍스트 |
| 부제목 렌더링 | "간단한 질문으로 알아보는" 텍스트 |
| 시작 버튼 렌더링 | "테스트 시작하기" 버튼 존재 |
| 시작 버튼 클릭 | onStart 콜백 호출 |
| 하단 텍스트 | "31가지 다양한 앵무새" 텍스트 |

### 6.5 TestSelectPage.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 제목 렌더링 | "어떤 테스트를 해볼까?" |
| 앵무새 카드 렌더링 | "나는 어떤 앵무새일까?" 카드 |
| 궁합 카드 렌더링 | "나랑 궁합 좋은 모란도란은?" 카드 |
| 앵무새 카드 클릭 | onSelectTest('lovebird') 호출 |
| 궁합 카드 클릭 | onSelectTest('parrot') 호출 |
| 소셜 링크 4개 | YouTube, Instagram, TikTok, 쇼핑몰 링크 존재 |
| 소셜 링크 target | target="_blank" 설정 |

### 6.6 QuestionPage.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 질문 텍스트 렌더링 | node.text 표시 |
| 옵션 버튼 렌더링 | 모든 option.text 버튼 존재 |
| 옵션 클릭 | onSelectOption(option.nextId) 호출 |
| 이미지 없을 때 | imageUrl 없으면 img 없음 |
| 이미지 있을 때 | imageUrl 있으면 img 존재 (desktop 전용) |

### 6.7 QuestionPage-score.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 질문 텍스트 렌더링 | question.text 표시 |
| 진행률 표시 | "N / M" 포맷 |
| 카테고리 표시 | question.category 텍스트 |
| A/B 옵션 렌더링 | 2개 옵션 버튼 존재 |
| 옵션 클릭 | onSelectOption(score) 호출 |
| 프로그레스바 | LinearProgress 존재 |

### 6.8 ResultPage.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 결과 제목 렌더링 | node.title 표시 |
| 설명 렌더링 | node.description 표시 |
| "테스트 완료!" 뱃지 | 뱃지 텍스트 존재 |
| 재시작 버튼 | "다시 테스트하기" 버튼 |
| 재시작 클릭 | onRestart 콜백 호출 |
| 이미지 표시 | imageUrl 있을 때 img 존재 |
| summary 표시 | summary prop 있을 때 텍스트 표시 |
| summary 없을 때 | summary 없으면 해당 요소 없음 |
| confetti 타이머 | 400ms 후 confetti 표시 |

### 6.9 ResultPage-parrot.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 결과 이름 렌더링 | result.name 표시 |
| summary 표시 | result.summary 표시 |
| 설명 카드 | result.description 표시 |
| traits 태그 | 각 trait가 Chip으로 표시 |
| compatibility 섹션 | "잘 맞는 친구" + 목록 |
| 이미지 표시 | imageUrl 있을 때 img |
| 재시작 버튼 클릭 | onRestart 호출 |
| confetti 타이머 | 400ms 후 confetti 표시 |

### 6.10 App.test.tsx (통합)
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 초기 렌더링 | StartPage 표시 |
| 시작 클릭 | 첫 번째 질문 표시 |
| 질문→결과 플로우 | 옵션 클릭으로 결과까지 도달 |
| 재시작 | 결과에서 재시작 클릭 시 StartPage |
| 노드 미발견 에러 | 잘못된 nodeId 시 에러 메시지 |

### 6.11 App-score.test.tsx (통합)
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| 초기 렌더링 | TestSelectPage 표시 |
| lovebird 선택 | StartPage 표시 |
| parrot 선택 | 바로 첫 질문 표시 |
| lovebird 전체 플로우 | 선택→시작→질문→결과 |
| parrot 전체 플로우 | 선택→질문→결과 |
| 점수 계산 | 총점에 맞는 결과 매칭 |
| 재시작 | TestSelectPage로 복귀 |
| 결과 미발견 에러 | 매칭 안 될 때 에러 메시지 |

### 6.12 main.test.tsx
| 테스트 케이스 | 검증 내용 |
|-------------|----------|
| createRoot 호출 | document.getElementById('root') 사용 |
| App 렌더링 | render 호출 확인 |

## 7. 모킹 전략 상세

### 7.1 framer-motion Mock (setup.ts에서 전역)
```typescript
// AnimatePresence → children pass-through
// motion.div → 일반 div (animation props 무시)
```

### 7.2 JSON 데이터
- `src/scenario/data.json`, `score-data.json`, `parrot-data.json`
- **실제 데이터 사용** — 데이터가 작고 안정적, 모킹 불필요

### 7.3 window 객체
```typescript
// QuestionPage의 window.innerWidth 참조
vi.stubGlobal('innerWidth', 800); // 또는 jsdom 기본값 사용
```

### 7.4 타이머
```typescript
// ResultPage, ResultPage-parrot의 confetti setTimeout
vi.useFakeTimers();
vi.advanceTimersByTime(400);
vi.useRealTimers();
```

## 8. 커버리지 전략

### 8.1 커버리지 제외 대상
- `src/test/` — 테스트 유틸리티
- `src/**/*.test.{ts,tsx}` — 테스트 파일 자체
- `src/vite-env.d.ts` — 타입 선언

### 8.2 브랜치 커버리지 주의 사항
높은 브랜치 커버리지를 위해 다음 조건 분기를 반드시 테스트:

| 파일 | 분기 | 테스트 방법 |
|------|------|------------|
| App.tsx | currentNodeId null/not null | 초기 상태 vs 시작 후 |
| App.tsx | node.type question/result | 질문 노드 vs 결과 노드 |
| App-score.tsx | testType null/lovebird/parrot | 3가지 상태 테스트 |
| App-score.tsx | currentQuestionIndex -1/N/end | 시작/질문/결과 상태 |
| App-score.tsx | getCurrentResult() match/no match | 점수 범위 내/외 |
| LovebirdIllustration | variant sitting/flying/couple | 3가지 variant |
| LovebirdIllustration | color 6가지 | 각 색상별 테스트 |
| ResultPage | imageUrl 유/무 | props 조합 |
| ResultPage | summary 유/무 | props 조합 |
| ResultPage-parrot | traits 유/무 | 빈 배열 vs 값 |
| ResultPage-parrot | compatibility 유/무 | 빈 배열 vs 값 |

## 9. TypeScript 설정

### 9.1 tsconfig.json 수정
```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

## 10. Error Handling 테스트

| 시나리오 | 검증 |
|---------|------|
| App: 존재하지 않는 nodeId | "Error: Node not found" 표시 |
| App: unknown node type | "Unknown node type" 표시 |
| App-score: 점수에 매칭되는 결과 없음 | "Error: Result not found" 표시 |

## 11. Implementation Guide

### 11.1 구현 순서

| 순서 | 모듈 | 파일 | 예상 라인 |
|------|------|------|----------|
| 1 | 환경 설정 | vitest.config.ts, setup.ts, test-utils.tsx, package.json | ~80 |
| 2 | theme.test.ts | 테마 값 검증 | ~40 |
| 3 | Layout.test.tsx | children 렌더링 | ~25 |
| 4 | LovebirdIllustration.test.tsx | variant/color/size 조합 | ~120 |
| 5 | StartPage.test.tsx | 렌더링 + 클릭 | ~50 |
| 6 | TestSelectPage.test.tsx | 카드 클릭 + 소셜 링크 | ~70 |
| 7 | QuestionPage.test.tsx | 질문/옵션 + 클릭 | ~60 |
| 8 | QuestionPage-score.test.tsx | 프로그레스 + 점수 | ~70 |
| 9 | ResultPage.test.tsx | 결과 + confetti + restart | ~90 |
| 10 | ResultPage-parrot.test.tsx | traits/compat + restart | ~90 |
| 11 | App.test.tsx | 시나리오 기반 통합 | ~100 |
| 12 | App-score.test.tsx | 점수 기반 통합 | ~150 |
| 13 | main.test.tsx | 엔트리포인트 | ~25 |
| 14 | 커버리지 보완 | 미달 영역 추가 | ~50 |

**총 예상: ~1,020 라인**

### 11.2 의존성 순서

```
setup.ts, test-utils.tsx (공통)
    ↓
theme.test.ts (의존성 없음)
Layout.test.tsx (의존성 없음)
LovebirdIllustration.test.tsx (의존성 없음)
    ↓
StartPage.test.tsx (LovebirdIllustration 사용)
TestSelectPage.test.tsx (LovebirdIllustration 사용)
QuestionPage.test.tsx (LovebirdIllustration 사용)
QuestionPage-score.test.tsx (LovebirdIllustration 사용)
    ↓
ResultPage.test.tsx (LovebirdIllustration 사용)
ResultPage-parrot.test.tsx (독립)
    ↓
App.test.tsx (모든 컴포넌트 통합)
App-score.test.tsx (모든 컴포넌트 통합)
main.test.tsx (App 의존)
```

### 11.3 Session Guide

#### Module Map
| Module | 범위 | 예상 라인 |
|--------|------|----------|
| module-1 | 환경 설정 (vitest config, setup, test-utils) | ~80 |
| module-2 | 단순 컴포넌트 테스트 (theme, Layout, LovebirdIllustration) | ~185 |
| module-3 | 페이지 테스트 (Start, TestSelect, Question, Question-score) | ~250 |
| module-4 | 결과 페이지 테스트 (Result, Result-parrot) | ~180 |
| module-5 | 통합 테스트 (App, App-score, main) + 커버리지 보완 | ~325 |

#### Recommended Session Plan
- **Session 1**: module-1 + module-2 (환경 설정 + 단순 컴포넌트) — 빠른 피드백 루프 구축
- **Session 2**: module-3 + module-4 (페이지 테스트) — 핵심 UI 검증
- **Session 3**: module-5 (통합 테스트 + 커버리지 90% 달성)

또는 한 번에 진행 가능 (module-1~5 순차).
