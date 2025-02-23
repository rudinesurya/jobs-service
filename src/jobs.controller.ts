import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JobsService } from './services/jobs.service';
import { IJobsSearchResponse } from './interfaces/jobs-search-response.interface';
import { IJobSearchResponse } from './interfaces/job-search-response.interface';
import { IJob } from './interfaces/job.interface';
import { IJobCreateResponse } from './interfaces/job-create-response.interface';
import { IJobUpdate } from './interfaces/job-update.interface';
import { IJobUpdateResponse } from './interfaces/job-update-response.interface';
import { IJobDeleteResponse } from './interfaces/job-delete-response.interface';

@Controller('jobs')
export class JobsController {
    constructor(
        private readonly jobsService: JobsService,
    ) { }

    @MessagePattern('jobs_get')
    public async getJobs(): Promise<IJobsSearchResponse> {
        let result: IJobsSearchResponse;
        const jobs = await this.jobsService.getJobs();
        result = {
            status: HttpStatus.OK,
            system_message: 'jobs_get_success',
            jobs: jobs,
        };

        return result;
    }

    @MessagePattern('job_get_by_id')
    public async getJobById({ id }): Promise<IJobSearchResponse> {
        let result: IJobSearchResponse;

        if (id) {
            const job = await this.jobsService.getJobById(id);
            result = {
                status: HttpStatus.OK,
                system_message: 'jobs_get_success',
                job: job,
            };
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'jobs_get_bad_request',
                job: null,
            };
        }

        return result;
    }

    @MessagePattern('job_create')
    public async createJob(params: { createData: IJob }): Promise<IJobCreateResponse> {
        let result: IJobCreateResponse;

        if (params && params.createData) {
            try {
                const job = await this.jobsService.createJob(params.createData);
                result = {
                    status: HttpStatus.CREATED,
                    system_message: 'job_create_success',
                    job: job,
                    errors: null,
                };
            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    system_message: 'job_create_precondition_failed',
                    job: null,
                    errors: e.errors,
                };
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_create_bad_request',
                job: null,
                errors: null,
            };
        }

        return result;
    }

    @MessagePattern('job_update')
    public async updateJob(params: { id: string; userId: string; updateData: IJobUpdate }): Promise<IJobUpdateResponse> {
        let result: IJobUpdateResponse;

        if (params && params.id && params.userId && params.updateData) {
            try {
                const job = await this.jobsService.updateJob(params.id, params.userId, params.updateData);
                result = {
                    status: HttpStatus.OK,
                    system_message: 'job_update_success',
                    job: job,
                    errors: null,
                };
            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    system_message: 'job_update_precondition_failed',
                    job: null,
                    errors: e.errors,
                };
            }
        } else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_update_bad_request',
                job: null,
                errors: null,
            };
        }

        return result;
    }

    @MessagePattern('job_delete_by_id')
    public async deleteJob(params: {
        id: string;
        userId: string;
    }): Promise<IJobDeleteResponse> {
        let result: IJobDeleteResponse;

        if (params && params.id && params.userId) {
            try {
                await this.jobsService.removeJob(params.id, params.userId);
                result = {
                    status: HttpStatus.OK,
                    system_message: 'job_delete_by_id_success',
                    errors: null,
                };

            } catch (e) {
                result = {
                    status: HttpStatus.PRECONDITION_FAILED,
                    system_message: 'job_delete_by_id_precondition_failed',
                    errors: e.errors,
                };
            }
        }
        else {
            result = {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_delete_by_id_bad_request',
                errors: null,
            };
        }
        return result;
    }
}