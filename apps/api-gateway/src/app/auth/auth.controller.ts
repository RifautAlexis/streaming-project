import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { Public } from '../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../../common/guards/local.guards';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() signInDto: Record<string, any>) {
    console.log(signInDto);
    return this.authService.signIn(signInDto.body.username, signInDto.body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
