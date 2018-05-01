import { FindUserById } from "../db/controllers";
export default async (ctx: any, next: any) => {
  const userId = ctx.tokenContent.userId;
  const result = await FindUserById(userId);
  if (result.role !== "admin") {
    ctx.throw(401, "非法访问!");
  }
  await next();
};
