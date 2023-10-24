import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		// юзаю forwardRef когда модуль импортирует другой модуль, а тот в свою очередь импортирует первый модуль. Это нужно чтобы избежать циклической зависимости
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.PRIVATE_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		})
	],
	exports: [
		AuthService,
		JwtModule
	]
})
export class AuthModule { }
