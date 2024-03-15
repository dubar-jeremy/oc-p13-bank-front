import {ChangeEvent, FormEvent, useState} from "react";
import {useEditProfileMutation} from "../../redux/queries/authenticationApi.ts";


interface EditProfileFormProps {
    formValues: {
        firstName?: string
        lastName?: string,
    },
    onClose: () => void
}

const EditProfileForm = ({formValues, onClose}: EditProfileFormProps) => {

    const [formData, setFormData] = useState({
        firstName: formValues?.firstName || '',
        lastName: formValues?.lastName || ''
    })

    const [editProfile] = useEditProfileMutation()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.firstName && !formData.lastName) {
            return;
        }

        await editProfile({
            firstName: formData?.firstName || '',
            lastName: formData?.lastName || ''
        })

        onClose()

    }

    return (
        <form onSubmit={handleSubmit} className="edit-profile-form">
            <div className="input-wrapper">
                <input type="text" id="firstName" name="firstName" placeholder="firstname"
                       defaultValue={formData?.firstName} onChange={handleInputChange}/>
                <input type="text" id="lastName" name="lastName" placeholder="lastname"
                       defaultValue={formData?.lastName} onChange={handleInputChange}/>
            </div>
            <div className="button-wrapper">
                <button type="submit" className="edit-button-edit-profile save">Save</button>
                <button className="edit-button-edit-profile cancel" onClick={onClose}>Cancel</button>
            </div>
        </form>
    )
}

export default EditProfileForm
