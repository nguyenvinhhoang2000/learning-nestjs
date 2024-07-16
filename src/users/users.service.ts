import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUser: CreateUserDto) {
    const hashPassword = this.getHashPassword(createUser.password);
    const user = await this.userModel.create({
      email: createUser.email,
      password: hashPassword,
      name: createUser.name,
    });

    return user;
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    return this.userModel.findById(id);
  }

  async update(id: string, updateUser: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    const user = await this.userModel.findByIdAndUpdate(id, {
      ...updateUser,
    });

    return user;
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    return this.userModel.deleteOne({ _id: id });
  }
}
