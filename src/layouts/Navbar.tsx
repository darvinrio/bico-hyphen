import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { fetchDeployments } from "../utils/DeplymentFetch";

export const Navbar = () => {
  const router = useRouter();
  const { name } = router.query;
  let chain = name as string;

  let deployments = fetchDeployments(chain.toUpperCase());

  return (
    <Navnav>
      <ul>
        <li>
          <Link href={`/`}>
            <HyphenStyle>Hyphen</HyphenStyle>
          </Link>
        </li>
        <li>
          <Link href={`/chain/${chain}/`}>
            <ChainStyle>on {deployments.network}</ChainStyle>
          </Link>
        </li>
      </ul>
      <MobileHide>
        <ul>
          <li>
            <Link href={`/chain/${chain}/tvl`}>TVL</Link>
          </li>
          <li>
            <Link href={`/chain/${chain}/deposit`}>Bridge Out</Link>
          </li>
          <li>
            <Link href={`/chain/${chain}/withdraw`}>Bridge In</Link>
          </li>
        </ul>
      </MobileHide>
    </Navnav>
  );
};

const Navnav = styled.nav`
  /* height: 80px; */
  margin: 0px;
  padding: 5px;
  background: #fff;
  color: #000;
  border-radius: 10px;
  display: flex;
  /* gap: 10px; */
  justify-content: flex-start;
  align-items: baseline;
  ul {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: baseline;
    list-style: none;

    li {
      a {
        margin: 5px 15px;
        color: black;

        :hover {
          color: #5f5ccd;
        }
      }
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    ul {
      flex-direction: column;
    }
  }
`;

const HyphenStyle = styled.div`
  font-size: 2rem;
  padding-right: 10px;
  :hover {
    color: #5f5ccd;
    cursor: pointer;
  }
`;

const ChainStyle = styled.div`
  font-size: 1rem;
  padding-right: 10px;
  :hover {
    color: #5f5ccd;
    cursor: pointer;
  }
`;

const MobileHide = styled.div`
  @media (max-width: 800px) {
    ul {
      flex-direction: column;
    }
    height:0 ;
    height:100% ;
  }
`;
