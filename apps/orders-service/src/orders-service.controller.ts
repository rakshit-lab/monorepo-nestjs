import { Controller } from '@nestjs/common';
import { OrdersServiceService } from './orders-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SumRequest, SumResponse } from 'libs/proto/orders';


@Controller('orders')
export class OrdersServiceController {
  
  constructor(private readonly ordersServiceService: OrdersServiceService) {}

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
}
