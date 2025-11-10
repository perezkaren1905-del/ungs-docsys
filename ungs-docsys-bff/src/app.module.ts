import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ConfigModule } from '@nestjs/config';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';
import { ResumeUserModule } from './modules/resume-user/resume-user.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule, CatalogsModule, JobApplicationsModule, ResumeUserModule, UsersModule]
})
export class AppModule {}
