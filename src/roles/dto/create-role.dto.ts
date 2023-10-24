import { ApiProperty } from "@nestjs/swagger"
import { RoleTypes } from "../types/roleTypes"

export class CreateRoleDto {

	@ApiProperty({ example: 'admin' })
	readonly value: keyof typeof RoleTypes

	@ApiProperty({ example: 'Admin - has all rights' })
	readonly description: string

}