import { IJob } from "./job.interface";

export interface IJobUpdateResponse {
    status: number;
    message: string;
    job: IJob | null;
    errors: { [key: string]: any } | null;
}