export interface ScoreElement {
  name: string;
  score: number;
  reason: string;
  details: string[];
  documentation: {
    short: string;
    url: string;
  };
}

export interface ConsolidatedScoreElement {
  areEqual: boolean;
  name: string;
  details: string[];
  reason: string;
  score: number;
  short: string;
  url: string;
  prevDetails: string[];
  prevReason: string;
  prevScore: number;
}
