import React, { useEffect, useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import styles from "./styles.module.css";
import { array } from "zod";
import { useQuery } from "@apollo/client";
import { GET_ALL_OFFERS } from "../../apollo/offer/offer";

const cardsMock = [
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
];

interface IDeck {
  cardsArray: any;
  fetch?: Function;
}
export const Deck: React.FC<IDeck> = ({ cardsArray, fetch }) => {
  const [cards, setCards] = useState<any[]>([...cardsMock].reverse());
  const to = (i: number) => ({
    x: 0,
    y: i * -0.5,
    scale: 1,
    rot: -10 + Math.random() * 10,
    delay: 0,
  });
  const from = (_i: number) => ({ x: 100, rot: 0, scale: 0.5, y: -100 });

  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;

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
        gone.add(index);
      }
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
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
      // if (!down && gone.size >= 1) {
      //   // gone.clear();
      //   setCards((prev) => {
      //     // prev.unshift("");
      //     console.log(prev);
      //     return ["", ...prev];
      //   });
      // }
      if (!down && gone.size >= cards.length)
        setCards((prev) => {
          props.splice(5);
          return [...prev, ...cardsMock];
        });
      // setTimeout(() => {
      //   setCards((prev) => {
      //     props.splice(5);
      //     return [...prev, ...cardsMock];
      //   });

      //   // api.resume();
      // }, 100);
    }
  );
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => {
        return (
          <animated.div className={styles.deck} key={i} style={{ x, y }}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${cards[i]})`,
              }}
            >
              {cards[i].title}
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
};
