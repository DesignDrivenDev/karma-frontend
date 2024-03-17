import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { useAuth } from "../context/AuthContext";
import url from "../utils/constants";
import HouseCard2 from "./HouseCard2";
import loading2 from "../public/loading2.gif";

function HouseScroll() {
  const [data, setdata] = useState<any>();
  const { setlikedHouses, token, likedHouses } = useAuth();

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

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch(`${url}/api/v1/properties/fetchbyproperties/0`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          propertySubType: "Single Family Residence",
          lotSizeArea: 0,
          standardStatus: "Active",
          communityFeatures: "",
          exteriorFeatures: "",
          sort: 4,
        }),
      });

      const data = await res.json();
      setdata(data.data);
    };

    getUsers();
  }, []);

  return (
    <>
      <div className="mt-16  max-w-[85rem] mx-auto ">
        {/* <h3 className="font-extrabold text-2xl px-12">Recently Listed</h3> */}
        {data ? (
          <ScrollMenu
            // wrapperClassName="bg-red-800"
            scrollContainerClassName="gap-4 py-6 md:px-3 px-1"
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {data?.map((datas: any) => (
              <HouseCard2
                home={datas}
                housesliked={likedHouses}
                key={datas._id}
              />
            ))}
          </ScrollMenu>
        ) : (
          <div className="grid place-items-center">
            <Image src={loading2} alt={"loder"} width={60} height={60} />
          </div>
        )}
      </div>
    </>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 md:w-9 h-10 z-20 md:mr-3 text-primary rotate-180 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 md:w-9 h-9 z-20 md:mr-3 text-primary"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </Arrow>
  );
}

function Arrow({ children, disabled, onClick }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

export default HouseScroll;
