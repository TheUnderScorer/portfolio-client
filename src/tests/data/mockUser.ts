import User from '../../types/graphql/User';

const mockUser: User & any = {
    id:         1,
    name:       'Greg',
    email:      '',
    role:       'user',
    lastLogin:  0,
    token:      {
        value:      'test',
        __typename: 'Token'
    },
    __typename: 'User'
};

export default mockUser;
