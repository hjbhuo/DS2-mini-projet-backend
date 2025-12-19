import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Intervention } from '../interventions/intervention.entity';

export enum DeviceStatus {
  PENDING = 'PENDING',
  REPAIRING = 'REPAIRING',
  READY = 'READY',
}

export enum DeviceGrade {
  A = 'A',
  B = 'B',
  C = 'C',
  NONE = 'NONE',
}

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({
    type: 'enum',
    enum: DeviceStatus,
    default: DeviceStatus.PENDING,
  })
  status: DeviceStatus;

  @Column({
    type: 'enum',
    enum: DeviceGrade,
    default: DeviceGrade.NONE,
  })
  grade: DeviceGrade;

  @OneToMany(() => Intervention, (intervention) => intervention.device)
  interventions: Intervention[];
}