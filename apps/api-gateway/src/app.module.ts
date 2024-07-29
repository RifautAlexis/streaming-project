import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthenticationModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthenticationModule, UsersModule],
})
export class AppModule {}
