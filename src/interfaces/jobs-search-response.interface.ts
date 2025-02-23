import { IJob } from "./job.interface";

export interface IJobsSearchResponse {
    status: number;
    system_message: string;
    jobs: IJob[] | null;
}