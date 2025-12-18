import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import { RegisterDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const { email, username, password } = dto;

    const existing = await this.usersRepository.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email déjà utilisé');

    const hash = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      username,
      password: hash,
      role: UserRole.TECH, // par défaut TECH
    });

    return this.usersRepository.save(user);
  }

  
}
