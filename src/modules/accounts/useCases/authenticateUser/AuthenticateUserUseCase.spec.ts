import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO =

        {
            driver_license: "000123",
            email: "user@test.com",
            name: "User test",
            password: "1234"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

        expect(result).toHaveProperty("token");
    })

    it("should not be able to authenticate a nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({ email: "false@gmail.com", password: "123456" });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to authenticate with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO =

            {
                driver_license: "000123",
                email: "user@test.com",
                name: "User test",
                password: "1234"
            }

            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({ email: user.email, password: "wrongpassword" });
        }).rejects.toBeInstanceOf(AppError);
    })
})