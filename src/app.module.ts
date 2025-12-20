import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Intervention } from './interventions/intervention.entity';
import { Device } from './devices/device.entity';
import { SparePart } from './parts/part.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ds2',
      entities: [User, Intervention, Device, SparePart], // toutes les entités ici
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Intervention, Device, SparePart]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
