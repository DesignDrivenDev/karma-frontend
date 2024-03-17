import React, { useEffect, useState } from "react";
import url from "../utils/constants";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Accordion2 from "./Accordion2";
import Link from "next/link";
import Image from "next/image";
import nodata from "../public/nodata.svg";

const Neigbhourhood = ({ subdivision, newConstruction }: any) => {
  const [data3, setdata3]: any = useState();
  const [month, setmonth] = useState(12);

  // console.log(newConstruction , subdivision)
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const labels = ["Low", "Median", "High"];

  let bardata: any = data3 && [
    data3.startsqft,
    data3.medainsqft,
    data3.endsqft,
  ];

  const data2 = {
    labels,
    datasets: [
      {
        label: "$ / sqft",
        data: bardata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const dataa = {
    labels,
    datasets: [
      {
        label: "$ / sqft",
        data: bardata,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 25,
      },
    ],
  };

  function nFormatter(num: number, digits: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  useEffect(() => {
    const getall = async () => {
      const response = await fetch(
        `${url}/api/v1/properties/neighbourhoodSummary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: month,
            subdivision: subdivision,
            newConstruction: newConstruction,
          }),
        }
      );
      const respond = await response.json();
      console.log(respond);
      setdata3(respond);
    };

    getall();
  }, [month]);

  return (
    <>
      {data3 != false ? (
        <>
          <Accordion2 title="Neighborhood Summary">
            <div className="flex flex-col lg:flex  lg:flex-row justify-self-center  w-full">
              <div className="lg:w-[50%]  flex flex-col    lg:px-5 py-3">
                {newConstruction === "true" ? (
                  <>
                    <p className="font-bold text-md  md:block">
                      New Construction Homes - Neighborhood Summary
                    </p>
                    <span className="text-sm  md:block">
                      Sold new single family homes in{" "}
                      <span className="font-bold">{subdivision}</span>
                    </span>
                    <span className="text-xs italic  md:block">
                      (only includes new construction)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-base  md:block">
                      Re-Sale Homes Summary
                      <span className="font-bold">{subdivision}</span>
                    </span>
                    <span className="text-sm italic  md:block">
                      (single family / not new construction)
                    </span>
                  </>
                )}
                <div className="py-3">
                  <label
                    htmlFor="maxarea"
                    className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400 w-32 "
                  ></label>
                  <select
                    id="maxarea"
                    name="months"
                    onChange={(e) => {
                      setmonth(parseInt(e.target.value));
                    }}
                    className="bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value={12}>1 year ago</option>
                    <option value={6}>6 months ago</option>
                    <option value={9}>9 months ago</option>
                  </select>
                </div>
                {data3 && (
                  <>
                    <div className="flex border-2 p-1  border-b-gray-300 border-x-0 border-t-0 border-black">
                      <span className="w-[50%] text-left text-xs md:text-md p-1 ">
                        Median $ / Sq. Ft{" "}
                      </span>
                      {data3.medainprice && (
                        <span className="w-[50%] text-right font-bold text-xs md:text-md p-1">
                          {nFormatter(data3.medainsqft, 1)}
                          {data3.medainsqft.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex border-2 border-b-gray-300 border-x-0 border-t-0  p-1 border-black">
                      <span className="w-[50%] text-left text-xs md:text-md p-1">
                        $ / Sq. Ft. Range{" "}
                      </span>

                      <span className="w-[50%] text-right font-bold text-xs md:text-md p-1">
                        {data3.startsqft != null && (
                          <span>
                            {data3.startsqft.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            })}{" "}
                          </span>
                        )}
                        -{" "}
                        {data3.endsqft != null && (
                          <span>
                            {data3.endsqft.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 0,
                            })}{" "}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex border-2 p-1  border-b-gray-300 border-x-0 border-t-0 border-black">
                      <span className="w-[50%] text-left text-xs md:text-md p-1">
                        Median Sales Price{" "}
                      </span>
                      {data3.medainprice && (
                        <span className="w-[50%] text-right font-bold text-xs md:text-md p-1">
                          {data3.medainprice.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      )}
                    </div>
                    <div className="flex border-2 p-1 border-b-gray-300 border-x-0 border-t-0   border-black">
                      <span className="w-[50%] p-1 text-left text-xs md:text-md">
                        Sales Price Range{" "}
                      </span>
                      {data3 && (
                        <span className="w-[50%] text-right font-bold">
                          {data3.startpricearray != null && (
                            <span className="text-xs md:text-md">
                              {data3.startpricearray.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}{" "}
                            </span>
                          )}
                          -{" "}
                          {data3.endpricearray != null && (
                            <span className="text-xs md:text-md">
                              {data3.endpricearray.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 0,
                              })}{" "}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex border-2 p-1  border-b-gray-300 border-x-0 border-t-0 border-black">
                      <span className="w-[50%] text-left text-xs md:text-md p-1">
                        # of New Homes{" "}
                      </span>
                      {data3 && (
                        <span className="w-[50%] text-right font-bold text-xs md:text-md p-1">
                          <Link
                            href={{
                              pathname: "/search-sold",
                              query: {
                                subdivision: subdivision,
                                newconst: newConstruction,
                              },
                            }}
                          >
                            <div>{data3.data.length} homes sold</div>
                          </Link>
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="lg:w-[50%] py-4 text-left grid justify-center ">
                <div className="w-full">
                <p className="font-bold text-base">
                  Neighborhood Median $ / Sq. Ft. of New Construction Homes
                </p>
                <span className="text-sm">
                  Sold new single family homes in{" "}
                  <span className="font-bold">{subdivision}</span>
                </span>
                <span className="text-xs italic block">
                  (only includes new construction)
                </span>

                <div className="hidden lg:block">
                  <Bar options={options} data={data2} />
                </div>

                <div className="lg:hidden">
                  <Bar options={options} data={dataa} />
                </div>
                </div>
              </div>
            </div>
          </Accordion2>
        </>
      ) : (
        <>
          <Accordion2 title="Neighborhood Summary">
            <div className="py-3">
              <label
                htmlFor="maxarea"
                className="block mb-2 text-sm  font-medium text-gray-900 dark:text-gray-400 w-32 "
              ></label>
              <select
                id="maxarea"
                name="months"
                onChange={(e) => {
                  setmonth(parseInt(e.target.value));
                }}
                className="bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Select</option>
                <option value={12}>1 year ago</option>
                <option value={6}>6 months ago</option>
                <option value={9}>9 months ago</option>
              </select>
            </div>
            <Image height={500} src={nodata}></Image>
            <div className="grid w-full text-center place-items-center">
              <p>No Data Found</p>
            </div>
          </Accordion2>
        </>
      )}
    </>
  );
};

export default Neigbhourhood;
