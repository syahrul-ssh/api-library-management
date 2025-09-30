import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/utils/base/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  LIBRARIAN = 'librarian',
  MEMBER = 'member',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  address?: string;
}