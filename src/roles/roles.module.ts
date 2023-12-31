import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

@Module({
	providers: [RolesService],
	controllers: [RolesController],
	imports: [
		SequelizeModule.forFeature([Role, User, UserRoles ])
	],
	// Нужно экспортировать сервис, чтобы он был доступен в других модулях. В частности в модуле UsersModule
	exports: [RolesService]
})
export class RolesModule { }
