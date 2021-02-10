import EntityAction from '@tabtabgo/web/Entity/Actions';
import EntityActionTypes from '@tabtabgo/web/Entity/ActionTypes';
import UsersService from './service';

export const UsersActionTypes = { ...EntityActionTypes('users', 'user') };

export default class UsersCreator extends EntityAction {
  constructor() {
    super(new UsersService());
  }
}
