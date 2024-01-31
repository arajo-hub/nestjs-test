import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import { transactionLogger, winstonLogger } from "src/common/logger/winston.util";

export class LogIntercetor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const response = httpContext.getResponse();
        const header = request.headers;
        const body = request.body;
        transactionLogger.log(`REQ,${request.url},${request.method},${JSON.stringify(header)},${JSON.stringify(body)}`);
        return next
            .handle()
            .pipe(
                tap(() => {
                    const statusCode = response.statusCode;
                    transactionLogger.log(`RES, ${request.url}, ${request.method}, ${statusCode}`);
                }),
                catchError((error) => {
                    // 여기에서 예외 로깅 처리
                    transactionLogger.log(`ERROR, ${request.url}, ${request.method}, ${error.message}`);
                    // 에러를 다시 throw하여 다른 처리기가 처리할 수 있도록 함
                    return throwError(error);
                })
            );
    }
}