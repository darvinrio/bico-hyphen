import Link from "next/link";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <Navnav>
      <h1> Hyphen </h1>
      <p> on Optimism</p>
      <ul>
        <li>
          <Link href="/">TVL</Link>
        </li>
        <li>
          <Link href="/deposit">Bridge Out</Link>
        </li>
        <li>
          <Link href="/withdraw">Bridge In</Link>
        </li>
      </ul>
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

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  ul li a {
    margin: 5px 15px;
  }
`;
