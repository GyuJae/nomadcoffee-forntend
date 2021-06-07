import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: any) => {
  localStorage.removeItem(TOKEN);
  history.replace();
  window.location.reload();
};
export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri: "https://nomadcoffee-backend-gyujae.herokuapp.com/",
  cache: new InMemoryCache(),
});
