import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppUserService } from './app-user/services/app-user.service';
import { AppUserController } from './app-user/controllers/app-user.controller';
import { UserInfoController } from './user-info/controllers/user-info.controller';
import { UserInfoService } from './user-info/services/user-info.service';

@Module({
    controllers: [AppUserController, UserInfoController],
    imports: [HttpModule],
    providers: [AppUserService, UserInfoService],
    exports: [AppUserService, UserInfoService]
})
export class LoginModule {}
