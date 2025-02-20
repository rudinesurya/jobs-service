export interface IJobDeleteResponse {
    status: number;
    message: string;
    errors: { [key: string]: any } | null;
}