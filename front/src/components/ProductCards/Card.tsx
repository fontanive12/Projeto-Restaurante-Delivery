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

  const purchase = () => {
    showProductEditBox(data);
  };

  return (
    <DivContainer>
      <ContentContainer>
        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Descrição" data={data.name} />
        <CardInfo title="Tamanho" data={data.name} />
        <CardInfo title="Preço" data={data.name} />
        {/* <CardInfo title="Categoria" data={data.Category?.description} /> */}

        <Edit title="Comprar" onClick={purchase}>
          Comprar
        </Edit>
      </ContentContainer>
    </DivContainer>
  );
}
