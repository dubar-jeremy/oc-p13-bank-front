import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {

    const navigation = useNavigate();

    return (
        <div className="not-found">
            <h1>Page non trouvée</h1>
            <button className="edit-button" onClick={() => navigation('/')}>Retour à l'accueil</button>
        </div>
    )
}

export default NotFoundPage