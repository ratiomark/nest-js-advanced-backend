import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

	@ApiProperty({ example: 'user@mail.com', description: 'Email address' })
	readonly email: string

	@ApiProperty({ example: '12345', description: 'Password' })

	readonly password: string
}