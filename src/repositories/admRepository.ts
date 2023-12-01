import { AppDataSource } from "../database/data-source";
import { Adm } from "../entities/Adm";
import IAdm from "../interfaces/IAdm"


const admRepository = AppDataSource.getRepository(Adm)

const get = () => admRepository.find()

const getByEmail = async (email:string) => {
    const adm = (await admRepository.findBy({email: email})).shift() 
    return adm
}

const getById = async (id: number) => {
    const admFromDB = await admRepository.findOne({where: {id: id}})
    return admFromDB
}

const put = (adm: Adm):void => {
    admRepository.save(adm)
}

const post = (adm: IAdm):void => {
    admRepository.save(adm)
}

const del = (adm: Adm):void => {
    admRepository.delete(adm)
}
 
export default { get, getByEmail, put, getById, post, del }