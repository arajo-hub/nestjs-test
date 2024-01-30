import {CallHandler, ExecutionContext, NestInterceptor} from "@nestjs/common";
import {Observable, tap} from "rxjs";
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
            );
    }
}