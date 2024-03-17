// Essentials & Hooks
import type { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import React from "react";

// @ts-ignore
import { CldImage } from "next-cloudinary";

// Assets
import countyIcon from "../../public/icons/County.png";
import bedIcon from "../../public/icons/Bed.png";
import bathIcon from "../../public/icons/Bath.png";
import areaIcon from "../../public/icons/Area.png";

// Components
import Accordion from "../../components/Accordion";
import Detail from "../../components/reusable/Detail";
import Modal from "../../components/reusable/Modal";

// Lib for Gallery
import { useAuth } from "../../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import url from "../../utils/constants";
import HouseScroll2 from "../../components/HouseScroll2";
import Modal2 from "../../components/reusable/Modal2";
import Accordion2 from "../../components/Accordion2";
import Pie from "../../components/Pie";
import { useRouter } from "next/router";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import Navbar from "../../components/Navbar";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Neigbhourhood from "../../components/Neigbhourhood";
import ZipCodeAccor from "../../components/ZipCodeAccor";

import loading2 from "../../public/loading2.gif";

const Property = ({ data, id }: { data: any; id: any }) => {
  // console.log(typeof data.subdivisionName);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState(false);
  const [toggler, setToggler] = useState<boolean>(false);
  const [like, setlike] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setloading] = useState(false);
  const { addHouse, removeHouse, likedHouses, token } = useAuth();
  let price = data.price;
  const router = useRouter();
  console.log(data, "all data loaded");
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const [credentials, setCredentials] = useState({
    name: "",
    phoneNo: "",
    Date: "",
    Description: "",
    Email: "",
    Meetingtype: "",
    id: "",
  });

  const [updateinfo, setupdateinfo] = useState({
    email: "",
    houseid: "",
  });

  const ImageArray = data.media.map((newimage: any) => newimage.mediaURL);

  const roomArray = data.rooms;

  const [ind, setindex] = useState(0);

  const [datas, setdatas] = useState<any[]>([]);

  const [data2, setdata2] = useState<any[]>([]);

  let compensation = parseInt(data.buyerAgencyCompensation);

  let discount = (compensation / 100) * data.price;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let setDate = new Date();
    const getDate = new Date(credentials.Date);

    if (credentials.phoneNo == "") {
      toast.error("please enter your phone number");
    } else if (setDate > getDate) {
      toast.error("please select a valid date");
    } else {
      const response = await fetch(`${url}/api/v1/properties/meeting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          phoneNo: credentials.phoneNo,
          Date: credentials.Date,
          Description: credentials.Description,
          Email: credentials.Email,
          Meetingtype: credentials.Meetingtype,
          id: id.property,
        }),
      });

      const json = await response.json();

      if (json.success) {
        toast.success("Thank you for contacting us");
        setOpen(false);
        setCredentials({
          name: " ",
          phoneNo: "",
          Date: "",
          Description: "",
          Email: "",
          Meetingtype: "",
          id: "",
        });
      } else {
        setCredentials({
          name: " ",
          phoneNo: "",
          Date: "",
          Description: "",
          Email: "",
          Meetingtype: "",
          id: "",
        });
        toast.error("Invalid credentials");
      }
    }
  };

  const updateusernotification = async (e: any) => {
    e.preventDefault();

    if (!updateinfo.email) {
      toast.error("Please provide email");
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        updateinfo.email.toString()
      )
    ) {
      toast.error("Please provide a valid email id.");
      return;
    }

    const response = await fetch(`${url}/api/v1/properties/addusertoupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: updateinfo.email,
        houseid: data.listingId,
      }),
    });

    const json = await response.json();
    if (json.stat == true) {
      toast.error(json.msg);
      setupdateinfo({
        email: "",
        houseid: "",
      });
    } else {
      setupdateinfo({
        email: "",
        houseid: "",
      });
      toast.success(json.msg);
    }
  };

  const getUserData = async (e: any) => {
    //open modal
    setOpen(true);

    if (token) {
      e.preventDefault();
      const response = await fetch(`${url}/api/v1/properties/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const json = await response.json();

      setCredentials({
        name: json.name,
        phoneNo: "",
        Date: "",
        Description: "",
        Email: json.email,
        Meetingtype: "",
        id: "",
      });
    } else {
      setCredentials({
        name: " ",
        phoneNo: "",
        Date: "",
        Description: "",
        Email: "",
        Meetingtype: "",
        id: "",
      });
    }
  };

  const onChange = (e: any) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onChange2 = (e: any) => {
    setupdateinfo({ ...updateinfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getUsersdetails = async () => {
      if (token) {
        const response = await fetch(`${url}/api/v1/properties/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const json = await response.json();
        setupdateinfo({
          email: json.email,
          houseid: "",
        });
      } else {
        setupdateinfo({
          email: "",
          houseid: "",
        });
      }
    };
    getUsersdetails();
  }, [token]);

  //to get nearby properties
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${url}/api/v1/properties/fetchbyproperties/0`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
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
          standardStatus: "Active",
          masterBedroomLevel: "",
          communityFeatures: "",
          exteriorFeatures: "",
          searchtext: data.subdivisionName,
          sort: 1,
        }),
      });

      const respo = await res.json();
      setdatas(respo.data);
    };

    getUsers();
  }, [data]);

  //nearby sold property
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${url}/api/v1/properties/fetchbyproperties/0`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
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
          propertySubType: "",
          lotSizeArea: 0,
          standardStatus: "Closed",
          masterBedroomLevel: "",
          communityFeatures: "",
          exteriorFeatures: "",
          searchtext: data.postalcode,
          sort: 1,
        }),
      });

      const respo = await res.json();
      setdata2(respo.data);
    };

    getUsers();
  }, [data]);

  let newdatas = datas?.filter((val: any) => {
    return val._id !== data._id;
  });

  let newdatas2 = data2?.filter((val: any) => {
    return val._id !== data._id;
  });

  useEffect(() => {
    let likehouse = likedHouses.map((val: any) => {
      return val._id;
    });

    if (likehouse.includes(data._id)) {
      setlike(true);
    } else {
      setlike(false);
    }
  });

  //functionality for finding duration and direction
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCr4VwBanytO5rAGUOyhJ3VgNCltEYCUeI",
    libraries: ["places"],
  });
  const center = { lat: data.latitude, lng: data.longitude };
  const [directionresponse, setdirectionresponse] = useState<any>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef<HTMLInputElement>(null);

  async function calculateRoute() {
    try {
      if (originRef?.current?.value == "") {
        toast.error("Please enter a valid location");
      } else {
        const directionsService = new google.maps.DirectionsService();

        const results = await directionsService.route({
          origin: `${data.latitude} , ${data.longitude}`,
          destination: originRef?.current?.value || "",
          travelMode: google.maps.TravelMode.DRIVING,
        });

        if (results) {
          setdirectionresponse(results);
          setDistance(results?.routes[0]?.legs[0]?.distance?.text || "");
          setDuration(results?.routes[0]?.legs[0]?.duration?.text || "");
        }
      }
    } catch (error) {
      toast.error("Please enter a valid location.");
      setDistance("");
      setDuration("");
    }
  }

  function clearRoute() {
    setdirectionresponse({ routes: [] });
    setDistance("");
    setDuration("");
  }

  return (
    <>
      {/* Back to results navbar */}
      <div className="hidden md:block">
        <Navbar></Navbar>
      </div>
      {/* <button onClick={calculateRoute}>CLICK</button> */}
      <div
        className={`md:hidden sticky top-[-1px] right-0 z-50   border-t-2 border-b-2  ${
          scrolled
            ? "block bg-white px-3 py-4 !text-black w-full "
            : "hidden bg-transparent max-w-7xl mx-auto  w-11/12 "
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-3 w-5 inline group-hover:fill-primary duration-200 transition-colors"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>

        <Link href="/search">
          <span className="group-hover:text-primary duration-200 transition-colors text-primary">
            Back
          </span>
        </Link>
      </div>
      <div
        className={`bg-gray-100   md:sticky md:top-0 md:right-0 md:z-50  rounded-lg md:mt-3 ${
          scrolled
            ? "md:bg-white/80 md:backdrop-blur-md md:!text-black md:w-full pb-3"
            : "md:bg-transparent md:max-w-7xl md:mx-auto  md:w-11/12 "
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="cursor-pointer flex items-center gap-2 group pt-2 pb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5 w-5 inline group-hover:fill-primary duration-200 transition-colors"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
            <Link href="/search">
              <span className="group-hover:text-primary duration-200 transition-colors ">
                Back to results
              </span>
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 px-6 py-2">
            <p className="font-bold text-xl">
              {data.address}
              <span className="block text-sm font-normal">
                MLS # {data.listingId.slice(3)}
              </span>
            </p>
            <h4 className="font-extrabold   sm:text-2xl ">
              {data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              })}
              {data.price > data.originalListPrice ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 inline !fill-green-500 stroke-green-500 ml-2 font-bold mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </>
              ) : (
                <>
                  {/* <svg
                    className="h-5 inline !fill-primary-500 stroke-primary ml-2 font-bold mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                  >
                    <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
                  </svg> */}
                </>
              )}
              {data.price < data.originalListPrice ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 inline !fill-primary-500 stroke-primary ml-2 font-bold mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                    />
                  </svg>
                </>
              ) : (
                <>
                  {/* <svg
                    className="h-5 inline !fill-primary-500 stroke-primary ml-2 font-bold mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 25 25"
                  >
                    <path d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z" />
                  </svg> */}
                </>
              )}
              {data.masterBedroomLevel && (
                <span className="block text-sm font-normal">
                  Master on {data.masterBedroomLevel} ▪{" "}
                  {data.parking.join(", ")}
                </span>
              )}
            </h4>
            <p className="font-bold">
              {data.bedroomsTotal && (
                <span>
                  {data.bedroomsTotal}
                  {""}Beds{" "}
                </span>
              )}
              {data.bathroomsTotalInteger && (
                <span>
                  {data.bathroomsTotalInteger}
                  {""} FullBaths
                </span>
              )}
              {/*▪ FullBaths{" "} */}
              {data.sqFtTotal && (
                <span>
                  {data.sqFtTotal} {""}Sq Ft
                </span>
              )}{" "}
            </p>
            <p>
              Blt :
              {data.yearBuilt == 0 ? " N/A" : `${data.yearBuilt} Year Built`} ▪{" "}
              {data.daysOnMarket} Cumulative Days on Market
            </p>
          </div>
        </nav>
      </div>

      {/* Back to results navbar closed */}
      <div className="min-h-screen max-w-7xl mx-auto py-8 w-11/12">
        <Head>
          {
            <title>
              {data.streetNumber +
                " - " +
                data.streetName +
                " " +
                data.postalCode}{" "}
              | Karma Realty
            </title>
          }
        </Head>

        {/* modal */}
        <Modal open={open} setOpen={setOpen}>
          <div className="min-h-full flex flex-col justify-center p-8">
            <button
              className="text-black absolute right-5 top-4"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className=" text-center text-3xl font-extrabold text-gray-900 mb-8">
                Book a Tour
              </h2>
              <div className="bg-white sm:rounded-lg sm:px-2 !text-black ">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <p className="text-sm mb-1">Tour Preference</p>
                    <input
                      type="radio"
                      id="inperson"
                      name="Meetingtype"
                      value="In-person"
                      onChange={onChange}
                      required
                    />{" "}
                    <label
                      htmlFor="inperson"
                      className="text-sm cursor-pointer"
                    >
                      In-person
                    </label>{" "}
                    <input
                      type="radio"
                      id="virtual"
                      name="Meetingtype"
                      value="Virtual"
                      onChange={onChange}
                    />{" "}
                    <label htmlFor="virtual" className="text-sm cursor-pointer">
                      Virtual
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        required
                        value={credentials.name}
                        onChange={onChange}
                        id="name"
                        name="name"
                        autoComplete="name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1">
                      <PhoneInput
                        value={credentials.phoneNo}
                        onChange={(phone) => {
                          setCredentials({ ...credentials, phoneNo: phone });
                        }}
                        inputProps={{
                          required: true,
                        }}
                        country={"us"}
                        inputClass="!w-full !focus:ring-primary !focus:border-primary"
                        containerClass="!rounded-md !shadow-sm !placeholder-gray-400 focus:!outline-none !focus:ring-primary !focus:border-primary !sm:text-sm "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        value={credentials.Email}
                        onChange={onChange}
                        name="Email"
                        id="Email"
                        type="Email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        required
                        value={credentials.Description}
                        onChange={onChange}
                        id="Description"
                        name="Description"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="Date"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Preference Date :
                    </label>
                    <div className="mt-1">
                      <input
                        value={credentials.Date}
                        required
                        onChange={onChange}
                        type="date"
                        id="Date"
                        name="Date"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    {token ? (
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Book now
                      </button>
                    ) : (
                      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Book now
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        {/* modal ended here  */}

        {/* modal for images */}
        <div className="w-full ">
          <Modal2 open={openModal} onClose={() => setOpenModal(false)}>
            <>
              <div className="overflow-hidden">
                <div className="flex bg-transparent ">
                  <div className=" w-[50%] grid justify-end ">
                    <p className=" relative flex lg:text-xl sm:text-sm font-bold text-white ">
                      <span className=" px-1"> {ind + 1} </span>{" "}
                      <span className=" px-1">/</span>{" "}
                      <span className=" px-1">{ImageArray.length}</span>
                    </p>
                  </div>
                  <div className=" w-[50%] grid justify-end">
                    <button
                      className=" relative flex text-4xl font-bold text-white "
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-[3%] ml-3 md:w-[5%] grid justify-center">
                    <button
                      className="  "
                      onClick={() => {
                        if (ind <= 0) {
                          setindex(0);
                        } else {
                          setindex(ind - 1);
                        }
                      }}
                    >
                      <span className=" w-10  p-10 rounded-full ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-9 h-9 z-20 mr-3 text-primary  rotate-180"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div className="sm:w-[80%] md:w-[90%] lg:w-[90%] px-3">
                    <div className="w-full">
                      <CldImage
                        deliveryType="fetch"
                        crop="thumb"
                        gravity="auto"
                        className="rounded-xl duration-300 transition-transform hover:scale-105 hover:rounded-xl cursor-pointer"
                        alt="not found"
                        src={ImageArray[ind]}
                        height={700}
                        width={1300}
                        loading="lazy"
                        // sizes = "(min-width: 480px) 100vh"
                      />
                    </div>
                  </div>
                  <div className="grid justify-center  w-[5%] ">
                    <button
                      onClick={() => {
                        if (ImageArray.length - 1 == ind) {
                          setindex(0);
                        } else {
                          setindex(ind + 1);
                        }
                      }}
                    >
                      <span className=" w-10 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-9 h-9 z-20 mr-3 text-primary"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          </Modal2>
        </div>
        {/* modal for images ends */}

        {/* images regarding property  */}
        <div className="flex flex-col lg:flex-row items-center justify-center my-4 gap-4 lg:gap-8 relative">
          <div className="md:w-4/6 relative space-y-3 text-center sm:p-10 md:p-0">
            {ImageArray.length != 0 ? (
              <>
                <div className="">
                  <CldImage
                    deliveryType="fetch"
                    crop="thumb"
                    gravity="auto"
                    className="rounded-xl duration-300 transition-transform hover:scale-105 hover:rounded-xl cursor-pointer"
                    src={ImageArray[0]}
                    height={480}
                    width={900}
                    onClick={() => {
                      setToggler(true);
                      setindex(0);

                      setOpenModal(true);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <CldImage
                    deliveryType="fetch"
                    crop="thumb"
                    gravity="auto"
                    className="rounded-xl duration-300 transition-transform hover:scale-105 hover:rounded-xl cursor-pointer"
                    src={
                      "https://res.cloudinary.com/dho3yhdml/image/fetch/c_thumb,w_300,h_230,g_auto/f_auto/q_auto/https://www.linkpicture.com/q/nodata_1.png"
                    }
                    height={480}
                    width={900}
                    onClick={() => {
                      setToggler(true);
                      setindex(0);

                      setOpenModal(true);
                    }}
                  />
                </div>
              </>
            )}
            {ImageArray.length >= 3 ? (
              <div className="flex gap-3">
                <div className="w-1/2">
                  <CldImage
                    deliveryType="fetch"
                    crop="thumb"
                    gravity="auto"
                    className="rounded-xl duration-300 transition-transform hover:scale-105 hover:rounded-xl cursor-pointer"
                    src={ImageArray[1]}
                    height={280}
                    width={450}
                    onClick={() => {
                      setToggler(true);
                      setindex(0);
                      setOpenModal(true);
                    }}
                  />
                </div>
                <div className="w-1/2">
                  <CldImage
                    deliveryType="fetch"
                    crop="thumb"
                    gravity="auto"
                    className="rounded-xl duration-300 transition-transform hover:scale-105 hover:rounded-xl cursor-pointer"
                    src={ImageArray[2]}
                    height={280}
                    width={450}
                    onClick={() => {
                      setToggler(true);
                      setindex(0);
                      setOpenModal(true);
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* all house button */}
            <div className="grid justify-end absolute right-2 bottom-[15px]">
              {ImageArray.length != 0 ? (
                <button
                  onClick={() => {
                    setToggler(true);
                    setindex(0);
                    setOpenModal(true);
                  }}
                  className="bg-primary p-2 font-bold text-white rounded-md"
                >
                  See All {ImageArray.length} Photos
                </button>
              ) : (
                <></>
              )}
            </div>

            {/* saved button */}
            {data.standardStatus != "Closed" ? (
              <div className="grid justify-end absolute md:right-1 md:top-[5px] right-1 top-0">
                {token ? (
                  <button
                    className={` `}
                    onClick={async () => {
                      let likehouse = await likedHouses.map((val: any) => {
                        return val._id;
                      });

                      if (likehouse.includes(data._id)) {
                        removeHouse(data._id);
                        setlike(false);
                        router.reload();
                      } else {
                        addHouse(data._id);
                        setlike(true);
                        router.reload();
                      }
                    }}
                  >
                    <HeartIcon
                      className={` fill-transparent  h-6 w-6 z-12 absolute  right-2  ${
                        like === true
                          ? "!fill-primary"
                          : " stroke-primary stroke-2 "
                      }  `}
                    />
                  </button>
                ) : (
                  <button
                    className={``}
                    onClick={async () => {
                      toast.error("Please login/register to shortlist houses");
                    }}
                  >
                    <HeartIcon
                      className={` fill-transparent  h-6 w-6 z-12 absolute  right-2   ${
                        like === true
                          ? "!fill-primary"
                          : " stroke-primary stroke-2 "
                      }  `}
                    />
                  </button>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="lg:w-2/6 space-y-3 px-4">
            <h4 className="font-extrabold text-xl sm:text-2xl lg:text-5xl">
              {data.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              })}
            </h4>
            <h4 className="font-bold">{data.address}</h4>
            <h4 className="font-bold">{data.propertySubType}</h4>
            {data.constructionStatus && (
              <div className="bg-green-600 p-2 text-white font-bold rounded-md">
                New Construction : {data.constructionStatus}
              </div>
            )}
            <h4 className="font-bold">
              {/* do change this  */}
              Status: <span className="">{data.standardStatus}</span>
            </h4>

            {/* Key Icons */}
            <div className="flex flex-wrap gap-6">
              {data.bedroomsTotal && (
                <div className="flex items-center justify-center gap-2">
                  <Image height={25} width={25} src={bedIcon} />
                  <span>{data.bedroomsTotal} Beds </span>
                </div>
              )}
              {data.bathroomsTotalInteger && (
                <div className="flex items-center justify-center gap-2">
                  <Image height={25} width={25} src={bathIcon} />
                  <span>{data.bathroomsTotalInteger} Baths</span>
                </div>
              )}
              {data.sqFtTotal && (
                <div className="flex items-center justify-center gap-2">
                  <Image height={25} width={25} src={areaIcon} />
                  <span>{data.sqFtTotal} sqft </span>
                </div>
              )}
              <div className="flex items-center justify-center gap-2">
                <Image height={25} width={25} src={areaIcon} />
                <span>
                  {" "}
                  {data.yearBuilt == 0
                    ? "N/A Year Built"
                    : `${data.yearBuilt} Year Built`}{" "}
                </span>
              </div>
              {data.countyOrParish && (
                <div className="flex items-center justify-center gap-2">
                  <Image height={25} width={25} src={countyIcon} />
                  <span> {data.countyOrParish} County </span>
                </div>
              )}
            </div>

            <div className="">
              <h4 className="text-xl sm:text-2xl lg:text-2xl font-bold">
                Description
              </h4>
              <p>{data.publicRemarks}</p>
            </div>

            <button
              onClick={getUserData}
              className="hidden w-full md:flex justify-center py-2 px-4 border border-lightGray rounded-md shadow-md hover:shadow-xl text-lg text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bold"
            >
              Book a Tour
            </button>
          </div>
        </div>
        {/* images regarding property */}

        {/* rebate component start */}
        <div className="bg-slate-200 h-16 my-6 text-center  md:pt-5 pb-10 border-2 rounded-md border-white">
          {" "}
          Karma Realty can{" "}
          <span className="font-bold text-red-500">
            rebate upto{" "}
            {discount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            })}
          </span>{" "}
          on this home
        </div>
        {/* rebate component ends */}

        {/* Detailed Features Start */}
        <section className=" grid lg:grid-cols-2 gap-x-4 ">
          {/* General Start */}
          {data && (
            <div>
              <Accordion
                title={` General Info - MLS # ${data.listingId.slice(3)}`}
              >
                <div className="flex flex-col lg:flex-row lg:gap-y-4 ">
                  <div>
                    {data.constructionStatus && (
                      <Detail
                        name="Construction Status"
                        value={data.constructionStatus}
                      />
                    )}
                    {data.parking.length > 0 && (
                      <Detail name="Garage" value={data.parking.join(", ")} />
                    )}
                    {data.constructionStatus && (
                      <Detail
                        name="Price/Sqft"
                        value={`$ ${(data.price / data.sqFtTotal).toFixed(2)}`}
                      />
                    )}
                    {data.constructionStatus && (
                      <Detail
                        name="Year Build"
                        value={
                          data.yearBuilt == 0
                            ? "N/A Year Built"
                            : `${data.yearBuilt} Year Built`
                        }
                      />
                    )}
                    {data.masterBedroomLevel && (
                      <Detail
                        name="Master Bedroom"
                        value={`${data.masterBedroomLevel} floor`}
                      />
                    )}

                    {data.standardStatus && (
                      <Detail
                        name="Listing Status"
                        value={data.standardStatus}
                      />
                    )}
                    <Detail name="Property Type" value={data.propertySubType} />
                    <div>
                      <span className="font-bold">Location: </span>
                      <Link href={`/search/?value=${data.city}`}>
                        <span className="cursor-pointer text-blue-600">
                          {data.city} /{" "}
                        </span>
                      </Link>
                      <Link href={`/search/?value=${data.countyOrParish}`}>
                        <span className="cursor-pointer text-blue-600">
                          {data.countyOrParish} County
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          )}

          {/* General End */}

          {/* Neighborhood start */}
          <Accordion title="Neighborhood Info">
            <div className="flex flex-col gap-2">
              <div>
                <span className="font-bold">Sub Division: </span>

                {data.subdivisionName == "None" ||
                data.subdivisionName == "none" ? (
                  <span className="cursor-pointer text-black">
                    {data.subdivisionName}
                  </span>
                ) : (
                  <Link href={`/search/?value=${data.subdivisionName}`}>
                    <span className="cursor-pointer text-blue-600">
                      {data.subdivisionName}
                    </span>
                  </Link>
                )}
              </div>
              {data.associationFee > 0 && (
                <>
                  <Detail
                    name="Hoe Fee "
                    value={`${data.associationFee.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })} Monthly`}
                  />
                </>
              )}
              {data.communityFeatures.length > 0 && (
                <Detail
                  name="Community Features"
                  value={data.communityFeatures.join(", ")}
                />
              )}
            </div>
          </Accordion>
          {/* Neighborhood ends */}

          {/* School start */}
          <Accordion title="Schools">
            <div className="flex flex-col gap-2">
              {data.elementarySchool && data.elementarySchool.length > 0 && (
                <Detail
                  name="Elementary School"
                  value={data.elementarySchool}
                />
              )}

              {data.associationFee > 0 && (
                <Detail
                  name="Middle School"
                  value={data.middleOrJuniorSchool}
                />
              )}
              {data.middleOrJuniorSchool &&
                data.middleOrJuniorSchool.length > 0 && (
                  <Detail name="High School" value={data.highschool} />
                )}
            </div>
          </Accordion>
          {/* School ends */}

          {/* Exterior */}
          <Accordion title="Exterior">
            <div className="flex flex-col gap-2">
              {data.lotSizeArea > 0 && (
                <Detail name="Lot Size" value={`${data.lotSizeArea} Acre`} />
              )}
              {data.exteriorFeatures.length > 0 && (
                <Detail
                  name="Exterior Features"
                  value={data.exteriorFeatures.join(", ")}
                />
              )}
              {data.siding.length > 0 && (
                <Detail name="Siding" value={data.siding.join(", ")} />
              )}
            </div>
          </Accordion>
          {/* Exterior ends */}
        </section>

        {/* location start */}
        <Accordion2 title="Location">
          <div className="space-y-4 h-[500px] w-full">
            <div className="w-full  min-h-full flex flex-wrap-reverse">
              <div className="w-[100%] md:w-[70%]">
                {isLoaded && (
                  <>
                    <GoogleMap
                      center={center}
                      zoom={17}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: true,
                        fullscreenControl: false,
                      }}
                      mapContainerStyle={{ width: "100%", height: "500px" }}
                    >
                      <MarkerF title="SBV" position={center} />
                      {directionresponse && (
                        <DirectionsRenderer directions={directionresponse} />
                      )}
                    </GoogleMap>
                  </>
                )}
              </div>
              <div className="grid justify-center text-center w-[100%] md:w-[30%] place-items-center">
                {isLoaded && (
                  <>
                    <div className=" ">
                      <span className="text-3xl p-2 font-bold">
                        Commute Time
                      </span>
                      <span className="text-base block p-2">
                        Enter an address of your work or school and find the
                        commute time.
                      </span>

                      <Autocomplete
                        onPlaceChanged={() => {
                          clearRoute(), calculateRoute();
                        }}
                        className="p-5"
                      >
                        <div className="">
                          <input
                            type="text"
                            ref={originRef}
                            className="rounded-md w-[80%]"
                          ></input>
                        </div>
                      </Autocomplete>

                      <div className="p-3">
                        {distance && (
                          <span className="font-bold">
                            Distance: {distance}
                          </span>
                        )}
                        {duration && (
                          <span className="font-bold block">
                            Duration: {duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Accordion2>
        {/* location end  */}

        {/* PIE COMPONENT FOR TESTING */}
        <Accordion2 title="Monthly Payment">
          <Pie totalprice={price} hoefee={data.associationFee}></Pie>
        </Accordion2>

        <section className=" grid lg:grid-cols-2 gap-x-4 ">
          {/* Interior */}
          {data.flooring.length > 0 && data.appliances.length > 0 ? (
            <Accordion title="Interior Features">
              <div className="flex flex-col gap-2">
                {data.flooring.length > 0 && (
                  <Detail name="Flooring" value={data.flooring.join(", ")} />
                )}
                {data.appliances.length > 0 && (
                  <Detail name="Equipment" value={data.appliances.join(", ")} />
                )}
              </div>
            </Accordion>
          ) : null}
          {/* Interior ends */}

          {/* Other / Miscellaneous*/}
          {data.listAgentFullName &&
          data.accessibilityFeatures &&
          data.waterSource &&
          data.waterSource &&
          data.sewer &&
          data.fireplace &&
          data.builderName &&
          data.porch ? (
            <Accordion title="Other / Miscellaneous">
              <div className="flex flex-col gap-2">
                {data.listAgentFullName && (
                  <Detail name="Agent" value={data.listAgentFullName} />
                )}
                {data.accessibilityFeatures.length > 0 && (
                  <Detail
                    name="Accessibility Features"
                    value={data.accessibilityFeatures.join(", ")}
                  />
                )}
                {data.builderName && (
                  <Detail name="Water" value={data.waterSource} />
                )}
                {data.sewer.length > 0 && (
                  <Detail name="Sewer" value={data.sewer.join(", ")} />
                )}
                {data.fireplace.length > 0 && (
                  <Detail name="Air" value={data.fireplace.join(", ")} />
                )}
                {data.builderName && (
                  <Detail name="Builder" value={data.builderName} />
                )}
                {data.porch && <Detail name="porch" value={data.porch} />}
              </div>
            </Accordion>
          ) : null}
          {/* Other / Miscellaneous ends */}

          {/* listing history  */}
          <Accordion title="Listing History">
            <div className="">
              {data.listinghistorydata &&
                data.listinghistorydata.map((value: any) => {
                  let decider;
                  let price;
                  if (value.originalListPrice > value.newprice) {
                    decider = "decrease";
                    price = value.originalListPrice - value.newprice;
                  } else if (value.originalListPrice < value.newprice) {
                    decider = "Increase";
                    price = value.newprice - value.originalListPrice;
                  } else {
                    decider = "currently";
                    price = "";
                  }
                  return (
                    <>
                      <div className="flex flex-col">
                        <p>
                          {" "}
                          <span className="font-bold">
                            Cumulative Days on Market:
                          </span>{" "}
                          {data.daysOnMarket} Days
                        </p>
                        {value.lastChangeTimestamp && (
                          <Detail
                            name={`${value.lastChangeTimestamp.slice(0, 10)}`}
                            value={` Price ${decider} to $${value.newprice?.toLocaleString()} ($${price?.toLocaleString()}) `}
                          />
                        )}
                        {value.listingContractDate &&
                          data.listingId &&
                          value.originalListPrice && (
                            <Detail
                              name={`${value.listingContractDate.slice(0, 10)}`}
                              value={` MLS # ${data.listingId.slice(
                                3
                              )} Listed at $${parseInt(
                                value.originalListPrice
                              ).toLocaleString()} `}
                            />
                          )}
                      </div>
                    </>
                  );
                })}

              <form className="my-4" onSubmit={updateusernotification}>
                <span className="font-bold block text-sm py-1">
                  Notify me when price change
                </span>
                {token ? (
                  <>
                    <input
                      value={updateinfo.email}
                      onChange={onChange2}
                      name="email"
                      id="email"
                      type="Email"
                      required
                      className=" rounded-md hidden relative h-6 border border-black"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className=" mx-1 px-1  bg-primary text-white font-bold border border-black rounded-md text-md"
                    >
                      Notify
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      value={updateinfo.email}
                      onChange={onChange2}
                      name="email"
                      id="email"
                      type="Email"
                      required
                      className=" rounded-md  relative h-6 border border-black"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className=" mx-1 px-1  bg-primary text-white font-bold border border-black rounded-md text-md"
                    >
                      Submit
                    </button>
                  </>
                )}
              </form>
            </div>
          </Accordion>
          {/* listing history ends */}
        </section>

        {/* <neighbour hood summary start here */}
        {data.subdivisionName == "None" || data.subdivisionName == "none" ? (
          <></>
        ) : (
          <Neigbhourhood
            subdivision={data.subdivisionName}
            newConstruction={data.newConstructionYN}
          ></Neigbhourhood>
        )}

        {/* <neighbour hood summary ends here */}

        {/* <zip code trends start here */}
        {data.postalCode ? (
          <ZipCodeAccor
            title="Zip Code Trends"
            zipcode={data.postalCode}
          ></ZipCodeAccor>
        ) : (
          <div className="grid place-items-center">
            <Image src={loading2} alt={"loder"} width={60} height={60} />
          </div>
        )}
        {/* <zip code trends start ends */}

        {/* Layout Start */}
        <Accordion2 title="Layout">
          <div className="w-full">
            {roomArray.map((room: any) => (
              <div className="w-full flex " key={room._id}>
                <div className=" p-3">
                  {room.roomLevel && (
                    <h3 className="font-bold text-lg">
                      {room.roomLevel + " Floor"}{" "}
                    </h3>
                  )}
                  {
                    <div className="font-bold">
                      Details:{" "}
                      <span className="font-normal">
                        {" "}
                        {room.roomTypes.split(",").join(", ")}
                      </span>
                    </div>
                  }
                  {room.bathsFull > 0 && (
                    <div className="font-bold">
                      Full Bathroom :
                      <span className="font-normal"> {room.bathsFull}</span>
                    </div>
                  )}
                  {room.bathsHalf > 0 && (
                    <div className="font-bold">
                      Half Bathroom :
                      <span className="font-normal"> {room.bathsHalf}</span>
                    </div>
                  )}
                  {room.bedsTotal > 0 && (
                    <div className="font-bold">
                      Beds Total :
                      <span className="font-normal"> {room.bedsTotal}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="p-3">
              <Detail name="Total Heated Square Feet" value={data.sqFtMain} />
              <Detail name="Heated Sq Ft Breakdown" value={""} />
              {data.sqFtMain && <Detail name="Main" value={data.sqFtMain} />}
              {data.sqFtUpper != 0 && (
                <Detail name="Upper" value={data.sqFtUpper} />
              )}
              {data.sqFtGarage && (
                <Detail name="Upper" value={data.sqFtGarage} />
              )}
            </div>
          </div>
        </Accordion2>
        {/* Lyout ends */}

        {/* house scroller */}
        {datas?.length > 1 && (
          <span className="absolute ml-4 text-xl sm:text-2xl lg:text-2xl font-bold mt-6 ">
            Nearby properties
          </span>
        )}

        {datas?.length > 1 ? (
          <HouseScroll2 data={newdatas}></HouseScroll2>
        ) : (
          <div className="grid place-items-center">
            <Image src={loading2} alt={"loder"} width={60} height={60} />
          </div>
        )}

        {data2?.length != 0 && (
          <span className="absolute  ml-4  text-xl sm:text-2xl lg:text-2xl font-bold mt-5 ">
            Nearby Sold Properties
          </span>
        )}

        {data2?.length != 0 ? (
          <HouseScroll2 data={newdatas2}></HouseScroll2>
        ) : (
          <div className="grid place-items-center">
            <Image src={loading2} alt={"loder"} width={60} height={60} />
          </div>
        )}

        {/* house scroller ends here */}
        <div
          className={`sticky bottom-0   md:hidden bg-white ${
            scrolled
              ? "md:bg-white/80 md:backdrop-blur-md md:!text-black md:w-full pb-3 "
              : "md:bg-transparent md:max-w-7xl md:mx-auto  md:w-11/12 "
          }`}
        >
          <button
            onClick={getUserData}
            className="w-full flex justify-center py-2 px-4 border border-lightGray rounded-md shadow-md hover:shadow-xl text-lg text-white bg-primary hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-bold "
          >
            Book a Tour
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // Fetch data from external API

  let id = ctx.query;

  const res = await fetch(`${url}/api/v1/properties/fetchbyid/${id.property}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ page: 1 }),
  });

  const data = await res.json();

  // Pass data to the page via props
  return { props: { data, id } };
}

export default Property;
