import { IJob } from "./job.interface";

export interface IJobCreateResponse {
    status: number;
    message: string;
    job: IJob | null;
    errors: { [key: string]: any } | null;
}