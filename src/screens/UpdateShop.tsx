import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import { useForm, SubmitHandler } from "react-hook-form";

import { useHistory, useParams } from "react-router";
import { ParamTypes } from "../params.d";
import { gql, useMutation } from "@apollo/client";

import {
  editCoffeeShop,
  editCoffeeShopVariables,
} from "../__generated__/editCoffeeShop";
import routes from "../routes";

type IUpdateShopForm = {
  name: string;
  latitude: string;
  longitude: string;
};

const EDITCOFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $shopId: Int!
    $name: String
    $latitude: String
    $longitude: String
  ) {
    editCoffeeShop(
      shopId: $shopId
      name: $name
      latitude: $latitude
      longitude: $longitude
    ) {
      ok
      error
    }
  }
`;

const UpdateShop = () => {
  const history = useHistory();
  const { shopId } = useParams<ParamTypes>();

  const [editCoffeeShop, { loading }] = useMutation<
    editCoffeeShop,
    editCoffeeShopVariables
  >(EDITCOFFEESHOP_MUTATION, {
    onCompleted: (data) => {
      const {
        editCoffeeShop: { ok, error },
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
        message: "Update Correct!",
        name,
        latitude,
        longitude,
      });
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<IUpdateShopForm>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUpdateShopForm> = () => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude } = getValues();
    if (!shopId) {
      return;
    }
    editCoffeeShop({
      variables: { shopId: +shopId, name, latitude, longitude },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Update" />
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
            placeholder="Longitude"
          />
          <FormError message={errors?.longitude?.message} />
          <Button type="submit" value="Update CoffeeShop" />
        </form>
      </FormBox>
    </AuthLayout>
  );
};
export default UpdateShop;
