import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import Layout from './components/Layout';
import TestSelectPage from './pages/TestSelectPage';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage-score';
import ResultPage from './pages/ResultPage';
import ResultPageParrot from './pages/ResultPage-parrot';
import SunflowerGame from './pages/SunflowerGame';
import scoreData from './scenario/score-data.json';
import parrotData from './scenario/parrot-data.json';
import officeData from './scenario/office-data.json';
import jobData from './scenario/job-data.json';
import mbtiData from './scenario/mbti-data.json';
import type { ScoreScenario, BirdResult } from './types-score';

const lovebirdScenario = scoreData as ScoreScenario;
const parrotScenario = parrotData as ScoreScenario;
const officeScenario = officeData as ScoreScenario;
const jobScenario = jobData as ScoreScenario;
const mbtiScenario = mbtiData as ScoreScenario;

type TestType = 'lovebird' | 'parrot' | 'office' | 'job' | 'mbti' | 'sunflower' | null;

// Page transition variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  },
};

function App() {
  const [testType, setTestType] = useState<TestType>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1); // -1 = start, 0+ = questions
  const [totalScore, setTotalScore] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Current scenario based on test type
  const currentScenario = testType === 'parrot' ? parrotScenario
    : testType === 'office' ? officeScenario
    : testType === 'job' ? jobScenario
    : testType === 'mbti' ? mbtiScenario
    : lovebirdScenario;

  // Handle test selection
  const handleSelectTest = (type: TestType) => {
    setTestType(type);
    setCurrentQuestionIndex(-1);
    setTotalScore(0);
    setAnswers([]);
    if (type === 'parrot' || type === 'office' || type === 'job' || type === 'mbti') {
      setCurrentQuestionIndex(0);
    }
  };

  // Initialize test (for lovebird StartPage)
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

    if (currentQuestionIndex < currentScenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(currentScenario.questions.length);
    }
  };

  // Handle restart — go back to test selection
  const handleRestart = () => {
    setTestType(null);
    setCurrentQuestionIndex(-1);
    setTotalScore(0);
    setAnswers([]);
  };

  // Get current bird result based on total score
  const getCurrentResult = (): BirdResult | null => {
    if (currentQuestionIndex < currentScenario.questions.length) return null;

    const result = currentScenario.results.find(r =>
      totalScore >= r.scoreRange[0] && totalScore <= r.scoreRange[1]
    );

    return result || currentScenario.results.find(r => r.scoreRange[0] === 0 && r.scoreRange[1] === 0) || null;
  };

  // Get current page key for AnimatePresence
  const getPageKey = () => {
    if (testType === null) return 'select';
    if (testType === 'sunflower') return 'sunflower-game';
    if (testType === 'lovebird' && currentQuestionIndex === -1) return 'start-lovebird';
    if (currentQuestionIndex < currentScenario.questions.length) return `question-${testType}-${currentQuestionIndex}`;
    return `result-${testType}`;
  };

  // Determine which page to show
  const renderContent = () => {
    // Test selection page
    if (testType === null) {
      return <TestSelectPage onSelectTest={handleSelectTest} />;
    }

    // Sunflower game
    if (testType === 'sunflower') {
      return <SunflowerGame onRestart={handleRestart} />;
    }

    // Lovebird: show StartPage first
    if (testType === 'lovebird' && currentQuestionIndex === -1) {
      return <StartPage onStart={handleStart} />;
    }

    // Questions (shared for both test types)
    if (currentQuestionIndex < currentScenario.questions.length) {
      const currentQuestion = currentScenario.questions[currentQuestionIndex];
      return (
        <QuestionPage
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={currentScenario.questions.length}
          onSelectOption={handleSelectOption}
        />
      );
    }

    // Result page
    const result = getCurrentResult();
    if (!result) {
      return <div>Error: Result not found for score {totalScore}</div>;
    }

    if (testType === 'mbti') {
      return (
        <ResultPageParrot
          result={result}
          onRestart={handleRestart}
          titleText="나와 잘 어울리는 MBTI는!"
          themeColor="#E91E63"
          themeColorLight="#F48FB1"
        />
      );
    }

    if (testType === 'job') {
      return (
        <ResultPageParrot
          result={result}
          onRestart={handleRestart}
          titleText="나와 어울리는 직업은!"
          themeColor="#2980B9"
          themeColorLight="#5DADE2"
        />
      );
    }

    if (testType === 'parrot' || testType === 'office') {
      return (
        <ResultPageParrot
          result={result}
          onRestart={handleRestart}
        />
      );
    }

    // Lovebird test uses original result page
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
