import "./styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, store, actions } from "../../store";
import { useTheme } from "../../hooks/use-theme";
import { ToggleButton } from "../toggleButton";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const { toggleTheme, theme } = useTheme();

  const handleLogout = () => {
    store.dispatch(actions.user.logout());
    navigate("login");
  };

  return (
    <div
      style={{
        backgroundColor: theme.bgColor,
        padding: "1rem",
        width: "100vw",
        height: "60px",
        display: "flex",
        justifyContent: !isHomePage ? "space-between" : "flex-end",
      }}
    >
      <div style={{ marginRight: "1rem" }}>
        <ToggleButton onChange={toggleTheme} />
      </div>

      {!isHomePage && (
        <button
          className="navigate-btn"
          onClick={() => navigate("/", { replace: true })}
        >
          Home
        </button>
      )}
      <div style={{ color: theme.color }}>
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
    </div>
  );
};

export default Header;
