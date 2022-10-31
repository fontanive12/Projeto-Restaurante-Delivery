import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CategoryModal, Category } from "../../components/modais/Category/CategoryModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/CategoryCards/Card";

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

  return (
    <div>
      <Menu />

      <Header label="Categorias" />

      <Header2Container>
          {/* <Input width={150} height={50} label={"Digite aqui"} id={"2"} errorMessage={"undefined"}/> */}

           {/* <Button width={120} height={50} label="Gerar PDF" onClick={() => ({})} /> */}
           <Button width={120} height={50} label="Criar estado" onClick={showSwal} />

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