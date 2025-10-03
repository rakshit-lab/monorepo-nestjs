export class CreateOrderCommand {
  constructor(
    public readonly number: string,
    public readonly product: string,
    public readonly quantity: string
  ) {}
}
