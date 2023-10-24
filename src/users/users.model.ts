import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
	email: string;
	password: string;
}



// нужен для того чтобы этот класс стал таблицей в базе данных
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{
	// для того чтобы поля стали колонками в таблице

	@ApiProperty({
		description: 'Unique identifier for the user.',
		example: 12345
	})
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number;

	@ApiProperty({
		description: 'Email address of the user.',
		example: 'user@example.com'
	})
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@ApiProperty({
		description: 'Password for the user.',
		example: 'securePassword123!'
	})
	@Column({ type: DataType.STRING, allowNull: false })
	password: string;

	@ApiProperty({
		description: 'Indicates whether the user is banned.',
		example: false
	})
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean;

	@ApiProperty({
		description: 'Reason for banning the user.',
		example: 'Violation of terms of service'
	})
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];
}