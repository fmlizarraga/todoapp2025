export interface CreateTodoDTO {
    label: string;
}

export interface UpdateTodoDTO {
    label?: string;
    checked?: boolean;
}

export interface TodoResponseDTO {
    id: number;
    label: string;
    checked: boolean;
    timestamp: number;
}

export interface TodoListResponseDTO {
    todos: TodoResponseDTO[];
    userId: number;
    total?: number;
    page?: number;
    limit?: number;
}