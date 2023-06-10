export const generateRandomHsv = () => {
  return `hsl(${Math.random() * 360} ${50 + Math.random() * 100}% ${
    25 + Math.random() * 50
  }%)`;
};

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  let r = 0,
    g = 0,
    b = 0;

  if (s == 0) {
    r = g = b = l;
    return [r, g, b];
  } else {
    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.abs(Math.round((r + m) * 255));
    g = Math.abs(Math.round((g + m) * 255));
    b = Math.abs(Math.round((b + m) * 255));
  }

  return [r, g, b];
}

function hexToRGB(h: string) {
  let r = "",
    g = "",
    b = "";

  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }

  return [+r, +g, +b];
}

export const isDarkColor = (color: string) => {
  const rgb = color.startsWith("#") ? hexToRGB(color) : rgbToArray(color);
  const yiq = (rgb[0] * 2126 + rgb[1] * 7152 + rgb[2] * 722) / 10000;
  return yiq < 128;
};

const exclusion = (cs: number, cb: number) => {
  return Math.abs( cb + cs - 2 * cb * cs);
};

export function parseRgb(rgb:string){
   return rgb.slice(4, -2);
}
export function rgbToArray(rgb: string) {
  return parseRgb(rgb).split(",").map((x) => +x);
}
export const getContrastColor = (
  b: string = "rgb(255,255,255)",
  s: string = "rgb(255,255,255)"
) => {
  const surface = s.trim().startsWith("#") ? hexToRGB(s) : rgbToArray(s);
  const background = b.trim().startsWith("#") ? hexToRGB(b) : rgbToArray(b);

  const rgb: number[] = [];
  for (var i = 0; i < 3; i++) {
    rgb[i] = Math.ceil(
      exclusion(+surface[i] / 255, +background[i] / 255) * 255
    );
  }

  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
};

export const getcolor = () => {
  let h = Math.floor(Math.random() * 360),
    s = 50 + Math.floor(Math.random() * 100),
    l = 25 + Math.floor(Math.random() * 50);
  const [r, g, b] = hslToRgb(h, s, l);
  return `rgb(${r},${g},${b})`;
};

export const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(val, max));

export type Ref<T> = React.MutableRefObject<T> | React.LegacyRef<T>;
export function mergeRefs<T = any>(...refs: Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}


export const createImage = (
  url: string
): Promise<{ aspectRatio: number; width: number; height: number }> => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      const aspectRatio = width / height;

      res({
        aspectRatio,
        width,
        height,
      });
    };
  });
};