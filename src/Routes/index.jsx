import { Route, Switch } from "react-router-dom";
import PostsRoutes from "./PostsRoutes";
import HomePage from "../Pages/HomePage";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <PostsRoutes />
    </Switch>
  );
};

export default Routes;
