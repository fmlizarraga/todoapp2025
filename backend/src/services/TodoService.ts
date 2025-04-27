import { AppDataSource } from "../config/data-source";
import { Todo } from "../entities/Todo";
import { ApiError } from "../errors/ApiError";
import { CreateTodoDTO, TodoListResponseDTO, TodoResponseDTO, UpdateTodoDTO } from "../types/TodoDTO";
import UserService from "./UserService";

class TodoService {
    private todoRepository = AppDataSource.getRepository(Todo);
    
    private toTodoDTO(todo: Todo): TodoResponseDTO {
        return {
            id: todo.uuid,
            label: todo.label,
            checked: todo.checked,
            timestamp: todo.timestamp.getTime(),
        };
    }

    private enforceOwnership(todo: Todo, userId: string): void {
        if (todo.user.uuid !== userId) {
            throw new ApiError(403, 'You are not authorized to access this resource');
        }
    }

    async createTodoEntity(userId: string, label: string): Promise<Todo> {
        const todo = new Todo();
        const user = await UserService.findByUuid(userId);

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        todo.label = label;
        todo.user = user;
        return await this.todoRepository.save(todo);
    }

    findByUserId(userId: string): Promise<Todo[]> {
        return this.todoRepository.find({ where: { user: { uuid: userId } } });
    }

    findById(id: number): Promise<Todo | null> {
        return this.todoRepository.findOneBy({ id });
    }

    findByUuid(uuid: string): Promise<Todo | null> {
        return this.todoRepository.findOne({
            where: { uuid },
            relations: { user: true },
        });
    }

    async addTodo(data: CreateTodoDTO, userId: string): Promise<TodoResponseDTO> {
        const todo = await this.createTodoEntity(userId, data.label);

        return this.toTodoDTO(todo);
    }

    async updateTodo(id: string, userId: string, data: UpdateTodoDTO): Promise<TodoResponseDTO> {
        const todo = await this.findByUuid(id);

        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        this.enforceOwnership(todo, userId);

        todo.label = data.label ?? todo.label;
        if (typeof data.checked === 'boolean') todo.checked = data.checked;
        await this.todoRepository.save(todo);

        return this.toTodoDTO(todo);
    }

    async deleteTodo(id: string, userId: string): Promise<void> {
        const todo = await this.findByUuid(id);

        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        this.enforceOwnership(todo, userId);

        await this.todoRepository.remove(todo);
    }

    async getOneTodo(id: string, userId: string): Promise<TodoResponseDTO> {
        const todo = await this.findByUuid(id);

        if (!todo) {
            throw new ApiError(404, 'Todo not found');
        }

        this.enforceOwnership(todo, userId);

        return this.toTodoDTO(todo);
    }

    async findPaginatedByUserId(userId: string, limit: number, offset: number): Promise<TodoListResponseDTO> {
        const [todos, total] = await this.todoRepository.findAndCount({
            where: { user: { uuid: userId } },
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

    async addAndFetchTodo(
        data: CreateTodoDTO,
        userId: string,
        limit: number,
        offset: number
    ): Promise<TodoListResponseDTO> {
        await this.createTodoEntity(userId, data.label);
        return this.findPaginatedByUserId(userId, limit, offset);
    }
}

export default new TodoService();