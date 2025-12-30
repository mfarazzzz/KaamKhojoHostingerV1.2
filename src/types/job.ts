export type JobType =
  | 'full-time'
  | 'part-time'
  | 'internship'
  | 'contract';

export type JobCategory =
  | 'white-collar'
  | 'blue-collar';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: JobType;
  category: JobCategory;
  skills: string[];
}
