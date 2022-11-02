// import { Header } from "../../components/Header/header";

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// // import { CategoryModal, Category } from "../../components/modais/Category/CategoryModal";
// import { Menu } from "../../components/Menu/menu";
// import { MainContainer, Header2Container } from "../Users/User.styles";
// import { Button } from "../../components/Button/button";
// // import { Card } from "../../components/CategoryCards/Card";

// export function Dashboard() {
  
//   return (
//     <div>
//       <Menu />

//       <Header label="Dashboard" />


//       <MainContainer>
//        <div>oi</div>
//       </MainContainer>
//     </div>
//   );
// }

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header/header";
import { Menu } from "../../components/Menu/menu";

import Chart from "react-apexcharts";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { darkTheme } from "../../styles/themes/dark";
import axios from "axios";


export function Dashboard() {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: darkTheme.secondary,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime" as "datetime",
      axisBorder: {
        color: darkTheme.secondary,
      },
      axisTicks: {
        color: darkTheme.secondary,
      },
      categories: [
        "2022-10-15T00:00:00Z",
        "2022-10-16T00:00:00Z",
        "2022-10-17T00:00:00Z",
        "2022-10-18T00:00:00Z",
        "2022-10-19T00:00:00Z",
        "2022-10-20T00:00:00Z",
        "2022-10-21T00:00:00Z",
      ],
    },
    fill: {
      opacity: 0.3,
      type: "gradient",
      gradient: {
        shade: "dark",
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

const getData = async () => {
  return await axios.get(`http://localhost:3000/states`);
  

}

const states = async () => {
  const states = await getData();
    const data = states.data;

    console.log("-----------------------data" + data)
}

states()

  const series = [
    {
      name: "series1",
      data: [31, 120, 10, 28, 18, 51, 29],
    },
  ];
  return (
    <Flex direction="column" h="100vh">
      <Header label="Dashboard"/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        {/* <Menu /> */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          pagination={{ clickable: true }}
          initialSlide={0}
        >
          <SwiperSlide>
            <SimpleGrid flex="1" gap="4" minChildWidth={320}>
              <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                <Text>Inscritos na semana</Text>
                <Chart
                  type="area"
                  height={160}
                  options={options}
                  series={series}
                />
              </Box>

              <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                <Text>Likes na semana</Text>
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={160}
                />
              </Box>
            </SimpleGrid>
          </SwiperSlide>

          <SwiperSlide>
            <SimpleGrid flex="1" gap="4" minChildWidth={320}>
              <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                <Text>Inscritos na semana</Text>
                <Chart
                  type="area"
                  height={160}
                  options={options}
                  series={series}
                />
              </Box>

              <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
                <Text>Likes na semana</Text>
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={160}
                />
              </Box>
            </SimpleGrid>
          </SwiperSlide>
        </Swiper>
      </Flex>
    </Flex>
  );
}
