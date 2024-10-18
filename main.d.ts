declare module 'esc-pad-table-array' {
  interface Options {
       headingA?: string[];
         alignA?: ('L' | 'R')[];
          align?: string;
           fmtA?: ((cell: string) => string)[];
       colDelim?: string | null;
       rowDelim?: string | null;
    headingChar?: string | null;
    paddingChar?: string;
  }

  function padTableA(
    inputA: string[][],
    options?: Options
  ): string[][] | string[] | string;

  export default padTableA;
}
