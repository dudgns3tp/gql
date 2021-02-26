import { users } from '../../db/userDB.js';

const resolver = {
    Query: {
        users: () => users,
    },
};

export default resolver;
