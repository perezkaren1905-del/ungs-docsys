import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppUserService } from './app-user/services/app-user.service';
import { AppUserController } from './app-user/controllers/app-user.controller';

@Module({
    controllers: [AppUserController],
    imports: [HttpModule],
    providers: [AppUserService],
    exports: [AppUserService]
})
export class LoginModule {}
