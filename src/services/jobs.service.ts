import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { IJobUpdate } from 'src/interfaces/job-update.interface';
import { IJob } from 'src/interfaces/job.interface';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel('Job') private readonly jobModel: Model<IJob>
    ) { }

    public async getJobs(): Promise<IJob[]> {
        return this.jobModel
            .find()
            .exec();
    }

    public async getJobById(id: string): Promise<IJob> {
        return this.jobModel
            .findOne({ _id: new Types.ObjectId(id) })
            .exec();
    }

    public async createJob(job: IJob): Promise<IJob> {
        try {
            const jobModel = new this.jobModel(job);
            return await jobModel.save();
        } catch (error: any) {
            // MongoDB duplicate key error code
            if (error.code === 11000) {
                throw new ForbiddenException('You have already created this job.');
            }
            throw error;
        }
    }

    public async updateJob(id: string, userId: string, updateData: IJobUpdate): Promise<IJob> {
        const updatedJob = await this.jobModel.findOneAndUpdate(
            { _id: new Types.ObjectId(id), posted_by: new Types.ObjectId(userId) },
            { $set: updateData },
            { new: true }
        ).exec();

        if (!updatedJob) {
            throw new NotFoundException('Job not found or you are not the owner');
        }

        return updatedJob;
    }

    public async removeJob(id: string, userId: string): Promise<{ system_message: string }> {
        const deletedJob = await this.jobModel.findOneAndDelete({
            _id: new Types.ObjectId(id),
            posted_by: new Types.ObjectId(userId),
        }).exec();

        if (!deletedJob) {
            throw new NotFoundException('Job not found or you are not the owner');
        }

        return { system_message: 'Job removed successfully' };
    }
}