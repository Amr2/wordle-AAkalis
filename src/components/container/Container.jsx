import React, { FC } from "react";
import { StyledContainer } from "./styles/container";

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
