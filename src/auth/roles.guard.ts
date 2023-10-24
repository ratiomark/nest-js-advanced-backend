import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";
import { User } from "src/users/users.model";

// Injectable - декоратор, который позволяет внедрять зависимости в класс
@Injectable()
// вся суть функции canActivate в том, что когда доступ разрешен оа возвращает true, а когда запрещен - false
export class RolesGuard implements CanActivate {

	constructor(
		private jwtService: JwtService,
		// нужно заинджектить рефлектор, чтоб получить роли 
		private reflector: Reflector,

	) { }

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (!requiredRoles) {
			return true
		}
		// получаем доступ к объекту запроса
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]
			if (bearer !== 'Bearer' || !token) {
				console.log('Пользователь не авторизован')
				throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
			}

			const user = this.jwtService.verify(token) as User
			req.user = user
			// если роль пользователя есть в массиве ролей, которые требуются в конкретном случае, то возвращаем true
			return user.roles.some(role => requiredRoles.includes(role.value))
		} catch (e) {
			throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
		}
	}

}