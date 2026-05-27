export function success<T>(data: T, status = 200) {
  return Response.json(data, { status });
}

export function created<T>(data: T) {
  return Response.json(data, { status: 201 });
}
