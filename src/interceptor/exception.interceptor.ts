import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export const DEFAULT_ERROR_MESSAGE = 'Internal server error';
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception.response?.message || exception.message || DEFAULT_ERROR_MESSAGE;

        response.status(status).json({
            success: false,
            error: exception.name || 'Server Error',
            message: message,
            timestamp: new Date().toISOString(),
        });
    }
}
