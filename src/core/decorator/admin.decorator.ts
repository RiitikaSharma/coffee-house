import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Admin as AdminEntity } from 'src/modules/auth/entities/admin.entity';
export const adminUser = createParamDecorator(
  (data: keyof Admin, input: ExecutionContext) => {
    const request = input.switchToHttp().getRequest();
    const admin: Admin = request['user'];
    // console.log(user);
    return data ? admin[data] : admin;
  },
);

export type Admin = AdminEntity & { _id: string };
