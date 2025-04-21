import { AppDataSource } from "../config/data-source";
import { Todo } from "../entities/Todo";
import { ApiError } from "../errors/ApiError";
import { CreateTodoDTO, TodoListResponseDTO, TodoResponseDTO, UpdateTodoDTO } from "../types/TodoDTO";
import UserService from "./UserService";

class TodoService {
    private todoRepository = AppDataSource.getRepository(Todo);

    async createTodo(userId: number, label: string): Promise<Todo> {
        const todo = new Todo();
        const user = await UserService.findById(userId);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        todo.label = label;
        todo.user = user;
        return await this.todoRepository.save(todo);
    }

    findByUserId(userId: number): Promise<Todo[]> {
        return this.todoRepository.find({ where: { user: { id: userId } } });
    }

    findById(id: number): Promise<Todo | null> {
        return this.todoRepository.findOneBy({ id });
    }

    private toTodoDTO(todo: Todo): TodoResponseDTO {
        return {
            id: todo.id,
            label: todo.label,
            checked: todo.checked,
            timestamp: new Date(todo.timestamp).getTime(),
        };
    }

    async addTodo(data: CreateTodoDTO, userId: number): Promise<TodoResponseDTO> {
        const todo = await this.createTodo(userId, data.label);

        return this.toTodoDTO(todo);
    }

    async updateTodo(id: number, data: UpdateTodoDTO): Promise<TodoResponseDTO> {
        const todo = await this.findById(id);

        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        todo.label = data.label || todo.label;
        if (typeof data.checked === 'boolean') todo.checked = data.checked;
        await this.todoRepository.save(todo);

        return this.toTodoDTO(todo);
    }

    async deleteTodo(id: number): Promise<void> {
        const todo = await this.findById(id);

        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        await this.todoRepository.remove(todo);
    }

    async getOneTodo(id: number): Promise<TodoResponseDTO> {
        return this.findById(id).then((todo) => {
            if (!todo) {
                throw new ApiError(404, 'Todo not found');
            }
            return this.toTodoDTO(todo);
        });
    }

    async findPaginatedByUserId(userId: number, limit: number, offset: number): Promise<TodoListResponseDTO> {
        const [todos, total] = await this.todoRepository.findAndCount({
            where: { user: { id: userId } },
            take: limit,
            skip: offset,
            order: { timestamp: 'DESC' },
        });
    
        return {
            todos: todos.map(todo => this.toTodoDTO(todo)),
            userId,
            total,
            page: Math.floor(offset / limit) + 1,
            limit,
        };
    }
}

export default new TodoService();