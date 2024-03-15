import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from "./redux/store.ts";
import RequireNotAuth from "./components/RequireNotAuth.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/sign-in" element={
                            <RequireNotAuth>
                                <SignInPage/>
                            </RequireNotAuth>
                        }/>
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth>
                                    <ProfilePage/>
                                </RequireAuth>
                            }
                        />
                        <Route path="*"
                               element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </PersistGate>
        </Provider>

    )
}

export default App
