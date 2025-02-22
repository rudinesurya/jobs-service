import * as mongoose from 'mongoose';

export interface ILocationSchema extends mongoose.Document {
    formatted_address: string;
    place_id: string;
    lat: number;
    lng: number;
}

export const LocationSchema = new mongoose.Schema<ILocationSchema>(
    {
        formatted_address: {
            type: String,
        },
        place_id: {
            type: String,
        },
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
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