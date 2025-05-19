import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./deconnexion.css";

function Deconnexion() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/user/logout', {}, {
            withCredentials: true
        });
        if (response.status === 200) {
            navigate("/");
            window.location.reload();
        }
    } catch (e) {
        console.error("Erreur lors de la déconnexion :", e);
    }
  };

  return (
    <button className="submitButton-post" onClick={logout}>
      Déconnexion
    </button>
  );
}

export default Deconnexion;
