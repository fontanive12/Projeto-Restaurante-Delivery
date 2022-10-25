import styled from "styled-components";

export const LoginContainer = styled.main`
  height: 100vh;
  width: 100vw;
  /* display: grid; era pra image*/
  display: flex;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 0;
  padding: 0;
  justify-content: center;
  

  
  img {
    height: 100vh;
  }
  
  form {
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 32px;
    color: #998
  }

  span {
    color: red;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
