import { animated } from "@react-spring/web";
import styled from "styled-components";

interface StyledCardProps {
  bgImg: string;
}

export const StyledCard = styled(animated.div)<StyledCardProps>`
  background-image: url(${(props) => props.bgImg || ""});
  background-size: 360px 520px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center center;
  min-width: 320px;
  max-width: 320px;
  min-height: 520px;
  max-height: 520px;
  will-change: transform;
  border-radius: 10px;
  background-color: ${(props) => props?.theme?.palette?.secondary?.main};
  box-shadow: 0 4px 40px -20px rgba(50, 50, 73, 0.1),
    0 3px 5px -2px rgba(50, 50, 73, 0.1);
  /* padding: 16px 8px; */
  border: 0;
  margin: 0;
  display: block;
  box-sizing: content-box;
`;
