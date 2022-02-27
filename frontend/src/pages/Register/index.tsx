import "./styles.css";
import { Form } from "@unform/web";
import Input from "../../components/form/Input";
import { FormHandles, SubmitHandler } from "@unform/core";
import { useNavigate } from "react-router-dom";
import {
  handleRegisterRequest,
  RegisterData,
} from "../../services/auth-service";
import { useRef } from "react";
import { useTheme } from "../../hooks/use-theme";

const Register = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const formRef = useRef<FormHandles>(null);
  const handleSubmit = async (data: SubmitHandler<FormData>) => {
    const response = await handleRegisterRequest(
      formRef.current?.getData() as RegisterData
    );

    if (response) {
      navigate("../login", { replace: true });
    }
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: theme.bgColor }}>
      <Form ref={formRef} onSubmit={handleSubmit} className="register-form">
        <Input name="name" placeholder="Nome" />
        <Input name="email" placeholder="email" />
        <Input name="password" placeholder="senha" type="password" />
        <button
          type="submit"
          style={{ backgroundColor: theme.color, color: theme.bgColor }}
        >
          Registrar
        </button>
        <span
          style={{ color: theme.color }}
          onClick={() => navigate("../login")}
        >
          Já possuo login
        </span>
      </Form>
    </div>
  );
};

export default Register;
