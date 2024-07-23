import { useFirebase } from "../context/firebase";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ component: Component,  ...rest }) => {
  const { currentUser, role,isLoggin } = useFirebase();
//  useEffect(()=>{
//     const isLoggedIn = firebase.isLoggedIn;
//     if (isLoggedIn) {
//        return <Navigate to="/book" />;
//     }
//   })
  if(isLoggin){
    return <Navigate to="/book" />;
  }

  // else if (isLoggin && currentUser) {
  //   return <Navigate to="/book" />;
  // }

  // if(isLoggin){
  //         return <Navigate to="/book"/>
  // }

  // if (allowedRoles!==role) {
  //   return <Navigate to="/" />;
  // }

  return <Component {...rest} />;
};

export default  ProtectedRoutes