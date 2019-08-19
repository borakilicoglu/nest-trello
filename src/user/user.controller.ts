import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  Query,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { User } from './user.decorator';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('users/:username')
  showOneUser(@Param('username') username: string) {
    return this.userService.read(username);
  }

  @Put('users/:id')
  @UseGuards(new AuthGuard())
  editUser(
    @Param('id') id: string,
    @Body() data: UserDTO,
  ) {
    return this.userService.edit(id, data);
  }

  @Get('auth/whoami')
  @UseGuards(new AuthGuard())
  showMe(@User('username') username: string) {
    return this.userService.read(username);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }

  @Get('auth/forgot/:email')
  forgot(@Param('email') email: string) {
    return this.userService.forgot(email);
  }

  @Put('auth/updatepassword/:id')
  updatepassword(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.updatePassword(id, data);
  }

  @Put('auth/resetpassword/:id')
  reset(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.resetPassword(id, data);
  }
}
