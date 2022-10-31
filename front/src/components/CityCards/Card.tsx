import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { City, CityModal } from "../modais/City/CityModal";
import { useNavigate } from "react-router-dom";
import {showCityEditBox} from "../modais/City/CityModal";
import axios from "axios";


interface CardProps {
  data: City;
}


export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  console.log(data)

  const showSwal = () => {
    showCityEditBox(data);

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
        axios.delete(`http://localhost:3000/cities/${id}`)
          .then((response) => {
                window.location.reload()
                // navigate("/categories")
          }, (error) => {
            Swal.fire(`Error ao deletar estado: ${error.response.data.error} `);
          });
      };
    });
  };



  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Estado" data={data.State?.name} />

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
