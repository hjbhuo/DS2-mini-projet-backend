import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/user.entity';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode pour créer un nouvel utilisateur
  async register(dto: RegisterDto) {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Créer l'utilisateur
    const user = this.userRepository.create({
      username: dto.username,        // correspond à la colonne username
      email: dto.email,
      password: hashedPassword,
      role: dto.role as UserRole,    // ENUM
    });

    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
    };
  }

  // Méthode pour l'authentification (login)
  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générer un JWT
    const payload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  // Méthode optionnelle pour vérifier le profil de l'utilisateur
  async getProfile(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }
}
