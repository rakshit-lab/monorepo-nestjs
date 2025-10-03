import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const ordersApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'orders',
      protoPath: join(__dirname, '../libs/proto/orders.proto'),
      url: '0.0.0.0:50051',
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  const usersApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'users',
      protoPath: join(__dirname, '../libs/proto/users.proto'),
      url: '0.0.0.0:50052',
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  const App = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'nest-app',
        brokers: ['localhost:9092'], // Kafka broker
      }
    }
  });

  await Promise.all([ordersApp.listen(), usersApp.listen(), App.listen()]);
  console.log('Both gRPC microservices are running');
}


bootstrap();
