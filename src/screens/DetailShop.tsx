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
  //   const { shopId } = await useParams<ParamTypes>();
  //   if (!shopId) {
  //     return;
  //   }
  const { data } = useQuery<seeCoffeeShop, seeCoffeeShopVariables>(
    SEECOFFEESHOP_QUERY,
    {
      variables: { id: 1 },
    }
  );

  return (
    <div>
      <h1>{data?.seeCoffeeShop.shop?.name}</h1>
    </div>
  );
};
export default DetailShop;
