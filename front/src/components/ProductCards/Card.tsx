import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "../UserCards/Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Product, ProductModal } from "../modais/Product/ProductModal";
import { useNavigate } from "react-router-dom";
import {showProductEditBox} from "../modais/Product/ProductModal";
import axios from "axios";

interface CardProps {
  data: Product;
}
export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  console.log(data)

const showSwal = () => {
  showProductEditBox(data);
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
      let router = 'states'
      axios.delete(`http://localhost:3000/products/${id}`)
        .then((response) => {
              window.location.reload()
              // navigate("/categories")
        }, (error) => {
          Swal.fire(`Error ao deletar produto: ${error.response.data.error} `);
        });
    };
  });
};

  return (
    <DivContainer>
      <ContentContainer>
      <CardInfo title="Id" data={data.id} />
        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Descrição" data={data.description} />
        <CardInfo title="Tamanho" data={data.size} />
        <CardInfo title="Preço" data={data.price} />
        <CardInfo title="Categoria" data={data.Category?.description} />

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
