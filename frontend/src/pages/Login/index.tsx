import "./styles.css";
import { Form } from "@unform/web";
import Input from "../../components/form/Input";
import { FormHandles } from "@unform/core";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../../services/auth-service";
import { store, actions, useSelector } from "../../store";
import { useEffect, useRef } from "react";
import { useTheme } from "../../hooks/use-theme";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const formRef = useRef<FormHandles>(null);
  const loginStatus = useSelector((state) => state.user.loginStatus);

  const handleSubmit = async () => {
    const credentials = formRef.current?.getData() as Credentials;
    store.dispatch(actions.user.login(credentials));
  };

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("../", { replace: true });
    }
  }, [loginStatus, navigate]);

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bgColor }}>
      <Form ref={formRef} onSubmit={handleSubmit} className="login-form">
        <Input name="email" placeholder="email" />
        <Input name="password" placeholder="senha" type="password" />
        <button
          type="submit"
          style={{ backgroundColor: theme.color, color: theme.bgColor }}
        >
          Login
        </button>
        <span
          style={{ color: theme.color }}
          onClick={() => navigate("../register", { replace: true })}
        >
          Não tem login? registre-se aqui
        </span>
      </Form>
    </div>
  );
};

export default Login;
