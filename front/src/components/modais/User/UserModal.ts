import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../../Button/button";
import { DivContainer, ItemsFormContainer } from "./UserModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Input/input";
import { idText } from "typescript";
import { Select } from "../../Select/Select";
import { City } from "../City/CityModal";
import Swal from "sweetalert2";
import { Data } from "../../UserCards/CardInfo.styles";
// import { watch } from "node:fs";
// import { watch } from "fs";

interface UserModalProps {
  closeModal: Function;
  userData?: User;
}

const newUserValidationSchema = zod.object({
  name: zod.string().min(1, "Informe um nome válido"),
  email: zod
    .string()
    .min(1, "Informe a sua senha")
    .email("Informe um e-mail válido"),
  password: zod.string().min(5, "Sua senha deve conter no mínimo 5 digitos"),
  age: zod.number(),
  sex: zod.string(),
  phoneNumber: zod.string(),
  number: zod.number(),
});

export type User = {
  id: number;
  name: string;
  age: number;
  sex: string;
  phoneNumber: string;
  number: number;
  email: string;
  password: string;
  CityId: string;
  City?: City;
};

export function UserModal({ closeModal, userData }: UserModalProps) {
  const methods = useForm<User>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      age: undefined,
      sex: "",
      phoneNumber: "",
      number: undefined,
      email: "",
      password: "",
      CityId: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setValue("age", userData.age);
      setValue("sex", userData.sex);
      setValue("CityId", String(userData.CityId));
    }
  }, [userData]);

  const { errors } = formState;
}

async function handleCrateNewUser(data: User) {
  console.log("acessou");
  try {
    console.log(data);
    if (data.id !== 0) {
      console.log("acessou");
      await axios.put(`http://localhost:3000/users/${data.id}`,
        data)
      toast.success("Usuário Editado com sucesso");
    } else {
      console.log(data);
      await axios.post("http://localhost:3000/users",
        data);

      toast.success("Usuário Criado com sucesso");
      console.log(data)
      axios.get("http://localhost:3000/email/" + data["email"]);
    }

    // closeModal();
  } catch (error) {
    toast.error("Erro ao criar usuário");
  }
}

const getCities = async () => {
  return await axios.get(`http://localhost:3000/cities`);
}

const createCitiesCombo = async (id?: number) => {
  const users = await getCities();
  const data = users.data;
  var select = `<option value="0">Selecione uma cidade</option>`;
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

export const showUserCreateBox = async () => {
  Swal.fire({
    title: 'Create user',
    html:
      '<form id="swal-form">' +
      '<input id="id" name="id" type="hidden" value="0">' +

      '<input id="name" name="name" class="swal2-input" placeholder="Nome">' +

      '<input id="age" name="age" class="swal2-input" placeholder="Idade">' +

      '<input id="sex" name="sex" class="swal2-input" placeholder="Gênero" >' +

      '<input id="phoneNumber" name="phoneNumber" class="swal2-input" placeholder="Número de telefone">' +
      
      '<input id="number" name="number" class="swal2-input" placeholder="Número">' +

      '<input id="email" name="email" class="swal2-input" placeholder="Email">' +

      '<input id="password" name="password" class="swal2-input" placeholder="Senha" >' +

      '<select name="CityId" class="swal2-input" id="mySelect">' + await createCitiesCombo() + '</select>' +

      '</form>'
    ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {

      const form = document.getElementById('swal-form')

      const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

      let newUser = { //posicoes do attributes
        id: Number(attributes[0][1]),
        name: String(attributes[1][1]),
        age: Number(attributes[2][1]),
        sex: String(attributes[3][1]),
        phoneNumber: String(attributes[4][1]),
        number: Number(attributes[5][1]),
        email: String(attributes[6][1]),
        password: String(attributes[7][1]),
        CityId: String(attributes[8][1])
      }

      handleCrateNewUser(newUser)

      console.log("------------cidade" + Data.CityId)
    }
  })
}

export const showUserEditBox = async (data: User) => {
  Swal.fire({
    title: 'User city',
    html:
      '<form id="swal-form">' +

      '<input id="id" name="id" type="hidden" value=" ' + data.id + '">' +

      '<input id="name" name="name" class="swal2-input" placeholder="Nome" value=" ' + data.name + '">' +

      '<input id="age" name="age" class="swal2-input" placeholder="Idade" value=" ' + data.age + '">' +

      '<input id="sex" name="sex" class="swal2-input" placeholder="Gênero" value=" ' + data.sex + '">' +

      '<input id="phoneNumber" name="phoneNumber" class="swal2-input" placeholder="Número de telefone" value=" ' + data.phoneNumber + '">' +
      
      '<input id="number" name="number" class="swal2-input" placeholder="Número" value=" ' + data.number + '">' +

      '<input id="email" name="email" class="swal2-input" placeholder="Email" value=" ' + data.email + '">' +

      '<input id="password" name="password" class="swal2-input" placeholder="Senha" value=" ' + data.password + '">' +

      '<select name="CityId" class="swal2-input" id="mySelect">' + await createCitiesCombo(Number(data.CityId)) + '</select>' +

      '</form>'
    ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {

      const form = document.getElementById('swal-form')

      const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

      let newUser = { //posicoes do attributes
        id: Number(attributes[0][1]),
        name: String(attributes[1][1]),
        age: Number(attributes[2][1]),
        sex: String(attributes[3][1]),
        phoneNumber: String(attributes[4][1]),
        number: Number(attributes[5][1]),
        email: String(attributes[6][1]),
        password: String(attributes[7][1]),
        CityId: String(attributes[8][1])

      }

      console.log(attributes)
      handleCrateNewUser(newUser)
    }

  });

}
