import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors"
import cors from 'cors'
import { router } from './routes'

import "./database/index.ts"

const app = express();
app.use(cors()) // ADD ORIGIN DOMAIN NAME

app.use(express.json())

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server Error"
    })
})

app.listen(3000, () => console.log('Server is running'))