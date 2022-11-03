import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../../Button/button";
import { DivContainer, ItemsFormContainer } from "../User/UserModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Input/input";
import { idText } from "typescript";

interface StateModalProps {
  closeModal: Function;
  stateData?: State;
}

const newStateValidationSchema = zod.object({
  name: zod.string().min(4, "Informe um nome válido"),
  province: zod.string().min(2, "Informe uma província válida"),
});

export type State = {
  id: number;
  name: string;
  province: string;
};

export function StateModal({ closeModal, stateData }: StateModalProps) {
  const methods = useForm<State>({
    resolver: zodResolver(newStateValidationSchema),
    defaultValues: {
      name: "",
      province: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (stateData) {
      setValue("name", stateData.name);
      setValue("province", stateData.province);
    }
  }, [stateData]);

  const { errors } = formState;

  async function handleCrateNewState(data: State) {
    console.log("acessou");
    try {
      console.log(stateData);
      if (stateData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/states/${stateData.id}`, {
          name: data.name,
          province: data.province,
        });
        toast.success("Estado editado com sucesso");
        // closeModal();
      } else {
        console.log(data);
        await axios.post("http://localhost:3000/states", {
          name: data.name,
          province: data.province,

        });

        toast.success("Estado criado com sucesso");
        closeModal();
      }

    } catch (error) {
      toast.error("Erro ao criar estado");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewState)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} width={400} height={20} />
          <Input label="Província" id="province" errorMessage={errors.province?.message} width={400} height={20} />

          <Button label="Enviar" />
        </form>
      </FormProvider>
    </DivContainer>
  );

}
