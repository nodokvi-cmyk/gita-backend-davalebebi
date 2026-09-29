import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  findAll() {
    return this.postsModel.find().populate({path: "author", select: "fullName email"})
  }
  
  async findOne(id: string) {
    const post = await this.postsModel.findById(id).populate({path: "author", select: "fullName email"})
    if(!post) throw new NotFoundException("Post not found")
      return post
  }

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

    return newPost.populate({path: "author", select: "fullName email"})
  }

  async update(id: string, updatePostInput: UpdatePostInput, userId: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException("Post not found")

    if(post.author.toString() !== userId) throw new ForbiddenException("No Permission")

    const updatedPost = await this.postsModel.findByIdAndUpdate(id, {
      ...updatePostInput,
      $inc: {__v: 1}
    }, {new: true}).populate({path: "author", select: "fullName email"})

    return updatedPost
  }

  async remove(id: string, userId: string) {
    const post = await this.postsModel.findById(id)
    if(!post) throw new NotFoundException("Post not found")
    
    if(post.author.toString() !== userId) throw new ForbiddenException("No Permission")

    await this.postsModel.findByIdAndDelete(id)
    await this.usersModel.findByIdAndUpdate(userId, {
      $pull: {posts: post._id}
    })

    return post.populate({path: "author", select: "fullName email"})
  }
}
