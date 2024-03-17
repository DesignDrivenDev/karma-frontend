import { Popover } from "@headlessui/react";

// Assets
import { useEffect, useState } from "react";
import HouseCard from "../components/HouseCard";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import nodata from "../public/nodata.svg";
import url from "../utils/constants";
import React from "react";
import Navbar from "../components/Navbar";
import loading2 from "../public/loading2.gif";
const Search = () => {
  const router = useRouter();

  const { setlikedHouses, token, likedHouses } = useAuth();

  const pricelowest = [50000, 75000, 100000, 125000, 150000, 175000];
  const pricehighest = [75000, 100000, 125000, 150000, 175000, 1000000];

  const minarea = [
    600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
  ];
  const maxarea = [
    800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200,
  ];

  //status data and information
  const [status, setStatus] = useState("");

  //masterbedroom data and information
  const [masterBedroomData, setMasterBedroomData] = useState("");

  let { subdivision, newconst } = router.query;

  // console.log(subdivision)

  //search data
  const [search, setsearch] = useState("" as string);

  //searh address data
  const [addressdata, setaddressdata] = useState([]);

  const [addfield, setaddfield] = useState(false);

  //loading
  const [loading, setloading] = useState(false);

  //neighbourhoodfeatures data and state information
  const [checked, setChecked] = useState("");

  //exteriorFeatures data and state information
  const [checked2, setChecked2] = useState("");

  const [page, setpage] = useState(0);

  const [pageno, setpageno] = useState(0);

  const [data, setdata] = useState<any[]>();

  const [obj, setobj] = useState({
    bedroomsTotal: 0,
    bathroomsTotalInteger: 0,
    minbuildingAreaTotal: 0,
    maxbuildingAreaTotal: 0,
    minPrice: 0,
    maxPrice: 0,
    minyearBuilt: 0,
    maxyearBuilt: 0,
    propertySubType: "Single Family Residence",
    lotSizeArea: 0,
    standardStatus: "Closed",
    masterBedroomLevel: "",
    sort: 1,
    newConstructionYN: newconst,
    subdivname: subdivision,
  });

  //main useeffect
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(
        `${url}/api/v1/properties/fetchbyproperties/${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bedroomsTotal: 0,
            bathroomsTotalInteger: 0,
            minbuildingAreaTotal: 0,
            maxbuildingAreaTotal: 0,
            minPrice: 0,
            maxPrice: 0,
            minyearBuilt: 0,
            maxyearBuilt: 0,
            propertySubType: "Single Family Residence",
            lotSizeArea: 0,
            masterBedroomLevel: "",
            standardStatus: "Closed",
            communityFeatures: "",
            exteriorFeatures: "",
            searchtext: "",
            sort: 1,
            newConstructionYN: newconst === "true",
            subdivname: subdivision,
          }),
        }
      );

      const data = await res.json();
      setdata(data.data);
      setpageno(data.pages);
    };

    if (subdivision) {
      getUsers();
    }
  }, [page, obj, router.query]);

  //To start from 1 page
  useEffect(() => {
    setpage(0);
  }, [obj]);

  //getting all liked houses
  useEffect(() => {
    const getall = async () => {
      const response = await fetch(`${url}/api/v1/properties/getlikedhouses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const house = await response.json();
      setlikedHouses(house);
    };
    if (token) {
      getall();
    }
  }, [token]);

  //onchange function to set value
  const onChange = (e: any) => {
    //logic for checkbox neighbourhoodfeatures
    if (
      e.target.name === "neighbourhoodGolf" ||
      e.target.name === "neighbourhoodTennis Court(s)" ||
      e.target.name === "neighbourhoodLake" ||
      e.target.name === "neighbourhoodClubhouse" ||
      e.target.name === "neighbourhoodSidewalks"
    ) {
      let updatedList = [...checked];

      const results: any = [];

      if (e.target.checked) {
        updatedList = [...checked, e.target.value];
      } else {
        updatedList.splice(checked.indexOf(e.target.value), 1);
        results.splice(checked.indexOf(e.target.value), 1);
      }

      updatedList.forEach((element: any) => {
        if (element !== "") {
          results.push(element);
        }
      });

      if (results.length > 0) {
        setChecked(results);
      } else {
        setChecked("");
      }
    }

    //logic for checkbox Exteriorfeatures
    if (
      e.target.name === "exteriorFeaturesFence" ||
      e.target.name === "exteriorFeaturesTerrace"
    ) {
      let updatedList2 = [...checked2];

      const results2: any = [];

      if (e.target.checked) {
        updatedList2 = [...checked2, e.target.value];
      } else {
        updatedList2.splice(checked2.indexOf(e.target.value), 1);
        results2.splice(checked2.indexOf(e.target.value), 1);
      }

      updatedList2.forEach((element) => {
        if (element !== "") {
          results2.push(element);
        }
      });

      if (results2.length > 0) {
        setChecked2(results2);
      } else {
        setChecked2("");
      }
    }

    if (e.target.name == "Status") {
      setStatus(e.target.value);
    }

    if (e.target.name == "Master") {
      setMasterBedroomData(e.target.value);
    }

    //logic for changing types related to selecting values or name
    if (
      e.target.name !== "propertySubType" &&
      e.target.name !== "communityFeatures" &&
      e.target.name !== "exteriorFeatures"
    ) {
      // console.log(parseInt(e.target.value));
      setobj((prev) => {
        return {
          ...prev,
          [e.target.name]: parseInt(e.target.value),
        };
      });
      return;
    }
    //main function to asign value to name
    setobj({ ...obj, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar></Navbar>
      {/* main container for filters start  */}
      <div className="flex flex-row flex-wrap max-w-7xl w-11/12 mx-auto gap-2 pt-4 pb-2 ">
        {/* bedrooms form */}
        <div className="flex flex-col">
          <Popover className="relative">
            <Popover.Button
              className={`transition-colors duration-300 text-black bg-white hover:bg-slate-200 focus:outline-none font-bold rounded-full px-3 py-1.5 text-center border border-gray-300 drop-shadow-md mr-1 ml-1 text-sm ${
                obj.bedroomsTotal == 0
                  ? ""
                  : "bg-primary !text-white hover:bg-primary/80 "
              } `}
            >
              {obj.bedroomsTotal == 0 ? "Bed" : obj.bedroomsTotal + " Beds"}
            </Popover.Button>

            <Popover.Panel className="absolute z-10 mt-4 mr-5 bg-white border-2 border-gray-300 p-3 drop-shadow-lg rounded-lg ">
              <div className="grid grid-rows-2 ">
                <span className="font-bold mb-2">Bedrooms</span>
                <ul className="flex gap-1">
                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal"
                        name="bedroomsTotal"
                        value={0}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 0 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">Any</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal1"
                        name="bedroomsTotal"
                        value={1}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal1"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 1 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">1+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal2"
                        name="bedroomsTotal"
                        value={2}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal2"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 2 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">2+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal3"
                        name="bedroomsTotal"
                        value={3}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal3"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 3 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">3+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal4"
                        name="bedroomsTotal"
                        value={4}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal4"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 4 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">4+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bedroomsTotal5"
                        name="bedroomsTotal"
                        value={5}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bedroomsTotal5"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${obj.bedroomsTotal == 5 ? "!bg-primary !text-white" : ""}
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">5+</span>
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </Popover.Panel>
          </Popover>
        </div>

        {/* bathroom form */}
        <div className="flex flex-col">
          <Popover className="relative">
            <Popover.Button
              className={`transition-colors duration-300 text-black bg-white hover:bg-slate-200 focus:outline-none font-bold rounded-full px-3 py-1.5 text-center border border-gray-300 drop-shadow-md mr-1 ml-1 text-sm ${
                obj.bathroomsTotalInteger == 0
                  ? ""
                  : "bg-primary !text-white hover:bg-primary/80 "
              } `}
            >
              {obj.bathroomsTotalInteger == 0
                ? "Bath"
                : obj.bathroomsTotalInteger + " Baths"}
            </Popover.Button>

            <Popover.Panel className="absolute z-10 mt-4 mr-5 bg-white border-2 border-gray-300 p-3 drop-shadow-lg rounded-lg">
              <div className="grid grid-rows-2 ">
                <span className="font-bold mb-2">Bathrooms</span>
                <ul className="flex gap-1">
                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger"
                        name="bathroomsTotalInteger"
                        value={0}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 0
                         ? "!bg-primary !text-white"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">Any</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger1"
                        name="bathroomsTotalInteger"
                        value={1}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger1"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 1
                         ? "!bg-primary !text-white"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">1+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger2"
                        name="bathroomsTotalInteger"
                        value={2}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger2"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 2
                         ? "!bg-primary !text-white"
                         : ""
                     }`}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">2+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger3"
                        name="bathroomsTotalInteger"
                        value={3}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger3"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 3
                         ? "!bg-primary !text-white"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">3+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger4"
                        name="bathroomsTotalInteger"
                        value={4}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger4"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 4
                         ? "!bg-primary !text-white"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">4+</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="bathroomsTotalInteger5"
                        name="bathroomsTotalInteger"
                        value={5}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="bathroomsTotalInteger5"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.bathroomsTotalInteger == 5
                         ? "!bg-primary !text-white"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">5+</span>
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </Popover.Panel>
          </Popover>
        </div>

        {/* price form */}
        <div className="flex flex-col">
          <Popover className="relative">
            <Popover.Button
              className={`transition-colors duration-300 text-black bg-white hover:bg-slate-200 focus:outline-none font-bold rounded-full px-3 py-1.5 text-center border border-gray-300 drop-shadow-md mr-1 ml-1 text-sm ${
                obj.minPrice > 0
                  ? "bg-primary !text-white hover:bg-primary/80 "
                  : ""
              } `}
            >
              Price
            </Popover.Button>
            <Popover.Panel className="absolute right-0 z-10 mt-4 mr-5 bg-white border-2 border-gray-300 p-3 drop-shadow-lg rounded-lg flex flex-col lg:flex-row gap-1">
              <div className="">
                <label
                  htmlFor="minPrice"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 w-32"
                ></label>
                <select
                  id="minPrice"
                  name="minPrice"
                  onChange={onChange}
                  className={`bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                >
                  <option value={0}>
                    {obj.minPrice == 0 ? "Minimum" : "$ " + obj.minPrice}
                  </option>
                  {pricelowest?.map((pricevalue) => (
                    <option value={pricevalue} key={pricevalue}>
                      {" "}
                      {pricevalue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                      })}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="maxPrice"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 w-32"
                ></label>
                <select
                  id="maxPrice"
                  name="maxPrice"
                  onChange={onChange}
                  className="bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value={0}>
                    {/* $ {obj.maxPrice} */}
                    {obj.maxPrice == 0 ? "Maximum" : "$ " + obj.maxPrice}
                  </option>

                  {pricehighest?.map((pricevalue) => (
                    <option value={pricevalue} key={pricevalue}>
                      {" "}
                      {pricevalue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className=" mt-2 ml-1 text-black text-xs"
                onClick={() => {
                  setobj({ ...obj, minPrice: 0, maxPrice: 0 });
                }}
              >
                Clear
              </button>
            </Popover.Panel>
          </Popover>
        </div>

        {/* squarefeet form */}
        <div className="flex flex-col">
          <Popover className="relative">
            <Popover.Button
              className={`transition-colors duration-300 text-black bg-white hover:bg-slate-200 focus:outline-none font-bold rounded-full px-3 py-1.5 text-center border border-gray-300 drop-shadow-md mr-1 ml-1 text-sm ${
                obj.minbuildingAreaTotal != 0
                  ? "bg-primary !text-white hover:bg-primary/80 "
                  : ""
              } `}
            >
              Squarefeet
            </Popover.Button>
            <Popover.Panel className="absolute right-0 z-10 mt-4 mr-5 bg-white border-2 border-gray-300 p-3 drop-shadow-lg rounded-lg flex flex-col lg:flex-row gap-1">
              <div className="">
                <label
                  htmlFor="minarea"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 w-32"
                ></label>
                <select
                  id="minarea"
                  name="minbuildingAreaTotal"
                  onChange={onChange}
                  className="bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value={0}>
                    {obj.minbuildingAreaTotal == 0
                      ? "Minimum"
                      : obj.minbuildingAreaTotal + " Sqft"}
                  </option>

                  {minarea?.map((pricevalue) => (
                    <option value={pricevalue} key={pricevalue}>
                      {pricevalue} Sqft
                    </option>
                  ))}
                  <option value={0}>None</option>
                </select>
              </div>

              <div className="">
                <label
                  htmlFor="maxarea"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 w-32"
                ></label>
                <select
                  id="maxarea"
                  name="maxbuildingAreaTotal"
                  onChange={onChange}
                  className="bg-white  text-black  border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value={0}>
                    {obj.maxbuildingAreaTotal != 0
                      ? obj.maxbuildingAreaTotal + " Sqft"
                      : "Maximum"}
                  </option>

                  {maxarea?.map((pricevalue) => (
                    <option value={pricevalue} key={pricevalue}>
                      {pricevalue} Sqft
                    </option>
                  ))}
                  <option value={0}>None</option>
                </select>
              </div>
              <button
                className="mt-2 ml-1 text-black text-xs"
                onClick={() => {
                  setobj({
                    ...obj,
                    minbuildingAreaTotal: 0,
                    maxbuildingAreaTotal: 0,
                  });
                }}
              >
                Clear
              </button>
            </Popover.Panel>
          </Popover>
        </div>

        {/* Sort button */}
        <div className="flex flex-col">
          <Popover className="relative">
            <Popover.Button
              className={`transition-colors duration-300 text-black bg-white hover:bg-slate-200 focus:outline-none font-bold rounded-full px-3 py-1.5 text-center border border-gray-300 drop-shadow-md mr-1 ml-1 text-sm ${
                obj.sort == 1
                  ? "bg-white !text-black "
                  : "bg-primary !text-white hover:bg-primary/80"
              } `}
            >
              {obj.sort == 1 ? "Sort" : "Sort"}
            </Popover.Button>

            <Popover.Panel className="absolute right-0 lg:left-0 lg:right-auto z-10 mt-4 mr-5 bg-white border-2 border-gray-300 p-3 drop-shadow-lg rounded-lg">
              <div className="">
                <ul className="grid gap-1">
                  <span className="font-bold mb-2">Sorting by</span>
                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="sort"
                        name="sort"
                        value={1}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="sort"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.sort == 1
                         ? "!bg-primary !text-white hover:bg-primary/80"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          <span className="m-2">Price Low - High</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="sort1"
                        name="sort"
                        value={2}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="sort1"
                      className={` w-40 inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.sort == 2
                         ? "!bg-primary !text-white hover:bg-primary/80"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          {/* <span className="m-2">Condo/Townhouse</span> */}
                          <span className="m-2">Price-high-low</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="sort2"
                        name="sort"
                        value={3}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="sort2"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.sort == 3
                         ? "!bg-primary !text-white hover:bg-primary/80"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          {/* <span className="m-2">Condo/Townhouse</span> */}
                          <span className="m-2">Recently Modified</span>
                        </div>
                      </div>
                    </label>
                  </li>

                  <li>
                    <Popover.Button>
                      <input
                        type="radio"
                        id="sort3"
                        name="sort"
                        value={4}
                        className="hidden peer"
                        onChange={onChange}
                      />
                    </Popover.Button>
                    <label
                      htmlFor="sort3"
                      className={`inline-flex justify-between items-center  text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-white dark:border-gray-700 dark:peer-checked:text-white peer-checked:border-gray-400 peer-checked:bg-red-500 hover:text-gray-600 hover:bg-red-500  dark:bg-white
                     ${
                       obj.sort == 4
                         ? "!bg-primary !text-white hover:bg-primary/80"
                         : ""
                     }
                     `}
                    >
                      <div className="block">
                        <div className="">
                          {/* <span className="m-2">Condo/Townhouse</span> */}
                          <span className="m-2">Recently added</span>
                        </div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      {/* main container for filters end here */}

      {/* cards component start here */}

      <div className="grid sm:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-11/12 mx-auto font-bold  transition-all duration-300">
        {data?.map((datas) => (
          <HouseCard home={datas} housesliked={likedHouses} key={datas._id} />
        ))}
      </div>

      {data?.length == 0 && (
        <div className="grid place-items-center w-full">
          <Image
            className="w-full  mx-auto"
            height={500}
            width={500}
            src={nodata}
            alt="Sunset in the mountains"
          />
          <p className="font-bold text-primary">NO DATA FOUND</p>
        </div>
      )}
      {/* cards component ends here */}

      {/* previous next buttons  */}
      <div className="inline-flex max-w-7xl w-11/12 mx-auto justify-center pt-7">
        <button
          onClick={() => {
            if (page > 0) {
              setpage((prev) => prev - 1);
            }
          }}
          className={`${
            page == 0 ? "cursor-not-allowed " : " "
          } bg-transparent  text-gray-800 font-bold py-2 px-2 rounded-l `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </button>
        <span className="p-3">
          {page + 1} / {pageno}
        </span>
        <button
          onClick={() => {
            if (pageno > page + 1) {
              setpage((prev) => prev + 1);
            }
          }}
          className={`${
            pageno > page + 1 ? "" : "cursor-not-allowed  "
          } bg-transparent  text-gray-800 font-bold py-2 px-2 rounded-l `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="red"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Search;
