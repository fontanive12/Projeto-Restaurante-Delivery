import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ProductModal, Product, showProductCreateBox } from "../../components/modais/Product/ProductModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/ProductCards/Card";
import { Input } from "../../components/Input/input";

const ENDPOINT = `http://localhost:3000`;

export function ProductList() {
  const MySwal = withReactContent(Swal);
  const [stateList, setStateList] = useState<Product[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Product[]>("http://localhost:3000/products").then((response) => {
      setStateList(response.data);
    });
  }, [closeModal]);


  const showSwal = () => {
    showProductCreateBox()
  }

  const generatePdf = () => {
    window.open(`${ENDPOINT}/products/pdf`);
  }
  const generateCsv = () => {
    window.open(`${ENDPOINT}/products/csv`);
  }

  return (
    <div>
      <Menu />

      <Header label="Produtos" />

      <MainContainer>
        <Header2Container>

          {/* <Input width={150} height={50} label={"Digite aqui"} id={"1"} errorMessage={"undefined"}/> */}

          <Button width={120} height={50} label="Criar produto" onClick={showSwal} />

          <Button label="PDF" onClick={generatePdf} />
          <Button label="PDF" onClick={generateCsv} />

        </Header2Container>
        {stateList.map((product) => {
          return <Card data={product} />;
        })}
      </MainContainer>
    </div>
  );
}