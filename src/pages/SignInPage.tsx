import SignInForm from "../components/forms/SignInForm.tsx";


const SignInPage = () => {
    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <SignInForm />
        </section>
    )
}

export default SignInPage
