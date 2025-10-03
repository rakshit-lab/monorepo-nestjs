import { Body, Controller, Param } from '@nestjs/common';
import { OrdersServiceService } from './orders-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SumRequest, SumResponse } from 'libs/proto/orders';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../command/impl/create-order.command';
import { GetOrderQuery } from '../queries/get-order.query';


@Controller('orders')
export class OrdersServiceController {
  
  constructor(
    private readonly ordersServiceService: OrdersServiceService,
     private commandBus:CommandBus,
    private queryBus: QueryBus) {}

  @GrpcMethod('OrdersService', 'Multiply')
  async multiply(data: SumRequest): Promise<SumResponse> {
    const result = await firstValueFrom(this.ordersServiceService.multiply(+data.a, +data.b));
    return result;
  }

  @GrpcMethod('OrdersService', 'Add')
  async add(data: SumRequest): Promise<any> {
    const result:any = await this.ordersServiceService.add(+data.a, +data.b)
    console.log("🚀 ~ OrdersServiceController ~ add ~ result:", result)
    return {result}
  }
  
  @GrpcMethod('OrdersService', 'addOrder')
  async addOrder(@Body() body: any) {
        return this.commandBus.execute(
      new CreateOrderCommand(
        body.number,
        body.product,
        body.quantity
      ),
    );
    }

  @GrpcMethod('OrdersService', 'getOrder')
  async getOrder(data: { orderId: number }) {
    const order = await this.queryBus.execute(new GetOrderQuery(data.orderId));
      return {
        id: order.id,
        number: order.number,
        product: order.product,
        quantity: order.quantity,
      };
    }
}
