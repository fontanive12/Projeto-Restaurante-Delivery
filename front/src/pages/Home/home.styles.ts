import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const MainContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  /* gap: 0.5rem; */
  align-items: center;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  /* margin: 3rem 15rem 3rem 10rem; */
  width: 100vw;
  margin-top:15rem;
`;

export const NavLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
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
display: table-cell;
vertical-align: middle;
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










// import styled from "styled-components";
// import { NavLink } from "react-router-dom";

// export const MainContainer = styled.div`

// height: 20rem;
//   display: flex;
//   grid-template-columns: 1fr 1fr;
//   align-items: center;
//   margin: 0;
//   padding: 0;
//   justify-content: center;
// `;

// export const NavLinkContainer = styled.div`
  
//   width: 100vw;
//   display: flex;
//   flex-direction: row; 
//   justify-content: space-between;
//   margin: 0 25rem 0 25rem;
//   gap: 3rem;
//   /* margin: 5rem 25rem 0 25rem; */
//   text-align: center;
//   align-items: center;
//   text-align: center;
//   a {
//     color: ${(props) => props.theme.white};
//     text-align: center;
//   }
// `;

// export const NavbarLink = styled(NavLink)`
// display: table;
//   &:hover,
//   &:focus {
//     color: ${(props) => props.theme.black};
//     font-weight: 700;
//   }
//   text-decoration: none;
// `;

// export const NavbarItem = styled.div`
// background-color: ${(props) => props.theme.secondary};
//   display: table-cell;
//   vertical-align: middle;
//   height: 15rem; 
//   width: 20rem; 
//   text-align: center;
//   border-radius: 30px;
//   gap: 2rem;
// h2 {
//   font-size: 2rem;
//   padding-bottom: 1rem;
// }
// `