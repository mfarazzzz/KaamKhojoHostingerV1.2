import { create } from 'zustand';
import { Job } from '../utils/types';

interface JobState {
  jobs: Job[];
  savedJobs: string[];
  appliedJobs: string[];
  searchFilters: {
    query: string;
    location: string;
    category: string;
    jobType: string;
    experience: string;
    salary: string;
  };
  setJobs: (jobs: Job[]) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
  updateFilters: (filters: Partial<JobState['searchFilters']>) => void;
  clearFilters: () => void;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  savedJobs: [],
  appliedJobs: [],
  searchFilters: {
    query: '',
    location: '',
    category: 'all',
    jobType: 'all',
    experience: 'all',
    salary: 'all'
  },
  setJobs: (jobs) => set({ jobs }),
  saveJob: (jobId) => {
    const savedJobs = get().savedJobs;
    if (!savedJobs.includes(jobId)) {
      set({ savedJobs: [...savedJobs, jobId] });
    }
  },
  unsaveJob: (jobId) => {
    const savedJobs = get().savedJobs.filter(id => id !== jobId);
    set({ savedJobs });
  },
  applyToJob: (jobId) => {
    const appliedJobs = get().appliedJobs;
    if (!appliedJobs.includes(jobId)) {
      set({ appliedJobs: [...appliedJobs, jobId] });
    }
  },
  updateFilters: (filters) => {
    const currentFilters = get().searchFilters;
    set({ searchFilters: { ...currentFilters, ...filters } });
  },
  clearFilters: () => {
    set({
      searchFilters: {
        query: '',
        location: '',
        category: 'all',
        jobType: 'all',
        experience: 'all',
        salary: 'all'
      }
    });
  }
}));