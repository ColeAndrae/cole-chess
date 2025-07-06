import { useState } from 'react'
import bishop_b from '/src/assets/pieces/bishop-b.svg'
import bishop_w from '/src/assets/pieces/bishop-w.svg'
import king_b from '/src/assets/pieces/king-b.svg'
import king_w from '/src/assets/pieces/king-w.svg'
import knight_b from '/src/assets/pieces/knight-b.svg'
import knight_w from '/src/assets/pieces/knight-w.svg'
import pawn_b from '/src/assets/pieces/pawn-b.svg'
import pawn_w from '/src/assets/pieces/pawn-w.svg'
import queen_b from '/src/assets/pieces/queen-b.svg'
import queen_w from '/src/assets/pieces/queen-w.svg'
import rook_b from '/src/assets/pieces/rook-b.svg'
import rook_w from '/src/assets/pieces/rook-w.svg'
import empty from '/src/assets/pieces/empty.svg'

export default function Board() {

  const b = bishop_b;
  const B = bishop_w;
  const k = king_b;
  const K = king_w;
  const n = knight_b;
  const N = knight_w;
  const p = pawn_b;
  const P = pawn_w;
  const q = queen_b;
  const Q = queen_w;
  const r = rook_b;
  const R = rook_w;
  const e = empty;

  const [pos, setPos] = useState(0);

  const [state, setState] = useState([
    [r, n, b, q, k, b, n, r],
    [p, p, p, p, p, p, p, p],
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    [P, P, P, P, P, P, P, P],
    [R, N, B, Q, K, B, N, R]
  ]);

  function handleClick(event) {

    let r = event.target.id[0];
    let c = event.target.id[2];

    if (!pos) {

      if (state[r][c] != e) {

        setPos(g => event.target.id);
        event.target.style.border = 'solid, 1px, black';

      }

    } else if (pos != event.target.id) {

      document.getElementById(pos).style.border = 'none';
      let newState = state.map(row => [...row]);
      newState[r][c] = state[pos[0]][pos[2]];
      newState[pos[0]][pos[2]] = e;

      setState(newState);
      setPos(0);

    }

  }

  function generateBoard() {

    let grid = [];
    for (let r = 0; r < 8; r++) {

      let row = [];
      for (let c = 0; c < 8; c++) {
        row[c] = <img id={[r, c]} onClick={handleClick} src={state[r][c]} key={[r, c]} className="w-10 h-10"
          style={{
            backgroundColor: ((r + c) % 2 == 0) ? '#769656' : '#eeeed2',
            cursor: state[r][c] == e ? 'auto' : 'grab'
          }}></img>;
      }
      grid[r] = <div key={r} className="flex">{row}</div>;

    }

    return (grid);

  }

  return (
    <div className="flex flex-col w-80 h-80 mx-auto my-12">
      {generateBoard()}
    </div>
  );

}
