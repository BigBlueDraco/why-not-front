import { animated, to as interpolate } from "@react-spring/web";
import styles from "./card.module.css";
import React, { HTMLAttributes } from "react";
import { Box, Typography } from "@mui/material";
import { StyledCard } from "./card.styled";

interface ICard extends HTMLAttributes<HTMLDivElement> {
  to?: [rot: any, scale?: any];
  onDrag?: any;
  title?: string;
  desc?: string;
  children?: any;
  onClick?: any;
  bgImg?: string;
}
export const Card: React.FC<ICard> = ({
  to: [rot, scale] = [],
  onDrag,
  title = "",
  desc = "",
  children,
  onClick = () => {},
  bgImg,
  ...props
}) => {
  const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(0deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;
  return (
    <StyledCard
      bgImg={bgImg}
      {...props}
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
          <Typography id="title">{title}</Typography>
          <Typography id="desc">{desc}</Typography>
          <img src="" alt="" />
        </Box>
      )}
    </StyledCard>
  );
};
