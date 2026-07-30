import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ExpenseModule } from './expenses/expense.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UserModule, ExpenseModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
