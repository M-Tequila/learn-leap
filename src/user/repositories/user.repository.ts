import User, { IUser } from '../schema/user';

export default class UserRepository {
  public async getAllUsers(): Promise<IUser[]> {
    return User.find().exec();
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }

  public async addUser(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return newUser.save();
  }

  public async updateUser(user: IUser): Promise<IUser | null> {
    return User.findByIdAndUpdate(user._id, user, { new: true }).exec();
  }

  public async deleteUser(id: string): Promise<void> {
    await User.findByIdAndDelete(id).exec();
  }
}
