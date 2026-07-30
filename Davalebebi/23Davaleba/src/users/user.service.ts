import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { IUser } from "./user.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PaginationDto } from "../common/pagination.dto";
import { UserQueryDto } from "./dtos/user-query.dto";


@Injectable()
export class UserService {
    private userList = [
    { id: 1, firstName: "Giorgi", lastName: "Giorgadze", email: "giorgi@gmail.com", phoneNumber: "112233", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 2, firstName: "Mariam", lastName: "Mariamidze", email: "mariam@gmail.com", phoneNumber: "445566", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 3, firstName: "Nika", lastName: "Nikadze", email: "nika@gmail.com", phoneNumber: "334455", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 4, firstName: "Ana", lastName: "Anadze", email: "ana@gmail.com", phoneNumber: "778899", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 5, firstName: "Dachi", lastName: "Dachidze", email: "dachi@gmail.com", phoneNumber: "556677", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 6, firstName: "Nino", lastName: "Ninidze", email: "nino@gmail.com", phoneNumber: "990011", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 7, firstName: "Luka", lastName: "Lukadze", email: "luka@gmail.com", phoneNumber: "223344", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 8, firstName: "Eka", lastName: "Ekadze", email: "eka@gmail.com", phoneNumber: "667788", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 9, firstName: "Saba", lastName: "Sabadze", email: "saba@gmail.com", phoneNumber: "113355", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 10, firstName: "Salome", lastName: "Salomedze", email: "salome@gmail.com", phoneNumber: "224466", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 11, firstName: "Irakli", lastName: "Iraklidze", email: "irakli@gmail.com", phoneNumber: "335577", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 12, firstName: "Tamar", lastName: "Tamaridze", email: "tamar@gmail.com", phoneNumber: "446688", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 13, firstName: "Levan", lastName: "Levandze", email: "levan@gmail.com", phoneNumber: "557799", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 14, firstName: "Nata", lastName: "Natadze", email: "nata@gmail.com", phoneNumber: "668800", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 15, firstName: "Davit", lastName: "Davitadze", email: "davit@gmail.com", phoneNumber: "779911", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 16, firstName: "Keti", lastName: "Ketidze", email: "keti@gmail.com", phoneNumber: "880022", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 17, firstName: "Tornike", lastName: "Tornikidze", email: "tornike@gmail.com", phoneNumber: "991133", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 18, firstName: "Lia", lastName: "Liadze", email: "lia@gmail.com", phoneNumber: "102938", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 19, firstName: "Aleksandre", lastName: "Aleksandridze", email: "aleksandre@gmail.com", phoneNumber: "203948", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 20, firstName: "Sophio", lastName: "Sophiodze", email: "sophio@gmail.com", phoneNumber: "304958", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 21, firstName: "Otar", lastName: "Otaridze", email: "otar@gmail.com", phoneNumber: "405968", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 22, firstName: "Lela", lastName: "Leladze", email: "lela@gmail.com", phoneNumber: "506978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 23, firstName: "Zura", lastName: "Zuradze", email: "zura@gmail.com", phoneNumber: "607988", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 24, firstName: "Nia", lastName: "Niadze", email: "nia@gmail.com", phoneNumber: "708998", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 25, firstName: "Mikheil", lastName: "Mikhelidze", email: "mikheil@gmail.com", phoneNumber: "809008", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 26, firstName: "Teona", lastName: "Teonadze", email: "teona@gmail.com", phoneNumber: "910118", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 27, firstName: "Beka", lastName: "Bekadze", email: "beka@gmail.com", phoneNumber: "121328", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 28, firstName: "Maia", lastName: "Maiadze", email: "maia@gmail.com", phoneNumber: "232438", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 29, firstName: "Giga", lastName: "Gigadze", email: "giga@gmail.com", phoneNumber: "343548", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 30, firstName: "Natia", lastName: "Natiadze", email: "natia@gmail.com", phoneNumber: "454658", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 31, firstName: "Bachana", lastName: "Bachanidze", email: "bachana@gmail.com", phoneNumber: "565768", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 32, firstName: "Lile", lastName: "Liledze", email: "lile@gmail.com", phoneNumber: "676878", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 33, firstName: "Vakhtang", lastName: "Vakhtangidze", email: "vakhtang@gmail.com", phoneNumber: "787988", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 34, firstName: "Ia", lastName: "Iadze", email: "ia@gmail.com", phoneNumber: "898098", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 35, firstName: "Shota", lastName: "Shotadze", email: "shota@gmail.com", phoneNumber: "909208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 36, firstName: "Tinatin", lastName: "Tinatindze", email: "tinatin@gmail.com", phoneNumber: "112318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 37, firstName: "Archil", lastName: "Archilidze", email: "archil@gmail.com", phoneNumber: "223428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 38, firstName: "Maka", lastName: "Makadze", email: "maka@gmail.com", phoneNumber: "334538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 39, firstName: "Guram", lastName: "Guramidze", email: "guram@gmail.com", phoneNumber: "445648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 40, firstName: "Shorena", lastName: "Shorenadze", email: "shorena@gmail.com", phoneNumber: "556758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 41, firstName: "Lasha", lastName: "Lashadze", email: "lasha@gmail.com", phoneNumber: "667868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 42, firstName: "Khatia", lastName: "Khatiadze", email: "khatia@gmail.com", phoneNumber: "778978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 43, firstName: "Mate", lastName: "Matedze", email: "mate@gmail.com", phoneNumber: "889088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 44, firstName: "Medea", lastName: "Mdeadze", email: "medea@gmail.com", phoneNumber: "990198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 45, firstName: "Demetre", lastName: "Demetradze", email: "demetre@gmail.com", phoneNumber: "101208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 46, firstName: "Tatia", lastName: "Tatiadze", email: "tatia@gmail.com", phoneNumber: "212318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 47, firstName: "Revaz", lastName: "Revazidze", email: "revaz@gmail.com", phoneNumber: "323428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 48, firstName: "Diana", lastName: "Dianadze", email: "diana@gmail.com", phoneNumber: "434538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 49, firstName: "Andria", lastName: "Andriadze", email: "andria@gmail.com", phoneNumber: "545648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 50, firstName: "Ani", lastName: "Anidze", email: "ani@gmail.com", phoneNumber: "656758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 51, firstName: "Soso", lastName: "Sosoidze", email: "soso@gmail.com", phoneNumber: "767868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 52, firstName: "Marika", lastName: "Marikadze", email: "marika@gmail.com", phoneNumber: "878978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 53, firstName: "Nodar", lastName: "Nodaridze", email: "nodar@gmail.com", phoneNumber: "989088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 54, firstName: "Tamuna", lastName: "Tamunadze", email: "tamuna@gmail.com", phoneNumber: "100198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 55, firstName: "Gia", lastName: "Giadze", email: "gia@gmail.com", phoneNumber: "211208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 56, firstName: "Kristine", lastName: "Kristinedze", email: "kristine@gmail.com", phoneNumber: "322318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 57, firstName: "Tengiz", lastName: "Tengizidze", email: "tengiz@gmail.com", phoneNumber: "433428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 58, firstName: "Irma", lastName: "Irmadze", email: "irma@gmail.com", phoneNumber: "544538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 59, firstName: "Paata", lastName: "Paatadze", email: "paata@gmail.com", phoneNumber: "655648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 60, firstName: "Manana", lastName: "Mananadze", email: "manana@gmail.com", phoneNumber: "766758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 61, firstName: "Badri", lastName: "Badridze", email: "badri@gmail.com", phoneNumber: "877868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 62, firstName: "Lana", lastName: "Lanadze", email: "lana@gmail.com", phoneNumber: "988978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 63, firstName: "Vano", lastName: "Vanoidze", email: "vano@gmail.com", phoneNumber: "109088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 64, firstName: "Nunu", lastName: "Nunudze", email: "nunu@gmail.com", phoneNumber: "210198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 65, firstName: "Jaba", lastName: "Jabadze", email: "jaba@gmail.com", phoneNumber: "321208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 66, firstName: "Bela", lastName: "Beladze", email: "bela@gmail.com", phoneNumber: "432318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 67, firstName: "Koba", lastName: "Kobadze", email: "koba@gmail.com", phoneNumber: "543428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 68, firstName: "Eter", lastName: "Eteridze", email: "eter@gmail.com", phoneNumber: "654538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 69, firstName: "Gogi", lastName: "Gogidze", email: "gogi@gmail.com", phoneNumber: "765648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 70, firstName: "Rusudan", lastName: "Rusudandze", email: "rusudan@gmail.com", phoneNumber: "876758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 71, firstName: "Data", lastName: "Datadze", email: "data@gmail.com", phoneNumber: "987868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 72, firstName: "Keto", lastName: "Ketodze", email: "keto@gmail.com", phoneNumber: "108978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 73, firstName: "Tazo", lastName: "Tazoidze", email: "tazo@gmail.com", phoneNumber: "219088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 74, firstName: "Marina", lastName: "Marinadze", email: "marina@gmail.com", phoneNumber: "320198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 75, firstName: "Gober", lastName: "Goberidze", email: "gober@gmail.com", phoneNumber: "431208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 76, firstName: "Tika", lastName: "Tikadze", email: "tika@gmail.com", phoneNumber: "542318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 77, firstName: "Eldar", lastName: "Eldaridze", email: "eldar@gmail.com", phoneNumber: "653428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-06-30T12:00:00.000Z" },
    { id: 78, firstName: "Inga", lastName: "Ingadze", email: "inga@gmail.com", phoneNumber: "764538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 79, firstName: "Anri", lastName: "Anridze", email: "anri@gmail.com", phoneNumber: "875648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 80, firstName: "Tako", lastName: "Takoidze", email: "tako@gmail.com", phoneNumber: "986758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 81, firstName: "Tariel", lastName: "Tarielidze", email: "tariel@gmail.com", phoneNumber: "107868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 82, firstName: "Mzia", lastName: "Mziadze", email: "mzia@gmail.com", phoneNumber: "218978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 83, firstName: "Vakho", lastName: "Vakhoidze", email: "vakho@gmail.com", phoneNumber: "329088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 84, firstName: "Nino", lastName: "Ninoadze", email: "ninoa@gmail.com", phoneNumber: "430198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 85, firstName: "Rati", lastName: "Ratidze", email: "rati@gmail.com", phoneNumber: "541208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 86, firstName: "Medea", lastName: "Medeadze", email: "medeaa@gmail.com", phoneNumber: "652318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 87, firstName: "Sandro", lastName: "Sandrodze", email: "sandro@gmail.com", phoneNumber: "763428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 88, firstName: "Tekla", lastName: "Tekladze", email: "tekla@gmail.com", phoneNumber: "874538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 89, firstName: "Bondo", lastName: "Bondodze", email: "bondo@gmail.com", phoneNumber: "985648", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 90, firstName: "Qeti", lastName: "Qetidze", email: "qeti@gmail.com", phoneNumber: "106758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 91, firstName: "Gigi", lastName: "Gigidze", email: "gigi@gmail.com", phoneNumber: "217868", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 92, firstName: "Nutsa", lastName: "Nutsadze", email: "nutsa@gmail.com", phoneNumber: "328978", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 93, firstName: "Ilia", lastName: "Iliadze", email: "ilia@gmail.com", phoneNumber: "439088", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 94, firstName: "Pikria", lastName: "Pikriadze", email: "pikria@gmail.com", phoneNumber: "540198", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 95, firstName: "Valeri", lastName: "Valeridze", email: "valeri@gmail.com", phoneNumber: "651208", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 96, firstName: "Dali", lastName: "Dalidze", email: "dali@gmail.com", phoneNumber: "762318", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 97, firstName: "Gogi", lastName: "Gogiasvili", email: "gogiasvili@gmail.com", phoneNumber: "873428", gender: "m", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 98, firstName: "Nana", lastName: "Nanadze", email: "nana@gmail.com", phoneNumber: "984538", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" },
    { id: 99, firstName: "Zaza", lastName: "Zazadze", email: "zaza@gmail.com", phoneNumber: "105648", gender: "m", subscriptionStartDate: "2026-03-30T12:00:00.000Z", subscriptionEndDate: "2026-09-30T12:00:00.000Z" },
    { id: 100, firstName: "Ekaterine", lastName: "Ekaterinedze", email: "ekaterine@gmail.com", phoneNumber: "216758", gender: "f", subscriptionStartDate: "2026-07-30T12:00:00.000Z", subscriptionEndDate: "2026-08-30T12:00:00.000Z" }
]

    upgradeSubscription(email: string){
        if(!email){
            throw new BadRequestException("Email is required")
        }

        const user = this.findByEmail(email)
        if(!user){
            throw new UnauthorizedException("Unauthorized")
        }

        const now = new Date()
        const hasSubscription = new Date(user.subscriptionEndDate) > now 
        
        const targetDate = hasSubscription ? new Date(user.subscriptionEndDate) : new Date()

        targetDate.setMonth(targetDate.getMonth() + 1)

        user.subscriptionEndDate = targetDate.toISOString()

        return {message: "Subscription upgraded successfully", updatedDate: user.subscriptionEndDate}
    }

    findByEmail(email: string): IUser | undefined{
        return this.userList.find((u) => u.email === email)
    }

    getAllUser({page, take, gender, email}: UserQueryDto): IUser[] {

        const filteredUserList = this.userList.filter((user) => {
            if(!gender && !email){
                return true
            }

            const correctGender = gender ? user.gender === gender : true
            const correctEmail = email ? user.email.toLowerCase().startsWith(email.toLowerCase()) : true

            return correctGender && correctEmail
        })

        const start = (page - 1) * take
        const stop = page * take
        return filteredUserList.slice(start, stop)
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

        const startingDate = new Date()
        const endingDate = new Date(startingDate)

        endingDate.setMonth(endingDate.getMonth() + 1)

        const newUser = {
            id: lastId + 1,
            ...createUserDto,
            subscriptionStartDate: startingDate.toISOString(),
            subscriptionEndDate: endingDate.toISOString()
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