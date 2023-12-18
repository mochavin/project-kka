'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import levels from '../../utils/levels';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../../utils/toast';
import { ArrowsLeftCurved, ControlsClose } from '@heathmont/moon-icons-tw';
import ConnectedCount from '../../components/ConnectedCount';
import Modal from '../../components/Modal';
import { useParams, useRouter } from 'next/navigation';
import ImagesAssets from '@/app/components/ImagesAssets';
import { renderAsset } from '@/app/utils/function';
import axios from 'axios';
export default function Home() {
  let hitungAssets = [0, 0, 0, 0,0];
  const params = useParams();
  const [board, setBoard] = useState([
    ...levels[params.slug - 1].board.map((row) => [...row]),
  ]);
  const [level, setLevel] = useState(params.slug - 1);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastStep, setLastStep] = useState([]);
  const [connectedColor, setConnectedColor] = useState(0);
  const [trackBoard, setTrackBoard] = useState([]); // untuk undo
  const [renderLater, setRenderLater] = useState(false);
  const [score,setScore]=useState()
  const Router = useRouter();
// 0 : white tile (path)
// 1 : red tile (obstacle)
// 2-6: shop and warehouse nodes
// 2 : green tile
// 3 : blue tile
// 4 : yellow tile
// 5 : purple tile
// 6 : gray tile


// get the data from the python api using axios
  async function getScore(data) {
    try {
      let res = await axios.post('http://rororyo.pythonanywhere.com/find_shortest_path', data);
      
      setScore(res.data.min_moves_taken) 
    } catch (error) {

      console.error('Error:', error);
      throw error; 
    }
  }
  //changes when entering new level
  useEffect(() => {
    setLevel(params.slug - 1);
    setBoard([...levels[params.slug - 1].board.map((row) => [...row])]);
    setTrackBoard([]);
    setLastStep([]);
    setConnectedColor(0);
    setRenderLater(true);
    let data = {
      'colorCount': levels[params.slug - 1].colorCount,
      'board': levels[params.slug - 1].board
    };
  
getScore(data)
  }, [params.slug]);
  

 
  //check if the clicked nodes have neighbor that's already colored
  const isNeighbor = (indexRow, indexCol, baris, type) => {
    return (
      (indexCol - 1 >= 0 && baris[indexCol - 1] == type) ||
      (indexCol + 1 < baris.length && baris[indexCol + 1] == type) ||
      (board[indexRow - 1] && board[indexRow - 1][indexCol] == type) ||
      (board[indexRow + 1] && board[indexRow + 1][indexCol] == type)
    );
  };

  const isWin = () => {
    //5 elements because 5 color
    const arr = [0, 0, 0, 0, 0];
    const visited = [...board.map((row) => [...row].fill(false))];
    const queue = [];
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 2 || board[i][j] == 3 || board[i][j] == 4 || board[i][j] == 5|| board[i][j] == 6) {
          if (!visited[i][j]) {
            queue.push([i, j]);
            visited[i][j] = true;
            arr[board[i][j] - 2]++; // -2 karena index array dimulai dari 0, sedangkan type dimulai dari 2
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

    // dark the connected color
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == 1) {
        const newBoard = [...board];
        for (let j = 0; j < newBoard.length; j++) {
          for (let k = 0; k < newBoard[j].length; k++) {
            if (newBoard[j][k] == i + 2) newBoard[j][k] *= -1;
          }
        }
        showToast('Connected!', 'success');
        setBoard(newBoard);
      }
    }

    // count connected color
    let count = 0;
    for (let i = 0; i < levels[level].colorCount; i++) {
      if (arr[i] <= 1) count++;
    }
    setConnectedColor(count);

    // check if win
    if (!(arr[0] <= 1 && arr[1] <= 1 && arr[2] <= 1 && arr[3] <= 1 &&arr[4] <= 1)) {
     
      return;
    }

    // next level
    if (level == levels.length - 1) {
      showToast('Score:'+Math.round((score/lastStep.length)*100)+'/100','info')
      showToast('You Win!', 'info');
      return;
    }
    //Display score
    setTimeout(() => {
    showToast('Score:'+Math.round((score/lastStep.length)*100)+'/100','info')
  }, 2000);
    setTimeout(() => {
    showToast('Level Up!', 'info')
    Router.push(`/level/${((level + 1) % levels.length) + 1}`); 
  }, 4000);
    
  };

  useEffect(() => {
    isWin();
  }, [lastStep]);
//function to change the board
  const changeBoard = (indexRow, indexCol, type) => {
    const newBoard = [...board];
    newBoard[indexRow][indexCol] = type;
    setBoard(newBoard);
    setTrackBoard([...trackBoard, [...newBoard.map((row) => [...row])]]);
  };

  const handleDrag = (indexRow, indexCol, baris) => {
    if (isMouseDown) handleClick(indexRow, indexCol, baris);
  };

  const handleClick = (indexRow, indexCol, baris) => {
    setIsMouseDown(true);

    // handle out of bound
    if (indexRow < 0 || indexRow >= board.length) {
      return;
    }

    // handle red
    if (board[indexRow][indexCol] == 1) {
      if (!isMouseDown) showToast('Invalid move!', 'error');
      return;
    }

    // handle white
    if (board[indexRow][indexCol] == 0) {
      // handle invalid click
      if (
        !isNeighbor(indexRow, indexCol, baris, 2) &&
        !isNeighbor(indexRow, indexCol, baris, 3) &&
        !isNeighbor(indexRow, indexCol, baris, 4) &&
        !isNeighbor(indexRow, indexCol, baris, 5) &&
        !isNeighbor(indexRow, indexCol, baris, 6)
      ) {
        if (!isMouseDown) showToast('Invalid move!', 'error');
        return;
      }

      for (let type = 2; type <= 6; type++) {
        if (isNeighbor(indexRow, indexCol, baris, type)) {
          changeBoard(indexRow, indexCol, type);
          setLastStep([...lastStep, { indexRow, indexCol, type }]);
          return true;
        }
      }

      return;
    }
  };

  //undo
  const handleUndo = () => {
    if (lastStep.length == 0) return;
    setLastStep([...lastStep.slice(0, -1)]);
    setTrackBoard([...trackBoard.slice(0, -1)]);
    let lastBoard;
    if (trackBoard.length == 1) {
      lastBoard = [...levels[level].board.map((row) => [...row])];
    } else {
      lastBoard = trackBoard[trackBoard.length - 2];
    }
    setBoard([...lastBoard.map((row) => [...row])]);
  };
//render page
  return (
    <>
      <ToastContainer />
      <div className='flex flex-col items-center my-3 justify-center gap-4 fixed w-screen'>
        <div className='flex flex-col text-center'>
          <div>Level: {(level % levels.length) + 1}</div>
          <div>Banyak Langkah: {lastStep.length}</div>
        </div>
        <div className='relative inline-block text-left'>
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type='button'
              className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100'
            >
              Level: {(level % levels.length) + 1}
              <svg
                className='-mr-1 ml-2 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M14.293 7.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 0z'
                />
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className='origin-top-right absolute right-0 mt-2 w-full cursor-pointer rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20'>
              <div
                className='py-1'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                {levels.map((item, index) => {
                  return (
                    <a
                      onClick={() => {
                        Router.push(`/level/${index + 1}`);
                      }}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      role='menuitem'
                      key={index}
                    >
                      Level {index + 1}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div
          className='flex cursor-pointer'
          style={{
            WebkitUserSelect: 'none',
            MsUserSelect: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className={`grid grid-cols-8`}
            id='board'
            onMouseLeave={() => setIsMouseDown(false)}
          >

            {board.map((baris, indexRow) => {
              return baris.map((item, indexCol) => {
                return (
                  <div
                    className={`w-8 h-8 border-[1px] border-black
                     
                ${item == 0 && 'bg-white'} 
                ${item == 1 && 'bg-red-500'} 
                ${item == 2 && 'bg-green-500'} 
                ${item == 3 && 'bg-blue-500'}
                ${item == 4 && 'bg-yellow-500'}
                ${item == 5 && 'bg-purple-500'}
                ${item == 6 && 'bg-gray-500'}
                ${item == -2 && 'bg-green-700 cursor-default'}
                ${item == -3 && 'bg-blue-700 cursor-default'}
                ${item == -4 && 'bg-yellow-700 cursor-default'}
                ${item == -5 && 'bg-purple-700 cursor-default'}
                ${item == -6 && 'bg-gray-700 cursor-default'}
                ${
                  indexCol == lastStep[lastStep.length - 1]?.indexCol &&
                  indexRow == lastStep[lastStep.length - 1]?.indexRow &&
                  (item == 2 || item == 3 || item == 4||item==5||item==6) &&
                  'animate-pulse'
                }
                `}
                    key={indexCol}
                    onDragEnd={() => setIsMouseDown(false)}
                    onDragEnter={(e) => {
                      handleDrag(indexRow, indexCol, baris);
                      e.preventDefault();
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseDown={() => handleClick(indexRow, indexCol, baris)}
                    onMouseEnter={() => handleDrag(indexRow, indexCol, baris)}
                    onMouseUp={() => setIsMouseDown(false)}
                    onTouchMove={(e) => {
                      const boardC = document.getElementById('board');
                      const touchX =
                        e.touches[0].pageX -
                        boardC.getBoundingClientRect().left;
                      const touchY =
                        e.touches[0].pageY - boardC.getBoundingClientRect().top;

                      // Hitung indeks div berdasarkan posisi sentuhan
                      const col = Math.floor(touchX / 33); // 32px lebar div dengan 1px grid gap
                      const row = Math.floor(touchY / 33); // 32px tinggi div dengan 1px grid gap
                      handleClick(row, col, board[row]);
                    }}
                    onTouchEnd={() => setIsMouseDown(false)}
                  >
                    {/* {[2, 3, 4].map((type) =>
                      renderAsset(
                        levels[params.slug - 1],
                        indexRow,
                        indexCol,
                        type
                      )
                    )} */}

                    {levels[params.slug - 1].board[indexRow][indexCol] == 2 &&
                      (hitungAssets[0]++ ? (
                        <ImagesAssets
                          warna={0}
                          jenis={'shop'}
                          petak={board[indexRow][indexCol]}
                        />
                      ) : (
                        <ImagesAssets
                          warna={0}
                          jenis={'warehouse'}
                          petak={board[indexRow][indexCol]}
                        />
                      ))}
                    {levels[params.slug - 1].board[indexRow][indexCol] == 3 &&
                      (hitungAssets[1]++ ? (
                        <ImagesAssets
                          warna={1}
                          jenis={'shop'}
                          petak={board[indexRow][indexCol]}
                        />
                      ) : (
                        <ImagesAssets
                          warna={1}
                          jenis={'warehouse'}
                          petak={board[indexRow][indexCol]}
                        />
                      ))}
                    {levels[params.slug - 1].board[indexRow][indexCol] == 4 &&
                      (hitungAssets[2]++ ? (
                        <ImagesAssets
                          warna={2}
                          jenis={'shop'}
                          petak={board[indexRow][indexCol]}
                        />
                      ) : (
                        <ImagesAssets
                          warna={2}
                          jenis={'warehouse'}
                          petak={board[indexRow][indexCol]}
                        />
                      ))}
                      {levels[params.slug - 1].board[indexRow][indexCol] == 5 &&
                      (hitungAssets[3]++ ? (
                        <ImagesAssets
                          warna={3}
                          jenis={'shop'}
                          petak={board[indexRow][indexCol]}
                        />
                      ) : (
                        <ImagesAssets
                          warna={3}
                          jenis={'warehouse'}
                          petak={board[indexRow][indexCol]}
                        />
                      ))}
                      {levels[params.slug - 1].board[indexRow][indexCol] == 6 &&
                      (hitungAssets[4]++ ? (
                        <ImagesAssets
                          warna={4}
                          jenis={'shop'}
                          petak={board[indexRow][indexCol]}
                        />
                      ) : (
                        <ImagesAssets
                          warna={4}
                          jenis={'warehouse'}
                          petak={board[indexRow][indexCol]}
                        />
                      ))}
                  </div>
                );
              });
            })}
          </div>
        </div>
        <ConnectedCount
          connectedColor={connectedColor}
          level={level}
          levels={levels}
          board={board}
        />
        <div className='flex flex-row gap-4'>
          <button
            onClick={handleUndo}
            className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100'
          >
            <ArrowsLeftCurved /> Undo
          </button>
          <button
            onClick={() => {
              setBoard([...levels[level].board.map((row) => [...row])]);
              setTrackBoard([]);
              setLastStep([]);
              setConnectedColor(0);
            }}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-100'
          >
            Restart
          </button>
          
        </div>
      </div>
    </>
  );
}
