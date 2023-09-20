import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './model/store.model';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RECEPTOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbit-nest:5672'],
          queue: 'store_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://mongodb:27017/store', {
      autoCreate: true,
    }),
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
