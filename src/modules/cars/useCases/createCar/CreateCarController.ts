import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateCarDTO = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const carCreted = await createCarUseCase.execute({ ...data });
    return response.status(201).send(carCreted);
  }
}

export { CreateCarController };
