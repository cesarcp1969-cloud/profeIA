
export enum View {
  LessonPlan = 'lessonPlan',
  Objectives = 'objectives',
  Activities = 'activities',
  Rubric = 'rubric',
}

export interface HistoryItem {
  id: number;
  inputs: {
    [key: string]: string;
  };
  result: string;
  timestamp: number;
}
