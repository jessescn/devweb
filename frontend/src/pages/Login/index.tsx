import "./styles.css";
import { Form } from "@unform/web";
import Input from "../../components/form/Input";
import { FormHandles, SubmitHandler } from "@unform/core";
import { useNavigate } from "react-router-dom";
import { handleLoginRequest, LoginData } from "../../services/auth-service";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: SubmitHandler<LoginData>) => {
    const response = await handleLoginRequest(
      formRef.current?.getData() as LoginData
    );

    if (response) {
      navigate("../");
    }
  };

  return (
    <div className="page-wrapper">
      <button className="navigate-btn" onClick={() => navigate("../")}>
        Home
      </button>
      <Form ref={formRef} onSubmit={handleSubmit} className="login-form">
        <Input name="email" placeholder="email" />
        <Input name="password" placeholder="senha" type="password" />
        <button type="submit">Login</button>
        <span onClick={() => navigate("../register")}>
          Não tem login? registre-se aqui
        </span>
      </Form>
    </div>
  );
};

export default Login;
