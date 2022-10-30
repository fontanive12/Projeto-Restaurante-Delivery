import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Button } from "../../Button/button";
import { DivContainer, ItemsFormContainer } from "../User/UserModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Input/input";
import { idText } from "typescript";
import { create } from "domain";
import Swal from "sweetalert2";
import { State } from "../State/StateModal";

interface CityModalProps {
  closeModal: Function;
  cityData?: City;
}

const newStateValidationSchema = zod.object({
  name: zod.string().min(1, "Informe um nome válido"),
  // StateId: zod.string().min(2, "Informe uma província válida"),
});

export type City = {
  id: number;
  name: string;
  StateId: string;
  State?: State;
};


export function CityModal({ closeModal, cityData }: CityModalProps) {
  const methods = useForm<City>({
    resolver: zodResolver(newStateValidationSchema),
    defaultValues: {
      name: "",
      StateId: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (cityData) {
      setValue("name", cityData.name);
      setValue("StateId", cityData.StateId);
    }
  }, [cityData]);

  const { errors } = formState;
}

async function handleCrateNewCity(data: City) {
  console.log("acessou");
  try {
    console.log(data);
    if (data.id !== 0) {
      console.log("acessou");
      await axios.put(`http://localhost:3000/cities/${data.id}`,
        data
      );

      toast.success("Cidade editada com sucesso");
      window.location.reload();
    } else {
      console.log(data);
      await axios.post("http://localhost:3000/cities",
        data
      );
      window.location.reload();
      toast.success("Cidade criada com sucesso");
    }

  } catch (error) {
    toast.error("Erro ao criar cidade");
  }
}

const getStates = async () => {
  return await axios.get(`http://localhost:3000/states`);
}

const createStatesCombo = async (id?: number) => {
  const cities = await getStates();
  const data = cities.data;
  var select = '';
  data.forEach((element: any) => {
    console.log(id)
    if (id === element.id) {
      select += `<option value="${element.id}" selected>${element.name}</option>`;
    } else {
      select += `<option value="${element.id}">${element.name}</option>`;
    }
  });
  return select;
}

const getFormData = async (form: any) => {
  const formData = new FormData(form)
  console.log(formData);
  let pairs = []

  for (const pair of formData.entries()) {
    pairs.push(pair)
  }
  return pairs
}

export const showCityCreateBox = async () => {
  Swal.fire({
    title: 'Create city',
    html:
      '<form id="swal-form">' +
      '<input id="id" name="id" type="hidden" value="0">' +
      '<input id="name" name="name" class="swal2-input" placeholder="Name" >' +
      '<select name="StateId" class="swal2-input" id="mySelect">' + await createStatesCombo() + '</select>' +
      '</form>'
    ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {

      const form = document.getElementById('swal-form')

      const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

      let newCity = { //posicoes do attributes
        id: Number(attributes[0][1]),
        name: String(attributes[1][1]),
        StateId: String(attributes[2][1])
      }

      handleCrateNewCity(newCity)

    }
  })
}

export const showCityEditBox = async (data: City) => {
  Swal.fire({
    title: 'Create city',
    html:
      '<form id="swal-form">' +
      '<input id="id" name="id" type="hidden" value=" ' + data.id + '">' +
      '<input id="name" name="name" class="swal2-input" placeholder="Name" value=" ' + data.name + '">' +
      '<select name="StateId" class="swal2-input" id="mySelect">' + await createStatesCombo(Number(data.StateId)) + '</select>' +
      '</form>'
    ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {

      const form = document.getElementById('swal-form')

      const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

      let newCity = { //posicoes do attributes
        id: Number(attributes[0][1]),
        name: String(attributes[1][1]),
        StateId: String(attributes[2][1])
      }

      console.log(attributes)
      handleCrateNewCity(newCity)
    }
  });
}