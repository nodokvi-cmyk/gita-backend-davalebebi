import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { UpdatePostInput } from './dto/update-post.input.js';
import { PostPayload } from './payload/post.payload.js';
import { UseGuards } from '@nestjs/common';
import { UserId } from '../users/decorators/user-id.decorator.js';
import { ValidMongoId } from '../shared/dto/valid-mongodb-id.inputs.js';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostPayload)
  createPost(
    @UserId() userId: string,
    @Args('createPostInput') createPostInput: CreatePostInput
  ) {
    return this.postsService.createPost(createPostInput, userId);
  }

  @Query(() => [PostPayload])
  findAllPosts() {
    return this.postsService.findAll();
  }

  @Query(() => PostPayload)
  findOnePost(@Args() {id}: ValidMongoId) {
  return this.postsService.findOne(id);
  }

  // @Mutation('updatePost')
  // update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  @Mutation(() => PostPayload)
  removePost(@Args() {id}: ValidMongoId) {
    return this.postsService.remove(id);
  }
}
