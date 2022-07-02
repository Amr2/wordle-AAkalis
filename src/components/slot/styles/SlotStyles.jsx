import styled from "styled-components";
import { animated } from "react-spring";

export const StyledSlot = styled(animated.input)`
  display: inline-block;
  width: 50px;
  aspect-ratio: 1;
  background-color: #c3c3c3;
  cursor: pointer;
  border: 1px solid white;
  outline: none;
  text-align: center;
  font-size: 24px;
  font-weight: bolder;
  line-height: 45px;
  max-height: 50px;
  white-space: nowrap;
`;

export const SlotsRow = styled(animated.div)`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;
