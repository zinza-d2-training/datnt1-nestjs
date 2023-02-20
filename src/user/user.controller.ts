import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Roles } from 'auth/custom_decorators/role.decorator';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'auth/types/role.enum';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles()
  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addOne(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Put()
  async updateUser(@Request() request, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(request.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async updateByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateByUserId(request.user, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
