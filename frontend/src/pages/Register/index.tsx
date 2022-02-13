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

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = async (data: SubmitHandler<FormData>) => {
    const response = await handleRegisterRequest(
      formRef.current?.getData() as RegisterData
    );

    if (response) {
      navigate("../login");
    }
  };

  return (
    <div className="page-wrapper">
      <button className="navigate-btn" onClick={() => navigate("../")}>
        Home
      </button>
      <Form ref={formRef} onSubmit={handleSubmit} className="register-form">
        <Input name="name" placeholder="Nome" />
        <Input name="email" placeholder="email" />
        <Input name="password" placeholder="senha" type="password" />
        <button type="submit">Registrar</button>
        <span onClick={() => navigate("../login")}>Já possuo login</span>
      </Form>
    </div>
  );
};

export default Register;
