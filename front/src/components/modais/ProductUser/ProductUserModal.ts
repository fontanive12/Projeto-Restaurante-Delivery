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
import { Category } from "../Category/CategoryModal";

interface ProductModalProps {
  closeModal: Function;
  productData?: Product;
}

const newStateValidationSchema = zod.object({
  name: zod.string().min(1, "Informe um nome válido"),
  // CategoryId: zod.string().min(2, "Informe uma província válida"),
});

export type Product = {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
  CategoryId: string;
  Category?: Category;
};


export function ProductModal({ closeModal, productData }: ProductModalProps) {
  const methods = useForm<Product>({
    resolver: zodResolver(newStateValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      size: "",
      price: 0,
      CategoryId: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (productData) {
      setValue("name", productData.name);
      setValue("description", productData.description);
      setValue("size", productData.size);
      setValue("price", productData.price);
      setValue("CategoryId", productData.CategoryId);
    }
  }, [productData]);

  const { errors } = formState;
}

// async function handleCrateNewProduct(data: Product) {
//   console.log("acessou");
//   try {
//     console.log(data);
//     if (data.id !== 0) {
//       console.log("acessou");
//       await axios.put(`http://localhost:3000/products/${data.id}`,
//         data
//       );

//       toast.success("Produto editado com sucesso");
//       window.location.reload();
//     } else {
//       console.log(data);
//       await axios.post("http://localhost:3000/products",
//         data
//       );
//       window.location.reload();
//       toast.success("Produto criado com sucesso");
//     }

//   } catch (error) {
//     toast.error("Erro ao criar produto");
//   }
// }

const getCategories = async () => {
  return await axios.get(`http://localhost:3000/categories`);
}

async function handleCrateNewProduct(data: Product) {
  console.log("acessou");
  try {
    console.log(data);
    if (data.id !== 0) {
      console.log("acessou");
      await axios.put(`http://localhost:3000/products/${data.id}`,
        data
      );

      toast.success("Produto editado com sucesso");
      window.location.reload();
    } else {
      console.log(data);
      await axios.post("http://localhost:3000/products",
        data
      );
      window.location.reload();
      toast.success("Produto criado com sucesso");
    }

  } catch (error) {
    toast.error("Erro ao criar produto");
  }
}

const createCategoriesCombo = async (id?: number) => {
  const cities = await getCategories();
  const data = cities.data;
  var select = `<option value="0" selected>Selecione</option>`;
  data.forEach((element: any) => {
    console.log(id)
    if (id === element.id) {
      select += `<option value="${element.id}" selected>${element.description}</option>`;
    } else {
      select += `<option value="${element.id}">${element.description}</option>`;
    }
  });
  return select;
}

export const showProductCreateBox = async () => {
  Swal.fire({
    title: 'Create product',
    html:
      '<form id="swal-form">' +
      '<input id="id" name="id" type="hidden" value="0">' +
      '<input id="name" name="name" class="swal2-input" placeholder="Name" >' +

      '<input id="description" name="description" class="swal2-input" placeholder="Description" >' +

      '<input id="size" name="size" class="swal2-input" placeholder="Size" >' +

      '<input id="price" name="price" class="swal2-input" placeholder="Price" >' +
      
      '<select name="CategoryId" class="swal2-input" id="mySelect">' + await createCategoriesCombo() + '</select>' +
      '</form>'
    ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: async () => {

      const form = document.getElementById('swal-form')

      const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

      let newProduct = { //posicoes do attributes
        id: Number(attributes[0][1]),
        name: String(attributes[1][1]),
        description: String(attributes[2][1]),
        size: String(attributes[3][1]),
        price: Number(attributes[4][1]),
        CategoryId: String(attributes[5][1])
      }

      handleCrateNewProduct(newProduct)

    }
  })
}

// const createCategoriesCombo = async (id?: number) => {
//   const cities = await getCategories();
//   const data = cities.data;
//   var select = `<option value="0" selected>Selecione</option>`;
//   data.forEach((element: any) => {
//     console.log(id)
//     if (id === element.id) {
//       select += `<option value="${element.id}" selected>${element.description}</option>`;
//     } else {
//       select += `<option value="${element.id}">${element.description}</option>`;
//     }
//   });
//   return select;
// }

const getFormData = async (form: any) => {
  const formData = new FormData(form)
  console.log(formData);
  let pairs = []

  for (const pair of formData.entries()) {
    pairs.push(pair)
  }
  return pairs
}

// export const showProductCreateBox = async () => {
//   Swal.fire({
//     title: 'Create product',
//     html:
//       '<form id="swal-form">' +
//       '<input id="id" name="id" type="hidden" value="0">' +
//       '<input id="name" name="name" class="swal2-input" placeholder="Name" >' +

//       '<input id="description" name="description" class="swal2-input" placeholder="Description" >' +

//       '<input id="size" name="size" class="swal2-input" placeholder="Size" >' +

//       '<input id="price" name="price" class="swal2-input" placeholder="Price" >' +
      
//       '<select name="CategoryId" class="swal2-input" id="mySelect">' + await createCategoriesCombo() + '</select>' +
//       '</form>'
//     ,
//     focusConfirm: false,
//     showCancelButton: true,
//     preConfirm: async () => {

//       const form = document.getElementById('swal-form')

//       const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

//       let newProduct = { //posicoes do attributes
//         id: Number(attributes[0][1]),
//         name: String(attributes[1][1]),
//         description: String(attributes[2][1]),
//         size: String(attributes[3][1]),
//         price: Number(attributes[4][1]),
//         CategoryId: String(attributes[5][1])
//       }

//       handleCrateNewProduct(newProduct)

//     }
//   })
// }

// export const showProductEditBox = async (data: Product) => {
//   Swal.fire({
//     title: 'Edit product',
//     html:
//       '<form id="swal-form">' +
//       '<input id="id" name="id" type="hidden" value=" ' + data.id + '">' +
//       '<input id="name" name="name" class="swal2-input" placeholder="Name" value=" ' + data.name + '">' +
      
//       '<input id="description" name="description" class="swal2-input" placeholder="Description" value=" ' + data.description + '" >' +
      
//       '<input id="size" name="size" class="swal2-input" placeholder="Size" value=" ' + data.size + '">' +
      
//       '<input id="price" name="price" class="swal2-input" placeholder="Price" value=" ' + data.price + '">' +
     
//       '<select name="CategoryId" class="swal2-input" id="mySelect">' + await createCategoriesCombo(Number(data.CategoryId)) + '</select>' +
//       '</form>'
//     ,
//     focusConfirm: false,
//     showCancelButton: true,
//     preConfirm: async () => {

//       const form = document.getElementById('swal-form')

//       const attributes: [string, FormDataEntryValue][] = await getFormData(form) //pega os dados do form

//       let newProduct = { //posicoes do attributes
//         id: Number(attributes[0][1]),
//         name: String(attributes[1][1]),
//         description: String(attributes[2][1]),
//         size: String(attributes[3][1]),
//         price: Number(attributes[4][1]),
//         CategoryId: String(attributes[5][1])
//       }

//       console.log(attributes)
//       handleCrateNewProduct(newProduct)
//     }
//   });
// }