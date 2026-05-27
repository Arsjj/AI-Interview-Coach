export class UnauthorizedError extends Error {
  status = 401;

  constructor() {
    super("Unauthorized");
  }
}

export class ForbiddenError extends Error {
  status = 403;

  constructor() {
    super("Forbidden");
  }
}
