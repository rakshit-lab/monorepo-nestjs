import { Inject, Injectable } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import { OrdersServiceService } from 'apps/orders-service/src/orders-service.service';
import { UserService } from 'apps/user/src/user.service';
@Injectable()
export class AppService {
  private orderService: OrdersServiceService;
  private userService: UserService;

  constructor(
    @Inject('ORDER_SERVICE') private client: microservices.ClientGrpc,
    @Inject('USER_SERVICE') private clientUser: microservices.ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<OrdersServiceService>('OrdersService');
    this.userService = this.clientUser.getService<UserService>('UserService');
  }
}
