import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../../Button/button";
import { DivContainer, ItemsFormContainer } from "./PaymentModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Input/input";
import { idText } from "typescript";

interface PaymentModalProps {
  closeModal: Function;
  paymentData?: Payment;
}

const newCategoryValidationSchema = zod.object({
  form: zod.string().min(3, "Informe uma forma de pagamento válida"),
});

export type Payment = {
  id: number;
  form: string;
};

export function PaymentModal({ closeModal, paymentData }: PaymentModalProps) {
  const methods = useForm<Payment>({
    resolver: zodResolver(newCategoryValidationSchema),
    defaultValues: {
      form: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (paymentData) {
      setValue("form", paymentData.form);
    }
  }, [paymentData]);

  const { errors } = formState;

  async function handleCrateNewPayment(data: Payment) {
    console.log("acessou");
    try {
      console.log(paymentData);
      if (paymentData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/payments/${paymentData.id}`, {
          form: data.form,
        });

        toast.success("Forma de pagamento editada com sucesso");
      } else {
        console.log(data);
        await axios.post("http://localhost:3000/payments", {
          form: data.form,
        });

        toast.success("Forma de pagamento criada com sucesso");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar forma de pagamento");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewPayment)}>
          <Input label="Descrição" id="form" errorMessage={errors.form?.message} width={400} height={20} />
          <Button label="Enviar" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}
