import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import SignUp from "./screens/SignUp";
import UpdateShop from "./screens/UpdateShop";
import DetailShop from "./screens/DetailShop";
import CreateCoffeeShop from "./screens/CreateCoffeeShop";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Container>
                  {isLoggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Login />
                  )}
                </Container>
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={routes.createCoffeeShop}>
                <CreateCoffeeShop />
              </Route>
              <Route path={routes.detailShop}>
                <DetailShop />
              </Route>
              <Route path={routes.updateShop}>
                <UpdateShop />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
