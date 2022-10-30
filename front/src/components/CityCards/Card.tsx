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


interface CardProps {
  data: City;
}


export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  console.log(data)

  const showSwal = () => {
    showCityEditBox(data);
    // MySwal.fire({
    //   title: <strong>Editar cidade</strong>,
    //   html: <CityModal closeModal={MySwal.close} cityData={data} />,
    //   showConfirmButton: false,
    // }).then(() => window.location.reload());

  };

  const ShowDelete = () => {
    // MySwal.fire({
    //   title: <strong>Deletar cidade</strong>,
    //   html: <CityModal closeModal={MySwal.close} cityData={data} />,
    //   showConfirmButton: false,
    // }).then(() => window.location.reload());
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

        <Delete title="Deletar" onClick={ShowDelete}>
          {<Trash size={32} />}
        </Delete>
      </ContentContainer>
    </DivContainer>
  );
}
