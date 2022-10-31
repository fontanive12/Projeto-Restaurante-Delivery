import { Header } from "../../components/Header/header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { PaymentModal, Payment } from "../../components/modais/Payment/PaymentModal";
import { Menu } from "../../components/Menu/menu";
import { MainContainer, Header2Container } from "../Users/User.styles";
import { Button } from "../../components/Button/button";
import { Card } from "../../components/PaymentCards/Card";

export function PaymentList() {
  const MySwal = withReactContent(Swal);
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Payment[]>("http://localhost:3000/payments").then((response) => {
      setPaymentList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar forma de pagamento</strong>,
      html: <PaymentModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Menu />

      <Header label="Categorias" />

      <Header2Container>
           <Button width={120} height={50} label="Criar forma de pagamento" onClick={showSwal} />
        </Header2Container>

      <MainContainer>
        <Button label="Criar forma de pagamento" onClick={showSwal} />
        {paymentList.map((payment) => {
          return <Card data={payment} />;
        })}
      </MainContainer>
    </div>
  );
}