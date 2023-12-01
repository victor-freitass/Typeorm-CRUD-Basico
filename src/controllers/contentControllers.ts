import { Router, Request, Response } from 'express'
import contentRepository from '../repositories/contentRepository'
import { Content } from '../entities/Content'
import { existsOrError } from '../../config/validators'

const contentRoutes: Router = Router()

contentRoutes.get('/', async (req: Request, res: Response) => {
    const contents: Content[] = await contentRepository.get()
    res.json(contents)
})

contentRoutes.get('/:id', async (req: Request, res: Response) => {
    const content: Content = await contentRepository.getById(Number.parseInt(req.params.id))
    res.json(content || `No content id ${req.params.id}`)
})

function saveAndUpdate(content: Content, res: Response) {
    try {
        existsOrError(content.content, "Informe o conteúdo")
        existsOrError(content.imageUrl, "Informe a url da imagem")
        existsOrError(content.name, "Informe o nome da imagem")

    } catch(msg) {
        return res.status(400).send(msg)
    }

    contentRepository.save(content) //content as Content
    res.status(204).send()
}

contentRoutes.post('/', (req: Request, res: Response) => {
    saveAndUpdate(req.body as Content, res)
})

contentRoutes.put('/:id', (req: Request, res: Response) => {
    const content: Content = {...req.body, id: Number.parseInt(req.params.id)}
    saveAndUpdate(content as Content, res)
})

contentRoutes.delete('/:id', async (req: Request, res: Response) => {
    const contentFromDB: Content | null = await contentRepository.getById(Number.parseInt(req.params.id))
    try {
        existsOrError(contentFromDB, 'O conteúdo não existe')
    } catch (msg) {
        return res.status(400).send(msg)
    }
    contentRepository.del(contentFromDB)
    res.status(204).send()
})  

export default contentRoutes