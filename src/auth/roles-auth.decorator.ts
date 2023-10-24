import { SetMetadata } from "@nestjs/common";
import { RoleTypes } from "src/roles/types/roleTypes";

// констранта нужна для получения метаданных внутри guardA, просто буду юзать как ключ
export const ROLES_KEY = 'roles';
// декоратор для присвоения роли, но это просто хелпер для прокидывания роли
export const RolesDecorator = (...roles: (keyof typeof RoleTypes)[]) => SetMetadata(ROLES_KEY, roles);