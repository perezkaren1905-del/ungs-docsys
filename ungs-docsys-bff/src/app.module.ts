import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ConfigModule } from '@nestjs/config';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule, CatalogsModule, JobApplicationsModule]
})
export class AppModule {}
