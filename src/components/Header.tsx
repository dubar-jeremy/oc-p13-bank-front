import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {persistor, RootState} from "../redux/store.ts";
import {UserProfile} from "../interfaces/api.interfaces.ts";
import {reset} from "../redux/slices/authentication/authenticationSlice.ts";
import {reset as resetUser} from "../redux/slices/user/userSlice.ts";

const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const auth = useSelector<RootState, boolean>((state) => state.authentication.isAuthenticated)

    const user = useSelector<RootState, UserProfile | undefined>((state) => state.user.userProfile)

    const handleOnClick = async () => {

        if(auth){
            dispatch(reset())
            dispatch(resetUser())
            await persistor.purge()
            navigate('/')
        }

        navigate('/sign-in');
    }


    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={'/argentBankLogo.png'}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {auth && <Link className="main-nav-item" to="/profile">
                    <i className="fa fa-user-circle"></i>
                    {user?.firstName || 'profile'}
                </Link>}
                <span className="main-nav-item" onClick={handleOnClick}>
                    <i className={auth ? "fa fa-sign-out " : "fa fa-user-circle"}></i>
                    {auth ? 'sign out' : 'sign in'}
                </span>
            </div>
        </nav>
    )
}

export default Header;
