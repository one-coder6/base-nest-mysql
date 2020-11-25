import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { IsArrayPipe } from 'src/pipe/validate.pipe';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('用户中心模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增
  @Post('createUser')
  @HttpCode(200)
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  async createUser(@Body() userDto: UserDto) {
    return this.userService.addOrupdate(userDto);
  }

  // 删除
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('deleteUserById/:id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // 批量删除
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Post('deleteUserByIds')
  deleteUserByIds(@Body(new IsArrayPipe()) id: string[]) {
    return this.userService.delete(id);
  }

  // 修改
  @Post('updateUser')
  @HttpCode(200)
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  async updateUser(@Body() userDto: UserDto) {
    return this.userService.addOrupdate(userDto);
  }

  // 查询列表
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('queryUserList')
  queryUserList(@Body() param) {
    return this.userService.queryUserList(param);
  }

  // 根据id查询一个user
  @ApiHeader({
    name: 'access-token',
    required: true,
    description: '本次请求请带上token',
    example: '546f9a99651c4d13b126f353048766b8',
  })
  @Get('queryUserById/:id')
  queryUserById(@Param('id') id: string) {
    return this.userService.queryUserById(id);
  }
}
