import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesDecorator } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {

	constructor(
		private usersService: UsersService,

	) { }

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto)
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@RolesDecorator('admin')
	@UseGuards(RolesGuard)
	// @UseGuards(JwtAuthGuard) // используем guard для защиты роута
	@Get()
	getAll() {
		return this.usersService.getAllUsers()
	}
}
