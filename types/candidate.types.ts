export type CandidateData = {
    uuid: string,
    candidateId: string,
    applicationId: string,
    firstName: string,
    lastName: string,
    email: string
};

export type GetCandidateDataByEmailParams = {
    email: string
};

export type ApplyToJobParams = {
    uuid: string,
    jobId: string,
    candidateId: string,
    applicationId: string,
    repoUrl: string
};