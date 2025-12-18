import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',       
      password: '',           
      database: 'ds2',        
      entities: [User],
      synchronize: true,      
    }),
    TypeOrmModule.forFeature([User]), 
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
