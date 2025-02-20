import { IJob } from "./job.interface";

export interface IJobSearchResponse {
    status: number;
    message: string;
    job: IJob | null;
}