import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import nodata from "../public/nodata.svg";
import HouseCard from "../components/HouseCard";
import url from "../utils/constants";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Likedhouses = () => {
  const { token, likedHouses, setlikedHouses } = useAuth();
  const [data, setdata] = useState([]);

  const [login, setlogin] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      // console.log("loggin again");
    } else {
      setlogin(token);
    }
  }, []);

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
      setdata(house)
    };
    if (token) {
      getall();
    }
  }, [token]);

  // //   console.log(likedHouses)
  // useEffect(() => {
  //   const showlikedhouse = async () => {
  //     const response = await fetch(`${url}/api/v1/properties/showlikedhouses`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": token,
  //       },
  //       body: JSON.stringify({
  //         likedhouses: likedHouses,
  //       }),
  //     });
  //     const data = await response.json();
  //     setdata(data.data);
  //   };
  //   showlikedhouse();
  // }, [likedHouses, token]);


  return (
    <>
    <Navbar></Navbar>
      {login ? (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-11/12 mx-auto font-bold pt-[20px] ">
            <p className="text-2xl"> Shortlisted Properties</p>
          </div>

          {data?.length == 0 ? (
            <div className="grid place-items-center w-full">
              <Image
                className="w-full  mx-auto"
                height={250}
                width={250}
                src={nodata}
                alt="Sunset in the mountains"
              />
              <p className="font-bold ">
                It seems a little empty in here.{" "}
                <Link href="/search">
                  <span className="font-bold text-primary">Click here </span>
                </Link>
                to begin your house search now.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-11/12 mx-auto font-bold pt-[20px] pb-[50px]">
              {data?.map((datas: any) => (
                <HouseCard
                  home={datas}
                  housesliked={likedHouses}
                  key={datas._id}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-items-center w-full">
        <Image
          className="w-full  mx-auto"
          height={250}
          width={250}
          src={nodata}
          alt="Sunset in the mountains"
        />
        <p className="font-bold ">
          Please login to watch shortlisted houses
        </p>
      </div>
      )}
    </>
  );
};

export default Likedhouses;
