import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage-score';
import ResultPage from './pages/ResultPage';
import scoreData from './scenario/score-data.json';
import type { ScoreScenario, BirdResult } from './types-score';

// Cast the JSON data to specific type
const scenario = scoreData as ScoreScenario;

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1); // -1 = start, 0-9 = questions, 10+ = result
  const [totalScore, setTotalScore] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]); // 선택한 점수 기록용

  // Initialize test
  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setTotalScore(0);
    setAnswers([]);
  };

  // Handle option selection
  const handleSelectOption = (score: number) => {
    const newAnswers = [...answers, score];
    const newScore = totalScore + score;

    setAnswers(newAnswers);
    setTotalScore(newScore);

    // 다음 질문으로 이동 또는 결과 표시
    if (currentQuestionIndex < scenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 모든 질문 완료, 결과 표시
      setCurrentQuestionIndex(scenario.questions.length);
    }
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentQuestionIndex(-1);
    setTotalScore(0);
    setAnswers([]);
  };

  // Get current bird result based on total score
  const getCurrentResult = (): BirdResult | null => {
    if (currentQuestionIndex < scenario.questions.length) return null;

    // 점수에 맞는 결과 찾기
    const result = scenario.results.find(r =>
      totalScore >= r.scoreRange[0] && totalScore <= r.scoreRange[1]
    );

    return result || scenario.results.find(r => r.scoreRange[0] === 0 && r.scoreRange[1] === 0) || null;
  };

  // Get current page key for AnimatePresence
  const getPageKey = () => {
    if (currentQuestionIndex === -1) return 'start';
    if (currentQuestionIndex < scenario.questions.length) return `question-${currentQuestionIndex}`;
    return 'result';
  };

  // Determine which page to show
  const renderContent = () => {
    // Start page
    if (currentQuestionIndex === -1) {
      return <StartPage onStart={handleStart} />;
    }

    // Questions
    if (currentQuestionIndex < scenario.questions.length) {
      const currentQuestion = scenario.questions[currentQuestionIndex];
      return (
        <QuestionPage
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={scenario.questions.length}
          onSelectOption={handleSelectOption}
        />
      );
    }

    // Result page
    const result = getCurrentResult();
    if (!result) {
      return <div>Error: Result not found for score {totalScore}</div>;
    }

    return (
      <ResultPage
        node={{
          id: 'result',
          type: 'result',
          title: result.name,
          description: result.description,
          imageUrl: result.imageUrl
        }}
        onRestart={handleRestart}
        score={totalScore}
        summary={result.summary}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={getPageKey()}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
