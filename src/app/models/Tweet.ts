import { Account } from './Account';
import { Comment } from './Comment';

export interface Tweet {
  id: number;
  userId: number;
  nbOfLikes: number;
  nbOfComments: number;
  content: string;
  user?: Account;
  postedAt: Date;
  accountId: any;
  comments?: Comment[];
}
