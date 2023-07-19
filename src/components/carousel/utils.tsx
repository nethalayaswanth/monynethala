import {
  Children,
  ComponentType,
  FunctionComponent,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import { isFragment } from "react-is";

function getComponentDisplayName(element: ReactElement<any>) {
  const node = element as React.ReactElement<ComponentType<any>>;

  const type = (node as unknown as React.ReactElement<FunctionComponent>).type;

  const displayName =
    typeof type === "string"
      ? type
      : (type as FunctionComponent).displayName ||
        (type as FunctionComponent).name ||
        "Unknown";

  return displayName;
}

export function isChildDesiredItem(child: ReactElement, displayName: string) {
  return getComponentDisplayName(child) === displayName;
}

export function filterChildren(
  children: ReactNode,
  displayName: string,
  depth: number = 0,
  keys: (string | number)[] = []
) {
  return Children.toArray(children).reduce(
    (acc: ReactElement[], node, nodeIndex) => {
      if (isFragment(node)) {
        acc.push.apply(
          acc,
          filterChildren(
            node.props.children,
            displayName,
            depth + 1,
            keys.concat(node.key || nodeIndex)
          )
        );
      } else {
        if (isValidElement(node) && isChildDesiredItem(node, displayName)) {
          acc.push(
            cloneElement(node, {
              key: keys.concat(String(node.key)).join("."),
            })
          );
        }
        // else if (typeof node === "string" || typeof node === "number") {
        //   acc.push(node);
        // }
      }
      return acc;
    },

    []
  );
}

export function detectSwipeDirection(
  deltaX: number,
  deltaY: number,
  swipeThreshold: number
) {
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    if (deltaX > swipeThreshold) {
      return 'right'
    } else if (deltaX < -swipeThreshold) {
      return 'left'
    }
  } else {
    if (deltaY > swipeThreshold) {
      return 'down'
    } else if (deltaY < -swipeThreshold) {
      return 'up'
    }
  }
}