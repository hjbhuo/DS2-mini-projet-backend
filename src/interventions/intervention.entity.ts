import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/user.entity';
import { Device } from '../devices/device.entity';
import { SparePart } from '../parts/part.entity';

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => Device, (device) => device.interventions)
  device: Device;

  @ManyToOne(() => User, (user) => user.interventions)
  technician: User;

  @ManyToMany(() => SparePart)
  @JoinTable()
  spareParts: SparePart[];
}
