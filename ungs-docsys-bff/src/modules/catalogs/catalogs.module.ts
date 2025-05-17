import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { IdentificationTypesService } from './identification-types/services/identification-types.service';
import { IdentificationTypesController } from './identification-types/controllers/identification-types.controller';
import { NationalitiesService } from './nationalities/services/nationalities.service';
import { NationalitiesController } from './nationalities/controllers/nationalities.controller';

@Module({
    controllers: [IdentificationTypesController, NationalitiesController],
    imports: [HttpModule],
    providers: [IdentificationTypesService, NationalitiesService],
    exports: [IdentificationTypesService, NationalitiesService]
})
export class CatalogsModule { }
