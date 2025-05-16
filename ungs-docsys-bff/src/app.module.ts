import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ConfigModule } from '@nestjs/config';
import { JobApplicationModule } from './modules/job-applications/job-applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule, CatalogsModule, JobApplicationModule]
})
export class AppModule {}
