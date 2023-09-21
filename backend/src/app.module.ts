import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGard } from './users/auth/auth.guard';
import { UserInterceptor } from './users/interceptors/user.interceptor';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddleware } from './middleware/cors.middlewar';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "../../.env"
    }),
    UsersModule,
    PrismaModule,
    TasksModule],
  controllers: [AppController],
  providers: [ {
    provide: APP_GUARD,
    useClass: AuthGard
  }, {
    provide: APP_INTERCEPTOR,
    useClass: UserInterceptor
  }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
