import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
   constructor(private readonly userService: UserService) {}
  
   @GrpcMethod('UserService', 'userList')
    async userList(): Promise<any> {
     const users:any = await this.userService.userList();
    return { data :users };
    }

}
