import { Module } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { PostsResolver } from './posts.resolver.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './schema/post.schema.js';
import { User, userSchema } from '../users/schema/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Post.name, schema: postSchema},
      {name: User.name, schema: userSchema}
    ])
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
