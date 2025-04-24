export interface LoginDTO {
    email: string;
    password: string;
  }

export interface RegisterDTO {
    email: string;
    password: string;
    username: string;
};

export interface UserResponseDTO {
    id: string;
    username: string;
    email: string;
};

export interface LoginResponseDTO {
    user: UserResponseDTO;
    token: string;
};
