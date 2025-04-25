export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface UserResponseDTO {
    id: string;
    username: string;
    email: string;
}
  
export interface LoginResponseDTO {
    user: UserResponseDTO;
    token: string;
}

export interface CreateTodoDTO {
    label: string;
}

export interface UpdateTodoDTO {
    label?: string;
    checked?: boolean;
}
  
export interface TodoItemResponseDTO {
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