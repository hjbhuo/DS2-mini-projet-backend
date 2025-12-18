import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  TECH = 'TECH',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TECH })
  role: UserRole;

  @OneToMany(() => Intervention, (intervention) => intervention.technician)
  interventions: Intervention[];
}
