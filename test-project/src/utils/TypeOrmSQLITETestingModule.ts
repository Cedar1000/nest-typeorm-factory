import { TypeOrmModule } from '@nestjs/typeorm';

const TypeOrmPostgreSQLTestingModule = (entity: any) => [
  TypeOrmModule.forRoot({
    type: 'postgres', // Change the database type to PostgreSQL
    host: 'localhost', // Specify your PostgreSQL host
    port: 5432, // Specify your PostgreSQL port
    username: 'postgres', // Specify your PostgreSQL username
    password: 'postgres12234', // Specify your PostgreSQL password
    database: 'test', // Specify your PostgreSQL database name
    entities: [entity],
    synchronize: true, // This option should be used with caution in production
    autoLoadEntities: true,
    migrationsRun: true,
  }),
  TypeOrmModule.forFeature([entity]),
];

export default TypeOrmPostgreSQLTestingModule;
