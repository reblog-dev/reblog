import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Response } from "express";

const customErrorMessages: Record<number, string> = {
  [HttpStatus.NOT_FOUND]: "未知的资源",
  [HttpStatus.BAD_REQUEST]: "请求参数错误",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "服务器内部错误",
  [HttpStatus.UNAUTHORIZED]: "未授权",
  [HttpStatus.FORBIDDEN]: "没有权限",
};

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(AnyExceptionFilter.name);
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : customErrorMessages[status] || "未知错误";

    if (status === (HttpStatus.INTERNAL_SERVER_ERROR as number)) {
      this.logger.error(exception);
    }
    response.status(status).json({
      message,
    });
  }
}
