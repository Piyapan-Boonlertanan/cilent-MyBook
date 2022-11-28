import { getUser } from "./services/authorize";
import { Route,Redirect } from "react-router-dom";

const UserRoute=({component:Component,...rest})=>(
    <Route
        {...rest}
        render={props=>
            getUser() ?
            (<Component {...props}/>) :
            (<Redirect
                to={{pathname:"/sign-in",state:{from:props.location}}}
                />
            )
        }
    />
);

export default UserRoute;