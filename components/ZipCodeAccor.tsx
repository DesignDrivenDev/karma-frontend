import React, { useEffect, useState } from "react";

interface Props {
  zipcode: number;
  title: String;
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import url from "../utils/constants";
import Image from "next/image";
import loading2 from "../public/loading2.gif";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Accordion({ title, zipcode }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [data4, setdata4]: any = useState();

  const getall = async () => {
    const response = await fetch(`${url}/api/v1/properties/realestatetrends`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        zipcode: zipcode,
      }),
    });
    const respond = await response.json();
    console.log(respond);
    setdata4(respond);
  };

  if (isOpen) {
    getall();
  }

  let medianpriceprevownhouse = data4?.medianHomePrices.map(
    (el: any) => el.previouslyOwned
  );

  let medianpriceNewConstHouse = data4?.medianHomePrices.map(
    (el: any) => el.newConstruction
  );

  let mediansqftprevownhouse = data4?.medianHomePricesSqft.map(
    (el: any) => el.previouslyOwned
  );

  let mediansqftNewConstHouse = data4?.medianHomePricesSqft.map(
    (el: any) => el.newConstruction
  );

  let avgsqftprevownhouse = data4?.avgMonthlyHomeSales.map(
    (el: any) => el.previouslyOwned
  );

  let avgsqftNewConstHouse = data4?.avgMonthlyHomeSales.map(
    (el: any) => el.newConstruction
  );

  let realestateactivehouse = data4?.singleFamilyResale.map(
    (el: any) => el.active
  );

  let realestateundercontracthouse = data4?.singleFamilyResale.map(
    (el: any) => el.underContract
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Zip Code - Median Home Price (Sold Homes)",
      },
    },
  };

  const labels = ["2021", "2022", "2023"];

  const data = {
    labels,
    datasets: [
      {
        label: "Previously owned homes",
        data: medianpriceprevownhouse,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 35,
      },
      {
        label: "New construction homes",
        data: medianpriceNewConstHouse,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 35,
      },
    ],
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Zip Code - Median Price Per Square Foot (Sold Homes)",
      },
    },
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: "Previously owned homes",
        data: mediansqftprevownhouse,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 35,
      },
      {
        label: "New construction homes",
        data: mediansqftNewConstHouse,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 35,
      },
    ],
  };

  const options3 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Zip Code - Average Monthly Home Sales (Sold Home Units)",
      },
    },
  };

  const data3 = {
    labels,
    datasets: [
      {
        label: "Previously owned homes",
        data: avgsqftprevownhouse,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 35,
      },
      {
        label: "New construction homes",
        data: avgsqftNewConstHouse,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 35,
      },
    ],
  };

  const options4 = {
    plugins: {
      title: {
        display: false,
        text: "Zip Code - Single Family Re-sale Homes for Sale",
      },
    },

    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const data5 = {
    labels,
    datasets: [
      {
        label: "Previously owned homes",
        data: realestateactivehouse,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 35,
      },
      {
        label: "New construction homes",
        data: realestateundercontracthouse,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 35,
      },
    ],
  };

  return (
    <>
      <div className="py-2">
        <h4
          onClick={() => setIsOpen((prev) => !prev)}
          className={`cursor-pointer text-xl sm:text-2xl lg:text-2xl transition-all duration-300 font-bold bg-gray-200 py-3 px-5 flex justify-between hover:shadow-md
                ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
        >
          {title}
          <span>
            <svg
              className={`h-8 w-8 inline duration-300 transition-transform ${
                isOpen ? "rotate-180" : null
              }`}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </h4>
        <div
          className={`
                ${
                  isOpen
                    ? "max-h-[100%] duration-500 transition-all ease-in"
                    : "max-h-0 duration-300 transition-all ease-out"
                }
                bg-white shadow-lg w-full rounded-b-lg  overflow-scroll`}
        >
          <div className=" flex flex-wrap gap-x-10 gap-y-3 py-5 px-5 justify-center justify-items-center">
            <div className="lg:grid lg:grid-cols-2 ">
              {/* Zip Code - Median Home Price (Sold Homes) */}
              <div className="p-5 lg:w-full md:p-10">
                <p className="text-lg font-bold">
                  Zip Code - Median Home Price (Sold Homes)
                </p>
                <div className="h-56 md:h-64">
                  <Bar options={options} data={data} />
                </div>
                <div className="text-center text-xs p-3">
                  <p>Median Home Price (Sold Homes)</p>
                  <table className="table-fixed text-xs font-bold w-full border-2 border-gray-200 p-10">
                    <thead className="content-center "></thead>
                    <tbody className="text-center">
                      <tr className="p-1 border-2 border-b-gray-200 border-t-0 border-r-0 border-l-0">
                        <td>Year</td>
                        <td>2021</td>
                        <td>2022</td>
                        <td>2023</td>
                      </tr>
                      <tr className="p-1">
                        <td>Pre-owned</td>
                        {data4?.medianHomePrices.map((el: any) => (
                          <>
                            <td>
                              {el.previouslyOwned.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </>
                        ))}
                      </tr>
                      <tr className="p-1">
                        <td>New Const</td>
                        {data4?.medianHomePrices.map((el: any) => (
                          <>
                            <td>
                              {el.newConstruction.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5 lg:w-full md:p-10">
                <p className="text-lg font-bold">
                  Zip Code - Median Price Per Square Foot (Sold Homes)
                </p>
                <div className="h-56 md:h-64">
                  <Bar options={options2} data={data2} />
                </div>
                <div className="text-center text-xs p-3">
                  <p>Median Price Per Square Foot (Sold Homes)</p>
                  <table className="table-fixed text-xs font-bold w-full border-2 border-gray-200 p-10">
                    <thead className="content-center "></thead>
                    <tbody className="text-center">
                      <tr className="p-1 border-2 border-b-gray-200 border-t-0 border-r-0 border-l-0">
                        <td>Year</td>
                        <td>2021</td>
                        <td>2022</td>
                        <td>2023</td>
                      </tr>
                      <tr className="p-1">
                        <td>Pre-owned</td>
                        {data4?.medianHomePricesSqft.map((el: any) => (
                          <>
                            <td>
                              {el.previouslyOwned.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </>
                        ))}
                      </tr>
                      <tr className="p-1">
                        <td>New Const</td>
                        {data4?.medianHomePricesSqft.map((el: any) => (
                          <>
                            <td>
                              {el.newConstruction.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="p-5 lg:w-full md:p-10">
                <p className="text-lg font-bold">
                  Zip Code - Average Monthly Home Sales (Sold Home Units)
                </p>
                <div className="h-56 md:h-64">
                  <Bar options={options3} data={data3} />
                </div>
                <div className="text-center text-xs p-3">
                  <p>Median Price Per Square Foot (Sold Homes)</p>
                  <table className="table-fixed text-xs font-bold w-full border-2 border-gray-200 p-10">
                    <thead className="content-center "></thead>
                    <tbody className="text-center">
                      <tr className="p-1 border-2 border-b-gray-200 border-t-0 border-r-0 border-l-0">
                        <td>Year</td>
                        <td>2021</td>
                        <td>2022</td>
                        <td>2023</td>
                      </tr>
                      <tr className="p-1">
                        <td>Pre-owned</td>
                        {data4?.avgMonthlyHomeSales.map((el: any) => (
                          <>
                            <td>{el.previouslyOwned}</td>
                          </>
                        ))}
                      </tr>
                      <tr className="p-1">
                        <td>New Const</td>
                        {data4?.avgMonthlyHomeSales.map((el: any) => (
                          <>
                            <td>{el.newConstruction}</td>
                          </>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className=" p-5 md:w-full md:p-10">
                <p className="text-lg font-bold">
                  {" "}
                  Zip Code - Single Family Re-sale Homes for Sale
                </p>
                <div className="h-56 md:h-64">
                  <Bar options={options4} data={data5} />
                </div>
                <div className="text-center text-xs p-3">
                  <p>Number of Single Family Re-sale Homes for Sale</p>
                  <table className="table-fixed text-xs font-bold w-full border-2 border-gray-200 p-10">
                    <thead className="content-center "></thead>
                    <tbody className="text-center">
                      <tr className="p-1 border-2 border-b-gray-200 border-t-0 border-r-0 border-l-0">
                        <td>Year</td>
                        <td>2021</td>
                        <td>2022</td>
                        <td>2023</td>
                      </tr>
                      <tr className="p-1">
                        <td>Pre-owned</td>

                        <td>{realestateactivehouse[0]}</td>
                        <td>{realestateactivehouse[1]}</td>
                        <td>{realestateactivehouse[2]}</td>
                      </tr>
                      <tr className="p-1">
                        <td>New construction:</td>
                        <td>{realestateundercontracthouse[0]}</td>
                        <td>{realestateundercontracthouse[1]}</td>
                        <td>{realestateundercontracthouse[2]}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Accordion;
