export type NodeType = 'question' | 'result';

export interface Option {
    text: string;
    nextId: string;
}

export interface Node {
    id: string;
    type: NodeType;
    text?: string; // For questions
    title?: string; // For results
    description?: string; // For results
    options?: Option[]; // For questions
}

export interface Scenario {
    startNodeId: string;
    nodes: Record<string, Node>;
}
