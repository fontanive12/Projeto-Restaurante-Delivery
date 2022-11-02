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

interface CategoryModalProps {
  closeModal: Function;
  categoryData?: Category;
}

const newCategoryValidationSchema = zod.object({
  description: zod.string().min(1, "Informe uma descrição válida"),
});

export type Category = {
  id: number;
  description: string;
};

export function CategoryModal({ closeModal, categoryData }: CategoryModalProps) {
  const methods = useForm<Category>({
    resolver: zodResolver(newCategoryValidationSchema),
    defaultValues: {
      description: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (categoryData) {
      setValue("description", categoryData.description);
    }
  }, [categoryData]);

  const { errors } = formState;

  async function handleCrateNewCategory(data: Category) {
    console.log("acessou");
    try {
      console.log(categoryData);
      if (categoryData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/categories/${categoryData.id}`, {
          description: data.description,
        });

        toast.success("Categoria editada com sucesso");
      } else {
        console.log(data);
        await axios.post("http://localhost:3000/categories", {
          description: data.description,
        });

        toast.success("Categoria criada com sucesso");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar categoria");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewCategory)}>
          <Input label="Descrição" id="description" errorMessage={errors.description?.message} width={400} height={20} />
          <Button label="Enviar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}
