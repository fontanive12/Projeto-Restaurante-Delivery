import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProductModal, Product, showProductCreateBox } from "../../components/modais/ProductUser/ProductUserModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/ProductCards/Card";
import { Input } from "../../components/Input/input";


export function ProductUserList() {
  const MySwal = withReactContent(Swal);
  const [stateList, setStateList] = useState<ProductUser[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Product[]>("http://localhost:3000/productsUser").then((response) => {
      setStateList(response.data);
    });
  }, [closeModal]);


  const showSwal = () => {
    showProductCreateBox()
  }


  return (
    <div>
      <Menu />

      <Header label="Produtos" />

      <MainContainer>
        <Header2Container>

          {/* <Input width={150} height={50} label={"Digite aqui"} id={"1"} errorMessage={"undefined"}/> */}

          {/* <Button width={120} height={50} label="Criar produto" onClick={showSwal} /> */}

        </Header2Container>
        {stateList.map((product) => {
          return <Card data={product} />;
        })}
      </MainContainer>
    </div>
  );
}