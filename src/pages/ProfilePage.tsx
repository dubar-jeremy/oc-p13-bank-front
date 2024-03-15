import {useGetProfileQuery} from "../redux/queries/authenticationApi.ts";
import EditProfileForm from "../components/forms/EditProfileForm.tsx";
import {useState} from "react";


const ProfilePage = () => {

    const {data} = useGetProfileQuery();

    const firstName = data?.body.firstName
    const lastName = data?.body?.lastName

    const [open, setOpen] = useState(false);

    const formValues = {
        firstName,
        lastName
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <>
            <div className="header">
                <h1>Welcome back<br/>{`${firstName} ${lastName}` || ''}</h1>
                <button className="edit-button" onClick={() => setOpen(true)}>Edit Name</button>
                {open && <EditProfileForm formValues={formValues} onClose={handleClose} />}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </>
    )
}

export default ProfilePage
