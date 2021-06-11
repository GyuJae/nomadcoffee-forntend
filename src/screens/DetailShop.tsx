import { ParamTypes } from "../params.d";
import { gql, useQuery } from "@apollo/client";
import {
  seeCoffeeShop,
  seeCoffeeShopVariables,
} from "../__generated__/seeCoffeeShop";

import { useParams } from "react-router";

const SEECOFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      shop {
        id
        name
        latitude
        longitude
      }
    }
  }
`;

const DetailShop = () => {
  let id = 0;
  const { shopId } = useParams<ParamTypes>();
  if (shopId) {
    id = +shopId;
  }
  const { data } = useQuery<seeCoffeeShop, seeCoffeeShopVariables>(
    SEECOFFEESHOP_QUERY,
    {
      variables: { id },
    }
  );

  return (
    <div>
      <h1>{data?.seeCoffeeShop.shop?.name}</h1>
    </div>
  );
};
export default DetailShop;
