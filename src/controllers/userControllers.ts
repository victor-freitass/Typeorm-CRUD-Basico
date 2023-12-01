import { Router, Request, Response } from 'express'
import userRepository from '../repositories/userRepository'
import { existsOrError, equalsOrError } from '../../config/validators'
import { User } from '../entities/User'
import IUser from '../interfaces/IUser'

const userRoutes: Router = Router()

userRoutes.get('/', async (req: Request, res: Response) => { 
    const users = await userRepository.get()
    return res.json(users)
})

userRoutes.get('/:id', async (req: Request, res: Response) => {
    const userFromDB: IUser | null = await userRepository.getById(Number.parseInt(req.params.id))
    try {
        existsOrError(userFromDB, 'Usuário não encontrado!')
    } catch (msg) {
        return res.status(400).send(msg)
    }    
    res.json(userFromDB)
})

userRoutes.put('/:id', async (req: Request, res: Response) => { 
    const user:User = {...req.body, id: Number.parseInt(req.params.id)}
    const userFromDB = await userRepository.getById(Number.parseInt(req.params.id))
    try {
        existsOrError(userFromDB, 'Usuário não encontrado')
        equalsOrError(user.password, userFromDB.password, 'Senha incorreta')
    } catch (msg) {
        return res.status(400).send(msg)
    }
    userRepository.put(user) 
    res.send('<h1>Cadastro alterado com sucesso!<h1/>')
})

userRoutes.delete('/:id', async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id)
    const userFromDB = await userRepository.getById(id)
    try {
        existsOrError(userFromDB, 'Usuário não encontrado!')
    } catch (msg) {
        return res.status(400).send(msg)
    }
    userRepository.del(userFromDB as User)
    res.send(`Cadastro ${userFromDB.email} deletado.`)
})

userRoutes.post('/', async (req: Request, res: Response) => {
    const user = req.body
    try {
        existsOrError(user.name, 'Insira o nome do usuário')
        existsOrError(user.password, 'Insira a senha')
        existsOrError(user.confirmPassword, 'Insira a confirmação da senha')
        existsOrError(user.email, 'Insira o email do usuário')
        equalsOrError(user.password, user.confirmPassword, 'As senhas não conferem')

    } catch (mensgemError) {
        return res.status(400).send(mensgemError) 
    }

    userRepository.post(user)
    res.send(`Usuário ${user.email} cadastrado`)
})

export default userRoutes