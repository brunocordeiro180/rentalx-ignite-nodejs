import "reflect-metadata";
import express, { request } from 'express'
import "express-async-errors"
import swaggerui from 'swagger-ui-express';

import { router } from '@shared/infra/http/routes';
import swaggerFile from "../../../swagger.json";
import "@shared/container"
import createConnection from "@shared/infra/typeorm"
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express()

app.use(express.json())

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerFile));

app.use(router);

app.use((err: Error, request, response, next) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({message: err.message})
    }

    return response.status(500).json({status: "error", message: `Internal server error - ${err.message}`})
})

export { app }