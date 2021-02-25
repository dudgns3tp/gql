const boards = [
  {
    id: 0,
    title: '유튜브',
  },
  {
    id: 1,
    title: '제목',
  },
  {
    id: 3,
    title: 'test',
  },
];

let deleted = boards.filter((item) => item.id == 1)[0];

console.log(deleted);
