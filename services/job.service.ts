'use server'

import { Job } from '@/types/job.types';

export async function getJobList(): Promise<Job[]> {
    const jobListResponse = await fetch(`${process.env.BASE_URL}/api/jobs/get-list`, {
        method: 'GET'
    });

    if (!jobListResponse.ok) {
        const errorBody = await jobListResponse.json();
        throw new Error(`${jobListResponse.status} — ${errorBody.error}`);
    };

    const jobList: Job[] = await jobListResponse.json();

    return jobList;
};