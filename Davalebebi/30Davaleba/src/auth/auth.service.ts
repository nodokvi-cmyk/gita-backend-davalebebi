import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from "bcrypt"
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("user") private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto: SignUpDto){
        const existingUser = await this.userModel.findOne({email: signUpDto.email})
        if(existingUser){
            throw new BadRequestException("User with this email already registered")
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10)

        const startingDate = new Date()
        const endingDate = new Date(startingDate)

        endingDate.setMonth(endingDate.getMonth() + 1)

        const newUser = await this.userModel.create({
            ...signUpDto,
            // password: hashedPassword,
            // subscriptionStartDate: startingDate,
            // subscriptionEndDate: endingDate
        })

        return "User created successfully"
    }

    async signIn(signInDto: SignInDto){
        const existingUser = await this.userModel.findOne({email: signInDto.email}).select("password")
        if(!existingUser){
            throw new BadRequestException("Email or Password is incorrect")
        }

        // const isCorrectPassword = await bcrypt.compare(signInDto.password, existingUser.password)
        // if(!isCorrectPassword){
        //     throw new BadRequestException("Email or Password is incorrect")
        // }

        const payLoad = {
            userId: existingUser._id
        }

        const token = await this.jwtService.sign(payLoad, {expiresIn: "1h"})

        return {token}
    }

    async getCurrentUser(userId){
        return this.userModel.findById(userId)
    }
}
