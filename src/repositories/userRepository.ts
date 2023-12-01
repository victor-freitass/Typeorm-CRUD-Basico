import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import IUser from '../interfaces/IUser'

const userRepository = AppDataSource.getRepository(User)

const get = (): Promise<User[]> => {
    return userRepository.find()     
}

const getById = async (idReq: number): Promise<IUser> => { 
    return userRepository.findOne({where: {id: idReq}})
} 

const put = (user:User):void => { 
    userRepository.save(user)
}

const del = (user: User) => {
    userRepository.remove(user)
}

const post = (user: IUser):void => { 
    userRepository.save(user) 
}

export default { get, put, del, post, getById }