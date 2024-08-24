import { Module } from '@nestjs/common';
import { AuthenticationModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthenticationModule, UsersModule],
})
export class AppModule {}
