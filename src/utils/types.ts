export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  category: 'white-collar' | 'blue-collar';
  experience: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  skills: string[];
  urgent?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'jobseeker' | 'employer';
  profile?: JobSeekerProfile | EmployerProfile;
}

export interface JobSeekerProfile {
  experience: string;
  skills: string[];
  education: string;
  resume?: string;
  preferences: {
    jobType: string[];
    salary: string;
    location: string[];
  };
}

export interface EmployerProfile {
  companyName: string;
  industry: string;
  companySize: string;
  description: string;
}