import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input.js';
import { UpdatePostInput } from './dto/update-post.input.js';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema.js';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postsModel: Model<Post>,
    @InjectModel(User.name) private usersModel: Model<User>
  ){}

  async createPost(createPostInput: CreatePostInput, userId: string) {
    const user = await this.usersModel.findById(userId)
    if(!user) throw new NotFoundException("User not found")

    const newPost = await this.postsModel.create({
      ...createPostInput,
      author: userId
    })

    await this.usersModel.findByIdAndUpdate(userId, {
      $push: {posts: newPost._id}
    })

    return newPost
  }

  findAll() {
    return this.postsModel.find().populate({path: "author", select: "fullName email"})
  }

  async findOne(id: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException("Post not found")
    return post
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  async remove(id: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException("Post not found")

    await this.postsModel.findByIdAndDelete(id)
    await this.usersModel.findByIdAndUpdate(post.author, {
      $pull: {posts: post._id}
    })

    return post
  }
}
