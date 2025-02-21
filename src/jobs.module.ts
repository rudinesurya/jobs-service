import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './services/config/mongo-config.service';
import { ConfigService } from './services/config/config.service';
import { JobsController } from "./jobs.controller";
import { JobSchema } from "./schemas/job.schema";
import { JobsService } from './services/jobs.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService,
        }),
        MongooseModule.forFeature([
            {
                name: 'Job',
                schema: JobSchema,
                collection: 'jobs',
            },
        ]),
    ],
    controllers: [JobsController],
    providers: [
        JobsService,
        ConfigService,
    ],
})
export class JobsModule { }