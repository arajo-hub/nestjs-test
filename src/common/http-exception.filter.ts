import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { CommonResponseDto } from "./response.dto";
import {transactionLogger} from "./logger/winston.util";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus();

        const exceptionResponse: any = exception.getResponse();

        const retJson = new CommonResponseDto();
        retJson.retCode = `F0${status}`;
        let message = String(exceptionResponse.message)
        let splitMessage = message.split('|')
        if (splitMessage.length < 2) {
            retJson.retMessage = `${splitMessage[0]}`;
        } else {
            retJson.retTitle = `${splitMessage[0]}`;
            retJson.retMessage = `${splitMessage[1]}`;
        }

        response
            .status(HttpStatus.OK)
            .json(retJson);
    }
}