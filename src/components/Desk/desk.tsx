import { animated, useSprings } from "@react-spring/web";
import React, { useState } from "react";
import { useDrag } from "react-use-gesture";
import { Card } from "../Card/Card";
import styles from "./desk.module.css";

interface IDeck {
  cards: any;
  fetch: Function;
  pagination?: any;
  loading?: boolean;
  children?: React.ReactNode;
  onSwipe?(movement: number, ...args: any): void;
}
export const Deck: React.FC<IDeck> = ({
  cards = [],
  fetch,
  pagination = { itemsPerPage: 1, currentPage: 1, totalPages: 0 },
  loading = true,
  children,
  onSwipe = () => {},
}) => {
  const to = (i: number) => ({
    x: 0,
    y: i * -0.2,
    z: 0,
    scale: 1,
    rot: 5 - Math.random() * 10,
    delay: 0,
  });
  const from = (_i: number) => ({
    x: 0,
    rot: 0,
    scale: 1.2,
    y: 0,
  });

  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    from: from(i),
    ...to(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) {
        console.log(index);
        console.log(cards[index].id);
        onSwipe(mx, cards[index].id);
        gone.add(index);
      }

      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (300 + window.innerWidth * 2) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size >= pagination.itemsPerPage) {
        gone.clear();
        fetch();
      }
    }
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.deck}>{children}</div>
        {props &&
          props.map(({ x, y, rot, scale }, i) => {
            return (
              <animated.div
                className={styles.deck}
                key={cards[i].id * Math.random()}
                style={{ x, y }}
              >
                <Card
                  onDrag={{ ...bind(i) }}
                  to={[rot, scale]}
                  title={cards[i].title}
                  desc={cards[i].description}
                />
              </animated.div>
            );
          })}
      </div>
    </>
  );
};
