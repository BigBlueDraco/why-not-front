import React, { useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import styles from "./desk.module.css";
import { Card } from "../Card/Card";
import { MagnifyingGlass } from "react-loader-spinner";
import BlockIcon from "@mui/icons-material/Block";
import { Box, Typography } from "@mui/material";

interface IDeck {
  cards: any;
  fetch: Function;
  pagination?: any;
  loading?: boolean;
}
export const Deck: React.FC<IDeck> = ({
  cards,
  fetch,
  pagination: { itemsPerPage, currentPage, totalPages },
  loading = true,
}) => {
  const to = (i: number) => ({
    x: 0,
    y: i * -0.2,
    z: 0,
    scale: 1,
    rot: 10 - Math.random() * 20,
    delay: 0,
  });
  const from = (_i: number) => ({
    x: 0,
    rot: 0,
    scale: 1.2,
    y: 0,
    z: -20,
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
      if (!down && gone.size >= itemsPerPage && currentPage !== totalPages) {
        gone.clear();
        fetch();
      }
    }
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.deck}>
          <Card>
            {/* Не працює виправити */}
            {loading && (
              <MagnifyingGlass
                visible={true}
                height="100"
                width="100"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#00ADB58f"
                color="#222831"
              />
            )}
            {currentPage === totalPages && !loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <BlockIcon sx={{ height: "100px", width: "100px" }} />
                <Typography>Unfortunately, there are no more offers</Typography>
              </Box>
            )}
          </Card>
        </div>
        {props.map(({ x, y, rot, scale }, i) => {
          return (
            <animated.div
              className={styles.deck}
              key={cards[i].id}
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
