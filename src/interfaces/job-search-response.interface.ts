import { IJob } from "./job.interface";

export interface IJobSearchResponse {
    status: number;
    system_message: string;
    job: IJob | null;
}