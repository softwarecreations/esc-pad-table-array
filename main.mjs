'use strict';

const padTableA = (inputA, { headingA=[], alignA=[], align='', fmtA=[], colDelim='  ', rowDelim='\n', headingChar='-', paddingChar=' ', trim=true, indent=0, indentChar=' ', fmtSubF=s=>s }={ headingA:[], alignA:[], align:'', fmtA:[], colDelim:'  ', rowDelim:'\n', headingChar:'-', paddingChar:' ', trim:true, indent:0, indentChar:' ', fmtSubF:s=>s }) => {
  if (align) alignA = align.split('');
  if (!Array.isArray(inputA)) {
    console.error('inputA', inputA);
    throw new Error(`inputA is not an array. typeof:${typeof inputA}`);
  }
  const maxColumns = Math.max(...inputA.map( (colsA, rowIndex) => {
    if (!Array.isArray(colsA)) {
      console.error(`inputA row ${rowIndex}`, colsA);
      throw new Error(`inputA row ${rowIndex} is not an array. typeof:${typeof colsA}`);
    }
    return colsA.length
  })); // max number of columns of any row
  const maxColsA = Array.from({ length:maxColumns });

  // repeat last heading/alignment/fmt elements as needed
  if (headingA.length!==0) for (let i=headingA.length; i<maxColumns; ++i) headingA[i] = headingA[i-1]; // repeat last heading as needed
  if (alignA.length  !==0) for (let i=  alignA.length; i<maxColumns; ++i)   alignA[i] =   alignA[i-1]; // repeat last alignment setting as needed
  if (fmtA.length    !==0) for (let i=    fmtA.length; i<maxColumns; ++i)     fmtA[i] =     fmtA[i-1]; // repeat last format function as needed

  const filledInputA = inputA.map( colsA => maxColsA.map( (_, colIndex) => colsA[colIndex]===undefined ? '' : String(colsA[colIndex]) )); // filledInputA has maxColumns for every row, we convert to String so that numbers etc will have formattable .length
  const rowColCountA = [headingA.length].concat(inputA.map( colsA => colsA.length ));
  const dataRowsA = [headingA].concat(filledInputA);
  const maxColLengthsA = maxColsA.map( (_, colIndex) => Math.max(...dataRowsA.map( (colsA, rowIndex) => rowColCountA[rowIndex]===1 ? 0 : (colsA[colIndex]?.length ?? 0) )) );
  const tableWidth = maxColLengthsA.reduce( (sum, colLength) => sum + colLength, 0) + colDelim.length * (maxColLengthsA.length -1)

  const fmtdRowsA = dataRowsA.map( (colsA, rowIndex) => // apply padding and formatting
    colsA.map( (cell, colIndex) => {
      if (rowColCountA[rowIndex]===1) return ( colIndex > 0 // subheading row
        ? ''
        : (fmtSubF(cell) + (trim ? '' : paddingChar.repeat(tableWidth - cell.length)))
      );
      if (colIndex > rowColCountA[rowIndex] && trim) return ''; // no more data in this row with trim enabled
      const padding = paddingChar.repeat(maxColLengthsA[colIndex] - cell.length);
      if (colIndex > rowColCountA[rowIndex]) return padding; // no more data in this row, just padding, don't waste CPU on formatting and alignment
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

  const indentS = indentChar.repeat(indent);
  const rowJoin = rowDelim + indentS;
  return rowDelim ? (indentS + retFmtdRowsA.join(rowJoin)) : retFmtdRowsA; // optionally concat rows into a string
};

export default padTableA;
