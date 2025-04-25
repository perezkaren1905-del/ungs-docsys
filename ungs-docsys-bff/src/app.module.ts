import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoginModule, CatalogsModule]
})
export class AppModule {}
