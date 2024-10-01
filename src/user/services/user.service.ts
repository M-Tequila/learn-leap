import User, { IUser } from "../schema/user";

export default class UsersService {
  /**
   * name
   */
  public getUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById({
      _id: id,
    });
    // console.log(user?.email);

    return user;
  };
}
