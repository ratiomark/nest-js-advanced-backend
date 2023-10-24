import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
	// Чтобы RolesService был доступен в UsersService нужно импортировать RolesModule внутри users.module 
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private rolesService: RolesService,

	) { }

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		const role = await this.rolesService.getRoleByValue('user')
		// $set позволяет перезаписать и сразу сохранить данные в БД, поскольку изначально у пользователя нет роли, то указываем массив в котором будет одна роль
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}

	async getAllUsers() {
		// const users = await this.userRepository.findAll({ include: { all: true } })
		const users = await this.userRepository.findAll({
			attributes: ['id', 'email'], // выберите атрибуты, которые вы хотите получить из основной таблицы
			include: [{
				model: Role, // предполагая, что у вас есть модель Role
				attributes: ['id', 'value'], // выберите атрибуты, которые вы хотите получить из связанной таблицы
				through: { attributes: [] } // это исключит поля из промежуточной таблицы
			}]
		});
		return users
	}


	async getUserByEmail(email: string) {
		// const users = await this.userRepository.findAll({ include: { all: true } })
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
		return user
	}
}
