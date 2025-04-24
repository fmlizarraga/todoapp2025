export interface CreateTodoDTO {
    label: string;
}

export interface UpdateTodoDTO {
    label?: string;
    checked?: boolean;
}

export interface TodoResponseDTO {
    id: string;
    label: string;
    checked: boolean;
    timestamp: number;
}

export interface TodoListResponseDTO {
    todos: TodoResponseDTO[];
    userId: string;
    total?: number;
    page?: number;
    limit?: number;
}