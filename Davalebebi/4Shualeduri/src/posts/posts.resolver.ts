import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { UpdatePostInput } from './dto/update-post.input.js';
import { PostPayload } from './payload/post.payload.js';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { UserId } from '../users/decorators/user-id.decorator.js';
import { ValidMongoId } from '../shared/dto/valid-mongodb-id.inputs.js';
import { IsAuthGuard } from '../shared/guards/isAuth.guard.js';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  
  @Query(() => [PostPayload])
  findAllPosts() {
    return this.postsService.findAll();
  }
  
  @Query(() => PostPayload)
  findOnePost(@Args() {id}: ValidMongoId) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  createPost(
    @UserId() userId: string,
    @Args('createPostInput') createPostInput: CreatePostInput
  ) {
    return this.postsService.createPost(createPostInput, userId);
  }

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  updatePost(
    @UserId() userId: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Args() {id}: ValidMongoId
  ) {
    return this.postsService.update(id, updatePostInput, userId);
  }

  @Mutation(() => PostPayload)
  @UseGuards(IsAuthGuard)
  removePost(
    @UserId() userId: string,
    @Args() {id}: ValidMongoId
  ) {
    return this.postsService.remove(id, userId);
  }
}
