import styles from "./Card.module.css";
import { CardInfo } from "./CardInfo";

import { ContentContainer, DivContainer, Edit, Delete } from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { State, StateModal } from "../modais/State/StateModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CardProps {
  data: State;
}

export function Card({ data }: CardProps) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar estado</strong>,
      html: <StateModal closeModal={MySwal.close} stateData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());

    // const table = `
    // <h4>Cidades
    //   <button type="button"
    //     class="btn btn-secondary"
    //     style="float: right"
    //     onclick="showCityCreateBox(${id})">Create city
    //   </button>
    // </h4>
    // <div class="table-responsive">
    //   <table class="table">
    //     <thead>
    //       <tr>
    //         <th>Código</th>
    //         <th>Nome</th>
    //         <th>Ações</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       ${trHTML}
    //     </tbody>
    //   </table>
    // </div>
    // `;
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
        axios.delete(`http://localhost:3000/states/${id}`)
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
        {/* <strong>{data.id}</strong> */}
        <CardInfo title="Id" data={data.id} />
        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Província" data={data.province} />

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
