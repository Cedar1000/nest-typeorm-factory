// test.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module'; // Adjust based on your module path

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Use the test database configuration
      name: 'test',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test_user',
      password: 'test_password',
      database: 'test_db',
      synchronize: true,
      dropSchema: true,
      entities: ['dist/**/*.entity.js'], // Adjust based on your entity path
    }),
    PostModule, // Import your main module here
  ],
})
export class TestModule {}
