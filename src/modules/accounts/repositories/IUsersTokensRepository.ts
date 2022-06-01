import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { ICreateUserTokenDTO } from "../dto/ICreateUserTokenDTO";
import { User } from "../infra/typeorm/entities/User";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokensRepository };
