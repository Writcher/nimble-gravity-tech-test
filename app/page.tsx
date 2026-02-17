'use client'

import { CandidateForm } from '@/components/candidate/CandidateForm';
import { JobsTable } from '@/components/job/JobsTable';
import { CandidateData } from '@/types/candidate.types';
import { useState } from 'react';

export default function Page() {
  const [candidate, setCandidate] = useState<CandidateData | null>(null);

  return (
    <div className='flex flex-col gap-2 w-full h-full'>
      <div className='flex items-center justify-center h-full'>
        {!candidate ? (
          <CandidateForm setCandidate={setCandidate} />
        ) : (
          <JobsTable candidate={candidate} setCandidate={setCandidate} />
        )}
      </div>
    </div>
  );
};
