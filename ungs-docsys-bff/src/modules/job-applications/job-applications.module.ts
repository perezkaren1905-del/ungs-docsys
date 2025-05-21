import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JobApplicationPeriodsService } from './job-application-periods/services/job-application-periods.service';
import { JobApplicationStatusesService } from './job-application-statuses/services/job-application-statuses.service';
import { RequirementTargetComparatorsService } from './requirement-target-comparators/services/requirement-target-comparators.service';
import { RequirementTypesService } from './requirement-types/services/requirement-types.service';
import { RequirementsService } from './requirements/services/requirements.service';
import { JobApplicationPeriodsController } from './job-application-periods/controllers/job-application-periods.controller';
import { JobApplicationStatusesController } from './job-application-statuses/controllers/job-application-statuses.controller';
import { RequirementTargetComparatorsController } from './requirement-target-comparators/controllers/requirement-target-comparators.controller';
import { RequirementTypesController } from './requirement-types/controllers/requirement-types.controller';
import { RequirementsController } from './requirements/controllers/requirements.controller';
import { JobApplicationService } from "./services/job-application.service";
import { JobApplicationController } from "./controllers/job-application.controller";

@Module({
    controllers: [JobApplicationPeriodsController, JobApplicationStatusesController, RequirementTargetComparatorsController, RequirementTypesController, RequirementsController, JobApplicationController],
    imports: [HttpModule],
    providers: [JobApplicationPeriodsService, JobApplicationStatusesService, RequirementTargetComparatorsService, RequirementTypesService, RequirementsService, JobApplicationService],
    exports: [JobApplicationPeriodsService, JobApplicationStatusesService, RequirementTargetComparatorsService, RequirementTypesService, RequirementsService, JobApplicationService]
})
export class JobApplicationsModule { }
