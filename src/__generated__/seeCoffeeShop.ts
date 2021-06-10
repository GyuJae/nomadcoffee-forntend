/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeCoffeeShop
// ====================================================

export interface seeCoffeeShop_seeCoffeeShop_shop {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

export interface seeCoffeeShop_seeCoffeeShop {
  __typename: "SeeCoffeeShopOutput";
  shop: seeCoffeeShop_seeCoffeeShop_shop | null;
}

export interface seeCoffeeShop {
  seeCoffeeShop: seeCoffeeShop_seeCoffeeShop;
}

export interface seeCoffeeShopVariables {
  id: number;
}
