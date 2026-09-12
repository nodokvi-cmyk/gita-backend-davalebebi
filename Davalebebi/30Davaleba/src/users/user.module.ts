import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schema/user.schema";
import { ProductsModule } from "../products/products.module";
import { ExpenseModule } from "../expenses/expense.module";
import { AwsS3Module } from "../aws-s3/aws-s3.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: "user", schema: userSchema}
        ]),
        // forwardRef(() => ProductsModule)
        forwardRef(() => ExpenseModule),
        AwsS3Module
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, MongooseModule]
})
export class UserModule{}