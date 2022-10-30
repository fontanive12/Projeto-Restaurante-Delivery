import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MainContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* gap: 0.5rem; */
  align-items: center;
  justify-content: center;
  text-align: center;
align-items: center;
  /* margin: 3rem 15rem 3rem 10rem; */
width: 800px;
align-items: center;
text-align: center;
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  gap: 2rem;
  margin-top: 2rem;
  text-align: center;
  align-items: center;
  a {
    color: ${(props) => props.theme.white};
    text-align: center;
  }
`;

export const NavbarLink = styled(NavLink)`
text-align: center;
align-items: center;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.black};
    font-weight: 700;
  }
  text-decoration: none;
`;

export const NavbarItem = styled.div`
background-color: ${(props) => props.theme.secondary};
width: 15rem;
height: 10rem;
align-items: center;
text-align: center;
border-radius: 20px;
h2 {
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 1rem;
}
`