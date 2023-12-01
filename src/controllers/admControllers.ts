import { Router } from "express"
import admRepository from "../repositories/admRepository"
import { Request, Response } from "express"
import { existsOrError, equalsOrError } from "../../config/validators"
import { Adm } from "../entities/Adm"
import IAdm from "../interfaces/IAdm"

const admRoutes: Router = Router() 

admRoutes.get('/', async (req: Request, res: Response) => {
    const admins = await admRepository.get()
    res.json(admins)
})

admRoutes.get('/:id', async (req: Request, res: Response) => {
    const admFromDB = await admRepository.getById(Number.parseInt(req.params.id))
    delete admFromDB.password
    try {
        existsOrError(admFromDB, 'O adm não existe')
    }catch(msg){
        return res.status(400).send(msg)
    }
    res.json(admFromDB)
})

admRoutes.put('/:id', async (req: Request, res: Response) => { 
    const admFromDB: Adm = await admRepository.getById(Number.parseInt(req.params.id))
    try {
        existsOrError(admFromDB, 'O adm não existe')
        existsOrError(req.body.email, "Informe o novo Email / Email atual")
        existsOrError(req.body.password, "Informa a nova Senha / Senha atual")
    } catch (msg) {
        return res.status(400).send(msg)
    }
    const newAdm: Adm = {...req.body, id: admFromDB.id}
    admRepository.put(newAdm)
    res.status(204).send()
})

admRoutes.post('/', (req:Request, res: Response) => {
    const adm: IAdm = req.body
    try {
        existsOrError(adm.email, "Insira o email")
        existsOrError(adm.password, "Insira a senha")
        existsOrError(adm.confirmPassword, "Insira a confirmação de senha")
        equalsOrError(adm.confirmPassword, adm.password, "Senhas não conferem")
    } catch (msg) {
        return res.status(400).send(msg)
    }

    delete adm.confirmPassword

    admRepository.post(adm)
    res.status(204).send()
})

admRoutes.delete('/:id', async (req: Request, res:Response) => {
    const admFromDB: Adm = await admRepository.getById(Number.parseInt(req.params.id))

    try {
        existsOrError(admFromDB, 'Adm não existe')
        existsOrError(req.body.password, 'Deve inserir a senha do Adm para poder apagar seu cadastro.')
        equalsOrError(admFromDB.password, req.body.password, 'Digite a senha correta.')
    } catch (msg) {
        return res.status(400).send(msg)
    }

    admRepository.del(admFromDB)
    res.send('Administrador deletado com sucesso.')
})

export default admRoutes