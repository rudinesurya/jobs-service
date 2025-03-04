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
import logger from './services/logger';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @MessagePattern('jobs_get')
    public async getJobs(): Promise<IJobsSearchResponse> {
        logger.info('Fetching all jobs');

        try {
            const jobs = await this.jobsService.getJobs();
            logger.info('Successfully fetched jobs');

            return {
                status: HttpStatus.OK,
                system_message: 'jobs_get_success',
                jobs,
                errors: null,
            };
        } catch (error) {
            logger.error('Error fetching jobs', { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                system_message: 'jobs_get_internal_error',
                jobs: null,
                errors: error.errors || error.message,
            };
        }
    }

    @MessagePattern('job_get_by_id')
    public async getJobById({ id }: { id: string }): Promise<IJobSearchResponse> {
        logger.info(`Fetching job with ID: ${id}`);

        if (!id) {
            logger.warn('Missing job ID in request');
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_get_bad_request',
                job: null,
                errors: null,
            };
        }

        try {
            const job = await this.jobsService.getJobById(id);
            logger.info(`Successfully fetched job with ID: ${id}`);

            return {
                status: HttpStatus.OK,
                system_message: 'job_get_success',
                job,
                errors: null,
            };
        } catch (error) {
            logger.error(`Error fetching job with ID: ${id}`, { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                system_message: 'job_get_internal_error',
                job: null,
                errors: error.errors || error.message,
            };
        }
    }

    @MessagePattern('job_create')
    public async createJob(params: { createData: IJob }): Promise<IJobCreateResponse> {
        logger.info('Received request to create job');

        if (!params?.createData) {
            logger.warn('Missing createData in job creation request');
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_create_bad_request',
                job: null,
                errors: null,
            };
        }

        try {
            const job = await this.jobsService.createJob(params.createData);
            logger.info('Job created successfully');

            return {
                status: HttpStatus.CREATED,
                system_message: 'job_create_success',
                job,
                errors: null,
            };
        } catch (error) {
            logger.error('Error creating job', { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'job_create_precondition_failed',
                job: null,
                errors: error.errors || error.message,
            };
        }
    }

    @MessagePattern('job_update')
    public async updateJob(params: { id: string; userId: string; updateData: IJobUpdate }): Promise<IJobUpdateResponse> {
        logger.info(`Received request to update job with ID: ${params?.id}, userId: ${params?.userId}`);
        
        if (!params?.id || !params?.userId || !params?.updateData) {
            logger.warn('Invalid request parameters for job update');
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_update_bad_request',
                job: null,
                errors: null,
            };
        }

        try {
            const job = await this.jobsService.updateJob(params.id, params.userId, params.updateData);
            logger.info(`Job updated successfully with ID: ${params.id}`);

            return {
                status: HttpStatus.OK,
                system_message: 'job_update_success',
                job,
                errors: null,
            };
        } catch (error) {
            logger.error('Error updating job', { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'job_update_precondition_failed',
                job: null,
                errors: error.errors || error.message,
            };
        }
    }

    @MessagePattern('job_delete_by_id')
    public async deleteJob(params: { id: string; userId: string }): Promise<IJobDeleteResponse> {
        logger.info(`Received request to delete job with ID: ${params?.id}, userId: ${params?.userId}`);

        if (!params?.id || !params?.userId) {
            logger.warn('Invalid request parameters for job deletion');
            return {
                status: HttpStatus.BAD_REQUEST,
                system_message: 'job_delete_by_id_bad_request',
                errors: null,
            };
        }

        try {
            await this.jobsService.removeJob(params.id, params.userId);
            logger.info(`Job deleted successfully with ID: ${params.id}`);

            return {
                status: HttpStatus.OK,
                system_message: 'job_delete_by_id_success',
                errors: null,
            };
        } catch (error) {
            logger.error('Error deleting job', { error: error.message, stack: error.stack });

            return {
                status: HttpStatus.PRECONDITION_FAILED,
                system_message: 'job_delete_by_id_precondition_failed',
                errors: error.errors || error.message,
            };
        }
    }
}