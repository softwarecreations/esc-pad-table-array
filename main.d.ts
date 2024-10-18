declare module 'esc-pad-table-array' {
  export const padTableA: (
    inputA: string[][],
    options?: {
         headingA?: string[];
           alignA?: ('L' | 'R')[];
            align?: string;
             fmtA?: ((cell: string) => string)[];
         colDelim?: string | null;
         rowDelim?: string | null;
      headingChar?: string | null;
      paddingChar?: string;
             trim?: boolean;
    }
  ) => string[][] | string[] | string;

  export default padTableA;
}
