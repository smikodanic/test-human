interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  country: string;

  phone: string;
  email: string;
  website: string;

  misc: any;

  username: string;
  password: string;

  roles: 'administrator' | 'educator' | 'student';
  is_active: boolean;
  jwt_token: string;
}

export { IUser };
