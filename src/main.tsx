import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// 점수제 시스템과 트리 시스템 중 선택
// import App from './App.tsx'          // 기존 트리 구조 (32개 결과)
import App from './App-score.tsx'    // 점수 기반 (10문항, 31개 결과)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
