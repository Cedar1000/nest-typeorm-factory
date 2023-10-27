import { TypeOrmModule } from '@nestjs/typeorm';

const TypeOrmSQLITETestingModule = (entity: any) => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [entity],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([entity]),
];

export default TypeOrmSQLITETestingModule;
