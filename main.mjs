'use strict';

const padTableA = (inputA, { headingA=[], alignA=[], align='', fmtA=[], colDelim='  ', rowDelim='\n', headingChar='-', paddingChar=' ', trim=true }={ headingA:[], alignA:[], align:'', fmtA:[], colDelim:'  ', rowDelim:'\n', headingChar:'-', paddingChar:' ', trim:true }) => {
  if (align) alignA = align.split('');
  const maxColumns = Math.max(...inputA.map( colsA => colsA.length )); // max number of columns of any row
  const maxColsA = Array.from({ length:maxColumns });

  // repeat last heading/alignment/fmt elements as needed
  if (headingA.length!==0) for (let i=headingA.length; i<maxColumns; ++i) headingA[i] = headingA[i-1]; // repeat last heading as needed
  if (alignA.length  !==0) for (let i=  alignA.length; i<maxColumns; ++i)   alignA[i] =   alignA[i-1]; // repeat last alignment setting as needed
  if (fmtA.length    !==0) for (let i=    fmtA.length; i<maxColumns; ++i)     fmtA[i] =     fmtA[i-1]; // repeat last format function as needed

  const filledInputA = inputA.map( colsA => maxColsA.map( (_, colIndex) => String(colsA[colIndex]) ?? '' )); // filledInputA has maxColumns for every row, we convert to String so that numbers etc will have formattable .length
  const dataRowsA = [headingA].concat(filledInputA).filter( colsA => colsA.length!==0 );
  const maxColLengthsA = maxColsA.map( (_, colIndex) => Math.max(...dataRowsA.map(row => row[colIndex]?.length ?? 0 )) );

  const fmtdRowsA = dataRowsA.map( colsA => // apply padding and formatting
    colsA.map( (cell, colIndex) => {
      const padding = paddingChar.repeat(maxColLengthsA[colIndex] - cell.length);
      const fmtdCell = typeof fmtA[colIndex]==='function' ? fmtA[colIndex](cell) : cell;
      return alignA[colIndex]==='R' ? `${padding}${fmtdCell}` : `${fmtdCell}${padding}`;
    })
  );

  if (headingA.length!==0 && headingChar) fmtdRowsA.splice(1, 0, headingA.map( (_, colIndex) => headingChar.repeat(maxColLengthsA[colIndex]) )); // insert headingChar's between headingA row and first inputA row

  const retFmtdRowsA = ( colDelim
    ? ( trim
        ? fmtdRowsA.map( colsA => colsA.join(colDelim).trim() )
        : fmtdRowsA.map( colsA => colsA.join(colDelim) )
      )
    : fmtdRowsA
  ); // optionally concat column arrays into row strings

  return rowDelim ? retFmtdRowsA.join(rowDelim) : retFmtdRowsA; // optionally concat rows into a string
};

export default padTableA;
