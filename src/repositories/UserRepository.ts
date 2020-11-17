import { User } from "src/app/models/User";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    findByLogin(login: string) {
        return this.findOne({login: login});
    }
}