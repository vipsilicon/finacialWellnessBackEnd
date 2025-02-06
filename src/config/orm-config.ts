export = {
    type: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    entities: [
        "src/domain/**/*entity{.ts,.js}"
    ],
    migrationsTableName: "custom_migration",
    migrations: [
        "src/infra/db/migrations/*{.ts,.js}"
    ],
    cli: {
        migrationsDir: "src/infra/db/migrations"
    }
}