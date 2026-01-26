# 페이지 전환 깜빡임 해결 방법

## 문제 원인
1. CSS 애니메이션(.fade-in)과 Framer Motion 애니메이션이 동시 실행
2. 불필요한 이중 opacity 애니메이션
3. showContent가 항상 true인데도 사용됨
4. animationDelay로 인한 stagger 깜빡임

## 해결 방법

### Option 1: Framer Motion만 사용 (권장) ⭐

#### 1. CSS에서 .fade-in 애니메이션 제거 또는 비활성화
```css
/* src/index.css에서 제거하거나 주석 처리 */
/*
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
  opacity: 0;
}
*/
```

#### 2. 각 페이지에서 Framer Motion stagger children 사용

**StartPage.tsx 예시:**
```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const StartPage = ({ onStart }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 각 요소를 motion.div로 래핑 */}
      <motion.div variants={itemVariants}>
        <LovebirdIllustration ... />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography>모란앵무</Typography>
        <Typography>심리 테스트</Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Box>{/* subtitle box */}</Box>
      </motion.div>

      {/* ... 나머지 요소들 */}
    </motion.div>
  );
};
```

#### 3. showContent 상태 제거
더 이상 필요 없으므로 모든 페이지에서 제거:
```tsx
// 제거
const showContent = true;
className={showContent ? 'fade-in' : ''}
sx={{ opacity: showContent ? 1 : 0 }}
```

### Option 2: CSS 애니메이션만 사용 (더 간단)

#### 1. Framer Motion의 초기 opacity 제거
```tsx
// App.tsx
const pageVariants = {
  initial: {
    // opacity: 0,  // 제거
    y: 20,
  },
  animate: {
    // opacity: 1,  // 제거
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: {
    // opacity: 0,  // 제거
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};
```

#### 2. CSS 애니메이션 최적화
```css
/* src/index.css */
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
  /* opacity: 0 제거 - 초기값을 1로 유지 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px); /* 더 작은 이동 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 3. animationDelay를 will-change와 함께 사용
```tsx
<Box
  className="fade-in"
  sx={{
    animationDelay: '0.1s',
    willChange: 'opacity, transform', // GPU 가속
  }}
>
```

### Option 3: 빠른 수정 (최소 변경)

#### src/index.css 수정
```css
/* 기존 .fade-in을 더 빠르고 부드럽게 */
.fade-in {
  animation: fadeIn 0.2s ease-out forwards; /* 0.3s → 0.2s */
  /* opacity: 0; 제거 */
}

@keyframes fadeIn {
  from {
    opacity: 0.8; /* 0 → 0.8로 변경하여 깜빡임 완화 */
    transform: translateY(5px); /* 10px → 5px */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### App.tsx 수정
```tsx
const pageVariants = {
  initial: {
    opacity: 0.95, // 0 → 0.95로 변경
    y: 10, // 20 → 10
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25, // 0.4 → 0.25
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: {
    opacity: 0.95, // 완전히 사라지지 않고 살짝만
    y: -10,
    transition: {
      duration: 0.2, // 0.3 → 0.2
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};
```

## 권장 사항

**Option 1 (Framer Motion만 사용)** 을 추천합니다:
- 더 부드러운 애니메이션
- stagger children으로 자연스러운 순차 등장
- React 생태계와 완벽한 통합
- 깜빡임 완전 제거

**즉시 적용 가능한 빠른 수정은 Option 3**입니다.

## 테스트 체크리스트
- [ ] 페이지 새로고침 시 깜빡임 없음
- [ ] 시작 → 질문 전환 시 부드러움
- [ ] 질문 → 질문 전환 시 부드러움
- [ ] 질문 → 결과 전환 시 부드러움
- [ ] 결과 → 시작 (다시하기) 전환 시 부드러움
- [ ] 모바일에서도 동일하게 부드러움
