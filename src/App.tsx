import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import theme from './theme';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import scenarioData from './scenario/data.json';
import type { Scenario, Node } from './types';

// Cast the JSON data to specific type
const scenario = scenarioData as Scenario;

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
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);

  // Initialize test
  const handleStart = () => {
    setCurrentNodeId(scenario.startNodeId);
  };

  // Handle option selection
  const handleSelectOption = (nextId: string) => {
    setCurrentNodeId(nextId);
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentNodeId(null);
  };

  // Get current page type for key
  const getPageKey = () => {
    if (!currentNodeId) return 'start';
    const currentNode = scenario.nodes[currentNodeId];
    if (currentNode?.type === 'question') return `question-${currentNodeId}`;
    if (currentNode?.type === 'result') return `result-${currentNodeId}`;
    return 'unknown';
  };

  // Determine which page to show
  const renderContent = () => {
    if (!currentNodeId) {
      return <StartPage onStart={handleStart} />;
    }

    const currentNode = scenario.nodes[currentNodeId];
    if (!currentNode) {
      return <div>Error: Node not found</div>;
    }

    if (currentNode.type === 'question') {
      return (
        <QuestionPage
          node={currentNode as Node}
          onSelectOption={handleSelectOption}
        />
      );
    }

    if (currentNode.type === 'result') {
      return (
        <ResultPage
          node={currentNode as Node}
          onRestart={handleRestart}
        />
      );
    }

    return <div>Unknown node type</div>;
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
