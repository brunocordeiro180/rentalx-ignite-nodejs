import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const authenticateResponse = await authenticateUserUseCase.execute({ email, password });
        return response.json(authenticateResponse);
    }
}

export { AuthenticateController }