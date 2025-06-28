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
import { JobProfileLevelsService } from './job-profile-levels/services/job-profile-levels.service';
import { JobProfileLevelController } from './job-profile-levels/controllers/job-profile-level.controllers';
import { JobApplicationApprovalsController } from './job-application-approvals/controllers/job-application-approvals.controller';
import { JobApplicationApprovalsService } from './job-application-approvals/services/job-application-approvals.service';
import { JobApplicationResumeUsersController } from './job-application-resume-users/controllers/job-application-resume-users.controller';
import { JobApplicationResumeUsersService } from './job-application-resume-users/services/job-application-resume-users.service';

@Module({
    controllers: [JobApplicationPeriodsController, JobApplicationStatusesController, RequirementTargetComparatorsController, RequirementTypesController, RequirementsController, JobApplicationController
        , JobProfileLevelController, JobApplicationApprovalsController, JobApplicationResumeUsersController],
    imports: [HttpModule],
    providers: [JobApplicationPeriodsService, JobApplicationStatusesService, RequirementTargetComparatorsService, RequirementTypesService, RequirementsService, JobApplicationService,
         JobProfileLevelsService, JobApplicationApprovalsService, JobApplicationResumeUsersService],
    exports: [JobApplicationPeriodsService, JobApplicationStatusesService, RequirementTargetComparatorsService, RequirementTypesService, RequirementsService, JobApplicationService,
         JobProfileLevelsService, JobApplicationApprovalsService, JobApplicationResumeUsersService]
})
export class JobApplicationsModule { }
