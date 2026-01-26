// 점수 기반 심리테스트 타입 정의

export interface ScoreOption {
    text: string;
    score: number; // +1 or -1
}

export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    options: [ScoreOption, ScoreOption]; // 항상 2개의 선택지 (A, B)
    category: '사교성' | '활동성' | '지능/신중함' | '애착도';
}

export interface BirdResult {
    name: string;
    scoreRange: [number, number]; // [min, max] inclusive
    summary: string;
    description: string;
    imageUrl?: string;
    traits: string[];
    compatibility: string[];
}

export interface ScoreScenario {
    questions: Question[];
    results: BirdResult[];
}
