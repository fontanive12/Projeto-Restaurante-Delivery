import styled, { css } from "styled-components";

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${(props) => props.theme.black};
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: var(--gray-300);
  line-height: 22px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export const Data = styled.div`
  color: var(--gray-800);
  color: ${(props) => props.theme.black};
`;
