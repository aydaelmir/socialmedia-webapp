export interface Account {
  accountId: string | null;
  userId: number | null;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: Number;
  avatar?: string;
  birthDate: Date;
  bio: string | null;
  creationDate: Date;
  isActivated: boolean;
  nbOfFollowers: number;
  nbOfFollowings: number;
}
