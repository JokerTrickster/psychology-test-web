// 점수 기반 심리테스트 타입 정의

export interface ScoreOption {
    text: string;
    score: number; // +1 or -1
}

export interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    options: ScoreOption[];
    category: string;
}

export interface BirdResult {
    name: string;
    scoreRange: [number, number]; // [min, max] inclusive
    summary: string;
    description: string;
    imageUrl?: string;
    traits: string[];
    recommendedJobs?: string[];
    compatibility: string[];
}

export interface ScoreScenario {
    questions: Question[];
    results: BirdResult[];
}
