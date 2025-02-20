import { IJob } from "./job.interface";

export interface IJobsSearchResponse {
    status: number;
    message: string;
    jobs: IJob[] | null;
}