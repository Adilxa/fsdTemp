import { httpClient } from "../http-client";
import { QueryParams, Todo } from "./model";

const SLUG = "todos"

export const getTodo = (params: QueryParams): Promise<Todo[]> => {
    return httpClient.get(SLUG, { searchParams: params }).json<Todo[]>()
}

export const getById = (id: number | string): Promise<Todo> => {
    return httpClient.get(`${SLUG}/${id}`).json<Todo>()
}

export const updateTodo = (todo: Todo): Promise<Todo> => {
    return httpClient.put(`${SLUG}/${todo.id}`, { json: todo }).json<Todo>()
}
