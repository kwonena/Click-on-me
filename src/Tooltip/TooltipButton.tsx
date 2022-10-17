import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TooltipMessage from "./TooltipMessage";

interface TooltipProps {
  message: string;
  target: any;
  position: PositionType;
  trigger: TriggerType;
}

type PositionType = "top" | "bottom" | "left" | "right";
type TriggerType = "hover" | "click";

const TooltipButton = ({ trigger }: any) => {
  const messageRef = useRef<any>(null);

  const [clicked, setClicked] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [position, setPosition] = useState<TooltipProps["position"]>("top");
  // const [trigger, setTrigger] = useState<TooltipProps["trigger"]>("hover");

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [clicked, hovered]);

  // 클릭한 상태에서 다른 곳을 클릭하면 팝업이 사라집니다
  const onClickOutside = (e: MouseEvent) => {
    if (clicked && !messageRef?.current?.contains(e.target as Node))
      setClicked(false);
  };

  const onClickCircle = (e: any) => {
    if (trigger !== "click") return;
    const positionName: PositionType = getClassName(e);
    setPosition(positionName);
    setClicked(true);
    // setTrigger("click");
  };

  const onHoverCircle = (e: any) => {
    if (trigger !== "hover") return;
    const positionName: PositionType = getClassName(e);
    setPosition(positionName);
    setHovered(true);
    // setTrigger("hover");
  };

  const getClassName = (e: any) => {
    let buttonClassNames = e.target.className.split(" ");

    if (buttonClassNames.find((name: any) => name === "circle-top"))
      return "top";
    else if (buttonClassNames.find((name: any) => name === "circle-bottom"))
      return "bottom";
    else if (buttonClassNames.find((name: any) => name === "circle-left"))
      return "left";
    else return "right";
  };

  return (
    <>
      <PopUpContainer ref={messageRef}>
        <PopUpButton>Click on me</PopUpButton>
        <CircleIcon
          onClick={onClickCircle}
          onMouseOver={onHoverCircle}
          onMouseLeave={() => setHovered(false)}
          className="circle-top"
        />
        <CircleIcon
          onClick={onClickCircle}
          onMouseOver={onHoverCircle}
          onMouseLeave={() => setHovered(false)}
          className="circle-bottom"
        />
        <CircleIcon
          onClick={onClickCircle}
          onMouseOver={onHoverCircle}
          onMouseLeave={() => setHovered(false)}
          className="circle-left"
        />
        <CircleIcon
          onClick={onClickCircle}
          onMouseOver={onHoverCircle}
          onMouseLeave={() => setHovered(false)}
          className="circle-right"
        />
        <TooltipMessage
          position={position}
          trigger={trigger}
          message={`This is ${trigger} message`}
          clicked={clicked}
          hovered={hovered}
        />
      </PopUpContainer>
    </>
  );
};

export default TooltipButton;

const PopUpContainer = styled.div`
  position: relative;
  width: 190px;
  height: 70px;
  margin-left: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25%;

  /* 팝업 클릭 버튼별 위치 */
  .circle-top {
    top: 0px;
  }
  .circle-bottom {
    bottom: 0px;
  }
  .circle-left {
    top: 37%;
    left: 0;
  }
  .circle-right {
    top: 37%;
    right: 0;
  }

  /* 팝업 메세지 위치 변경 */
  .top {
    bottom: 75px;
  }
  .bottom {
    top: 75px;
  }
  .left {
    right: 195px;
  }
  .right {
    left: 195px;
  }
`;

const PopUpButton = styled.button`
  position: absolute;
  top: 30%;
  width: 150px;
  height: 30px;
  font-size: 20px;
  text-align: center;
  background-color: #00000020;
  color: #00000080;
  border: 0;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
`;

const CircleIcon = styled.button`
  position: absolute;
  width: 10px;
  height: 12px;
  border: 0;
  border-radius: 10px;
  background-color: #00000060;
  margin: 3px;
  cursor: pointer;
`;
