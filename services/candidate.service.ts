"use server"

import { ApplyToJobParams, CandidateData, GetCandidateDataByEmailParams } from "@/types/candidate.types";

export async function getCandidateDataByEmail(params: GetCandidateDataByEmailParams): Promise<CandidateData> {
    const candidateQueryParams = new URLSearchParams({
        email: params.email
    });

    const candidateResponse = await fetch(`${process.env.BASE_URL}/api/candidate/get-by-email?${candidateQueryParams.toString()}`,{
        method: 'GET'
    });

    if (!candidateResponse.ok) {
        const errorBody = await candidateResponse.text();
        throw new Error(`API error: ${candidateResponse.status} — ${errorBody}`);
    };

    const candidate: CandidateData = await candidateResponse.json();

    return candidate;
};

export async function applyToJob(params: ApplyToJobParams): Promise<void> {
    const applyToJobResponse = await fetch(`${process.env.BASE_URL}/api/candidate/apply-to-job`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    });

    if (!applyToJobResponse.ok) {
        const errorBody = await applyToJobResponse.text();
        throw new Error(`API error: ${applyToJobResponse.status} — ${errorBody}`);
    };
};