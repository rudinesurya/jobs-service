import mongoose, { Document } from 'mongoose';
import { ILocation } from './location.interface';

export interface IJobUpdate extends Document {
    title: string;
    description: string;
    location: ILocation;
    salary: number;
}