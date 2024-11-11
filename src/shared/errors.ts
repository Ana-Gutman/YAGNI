export class MissingParameterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingParameterError";
    }
}

export class InvalidValueError extends Error {
    constructor(field: string, value: string) {
        super(`El valor '${value}' para el campo ${field} no es válido.`);
        this.name = "InvalidValueError";
    }
}

export class RequiredFieldError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RequiredFieldError";
    }
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

export class NotFoundError extends Error {
    constructor(resource: string) {
        super(`${resource} no encontrado.`);
        this.name = "NotFoundError";
    }
}

export class GeneralError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GeneralError";
    }
}
