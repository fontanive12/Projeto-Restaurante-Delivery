import { Header } from "../../components/Header/header";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CategoryModal, Category } from "../../components/modais/Category/CategoryModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/CategoryCards/Card";
import { Input } from "../../components/Input/input";

export function CategoryList() {
  const MySwal = withReactContent(Swal);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Category[]>("http://localhost:3000/categories").then((response) => {
      setCategoryList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar categoria</strong>,
      html: <CategoryModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  // const names: any = ["teste", "teste2"]

  // const [search, setSearch] = useState('');

  

  // const lowerSearch = search.toLowerCase();

  // const filterNames = names
  //   .filter((name: any) => name.toLowerCase().includes(lowerSearch));

  return (
    <div>
      <Menu />

      <Header label="Categorias" />

      <Header2Container>
        <Button width={120} height={50} label="Criar estado" onClick={showSwal} />

        {/* <input type="text" value={search} onChange={(ev) => setSearch(ev.target.value)} />
        <ul>
          {names.map((name:any) => (
            <li key={name}>{name}</li>
          ))}
        </ul> */}



        {/* <Input width={150} height={50} label={"Digite aqui"} id={"2"} errorMessage={"undefined"}/> */}

        {/* <Button width={120} height={50} label="Gerar PDF" onClick={() => ({})} /> */}
        {/* <Input
              width={350} //define o tamanho
              height={72}
              label="Email"
              id="email"
              placeholder="Digite seu email"
              errorMessage={"erro"}
            /> */}


      </Header2Container>

      <MainContainer>
        <Button label="Criar categoria" onClick={showSwal} />
        {categoryList.map((category) => {
          return <Card data={category} />;
        })}
      </MainContainer>
    </div>
  );
}