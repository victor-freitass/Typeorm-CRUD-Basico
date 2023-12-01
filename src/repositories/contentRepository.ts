import { AppDataSource } from "../database/data-source";
import { Content } from "../entities/Content";

const contentRepository = AppDataSource.getRepository(Content)

const get = ():Promise<Content[]> => {
    return contentRepository.find()
}

const getById = async (id: number): Promise<Content> => {
    return contentRepository.findOne({where: {id: id}})
}

const save = (content: Content):void => {
    contentRepository.save(content)
}   

const del = (content: Content):void => {
    contentRepository.remove(content)
}

export default { getById, get, save, del }