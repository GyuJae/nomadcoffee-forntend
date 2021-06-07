import { faBlackberry } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import FormError from "../components/auth/FormError";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { logUserIn } from "../apollo";

type ILoginForm = {
  username: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (!ok) {
          if (error) {
            setError("username", {
              message: error,
            });
          }
        }
        if (ok && token) {
          logUserIn(token);
        }
      },
    }
  );

  const onSubmit: SubmitHandler<ILoginForm> = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faBlackberry} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", { required: true })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: true })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value="Log in" />
        </form>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};
export default Login;
