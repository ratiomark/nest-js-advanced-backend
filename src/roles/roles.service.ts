import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {

	constructor(@InjectModel(Role) private RolesRepository: typeof Role) { }

	async createRole(dto: CreateRoleDto) {
		const role = await this.RolesRepository.create(dto)
		return role
	}

	async getRoleByValue(roleValue: string) {
		const role = await this.RolesRepository.findOne({ where: { value: roleValue } })
		return role
	}
}
