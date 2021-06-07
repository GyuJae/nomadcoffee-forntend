import { Helmet } from "react-helmet-async";

function PageTitle({ title }: any) {
  return (
    <Helmet>
      <title>{title} | NomadCoffee</title>
    </Helmet>
  );
}

export default PageTitle;
