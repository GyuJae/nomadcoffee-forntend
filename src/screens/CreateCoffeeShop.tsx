import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { useHistory } from "react-router";
import routes from "../routes";

type ICreateCoffeeShopForm = {
  name: string;
  latitude: string;
  longitude: string;
};

const CREATECOFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
  ) {
    createCoffeeShop(name: $name, latitude: $latitude, longitude: $longitude) {
      ok
      error
    }
  }
`;

const CreateCoffeeShop = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<ICreateCoffeeShopForm>({
    mode: "onChange",
  });

  const [createCoffeeShop, { loading }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATECOFFEESHOP_MUTATION, {
    onCompleted: (data) => {
      const {
        createCoffeeShop: { ok, error },
      } = data;
      if (!ok) {
        if (error) {
          setError("name", {
            message: error,
          });
        }
        console.log(error);
      }
      const { name, latitude, longitude } = getValues();
      history.push(routes.home, {
        message: "Account created. Please log in.",
        name,
        latitude,
        longitude,
      });
    },
  });

  const onSubmit: SubmitHandler<ICreateCoffeeShopForm> = () => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude } = getValues();
    createCoffeeShop({
      variables: { name, latitude, longitude },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Createa Account" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", { required: true })}
            name="name"
            type="text"
            placeholder="Name"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("latitude", { required: true })}
            name="latitude"
            type="text"
            placeholder="Latitude"
          />
          <FormError message={errors?.latitude?.message} />
          <Input
            {...register("longitude", { required: true })}
            name="longitude"
            type="text"
            placeholder="longitude"
          />
          <FormError message={errors?.longitude?.message} />
          <Button type="submit" value="Create CoffeeShop" />
        </form>
      </FormBox>
    </AuthLayout>
  );
};
export default CreateCoffeeShop;
