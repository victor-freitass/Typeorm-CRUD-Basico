interface IUser {
    id?: number,
    name: string,
    email: string,
    password: string,
    confirmPassword?: string 
}

export default IUser