import mongoose, { Document } from 'mongoose';
import { ILocation } from './location.interface';

export interface IJob extends Document {
    title: string;
    description: string;
    location: ILocation;
    salary: number;
    posted_by: mongoose.Types.ObjectId;
}