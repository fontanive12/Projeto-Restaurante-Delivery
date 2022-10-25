import { useContext, useState } from "react";
import { Button } from "../../components/Button/button";
import { Input } from "../../components/Input/input";
import { InputsContainer, LoginContainer } from "./Login.styles";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const newLoginValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Informe o seu email")
    .email("Informe um e-mail válido"),
  password: zod.string().min(1, "Informe a sua senha"),
});

type Login = zod.infer<typeof newLoginValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const { signIn, user } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState("");

  const methods = useForm<Login>({
    resolver: zodResolver(newLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState, reset } = methods;

  async function handleSubmitLogin(data: Login) {
    const login = await signIn(data);
    // if (login) {
    //   navigate("/"); 
    // if (data.email === "fontanive12@gmail.com" && data.password === "123") {
    //   navigate("/home")
    // alert("oi")
    // } else {
    //   setErrorLogin("Login e/ou senha incorreto(s)");
    // }

    if (data.email === "fontanive12@gmail.com" && data.password === "123") {
      navigate("/home");
    } else {
      // setErros( error("Invalid login"));
      reset()
    }
  }

  console.log(errorLogin);

  const { errors } = formState;

  return (
    <LoginContainer>
   
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <h1>Fazer Login</h1>
          <InputsContainer>
            <Input
              width={350} //define o tamanho
              height={72}
              label="Email"
              id="email"
              placeholder="Digite seu email"
              errorMessage={errors.email?.message}
            />

            <Input
              label="Senha"
              id="password"
              placeholder="Digite sua senha"
              width={350}
              height={72}
              errorMessage={errors.password?.message}
              type="password"
            />
          </InputsContainer>
          <Button label="Login" />
          <span>{errorLogin}</span>
        </form>
      </FormProvider>
    </LoginContainer>
  );
}
