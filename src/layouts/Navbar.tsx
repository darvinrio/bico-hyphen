import styled from "styled-components";

export const Navbar = () => {
  return (
    <Navnav>
      <h1> Hyphen </h1>
      <p> on Optimism</p>
    </Navnav>
  );
};

const Navnav = styled.nav`
  height: 80px;
  margin: 0px;
  padding: 5px;
  background: #fff;
  color: #000;
  border-radius: 10px;
  /* color: #fff; */
  display: flex;
  gap: 5px;
  align-items: baseline;
  justify-content: flex-start;
`;
