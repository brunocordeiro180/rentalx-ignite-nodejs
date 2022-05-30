import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "Car test",
      daily_rate: 3,
      license_plate: "ABC-1234",
      fine_amount: 123,
      brand: "brand",
      category_id: "021934812",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      const carInfo = {
        name: "Car",
        description: "Car test",
        daily_rate: 3,
        license_plate: "ABC-1234",
        fine_amount: 123,
        brand: "brand",
        category_id: "021934812",
      };

      await createCarUseCase.execute(carInfo);
      await createCarUseCase.execute(carInfo);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car",
      description: "Car test",
      daily_rate: 3,
      license_plate: "ABC-1234",
      fine_amount: 123,
      brand: "brand",
      category_id: "021934812",
    });

    expect(car.available).toBe(true);
  });
});
