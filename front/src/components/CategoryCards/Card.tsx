import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Category, CategoryModal } from "../modais/Category/CategoryModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CardProps {
  data: Category;
}

export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar categoria</strong>,
      html: <CategoryModal closeModal={MySwal.close} categoryData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };

  const showDeleteSwal = (id: number) => {
    Swal.fire({
      title: 'Tem certeza?',
      icon: "warning",
      confirmButtonColor: '#4476a4',
      confirmButtonText: 'Deletar',
      showCancelButton: true,
      cancelButtonColor: '#c5bbbb',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/categories/` + id)
          .then((response) => {
                window.location.reload()
          }, (error) => {
            Swal.fire(`Error ao deletar categoria: ${error.response.data.error} `);
          });
          
      };
    });
  };



  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.description} />

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
