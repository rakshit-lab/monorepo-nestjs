import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceModule } from 'apps/auth-service/src/auth-service.module';
import { OrdersServiceModule } from 'apps/orders-service/src/orders-service.module';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'apps/user/src/user.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',   // or mysql, sqlite, etc.
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nest-microservice-db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'orders',
          protoPath: join(__dirname, '../libs/proto/orders.proto'),
          url: 'localhost:50051'
        }
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../libs/proto/users.proto'),
          url: 'localhost:50052'
        }
      }
    ]), 
    AuthServiceModule, OrdersServiceModule, UserModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
