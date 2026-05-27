import { ZodError } from 'zod';

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return Response.json(
      {
        error: 'Validation failed',
        details: error.issues,
      },
      { status: 400 },
    );
  }

  if (
    error instanceof Error &&
    'status' in error &&
    typeof error.status === 'number'
  ) {
    return Response.json(
      { error: error.message },
      { status: error.status },
    );
  }

  return Response.json(
    { error: 'Internal server error' },
    { status: 500 },
  );
}