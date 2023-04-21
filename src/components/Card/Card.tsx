import { animated, to as interpolate } from "@react-spring/web";
import styles from "./card.module.css";
import React from "react";
import { Box, Typography } from "@mui/material";

interface ICard {
  to?: [rot: any, scale?: any];
  onDrag?: any;
  title?: string;
  desc?: string;
  children?: any;
  onClick?: any;
}
export const Card: React.FC<ICard> = ({
  to: [rot, scale] = [],
  onDrag,
  title = "",
  desc = "",
  children,
  onClick = () => {},
}) => {
  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(0deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;
  return (
    <animated.div
      onClick={onClick}
      {...onDrag}
      className={styles.card}
      style={{
        transform: interpolate([rot, scale], trans),
        // backgroundImage: `url(${cards[i]})`,
        display: children && "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children ? (
        children
      ) : (
        <Box sx={{ p: "16px 8px" }}>
          <Typography>{title}</Typography>
          <Typography>{desc}</Typography>
          <img src="" alt="" />
        </Box>
      )}
    </animated.div>
  );
};
