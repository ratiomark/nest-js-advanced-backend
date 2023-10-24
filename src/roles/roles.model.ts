import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
	value: string;
	description: string;
}



// нужен для того чтобы этот класс стал таблицей в базе данных
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs>{

	@ApiProperty({
		description: 'Unique identifier for the role.',
		example: 1
	})
	// для того чтобы поля стали колонками в таблице
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({
		description: 'Unique role',
		example: 'admin'
	})
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string;

	@ApiProperty({
		description: 'Role description.',
		example: 'Administrator'
	})
	@Column({ type: DataType.STRING, allowNull: false })
	description: string;


	// Связь многие ко многим, так как у одного пользователя может быть несколько ролей, а у одной роли может быть несколько пользователей. UserRoles - промежуточная таблица
	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}