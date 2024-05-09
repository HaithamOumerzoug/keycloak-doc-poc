import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './models/user';

@Injectable()
export class UserService {
  private users: User[] = []; // Our Datasource

  /**
   * Create new User
   */
  createUser(payload: User): User {
    // Genrate unique id for the new user
    payload.id = this.getMaxUsersId() + 1;
    this.users.push(payload);
    return payload;
  }

  /**
   * Update User
   */
  updateUser(payload: User): User {
    const userIndex = this.users.findIndex((user) => user.id === payload.id);
    if (userIndex !== -1) {
      this.users[userIndex] = payload;
    } else {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }
    return payload;
  }

  /**
   * Delete User
   */
  deleteUser(id: number): number {
    this.users = this.users.filter((user) => user.id === id);
    return id;
  }

  /**
   * Get all Users
   */
  finAllUsers(): User[] {
    return this.users;
  }

  /**
   * Get max users id
   */
  private getMaxUsersId(): number {
    let max = 0;
    for (const user of this.users) {
      if (user.id > max) {
        max = user.id;
      }
    }
    return max;
  }
}
