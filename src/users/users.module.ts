import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	providers: [UsersService],
	controllers: [UsersController],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles]),
		// Чтобы RolesService был доступен в UsersService нужно импортировать RolesModule, а не RolesService. В свою очередь RolesModule экспортирует RolesService
		RolesModule,
		forwardRef(() => AuthModule)
	],
	exports: [
		UsersService
	]

})
export class UsersModule { }
