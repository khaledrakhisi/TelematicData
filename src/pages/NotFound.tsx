import { Link } from "react-router-dom";

import Button from "../components/ui/Button";

function NotFound() {
  return (
    <div className={"notFound__container"}>
      <h2 className={"notFound__title notFound__title_ltr"}>
        {"page not found"}
      </h2>
      <Link to="/">
        <Button>{"back"}</Button>
      </Link>
      <div className="notFound__img">
        <img
          src={
            require("../assets/images/Oops 404 Error with a broken robot-cuate.svg")
              .default
          }
          alt="404 page"
        />
      </div>
    </div>
  );
}

export default NotFound;
