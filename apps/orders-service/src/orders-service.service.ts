import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'libs/entities/order.entity';
import { SumResponse } from 'libs/proto/orders';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { KafkaService } from './kafka/kafka.service';

@Injectable()
export class OrdersServiceService {
  constructor(
    @InjectRepository(Orders) private repo: Repository<Orders>,
    private kafkaService: KafkaService,
  ) {}

  multiply(a: number, b: number): Observable<SumResponse> {
    const result = a * b;
    return of({ result });
  }

  add(a: number, b: number): number {
    const result = a + b;
    return result;
  }

  async addOrder(input: Orders): Promise<Orders> {
    try {
      const order = this.repo.create(input);
      const saved = await this.repo.save(order);
      await this.kafkaService.sendMessage('order_created', saved);
      return saved;
    } catch (error) {
      throw new Error('Failed to add order', { cause: error });
    }
  }

  async getOrder(orderId: number): Promise<Orders> {
    try {
        const result = await this.repo.query(
      'SELECT * FROM "orders" WHERE id = $1',
      [orderId]
    );
    return result[0]; 
    } catch (error) {
      throw new Error('Failed to add order', { cause: error });
    }
  }
}
