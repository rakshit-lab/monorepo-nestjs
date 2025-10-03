import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetOrderQuery } from "../get-order.query";
import { OrdersServiceService } from "apps/orders-service/src/orders-service.service";

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  
  constructor(
    private orderService: OrdersServiceService
  ) {}

  async execute(query: GetOrderQuery) {
    return await this.orderService.getOrder(query.orderId);
  }
}