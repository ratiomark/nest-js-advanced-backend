import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

// Injectable - декоратор, который позволяет внедрять зависимости в класс
@Injectable()
// вся суть функции canActivate в том, что когда доступ разрешен оа возвращает true, а когда запрещен - false
export class JwtAuthGuard implements CanActivate {

	constructor(private jwtService: JwtService) { }

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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

			console.log('1')
			const user = this.jwtService.verify(token)
			console.log('2')
			req.user = user
			return true
		} catch (e) {
			console.log('!!!!!!!!!!!!!!!!!!!')
			throw new UnauthorizedException({ message: 'Пользователь не авторизован' })
		}
	}

}