import uuidV4 from 'uuid/v4';
import { hashPassword } from '../utils';

const User = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      id: uuidV4(),
      email: 'user@gmail.com',
      password: hashPassword('user2020#'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      email: 'user1@gmail.com',
      password: hashPassword('user2020#'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      email: 'user2@gmail.com',
      password: hashPassword('user2020#'),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidV4(),
      email: 'user3@gmail.com',
      password: hashPassword('user2020#'),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};

export default User;
