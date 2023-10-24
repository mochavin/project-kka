const levels = [
  {
    id: 1,
    name: "Level 1",
    board: [
      [1, 1, 1, 8, 1, 8, 9, 8],
      [1, 8, 1, 8, 1, 8, 1, 1],
      [8, 8, 8, 8, 8, 8, 8, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 8, 8, 8, 8, 8, 8, 8],
      [1, 8, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    activeBoard: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
  },
  {
    id: 2,
    name: "Level 2",
    board: [
      [1, 1, 1, 8, 1, 8, 1, 8],
      [1, 8, 1, 8, 1, 8, 1, 9],
      [8, 8, 8, 8, 8, 8, 8, 1],
      [1, 1, 1, 9, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 8, 8, 8, 8, 8, 8, 8],
      [1, 8, 1, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    activeBoard: [
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
      [8, 8, 8, 1, 8, 8, 8, 8],
      [8, 8, 8, 8, 8, 8, 1, 8],
      [8, 8, 8, 8, 8, 8, 8, 8],
    ]
  }
];

export default levels;
