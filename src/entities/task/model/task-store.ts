import { makeAutoObservable, runInAction } from "mobx";
import { QueryParams, Todo } from "../../../shared/api/todos/model";
import { getTodo, getById, updateTodo } from "../../../shared/api/todos";

class TaskStore {
    taskList: Todo[] = [];
    task?: Todo;
    isLoading = false;
    taskListError = "";
    taskError = "";
    isUpdateLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    getTaskList = async (params: QueryParams) => {
        try {
            this.isLoading = true;
            const data = await getTodo(params);
            runInAction(() => {
                this.isLoading = false;
                this.taskList = data;
            });
        } catch (err: Error | any) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.taskListError = err.message;
                });
            }
        }
    }

    getTask = async (id: string | number) => {
        try {
            this.isLoading = true;
            const data = await getById(id);
            runInAction(() => {
                this.isLoading = false;
                this.task = data;
            });
        } catch (err: Error | any) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.taskError = err.message;
                });
            }
        }
    }

    updateTodo = async (todo: Todo) => {
        try {
            this.isUpdateLoading = true;
            await updateTodo(todo);
            runInAction(() => {
                this.isUpdateLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.isUpdateLoading = false;
            });
            throw e;
        }
    }
}

export const store = new TaskStore();
