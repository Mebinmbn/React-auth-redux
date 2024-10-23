import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((state) => state.user);

  return user || token ? <Component {...rest} /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default ProtectedRoute;
