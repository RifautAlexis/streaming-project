import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/common/guards/local.guards';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

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
