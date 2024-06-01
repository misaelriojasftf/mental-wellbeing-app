import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'mental_wellbeing',
    logging: false,
    name: 'default',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ["src/database/migrations/*{.ts,.js}"],
});