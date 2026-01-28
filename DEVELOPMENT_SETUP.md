# 개발 환경 설정 가이드

## 🚀 빠른 시작

### 1. 환경 확인
```bash
# Node.js 버전 확인 (18+ 필요)
node --version

# npm 버전 확인
npm --version
```

### 2. 프로젝트 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 📦 주요 스크립트

```bash
# 개발 서버 실행 (HMR 지원)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint
```

---

## 🗂️ 프로젝트 구조 이해

### 핵심 파일 위치

| 파일 | 설명 |
|------|------|
| `src/main.tsx` | 엔트리 포인트 (어떤 App을 사용할지 선택) |
| `src/App-score.tsx` | 점수 기반 시스템 (현재 활성화) ⭐ |
| `src/App.tsx` | 트리 구조 시스템 (대체 버전) |
| `src/scenario/score-data.json` | 질문 및 결과 데이터 |
| `src/theme.ts` | Material-UI 테마 설정 |
| `src/index.css` | 전역 스타일 및 애니메이션 |

### 컴포넌트 위치

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Layout.tsx      # 페이지 레이아웃
│   └── LovebirdIllustration.tsx  # SVG 앵무새
│
└── pages/              # 페이지 컴포넌트
    ├── StartPage.tsx
    ├── QuestionPage-score.tsx
    └── ResultPage.tsx
```

---

## 🔄 시스템 전환하기

### 점수 기반 → 트리 구조로 전환

`src/main.tsx` 파일 수정:
```typescript
// import App from './App-score.tsx'    // 주석 처리
import App from './App.tsx'              // 활성화
```

### 트리 구조 → 점수 기반으로 전환

`src/main.tsx` 파일 수정:
```typescript
// import App from './App.tsx'          // 주석 처리
import App from './App-score.tsx'        // 활성화
```

---

## ✏️ 데이터 수정하기

### 질문 추가/수정

`src/scenario/score-data.json` 파일 편집:

```json
{
  "questions": [
    {
      "id": "q1",
      "text": "질문 내용?",
      "category": "사교성",
      "options": [
        { "text": "A 선택지", "score": 1 },
        { "text": "B 선택지", "score": -1 }
      ]
    }
  ]
}
```

### 결과 추가/수정

```json
{
  "results": [
    {
      "name": "앵무새 이름",
      "scoreRange": [-10, -8],
      "summary": "한 줄 요약",
      "description": "상세 설명",
      "traits": ["특징1", "특징2"],
      "compatibility": ["잘 맞는 앵무1", "잘 맞는 앵무2"]
    }
  ]
}
```

**점수 범위 설정:**
- 단일 점수: `[5, 5]` - 정확히 5점
- 범위 점수: `[-10, -8]` - -10점부터 -8점까지

---

## 🎨 스타일 수정하기

### 전역 스타일 변경
`src/index.css` 파일 수정

### 테마 색상 변경
`src/theme.ts` 파일의 `palette` 섹션 수정

### 컴포넌트별 스타일
각 컴포넌트의 `sx` prop 수정

---

## 🐛 디버깅 팁

### 1. 콘솔 로그 추가
```typescript
console.log('현재 점수:', totalScore);
console.log('선택한 답변:', answers);
```

### 2. React DevTools 사용
- 브라우저 확장 프로그램 설치
- 컴포넌트 상태 확인

### 3. 타입 에러 확인
```bash
# TypeScript 타입 체크
npx tsc --noEmit
```

### 4. 빌드 에러 확인
```bash
# 빌드 실행하여 에러 확인
npm run build
```

---

## 📱 반응형 디자인 테스트

### 브레이크포인트
- **xs**: 0px+ (모바일)
- **sm**: 600px+ (태블릿)
- **md**: 900px+ (데스크톱)

### 테스트 방법
1. 브라우저 개발자 도구 열기 (F12)
2. 디바이스 모드 활성화 (Ctrl+Shift+M)
3. 다양한 화면 크기로 테스트

---

## 🔧 문제 해결

### 의존성 설치 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌
```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

### 빌드 실패
```bash
# 캐시 삭제 후 재빌드
rm -rf dist node_modules/.vite
npm run build
```

### 타입 에러
```bash
# TypeScript 서버 재시작
# VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## 📚 유용한 명령어

### 패키지 관리
```bash
# 새 패키지 추가
npm install <package-name>

# 개발 의존성 추가
npm install -D <package-name>

# 패키지 제거
npm uninstall <package-name>
```

### 코드 품질
```bash
# 린트 자동 수정
npm run lint -- --fix

# 타입 체크
npx tsc --noEmit
```

---

## 🎯 개발 워크플로우

### 1. 기능 개발
```bash
# 1. 새 브랜치 생성
git checkout -b feature/new-feature

# 2. 개발 서버 실행
npm run dev

# 3. 코드 작성 및 테스트

# 4. 린트 검사
npm run lint

# 5. 빌드 테스트
npm run build
```

### 2. 스타일 수정
1. `src/index.css` 또는 `src/theme.ts` 수정
2. 개발 서버에서 즉시 확인 (HMR)
3. 브라우저 새로고침 없이 변경사항 반영

### 3. 데이터 수정
1. `src/scenario/score-data.json` 수정
2. 개발 서버 자동 재로드
3. 변경사항 즉시 확인

---

## 🔍 코드 검색 팁

### 특정 컴포넌트 찾기
```bash
# grep 사용
grep -r "ComponentName" src/
```

### 타입 정의 찾기
```bash
# 타입 파일 검색
find src/ -name "*.ts" -o -name "*.tsx" | xargs grep "interface\|type"
```

---

## 📖 추가 리소스

- [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md) - 상세 코드 분석
- [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) - 디자인 가이드
- [src/scenario/README.md](./src/scenario/README.md) - 데이터 관리 가이드

---

**마지막 업데이트**: 2026-01-28
