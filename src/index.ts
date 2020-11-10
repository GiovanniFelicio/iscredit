import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import {User} from "./models/User";
import {EnumRoleUser} from "@enums/EnumRoleUser";

createConnection().then(async connection => {

    const app = express();
    app.use(express.json());

    app.get("/user", async (req: Request, res: Response) => {
        const user = new User();
        user.name = "Giovanni";
        user.login = "giovannifc";
        user.password = 'gfc563';
        user.email = 'giovanni@smartbr.com';
        user.role = EnumRoleUser.ADMIN;
        await connection.manager.save(user);
    });

    app.get("/user/:id", async (req: Request, res: Response) => {
        const user: User = await connection.manager.findOne(User, req.params.id);
        res.send(user.name);
    });

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World");
    });


    app.listen(3000);

}).catch(error => console.log(error));
