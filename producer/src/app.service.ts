import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('RECEPTOR_SERVICE') private readonly client: ClientProxy,
  ) {}

  getHello(): string {
    return `
        <body style="text-align: center">
          <h1>Bienvenido a tu API de NestJS y RabbitMQ</h1>
          <p>¡Gracias por visitarnos!</p>
        </body>
    `;
  }

  @MessagePattern({ cmd: 'get' })
  async getData(): Promise<Observable<string>> {
    try {
      return this.client.send({ cmd: 'get' }, '');
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'get' })
  async getDataToTheView(): Promise<string> {
    try {
      const data = await firstValueFrom(this.client.send({ cmd: 'get' }, ''));
      if (data.length < 1) {
        return '<h1 style="text-align: center;">No hay registros en la base de datos</h1>';
      }

      return `
      <h1 style="text-align: center;">Datos recibidos y Almacenados</h1>
      <table border="1" style="margin: 0 auto; width: 80%; border-collapse: collapse;">
        <tr>
          <th style="background-color: #f2f2f2; font-weight: bold; padding: 8px; text-align: center;">ID de Mongo</th>
          <th style="background-color: #f2f2f2; font-weight: bold; padding: 8px; text-align: center;">Contenido</th>
        </tr>
        ${data
          .map(
            (item: { _id: string; data: string }) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item._id}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.data}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
    `;
    } catch (error) {
      console.log(error);
    }
  }

  @MessagePattern({ cmd: 'store' })
  sendMessage(data: string): string | Observable<string> {
    try {
      return this.client.send({ cmd: 'store' }, data);
    } catch (error) {
      return `${error}, "please check the data you're sending"`;
    }
  }
}
