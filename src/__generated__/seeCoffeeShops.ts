/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShops
// ====================================================

export interface seeCoffeeShops_seeCoffeeShops_shops_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface seeCoffeeShops_seeCoffeeShops_shops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  user: seeCoffeeShops_seeCoffeeShops_shops_user;
}

export interface seeCoffeeShops_seeCoffeeShops {
  __typename: "SeeCoffeeShopsOutput";
  shops: (seeCoffeeShops_seeCoffeeShops_shops | null)[] | null;
}

export interface seeCoffeeShops {
  seeCoffeeShops: seeCoffeeShops_seeCoffeeShops;
}

export interface seeCoffeeShopsVariables {
  page: number;
}
