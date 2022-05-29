import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = [];

    async create({name, email, driver_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {name, email, driver_license, password, avatar});

        this.users.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find(u => u.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find(u => u.id === id);
    }
}

export { UsersRepositoryInMemory }