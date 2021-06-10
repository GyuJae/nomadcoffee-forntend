import { useReactiveVar } from "@apollo/client";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faCoffee} size="lg" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <Link to={routes.createCoffeeShop}>
                <Icon>
                  <FontAwesomeIcon icon={faCoffee} size="lg" />
                  <p>create coffee shop</p>
                </Icon>
              </Link>
            </>
          ) : null}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
