import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUser } from "./user.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";


@Injectable()
export class UserService {
    private userList = [
        {id: 1, firstName: "Giorgi", lastName: "Giorgadze", email: "giorgi@gmail.com", phoneNumber: "112233", gender: "M"},
        {id: 2, firstName: "Mariam", lastName: "Mariamidze", email: "mariam@gmail.com", phoneNumber: "445566", gender: "F"},
        {id: 3, firstName: "Nika", lastName: "Nikadze", email: "nika@gmail.com", phoneNumber: "334455", gender: "M"},
        {id: 4, firstName: "Ana", lastName: "Anadze", email: "ana@gmail.com", phoneNumber: "778899", gender: "F"}
    ]

    getAllUser(): IUser[] {
        return this.userList
    }

    getUserById(userId: number): IUser {
        const desiredUser = this.userList.find((user) => user.id === userId)
        if (!desiredUser){
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        return desiredUser
    }

    createUser(createUserDto: CreateUserDto): IUser {
        const lastId = this.userList[this.userList.length - 1]?.id || 0
        const newUser = {
            id: lastId + 1,
            ...createUserDto
        }
        this.userList.push(newUser)
        return newUser
    }

    deleteUserById(userId: number): IUser{
        const targettedUserIndex = this.userList.findIndex((user) => user.id === userId)
        if(targettedUserIndex === -1){
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const deletedUser = this.userList.splice(targettedUserIndex, 1)
        return deletedUser[0]
    }

    updateUserById(userId: number, updateUserDto: UpdateUserDto): IUser{
        const targettedUserIndex = this.userList.findIndex((user) => user.id === userId)
        if(targettedUserIndex === -1){
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }

        this.userList[targettedUserIndex] = {
            ...this.userList[targettedUserIndex],
            ...updateUserDto
        }
        return this.userList[targettedUserIndex]
    }
}