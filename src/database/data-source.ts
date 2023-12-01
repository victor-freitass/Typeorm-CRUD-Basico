import "reflect-metadata"
import { Admin, DataSource } from "typeorm"
import { User } from "../entities/User"
import { Content } from "../entities/Content"
import { Adm } from "../entities/Adm"

export const AppDataSource = new DataSource({   
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "typeorm_crud",
    synchronize: true,
    logging: false,
    entities: [User, Content, Adm],
    migrations: [],
    subscribers: [],
})
