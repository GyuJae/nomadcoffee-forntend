import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

type ICreateAccountForm = {
  email: string;
  username: string;
  password: string;
  name: string;
  location: string;
  avatarURL?: string;
  githubUsername?: string;
};

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
    $name: String!
    $location: String!
    $avatarURL: String
    $githubUsername: String
  ) {
    createAccount(
      email: $email
      username: $username
      password: $password
      name: $name
      location: $location
      avatarURL: $avatarURL
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();

  const { register, handleSubmit, getValues, setError } =
    useForm<ICreateAccountForm>({
      mode: "onChange",
    });
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATEACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const {
        createAccount: { ok, error },
      } = data;
      if (!ok) {
        if (error) {
          setError("username", {
            message: error,
          });
        }
        return;
      }
      const { username, password } = getValues();
      history.push(routes.home, {
        message: "Account created. Please log in.",
        username,
        password,
      });
    },
  });

  const onSubmit: SubmitHandler<ICreateAccountForm> = () => {
    if (loading) {
      return;
    }
    const {
      email,
      username,
      password,
      name,
      location,
      avatarURL,
      githubUsername,
    } = getValues();
    createAccount({
      variables: {
        email,
        username,
        password,
        name,
        location,
        avatarURL,
        githubUsername,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
          <Subtitle>Sign up to see coffee from your friends.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
            name="email"
          />
          <Input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            name="username"
          />
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            name="password"
          />
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            name="name"
          />
          <Input
            {...register("location", { required: true })}
            type="text"
            placeholder="Location"
            name="location"
          />
          <Input
            {...register("avatarURL")}
            type="text"
            placeholder="AvatarURL"
            name="avatarURL"
          />
          <Input
            {...register("githubUsername")}
            type="text"
            placeholder="GithubUsername"
            name="githubUsername"
          />
          <Button type="submit" value={loading ? "Loading..." : "Sign up"} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};
export default SignUp;
