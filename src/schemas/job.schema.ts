import * as mongoose from 'mongoose';
import { LocationSchema } from './location.schema';
import { ILocation } from '@rudinesurya/jobs-service-interfaces';

export interface IJobSchema extends mongoose.Document {
    title: string;
    description: string;
    location: ILocation;
    salary: number;
    posted_by: mongoose.Types.ObjectId;
}

export const JobSchema = new mongoose.Schema<IJobSchema>(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            type: LocationSchema,
        },
        salary: {
            type: Number,
            required: true,
        },
        posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Adjust the ref as needed
            required: true,
        },
    },
    {
        toObject: {
            virtuals: false,
            versionKey: false,
        },
        toJSON: {
            virtuals: false,
            versionKey: false,
        },
    },
);