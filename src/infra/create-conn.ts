import { config } from 'dotenv';
config();
import 'reflect-metadata';
import { DataSource, DefaultNamingStrategy } from 'typeorm';
import path from 'path';
import ormConfig from '../config/orm-config';

class NamingStrategy extends DefaultNamingStrategy {
    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        let out = alias + '' + propertyPath.replace('.', '');
        let match = out.match(/_/g) || [];
        return out + match.length;
    }
}

const databaseConfig = ormConfig as any;

export const SqlDataSource = new DataSource({

    type: databaseConfig.type,
    database: databaseConfig.database,
    username: databaseConfig.username,
    password: databaseConfig.password,
    host: databaseConfig.host,
    charset: databaseConfig.charset,
    entities: [
        // path.resolve(__dirname, "..", "..", "domain") + "/**/*entity{.ts,.js}"
        "src/domain/**/*entity.ts"
    ],
    migrationsTableName: "custom_migration",
    migrations: [
        path.resolve(__dirname, "migrations") + "/*{.ts,.js}"
    ],
    namingStrategy: new NamingStrategy(),
    bigNumberStrings: false
})

export async function createConn(){

    return new Promise<void>((resolve, reject) => {
        SqlDataSource.initialize()
            .then(() => {
                console.log('Successfully connected to database');
                resolve();
            })
            .catch((e) => {
                console.log('Error connection to database', e);
                reject(e);
            })
    })
}