import * as mongoose from 'mongoose';
import { ILocation } from 'src/interfaces/location.interface';
import { LocationSchema } from './location.schema';

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
    }
);