import {ChangeEvent, FormEvent, useState} from "react";
import {useSignInMutation} from "../../redux/queries/authenticationApi.ts";
import {useDispatch} from "react-redux";
import {setIsAuthenticated, setToken} from "../../redux/slices/authentication/authenticationSlice.ts";
import {useNavigate} from "react-router-dom";
import '../../index.css'

/**|
 * In a production-mode application, the form and its validation should be built with external libraries (such as react-hook-form/yup).
 * I did not handle it on purpose because the main goal of the project is to demonstrate how to implement Redux with React and interact with an external API.
 */
const SignInForm = () => {
    const [error, setError] = useState<string | null>(null)

    const [signIn] = useSignInMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return;
        }

        signIn({
            email: formData?.email,
            password: formData?.password
        }).unwrap()
            .then(data => {
                dispatch(setIsAuthenticated({
                    isAuthenticated: true
                }))
                dispatch(setToken({
                    token: data.body.token
                }))
            })
            .then(() => {
                navigate('/profile')
            })
            .catch(error => {
                setError(error.data.message)
            })
    }


    return (
        <form onSubmit={handleSubmit} id="signIn-form">
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password}
                       onChange={handleInputChange}/>
            </div>
            <button className="sign-in-button" type="submit">Sign In</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default SignInForm;
