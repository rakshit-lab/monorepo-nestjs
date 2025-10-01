import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private readonly httpService: HttpService
) {}  
    async userList(): Promise<any> {
       const response = await firstValueFrom(this.httpService.get(`https://jsonplaceholder.typicode.com/users`));
       return response.data;
    }
}
