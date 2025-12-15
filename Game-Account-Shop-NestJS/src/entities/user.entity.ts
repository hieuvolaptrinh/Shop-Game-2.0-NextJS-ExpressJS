import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { RequestDepositEntity } from './request-deposit.entity';

/**

 */
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  money: number;

  @Column({ type: 'enum', enum: ['USER', 'ADMIN'], default: 'USER' })
  role: 'USER' | 'ADMIN';

  // Lưu refresh token đã hash để validate khi user refresh
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Quan hệ One-to-Many: 1 user có nhiều orders
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  // Quan hệ One-to-Many: 1 user có nhiều request deposits
  @OneToMany(() => RequestDepositEntity, (request) => request.user)
  requestDeposits: RequestDepositEntity[];
}
