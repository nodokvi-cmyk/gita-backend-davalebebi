import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from "bcrypt"
import { SignInDto } from './dto/sign-in.dto';
import { EmailSenderService } from '../email-sender/email-sender.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("user") private userModel: Model<User>,
        private jwtService: JwtService,
        private emailSenderService: EmailSenderService
    ){}

    async signUp(signUpDto: SignUpDto){
        const existingUser = await this.userModel.findOne({email: signUpDto.email})
        if(existingUser){
            throw new BadRequestException("User with this email already registered")
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10)

        // const startingDate = new Date()
        // const endingDate = new Date(startingDate)

        // endingDate.setMonth(endingDate.getMonth() + 1)

        const OTPCode = Math.random().toString().slice(2, 8)
        const OTPCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000)

        const newUser = await this.userModel.create({
            ...signUpDto,
            password: hashedPassword,
            OTPCode: OTPCode,
            OTPCodeExpirationDate: OTPCodeExpirationDate
            // subscriptionStartDate: startingDate,
            // subscriptionEndDate: endingDate
        })

        await this.emailSenderService.verifyUser(signUpDto.email, OTPCode)

        return {
            success: true,
            message: "Check your email to verify the account"
        }
    }

    async signIn(signInDto: SignInDto){
        const existingUser = await this.userModel.findOne({email: signInDto.email}).select("+password")
        if(!existingUser){
            throw new BadRequestException("Email or Password is incorrect")
        }

        const isCorrectPassword = await bcrypt.compare(signInDto.password, existingUser.password)
        if(!isCorrectPassword){
            throw new BadRequestException("Email or Password is incorrect")
        }

        if(!existingUser.isVerified){
            throw new BadRequestException("User not verified")
        }

        const payLoad = {
            userId: existingUser._id
        }

        const token = await this.jwtService.sign(payLoad, {expiresIn: "1h"})

        return {token}
    }

    async verifyUser({OTPCode, email}: VerifyUserDto){
        const existingUser = await this.userModel.findOne({email})
        if(!existingUser) throw new NotFoundException("User not found")

        if(existingUser.OTPCode !== OTPCode) throw new BadRequestException("OTP Code is incorrect")
        
        if(new Date().getTime() > existingUser.OTPCodeExpirationDate!) throw new BadRequestException("OTP Code has been expired")
        
        await this.userModel.findByIdAndUpdate(existingUser._id, {
            isVerified: true,
            OTPCode: null,
            OTPCodeExpirationDate: null
        })

        const payLoad = {
            userId: existingUser._id
        }

        const token = await this.jwtService.sign(payLoad, {expiresIn: "1h"})

        return {token}
    }

    async resendVerification({email}: ResendVerificationDto){
        const existingUser = await this.userModel.findOne({email})
        if(!existingUser) throw new NotFoundException("User not found")

        if(existingUser.isVerified) throw new BadRequestException("User already verified")

        if(new Date().getTime() < existingUser.OTPCodeExpirationDate!){
            throw new BadRequestException("OTP Code has not been expired yet")
        }

        const OTPCode = Math.random().toString().slice(2, 8)
        const OTPCodeExpirationDate = new Date().setTime(new Date().getTime() + 5 * 60 * 1000)

        await this.userModel.findByIdAndUpdate(existingUser._id, {
            isVerified: false,
            OTPCode: OTPCode,
            OTPCodeExpirationDate: OTPCodeExpirationDate
        })

        await this.emailSenderService.verifyUser(email, OTPCode)

        return {
            resend: true,
            message: "Check your email"
        }
    }

    async getCurrentUser(userId){
        return this.userModel.findById(userId)
    }
}
