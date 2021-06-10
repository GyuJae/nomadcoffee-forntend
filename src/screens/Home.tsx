import { darkModeVar, logUserOut } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
} from "../__generated__/seeCoffeeShops";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const SEECOFFEES_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      shops {
        id
        name
        user {
          id
          name
        }
      }
    }
  }
`;

const CoffeeShopContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const Home = () => {
  const history = useHistory();
  const { data } = useQuery<seeCoffeeShops, seeCoffeeShopsVariables>(
    SEECOFFEES_QUERY,
    {
      variables: { page: 1 },
    }
  );
  return (
    <div>
      <PageTitle title="Home" />

      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
      <button onClick={() => darkModeVar(true)}>Dark Mode</button>
      <button onClick={() => darkModeVar(false)}>Light Mode</button>
      {data?.seeCoffeeShops?.shops?.map((shop) => (
        <Link to={`/shop/${shop?.id}`}>
          <CoffeeShopContainer key={shop?.id}>
            <h1>{shop?.name}</h1>
            <h2>{shop?.user?.name}</h2>
          </CoffeeShopContainer>
        </Link>
      ))}
    </div>
  );
};
export default Home;
