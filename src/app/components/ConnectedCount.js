export default function Connected({ connectedColor, level, levels, board }) {
  const arr = ['white', 'red', 'green', 'blue', 'orange', 'orange', 'purple'];
  // declare set of color

  const arrColor = [0, 0, 0];
  for (let i = 0; i < levels[level].colorCount; i++) {
    arrColor[i] = 2;
  }
  const visited = [...board.map((row) => [...row].fill(false))];
  const queue = [];
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 2 || board[i][j] == 3 || board[i][j] == 4) {
        if (!visited[i][j]) {
          queue.push([i, j]);
          visited[i][j] = true;
          arrColor[board[i][j] - 2]--; // -2 karena index array dimulai dari 0, sedangkan type dimulai dari 2
        }
        while (queue.length > 0) {
          const [x, y] = queue.shift();
          for (let k = 0; k < 4; k++) {
            const nx = x + dx[k];
            const ny = y + dy[k];
            if (
              nx >= 0 &&
              nx < board.length &&
              ny >= 0 &&
              ny < board[0].length &&
              !visited[nx][ny] &&
              board[nx][ny] == board[i][j]
            ) {
              queue.push([nx, ny]);
              visited[nx][ny] = true;
            }
          }
        }
      }
    }
  }

  console.log(`arrColor: ${arrColor}`);

  return (
    <div className='flex-row'>
      <h4 className='font-bold flex gap-2'>
        {/* Connected: {connectedColor} / {levels[level].colorCount} */}
        {arrColor.map((color, index) => (
          <span
            key={index}
            className={`ml-2  ${
              levels[level].colorCount < index + 1 ? 'hidden' : 'border-0'
            }`}
          >
            <span
              className={`flex w-4 h-4 rounded-full`}
              style={{ backgroundColor: arr[index + 2] }}
            ></span>
            <span className='ml-1 text-center'>{color == 2? '1' : '0'}</span>
          </span>
        ))}
      </h4>
    </div>
  );
}
