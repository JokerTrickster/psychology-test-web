# Session Context — 2026-03-26

**Last Updated**: 2026-03-26T06:05:09Z

## 이 세션에서 완료한 작업

### 1. 모란도란 앵무새 궁합 테스트 추가 (psychology-test-web)

**상태**: 구현 완료, 데이터/이미지 대기

기존 31마리 앵무새 심리테스트에 추가로 "나랑 성격 궁합이 좋은 모란도란 앵무새는?" 테스트를 구현했다.
- 5단계 질문, 2지선다(A/B), 5마리 결과 (로또, 럭키, 짹슨, 마이클, 스타)
- 시작 화면에서 두 테스트 중 선택 가능

**수정/생성된 파일 (psychology-test-web)**:
| 파일 | 상태 | 설명 |
|------|------|------|
| `src/App-score.tsx` | **수정** | testType 상태 추가, TestSelectPage/ResultPage-parrot 통합, currentScenario 동적 선택 |
| `src/pages/TestSelectPage.tsx` | **신규** | 테스트 선택 화면 (2카드: 기존 초록 + 새 보라) + 소셜 아이콘 4개 |
| `src/pages/ResultPage-parrot.tsx` | **신규** | 보라/핑크 테마 결과 페이지, traits 태그, 궁합 정보 표시 |
| `src/scenario/parrot-data.json` | **신규** | 5질문+5결과 플레이스홀더 데이터 |
| `docs/01-plan/features/parrot-compatibility-test.plan.md` | **신규** | Plan 문서 |
| `docs/02-design/features/parrot-compatibility-test.design.md` | **신규** | Design 문서 (Option C - Pragmatic Balance) |
| `docs/01-plan/features/social-links.plan.md` | **신규** | 소셜 링크 Plan |

**아키텍처 결정**:
- React Router 없이 `testType` 상태(`'lovebird' | 'parrot' | null`)로 페이지 전환
- 기존 `QuestionPage-score.tsx` 재사용 (parrot 테스트도 동일한 질문 UI)
- 결과 페이지만 별도 컴포넌트 (`ResultPage-parrot.tsx`) — 보라/핑크 색상 차별화
- "다시하기" 버튼 → 테스트 선택 화면으로 복귀 (기존은 같은 테스트 재시작)

**대기 항목**:
- 사용자가 제공할 실제 질문/결과 데이터 (현재 플레이스홀더)
- 앵무새 이미지 5장: `public/images/parrots/` (lotto.png, lucky.png, jackson.png, michael.png, star.png)

### 2. 소셜 미디어 아이콘 링크 (psychology-test-web)

**상태**: 완료

TestSelectPage 하단에 4개 소셜 아이콘 추가:
| 아이콘 | URL |
|--------|-----|
| YouTube | `https://www.youtube.com/@모란도란앵튜브` |
| Instagram | `https://www.instagram.com/molandolan_` |
| TikTok | `https://www.tiktok.com/@molandolan_` (스레드→틱톡 변경) |
| 쇼핑몰 | `https://link.inpock.co.kr/molandolan` |

소셜 링크 배열은 `TestSelectPage.tsx` 상단 `socialLinks` 변수에 정의.

### 3. 해씨먹는 로또 게임 셔플 속도 개선 (molandolan 프로젝트)

**상태**: 구현 완료, 테스트 필요

**수정된 파일 (molandolan 프로젝트 — 별도 프로젝트!)**:
| 파일 | 변경 내용 |
|------|-----------|
| `src/games/parrot-seed/types/index.ts` | RoundConfig에 `concurrentPairs` 필드 추가 |
| `src/games/parrot-seed/core/RoundManager.ts` | 전 라운드 shuffleSpeed=0.5, R1-R2: concurrentPairs=1, R3-R5: concurrentPairs=2 |
| `src/games/parrot-seed/core/ShuffleEngine.ts` | 배치 기반 동시 스왑 로직 구현, `getRandomSwapPairExcluding` 추가 |

**변경 핵심**:
- 모든 라운드 스왑 속도 0.5초 고정 (기존: 0.6~1.1초)
- R1-R2: 1쌍씩 순차 스왑 (사람이 눈으로 추적 가능)
- R3-R5: 2쌍 동시 스왑 (난이도 상승)
- `overlapRatio` 방식 제거 → `concurrentPairs` 배치 방식으로 교체

## 커밋되지 않은 변경사항

### psychology-test-web (현재 프로젝트)
- `src/App-score.tsx` (수정)
- `src/pages/TestSelectPage.tsx` (신규)
- `src/pages/ResultPage-parrot.tsx` (신규)
- `src/scenario/parrot-data.json` (신규)
- `docs/` 아래 plan/design 문서들 (신규)

### molandolan (별도 프로젝트: /Users/luxrobo/project/molandolan)
- `src/games/parrot-seed/types/index.ts` (수정)
- `src/games/parrot-seed/core/RoundManager.ts` (수정)
- `src/games/parrot-seed/core/ShuffleEngine.ts` (수정)

## 다음 세션에서 할 일

1. **사용자 데이터 수신 후**: `parrot-data.json` 질문/결과 교체 + 이미지 추가
2. **빌드 확인**: 두 프로젝트 모두 `npm run dev`로 실제 동작 확인
3. **커밋**: 변경사항 커밋 (사용자 요청 시)
4. **(선택) 해씨먹는 로또 추가 버그**: 클릭 디바운싱 미적용 이슈 (ParrotGameScene.ts:282)
