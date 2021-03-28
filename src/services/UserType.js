import model from '../models';
import AbstractClass from './AbstractClass';

const { UserType } = model;
/**
 * @class UserTpeServices
 * @extends {AbstractClass}
 */
class UserTypeServices extends AbstractClass {
  /**
   * initiate
   * @param {*} Usertype model
   */
  constructor() {
    super();
    this.DataModel = UserType;
  }
}

export default UserTypeServices;
