import { User } from './User';

export interface UserRelation {
  userRelationId: number;
  userId: number;
  follower: User;
  followedBack: boolean;
}
