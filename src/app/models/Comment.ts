import { Account } from './Account';

export interface Comment {
  commentId: number;
  text: string;
  userId: number;
  tweetId: number;
  user?: Account;
}
