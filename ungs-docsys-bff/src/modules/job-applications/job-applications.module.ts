import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { JobApplicationService } from "./services/job-application.service";
import { JobApplicationController } from "./controllers/job-application.controller";

@Module({
    controllers: [JobApplicationController],
    imports: [HttpModule],
    providers: [JobApplicationService],
    exports: [JobApplicationService]
})
export class JobApplicationModule {}