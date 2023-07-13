const shuffle = (array: string[][]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


export const breakpoints = {
  sm: 480,
  md: 740,
  lg: Infinity,
};
const sm = [[2], [1], [3], [1, 2], [3], [1], [2, 3], [1]];
const md = [[3], [1, 2], [3], [4, 2], [1], [4], [2, 3], [4]];
const lg = [[1, 4], [2], [3, 5], [1, 4], [2, 3], [3], [1, 5], [2]];

export const rows = {
  sm: { cols: 3, places: sm },
  md: { cols: 4, places: md },
  lg: { cols: 5, places: lg },
};
const totalPlaces = {
  sm: sm.flat().length,
  md: md.flat().length,
  lg: lg.flat().length,
};

export const getPosition = (index: number, breakpoint: keyof typeof breakpoints ) => {
  const positions = rows[breakpoint].places;

  let r,
    c,
    i = 0;
  let current = Math.floor(index % totalPlaces[breakpoint]);
  const pass = Math.floor(index / totalPlaces[breakpoint]);
  let row = 1 + positions.length * pass;

  for (r = 0; r < positions.length; r++) {
    for (c = 0; c < positions[r].length; c++) {
      if (i === current) {
        i++;
        return [row + r, positions[r][c]];
      }
      i++;
    }
  }

  return [1, 1];
};