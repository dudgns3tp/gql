let users = [
    {
        id: 0,
        name: '홍길동',
    },
    {
        id: 1,
        name: '최영훈',
    },
    {
        id: 2,
        name: '엄민식',
    },
];

const setUser = (newUser) => {
    users = newUser;
};

const getUsersCount = () => {
    return users[users.length - 1].id + 1;
};

const pushUser = (user) => {
    users.push(user);
};

export { users, setUser, getUsersCount, pushUser };
export default { users, setUser, getUsersCount, pushUser };
