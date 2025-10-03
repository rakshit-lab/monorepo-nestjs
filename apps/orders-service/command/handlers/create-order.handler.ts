import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { Orders } from 'libs/entities/order.entity';
import { OrdersServiceService } from 'apps/orders-service/src/orders-service.service';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {

   constructor(
    private readonly orderService: OrdersServiceService
  ) {}

  async execute(command: CreateOrderCommand): Promise<any> {
      return this.orderService.addOrder(command as object as Orders);
  }

  
}
