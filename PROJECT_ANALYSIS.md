# 프로젝트 코드 분석 및 개발 환경 설정 가이드

## 📋 프로젝트 개요

**프로젝트명**: 모란앵무 심리 테스트 (Psychology Test Web)  
**기술 스택**: React 19 + TypeScript + Vite + Material-UI + Framer Motion  
**목적**: 귀여운 모란앵무 테마의 심리 테스트 웹 애플리케이션

---

## 🏗️ 프로젝트 구조

### 핵심 파일 구조
```
psychology-test-web/
├── src/
│   ├── App.tsx              # 트리 구조 버전 (32개 결과)
│   ├── App-score.tsx         # 점수 기반 버전 (10문항, 31개 결과) ⭐ 현재 활성화
│   ├── main.tsx             # 엔트리 포인트
│   ├── types.ts             # 트리 구조 타입 정의
│   ├── types-score.ts       # 점수 기반 타입 정의
│   ├── theme.ts             # Material-UI 테마 설정
│   ├── index.css            # 전역 스타일 및 애니메이션
│   │
│   ├── components/
│   │   ├── Layout.tsx              # 반응형 레이아웃 컨테이너
│   │   └── LovebirdIllustration.tsx # SVG 앵무새 일러스트레이션
│   │
│   ├── pages/
│   │   ├── StartPage.tsx           # 시작 페이지
│   │   ├── QuestionPage.tsx        # 트리 구조 질문 페이지
│   │   ├── QuestionPage-score.tsx  # 점수 기반 질문 페이지
│   │   └── ResultPage.tsx          # 결과 페이지
│   │
│   └── scenario/
│       ├── data.json        # 트리 구조 시나리오 데이터
│       ├── score-data.json  # 점수 기반 시나리오 데이터 ⭐
│       └── README.md        # 데이터 관리 가이드
│
├── public/
│   └── images/
│       └── lovebirds/       # 앵무새 이미지 파일들
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── DESIGN_GUIDE.md          # 디자인 가이드
```

---

## 🔍 코드 분석

### 1. 애플리케이션 아키텍처

#### 현재 활성화된 버전: 점수 기반 시스템 (`App-score.tsx`)

**주요 특징:**
- 10개의 질문으로 구성
- 각 질문마다 A(+1점), B(-1점) 선택지
- 총점 범위: -10 ~ +10 (21가지 가능)
- 31개의 점수 범위별 결과

**상태 관리:**
```typescript
- currentQuestionIndex: -1(시작) | 0-9(질문) | 10+(결과)
- totalScore: 누적 점수 (-10 ~ +10)
- answers: 선택한 점수 배열 (디버깅용)
```

**플로우:**
1. `StartPage` → 테스트 시작
2. `QuestionPage-score` → 10개 질문 순차 진행
3. `ResultPage` → 점수 기반 결과 표시

#### 대체 버전: 트리 구조 시스템 (`App.tsx`)

**주요 특징:**
- 6단계 분기 구조
- 32개의 고유한 결과
- 복잡한 분기 로직

---

### 2. 컴포넌트 분석

#### `Layout.tsx`
- **역할**: 반응형 컨테이너
- **기능**:
  - 모바일: 전체 화면, 투명 배경
  - 데스크톱: 글래스모피즘 카드 효과
  - 중앙 정렬 및 패딩 관리

#### `LovebirdIllustration.tsx`
- **역할**: 재사용 가능한 SVG 앵무새 일러스트
- **Props**:
  - `variant`: "sitting" | "flying" | "couple"
  - `color`: "pepe-green" | "pepe-lime" | "pepe-yellow" | "white" 등
  - `size`: 반응형 크기 객체
  - `animated`: 애니메이션 활성화 여부

#### `StartPage.tsx`
- **역할**: 시작 화면
- **구성 요소**:
  - 앵무새 커플 일러스트
  - 제목 및 설명
  - 5개의 날아다니는 앵무새
  - 시작 버튼
  - 플로팅 하트 장식

#### `QuestionPage-score.tsx`
- **역할**: 점수 기반 질문 화면
- **기능**:
  - 진행률 표시 (현재 질문 번호 / 전체)
  - 질문 텍스트 및 이미지
  - 2개의 선택지 버튼 (A, B)
  - 호버 시 앵무새 애니메이션

#### `ResultPage.tsx`
- **역할**: 결과 표시 화면
- **기능**:
  - 컨페티 애니메이션
  - 결과 앵무새 이미지
  - 제목, 요약, 설명
  - 재시작 버튼

---

### 3. 스타일링 시스템

#### 테마 (`theme.ts`)
- **Material-UI 커스텀 테마**
- **색상 팔레트**:
  - Primary: `#7EC850` (모란앵무 그린)
  - Secondary: `#FFE84D` (노란색)
- **타이포그래피**:
  - Display: "Gamja Flower" (장식용)
  - Body: "Jua" (본문용)
- **컴포넌트 오버라이드**:
  - Button: 그라데이션 배경, 둥근 모서리
  - Paper: 글래스모피즘 효과

#### 전역 스타일 (`index.css`)
- **애니메이션**:
  - `gradientShift`: 배경 그라데이션 이동
  - `cloudFloat`: 구름 장식 플로팅
  - `bounce-in`: 진입 애니메이션
  - `float`: 부드러운 상하 움직임
  - `wiggle`: 좌우 흔들림
- **CSS 변수**:
  - 앵무새 색상 변형 (pepe-green, pepe-lime, pepe-yellow 등)
  - 그림자 효과

---

### 4. 데이터 구조

#### 점수 기반 데이터 (`score-data.json`)
```typescript
interface ScoreScenario {
  questions: Question[];      // 10개 질문
  results: BirdResult[];     // 31개 결과
}

interface Question {
  id: string;
  text: string;
  imageUrl?: string;
  options: [ScoreOption, ScoreOption];  // A(+1), B(-1)
  category: '사교성' | '활동성' | '지능/신중함' | '애착도';
}

interface BirdResult {
  name: string;
  scoreRange: [number, number];  // [min, max] 포함
  summary: string;
  description: string;
  imageUrl?: string;
  traits: string[];
  compatibility: string[];
}
```

#### 트리 구조 데이터 (`data.json`)
```typescript
interface Scenario {
  startNodeId: string;
  nodes: Record<string, Node>;
}

interface Node {
  id: string;
  type: 'question' | 'result';
  text?: string;        // 질문용
  title?: string;       // 결과용
  description?: string; // 결과용
  options?: Option[];   // 질문용
}
```

---

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 프로덕션 빌드
npm run build

# 4. 빌드 미리보기
npm run preview

# 5. 린트 검사
npm run lint
```

### 현재 설치된 패키지

**프로덕션 의존성:**
- `react@19.2.3` - React 라이브러리
- `react-dom@19.2.3` - React DOM
- `@mui/material@7.3.7` - Material-UI 컴포넌트
- `@mui/icons-material@7.3.7` - Material-UI 아이콘
- `@emotion/react@11.14.0` - CSS-in-JS (MUI 필수)
- `@emotion/styled@11.14.1` - 스타일 컴포넌트
- `framer-motion@12.29.0` - 애니메이션 라이브러리

**개발 의존성:**
- `vite@7.3.1` - 빌드 도구
- `typescript@5.9.3` - TypeScript
- `@vitejs/plugin-react@5.1.2` - Vite React 플러그인
- `eslint@9.39.2` - 린터
- `typescript-eslint@8.53.1` - TypeScript ESLint

---

## 📊 코드 품질 분석

### ✅ 강점

1. **타입 안정성**
   - TypeScript로 모든 타입 정의
   - 명확한 인터페이스 구조

2. **컴포넌트 분리**
   - 페이지별 명확한 분리
   - 재사용 가능한 컴포넌트 (`LovebirdIllustration`)

3. **반응형 디자인**
   - 모바일 퍼스트 접근
   - 브레이크포인트별 스타일 조정

4. **애니메이션**
   - Framer Motion으로 부드러운 전환
   - CSS 애니메이션으로 성능 최적화

5. **디자인 시스템**
   - 일관된 색상 팔레트
   - 재사용 가능한 테마 설정

### ⚠️ 개선 가능한 부분

1. **에러 처리**
   - `ResultPage`에서 결과를 찾지 못할 때 기본값 처리 필요
   - 네트워크 에러 처리 없음 (현재는 로컬 JSON)

2. **성능 최적화**
   - 이미지 로딩 최적화 (lazy loading)
   - 번들 크기 분석 필요

3. **접근성**
   - ARIA 레이블 추가
   - 키보드 네비게이션 개선

4. **테스트**
   - 단위 테스트 없음
   - E2E 테스트 없음

5. **코드 중복**
   - `App.tsx`와 `App-score.tsx` 간 공통 로직 추출 가능
   - 페이지 전환 애니메이션 중복

---

## 🎯 개발 워크플로우

### 새로운 기능 추가 시

1. **타입 정의 먼저** (`types.ts` 또는 `types-score.ts`)
2. **컴포넌트 생성** (`components/` 또는 `pages/`)
3. **스타일 적용** (Material-UI `sx` prop 또는 `theme.ts`)
4. **애니메이션 추가** (필요시 Framer Motion)
5. **테스트** (개발 서버에서 확인)

### 데이터 수정 시

1. **시나리오 데이터 수정** (`scenario/score-data.json`)
2. **타입 확인** (`types-score.ts`)
3. **컴포넌트 업데이트** (필요시)

### 스타일 수정 시

1. **전역 스타일**: `index.css`
2. **테마 설정**: `theme.ts`
3. **컴포넌트별**: 각 컴포넌트의 `sx` prop

---

## 🔧 빌드 및 배포

### 빌드 설정 (`vite.config.ts`)
- 현재 기본 설정만 있음
- 프로덕션 최적화 옵션 추가 가능

### 배포 준비
- `npm run build` 실행
- `dist/` 폴더 생성됨
- 정적 호스팅 가능 (Vercel, Netlify 등)

---

## 📝 다음 단계 제안

1. **테스트 추가**
   - React Testing Library
   - Playwright E2E 테스트

2. **성능 최적화**
   - 이미지 최적화
   - 코드 스플리팅
   - 번들 분석

3. **접근성 개선**
   - ARIA 레이블
   - 키보드 네비게이션
   - 스크린 리더 지원

4. **에러 바운더리**
   - React Error Boundary 추가
   - 사용자 친화적 에러 메시지

5. **상태 관리**
   - 복잡도 증가 시 Zustand 또는 Jotai 고려

---

## 🚀 빠른 시작 가이드

```bash
# 1. 프로젝트 클론 후
cd psychology-test-web

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 http://localhost:5173 접속
```

---

## 📚 참고 문서

- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 디자인 가이드
- [src/scenario/README.md](./src/scenario/README.md) - 데이터 관리 가이드
- [Vite 공식 문서](https://vite.dev/)
- [Material-UI 문서](https://mui.com/)
- [Framer Motion 문서](https://www.framer.com/motion/)

---

**마지막 업데이트**: 2026-01-28  
**분석 버전**: 1.0.0
