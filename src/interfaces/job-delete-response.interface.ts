export interface IJobDeleteResponse {
    status: number;
    system_message: string;
    errors: { [key: string]: any } | null;
}