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
