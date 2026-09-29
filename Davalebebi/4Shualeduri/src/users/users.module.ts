import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver.js';
import { UsersService } from './users.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema.js';
import { Post, postSchema } from '../posts/schema/post.schema.js';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: userSchema},
            {name: Post.name, schema: postSchema},
        ])
    ],
    providers: [UsersResolver, UsersService]
})
export class UsersModule {}
