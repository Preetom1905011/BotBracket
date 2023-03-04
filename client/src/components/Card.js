import React from 'react'
import PropTypes from 'prop-types'
import '../styles/card.css'
import {v4 as uuidv4} from "uuid";
import BotList from './BotList';

export default function Card({input, setInput, names, setNames}) {

  const onInputChange = (event) => {
    // setInput(event.target.value);
    setInput(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const Names = [...names, {id: uuidv4(), title: input.botname, chip: input.chipnum}];

    handleSortName(Names);
    setInput({botname: "", chipnum: input.chipnum});
    // setInput(Object.assign(...Object.keys(input).map(k => ({ [k]: "" }))));
  };

  const handleSortName = (names) => {
    // set the state to the newly created sorted array with the three dots operator:
    setNames(
      [...names].sort((a, b) => b.chip - a.chip)
    );
  };

  return (
    <>
      <div className="card-body">
          <h2>Participants</h2>
          <form onSubmit={onFormSubmit} onChange={onInputChange}>
            <div className='container'>
              <input
                type="text"
                placeholder="Add Bot Name"
                name="botname"
                className='bot-input'
                autoComplete="off"
                value={input.botname}
                required
              />
              <input
                type="number"
                placeholder="Chip"
                name="chipnum"
                className='num-input'
                autoComplete="off"
                value={input.chipnum}
                min="0"
                required
              />
              <button className='button-style' type="submit">Enter</button>
            </div>
          </form>
        <BotList 
            names={names} 
            setNames={setNames} 
            handleSortName={handleSortName}
        />
      </div>
    </>
  )
}

// Card.propTypes = {
//     name: PropTypes.string
// }

// Card.defaultProps = {
//     name: "Name"
// }







// # Change the C code here if you have used something different from the one given.

// #int i = 0;
// #while (i < n) { 
// #   if (A[i] != val)                // If no match, proceed with next element
// #      i++;
// #   else {
// #      for (int k = i; k < n - 1; k++)  // Shift elements if a match is found       
// #         A[k] = A[k+1];          
// #      n = n - 1;            // if element deleted, length of array decreases
// #   }
// #}

// # i -> $t0, n -> $s1, A -> $s0, val -> $s2
// # k -> $t5

// addi $t0, $zero, 0            # i = 0

// While:  bge $t0, $s1, Exit

// Load_i: sll $t1, $t0, 2         # 4 * i -> $t1
//         add $t1, $t1, $s0       # addr of A[i] -> $t1
//         lw $t2, 0($t1)          # A[i] -> $t2

// If:     beq $t2, $s2, Else      # if A[i] == val, goto else
//         addi $t0, $t0, 1        # if A[i] != val, i++
//         j IfEnd                 # jump to condition's end

// Else:   add $t5, $t0, $zero     # k = i
//         addi $t6, $s2, -1       # n - 1 -> $t6
// Loop:   bge $t5, $t6, LoopEnd   # when k >= n - 1, exit Loop
// Load_k: sll $t7, $t5, 2         # 4 * k -> $t7
//         add $t7, $t7, $s0       # addr of A[k]
//         lw $t8, 4($t7)          # A[k+1] -> $t8
//         sw $t8, 0($t7)          # A[k] = A[k+1]
//         addi $t5, $t5, 1        # k = k + 1
//         j Loop
// LoopEnd:addi $s2, $s2, -1       # n = n - 1
// IfEnd:  j While
// Exit:



