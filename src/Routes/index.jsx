import { Route, Switch } from "react-router-dom";
import PostsRoutes from "./PostsRoutes";
import HomePage from "../Pages/HomePage";
import Favorites from "../Pages/Favorites/Favorites";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/favorites" component={Favorites} />
      <PostsRoutes />
    </Switch>
  );
};

export default Routes;
