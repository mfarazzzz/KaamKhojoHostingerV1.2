import { NextResponse } from 'next/server';
import type { Job } from '@/types/job';

const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'KaamKhojo',
    location: 'Delhi',
    salary: '₹6–8 LPA',
    type: 'full-time',
    category: 'white-collar',
    skills: ['React', 'Next.js'],
  },
  {
    id: '2',
    title: 'Electrician',
    company: 'Local Services',
    location: 'Rampur',
    salary: '₹18k/month',
    type: 'contract',
    category: 'blue-collar',
    skills: ['Wiring'],
  },
];

export async function GET() {
  return NextResponse.json(jobs);
}
