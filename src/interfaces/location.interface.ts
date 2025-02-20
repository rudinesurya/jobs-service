import { Document } from 'mongoose';

export interface ILocation extends Document {
    formattedAddress: string;
    placeId: string;
    lat: number;
    lng: number;
}