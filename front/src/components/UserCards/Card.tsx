import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { showUserEditBox, User, UserModal } from "../modais/User/UserModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CardProps {
  data: User;
}

export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    showUserEditBox(data);
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
        axios.delete(`http://localhost:3000/users/` + id)
          .then((response) => {
            window.location.reload()
            // navigate("/categories")
          }, (error) => {
            Swal.fire(`Error ao deletar usuário: ${error.response.data.error} `);
          });
      };
    });
  };



  return (
    <DivContainer>
      <ContentContainer>
        <CardInfo title="Id" data={data.id} />
        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Email" data={data.email} />
        <CardInfo title="Idade" data={data.age} />
        <CardInfo title="Gênero" data={data.sex} />
        <CardInfo title="Telefone" data={data.phoneNumber} />
        <CardInfo title="Cidade" data={data.City?.name} />
        <CardInfo title="Número" data={data.number} />

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
