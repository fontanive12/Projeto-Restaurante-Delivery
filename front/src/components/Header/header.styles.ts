import styled, { css } from "styled-components";

interface RadioProps {
  isActive: boolean;
}

export const SidebarContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 96px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 1.56rem 4rem;
  background-color: tertiary;
  box-shadow: 0 0 20px 7px black;
  h1 {
    font-weight: 600;
    font-size: 2.25rem;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 16rem;
  /* margin-top: 1.6875rem; */
  gap: 90px;
  text-align: center;
`;

export const UserData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;