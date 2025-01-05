import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ResCtx = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return response;
  },
);
