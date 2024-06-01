import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionsFilter } from './exception.interceptor';
import { TransformResponseInterceptor } from './transform.interceptor';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionsFilter,
        },
    ]
})
export class InterceptorModule { }
