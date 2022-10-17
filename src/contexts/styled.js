import styled from "styled-components";

export const WrapperSpin = styled.div`
    width: 100%;
  height: ${(props) => props.viewHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  background: #ffffffcc;
  // p {}
  @media screen and (max-width: 768px) {
    background: white;
  }
`;