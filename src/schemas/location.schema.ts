import * as mongoose from 'mongoose';

export interface ILocationSchema extends mongoose.Document {
    formattedAddress: string;
    placeId: string;
    lat: number;
    lng: number;
}

export const LocationSchema = new mongoose.Schema<ILocationSchema>(
    {
        formattedAddress: {
            type: String,
        },
        placeId: {
            type: String,
        },
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }
);