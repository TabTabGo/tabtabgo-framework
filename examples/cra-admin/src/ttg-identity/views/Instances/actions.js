import EntityAction from '@tabtabgo/web/Entity/Actions';
import EntityActionTypes from '@tabtabgo/web/Entity/ActionTypes';
import InstancesService from './service';

export const InstancesActionTypes = { ...EntityActionTypes('instances', 'instance') };

class InstancesCreator extends EntityAction {
  constructor() {
    super(new InstancesService());
  }
}

export const InstancesActions = new InstancesCreator();
