import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user';
import { Roles } from 'nest-keycloak-connect';
import { ROLES } from './models/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles({ roles: [ROLES.CREATE_USER] })
  createUser(@Body() payload: User) {
    return this.userService.createUser(payload);
  }

  @Put('update')
  @Roles({ roles: [ROLES.UPDATE_USER] })
  updateUser(@Body() payload: User) {
    return this.userService.updateUser(payload);
  }

  @Delete('delete/:id')
  @Roles({ roles: [ROLES.DELETE_USER] })
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('all')
  @Roles({ roles: [ROLES.READ_USERS] })
  findAllUsers() {
    return this.userService.finAllUsers();
  }
}
