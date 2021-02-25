let boards = [
    {
        id: 0,
        title: '유튜브',
        content: '안녕하세요 유튜브 게시글 입니다.',
        author: '홍길동',
        createdAt: '2021-02-25: 04:50:34',
        updatedAt: '2021-02-25: 04:56:34',
    },
    {
        id: 1,
        title: '제목',
        content: '게시글',
        author: '작성자',
        createdAt: '2021-02-25: 09:50:34',
        updatedAt: '2021-02-25: 10:50:34',
    },
];

const setBoards = (newBoards) => {
    boards = newBoards;
};

const getBoardsCount = () => {
    return boards[boards.length - 1].id + 1;
};

const addBoard = (board) => {
    boards.push(board);
};

export { boards, setBoards, getBoardsCount, addBoard };
export default { boards, setBoards, getBoardsCount, addBoard };
