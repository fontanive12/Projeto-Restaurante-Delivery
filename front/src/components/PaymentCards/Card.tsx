import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Payment, PaymentModal } from "../modais/Payment/PaymentModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CardProps {
  data: Payment;
}

export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar forma de pagamento</strong>,
      html: <PaymentModal closeModal={MySwal.close} paymentData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };

  const showDeleteSwal = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não será capaz de reverte isto!",
      icon: "warning",
      confirmButtonColor: '#4476a4',
      confirmButtonText: 'Deletar',
      showCancelButton: true,
      cancelButtonColor: '#c5bbbb',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let router = 'payments'
        axios.delete(`http://localhost:3000/payments/${id}`)
          .then((response) => {
                window.location.reload()
                // navigate("/categories")
          }, (error) => {
            Swal.fire(`Error ao deletar forma de pagamento: ${error.response.data.error} `);
          });
      };
    });
  };

  return (
    <DivContainer>
      <ContentContainer>
      <CardInfo title="Id" data={data.id} />
        {/* <strong>{data.id}</strong> */}

        <CardInfo title="Forma de pagamento" data={data.form} />

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32} />}
        </Edit>

        <Delete title="Deletar" onClick={() => showDeleteSwal(data.id)}>
          {<Trash size={32} />}
        </Delete>
      </ContentContainer>
    </DivContainer>
  );
}
