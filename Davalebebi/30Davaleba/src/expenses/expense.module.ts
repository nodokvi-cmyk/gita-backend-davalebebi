import { forwardRef, Module } from "@nestjs/common";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";
import { MongooseModule } from "@nestjs/mongoose";
import { expenseSchema } from "./schema/expense.schema";
import { UserModule } from "../users/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "expense", schema: expenseSchema}
        ]),
        forwardRef(() => UserModule) ,
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService],
    exports: [ExpenseService, MongooseModule]
})
export class ExpenseModule{}