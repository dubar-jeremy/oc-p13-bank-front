import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet, useLocation} from "react-router-dom";

const Layout = () => {

    const location = useLocation()

    return (
        <>
            <Header/>
            <main className={`bg-dark ${location.pathname !== '/' && 'bg-dark-p'}`}>
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}
export default Layout