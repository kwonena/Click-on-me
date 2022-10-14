import React from "react";
import styled from "styled-components";

const TooltipMessage = ({ message, position, clicked }: any) => {
  return (
    <>
      {clicked && <PopUpMessage className={position}>{message}</PopUpMessage>}
    </>
  );
};

export default TooltipMessage;

const PopUpMessage = styled.div`
  position: absolute;
  width: 200px;
  height: 30px;
  text-align: center;
  background: #b5b5b5;
  border-radius: 6px;
  padding-top: 5px;
`;
