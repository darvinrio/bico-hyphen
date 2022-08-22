import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

export const Navbar = ({ children }: Props) => {
  return (
    <Navnav>
      <h1>Hyphen </h1>
      <p> on Optimism </p>
      {children}
    </Navnav>
  );
};

const Navnav = styled.nav`
  margin: 10px ;
  padding: 10px ;
`
