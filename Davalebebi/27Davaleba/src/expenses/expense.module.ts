import { Module } from "@nestjs/common";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { MongooseModule } from "@nestjs/mongoose";
import { expenseSchema } from "./schema/expense.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "expense", schema: expenseSchema}
        ])
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService]
})
export class ExpenseModule{}