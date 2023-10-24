import { SetMetadata } from "@nestjs/common";

// констранта нужна для получения метаданных внутри guardA, просто буду юзать как ключ
export const ROLES_KEY = 'roles';

// декоратор для присвоения роли, но это просто хелпер для прокидывания роли
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);