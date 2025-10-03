import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  
  private kafka = new Kafka({clientId: 'nest-app', brokers: ['localhost:9092'] });
  private producer: Producer = this.kafka.producer();
  private consumer: Consumer;
  private readonly logger = new Logger(KafkaService.name);

  
  constructor(){
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'microservice-a' });
  }

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'order_created', fromBeginning: true });

     await this.consumer.run({
        eachMessage: async ({ topic, message }) => {
          try {
            const value = message.value?.toString();

            this.logger.log(`Received from ${topic}: ${value}`);
    
          } catch (err) {
            this.logger.error(`Error processing message: ${err.message}`);
          }
        }
      });
  }


  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
