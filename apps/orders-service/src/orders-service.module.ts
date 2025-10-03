import { Module } from '@nestjs/common';
import { OrdersServiceController } from './orders-service.controller';
import { OrdersServiceService } from './orders-service.service';
import { CqrsModule } from '@nestjs/cqrs';
import { Orders } from 'libs/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderHandler } from '../command/handlers/create-order.handler';
import { KafkaService } from './kafka/kafka.service';
import { GetOrderHandler } from '../queries/handlers/get-order.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Orders])],
  controllers: [OrdersServiceController],
  providers: [OrdersServiceService, CreateOrderHandler, KafkaService, GetOrderHandler]
})
export class OrdersServiceModule {}
