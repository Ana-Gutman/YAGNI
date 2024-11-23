export class MissingParameterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MissingParameterError";
    }
}

export class InvalidValueError extends Error {
    constructor(field: string, value: string, message?: string) {
        super(`El valor '${value}' para el campo ${field} no es válido porque ${message}`);
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

export class InsufficientStockError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InsufficientStockError";
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AuthenticationError";
    }
  }
  
  export class AuthorizationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "AuthorizationError";
    }
  }