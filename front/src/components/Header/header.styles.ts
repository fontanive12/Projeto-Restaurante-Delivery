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
  padding: 1.56rem 6.5rem 1.56rem 10rem;
  background-color: tertiary;
  box-shadow: 0 0 20px 7px black;
  h1 {
    font-weight: 600;
    font-size: 2.25rem;
  }
`;

export const Title = styled.div`
width: 12rem;
display: flex;
justify-content: space-between;
align-items: center;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
  /* margin-top: 1.6875rem; */
  gap: 40px;
  text-align: center;
`;

export const UserData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 0;
`;


// import styled from 'styled-components';

// export const Container = styled.div`
//   height: 100px;
//   display: flex;
//   background-color: #1A202C; 
//   box-shadow: 0 0 20px 3px;
//   > svg {
//     position: fixed;
//     color: white;
//     width: 30px;
//     height: 30px;
//     margin-top: 32px;
//     margin-left: 32px;
//     cursor: pointer;
//   }
// `;