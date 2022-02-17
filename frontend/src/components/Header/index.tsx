import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, store, actions } from "../../store";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  const handleLogout = () => {
    store.dispatch(actions.user.logout());
    navigate("login");
  };

  return (
    <div
      style={{
        padding: "1rem",
        width: "100vw",
        height: "60px",
        display: "flex",
        justifyContent: !isHomePage ? "space-between" : "flex-end",
      }}
    >
      {!isHomePage && (
        <button
          className="navigate-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Home
        </button>
      )}
      {user ? (
        <div className="wrapper">
          <h4>
            <i>Olá, {user.name}</i>
          </h4>
          <button className="navigate-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      ) : (
        isHomePage && (
          <button className="navigate-btn" onClick={() => navigate("login")}>
            Login
          </button>
        )
      )}
    </div>
  );
};

export default Header;
