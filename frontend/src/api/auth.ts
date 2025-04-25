import { LoginDTO, LoginResponseDTO, RegisterDTO } from "../types/api";
import api from "./api";

export const login = async ({email, password}: LoginDTO): Promise<LoginResponseDTO> => {
    localStorage.removeItem("token");
    const { data } = await api.post("/users", { email, password });
    return data;
};

export const register = async ({username, email, password}: RegisterDTO): Promise<LoginResponseDTO> => {
    localStorage.removeItem("token");
    const { data } = await api.post("/users/register", { username, email, password });
    return data;
};

export const refreshToken = async (): Promise<LoginResponseDTO> => {
    const { data } = await api.get("/users");
    return data;
};