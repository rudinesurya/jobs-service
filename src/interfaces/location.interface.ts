import { Document } from 'mongoose';

export interface ILocation extends Document {
    formatted_address: string;
    place_id: string;
    lat: number;
    lng: number;
}