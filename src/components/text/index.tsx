"use client";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";

import scrambler from './scrambler'

type TextProps<C extends React.ElementType> = {
  as?: C;
  text: string;
};

type Props<C extends React.ElementType> = TextProps<C> &
  ComponentPropsWithoutRef<C>;

export const DefaultAsType = "span" as const;

export default function ScramblingText<C extends React.ElementType>({
  as,
  text,
  ...rest
}: Props<C>) {
  const [scrambledText, setText] = useState(text);

  const scramblerRef = useRef(new scrambler());

  useEffect(() => {
    scramblerRef.current.scramble(text, setText);
  }, [text]);

  const Wrapper = as || DefaultAsType;
  return as ? (
    <Wrapper {...rest}>{scrambledText}</Wrapper>
  ) : (
    <>{scrambledText}</>
  );
}
