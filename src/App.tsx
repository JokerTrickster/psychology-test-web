import { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import scenarioData from './scenario/data.json';
import type { Scenario, Node } from './types';

// Cast the JSON data to specific type
const scenario = scenarioData as Scenario;

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
        {renderContent()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
