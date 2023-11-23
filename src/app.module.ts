import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'task_management',
      autoLoadEntities: true,
      synchronize: true, // for study only
    }),
    AuthModule,
  ],
})
export class AppModule {}
