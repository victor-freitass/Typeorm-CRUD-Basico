function existsOrError<T> (value: T, msg: string):void {   
    if (Array.isArray(value)) if (value.length === 0) throw msg
    if (!value) throw msg
}

function equalsOrError<T> (value1: T, value2: T, msg: string):void {
    if (value1 != value2) throw msg
}

export { existsOrError, equalsOrError }