import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import { RegisterDTO, UserResponseDTO, LoginDTO } from '../types/UserDTO';
import { ApiError } from '../errors/ApiError';

class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(email: string, username: string, password: string): Promise<User> {
    const user = this.userRepository.create({
      email,
      username,
      password,
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async isValidUserId(id: number): Promise<boolean> {
    const user = await this.findById(id);

    return !!user;
  }

  async registerUser(data: RegisterDTO): Promise<UserResponseDTO> {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) {
      throw new ApiError(409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.createUser(data.email, data.username, hashedPassword);

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  async loginUser(data: LoginDTO): Promise<UserResponseDTO> {
    const user = await this.findByEmail(data.email);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  };

  async getUserData(id: number): Promise<UserResponseDTO> {
    const user = await this.findById(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}

export default new UserService();