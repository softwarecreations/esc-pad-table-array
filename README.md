# esc-pad-table-array
Tiny 1.7K function pads the cells of a 2D array of strings (table) by column, left/right aligned, optionally formatted, optional headings.

## Install
`npm install esc-pad-table-array`

## Example import and data
```JavaScript
import padTableA from 'esc-pad-table-array';
const inputA = [
  [ '192.168.1.4', 'apple.example.org' ],
  [ '192.168.1.91', 'fig.example.org', 'fig.otherdomain.co.za' ],
  [ '192.168.1.123', 'watermelon.example.org', 'watermelon.otherdomain.co.za' ],
  [ '192.168.1.201', 'plum.example.org', 'plum.otherdomain.co.za' ],
];
```
### Simplest example
```javascript
console.log(padTableA(inputA));
```
![image](https://github.com/user-attachments/assets/f49cff65-fdb0-4b8d-9151-09a79d1a4402)

### Example with alignment
```javascript
console.log(padTableA(inputA, { alignA:[ 'L', 'R' ] }));
console.log(padTableA(inputA, { align:'LR' }));          // terse alternative syntax
```
![image](https://github.com/user-attachments/assets/60b283a1-6852-497a-9198-9f3e0c6e4677)

### Example with alignment and formatting
`npm install esc-colors`
```javascript
import colors from 'esc-colors';
```

```javascript
console.log(padTableA(inputA, { align:'LR', fmtA:[ colors.magenta, colors.blue ] }));
```
![image](https://github.com/user-attachments/assets/8a028d3b-4aac-4b9b-9a17-2cf28d8aa1c9)

### Example with heading, alignment and formatting
```javascript
console.log(padTableA(inputA, { headingA:['LAN IP', 'HOSTNAME'], align:'LR', fmtA:[ colors.magenta, colors.blue ] }));
```
![image](https://github.com/user-attachments/assets/e22a338e-e60b-4ce1-ba73-e3c9ca79b7c5)

### Example with heading (no underline), alignment and formatting
```javascript
console.log(padTableA(inputA, {
  headingA: ['LAN IP', 'HOSTNAME'],
  headingChar: null,
  align: 'LR',
  fmtA: [ colors.magenta, colors.blue ],
}));
```
![image](https://github.com/user-attachments/assets/69e7e881-5e84-40d0-ac34-a99698bf7802)

### Example getting 2D array
You can get a 1D or 2D array and do whatever you want with it, trivially.
```javascript
const tableAA = padTableA(inputA, { align:'LR', colDelim:null, rowDelim:null, paddingChar:'.' });

console.log('tableAA', tableAA);
```
![image](https://github.com/user-attachments/assets/875315b3-3024-4093-a6a1-ab689b507bcb)

```javascript
const rowsA = tableAA.map( colsA => '|..' + colsA.join('...') + '..|' );

const width = rowsA[0].length;

console.log('='.repeat(width));

rowsA.forEach( rowS => console.log(rowS) );

console.log('='.repeat(width));
```
![image](https://github.com/user-attachments/assets/833f66a2-1674-4f6d-afe2-7fda5929869f)

Get the table data and you can flip it any style.

### Example subheadings in your table

Rows with a single column are treated as subheadings, so they 'merge' the adjacent 'cells' and don't affect your other column widths.

If you have a row with a single data column and want it treated as a data row simply add another empty column next to it like `[ 'MYDATA', '' ]`

```javascript
const inputA = [
  [ '# these are my fruity computers, make a nice smoothie' ],
  [ '192.168.1.4', 'papaya.example.org' ],
  [ '192.168.1.91', 'fig.example.org', 'fig.otherdomain.co.za' ],
  [ '192.168.1.123', 'watermelon.example.org', 'watermelon.otherdomain.co.za' ],
  [ '# cooked computers, serve hot' ],
  [ '192.168.1.201', 'pizza.example.org', 'pizza.otherdomain.co.za' ],
  [ '192.168.1.211', 'lasagna.example.org', 'lasagna.otherdomain.co.za' ],
  [ '# drinks' ],
  [ '192.168.1.214', 'mate.example.org', 'mate.otherdomain.co.za' ],
];

console.log(padTableA(inputA, {
  headingA: ['LAN IP', 'HOSTNAME'],
  align: 'LR',
  indent: 2,
  fmtA: [ colors.magenta, colors.blue ],
  fmtSubF: colors.yellow,
}));
```
![image](https://github.com/user-attachments/assets/26120d00-eb69-4cc8-93ce-5e663984223d)

`const whateverCharYouLike = '.';`
`paddingChar:whateverCharYouLike, trim:false` also works with subheadings:
![image](https://github.com/user-attachments/assets/0c061d9c-ff5a-4b5a-8ec9-3f13ba2294bf)

## Project goals
* No dependencies
* No nonsense
* Reliable, no radical changes will ever happen.
* Small, simple, easy to audit, yourself

If I have ideas for something different, I'll make a new package rather than make breaking changes.

## Inspired by
I looked what else was available and it was massively bloated and over-complicated.

## Notes
Have fun!

### Say thanks
Star the repo
https://github.com/softwarecreations/esc-pad-table-array

### PR's or issues
Welcome

### License
MIT
