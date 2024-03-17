import type { NextPage } from "next";
import Hero from "../components/Hero";
import Usps from "../components/Usps";
import ContactForm from "../components/ContactForm";
import HouseScroll from "../components/HouseScroll";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import url from "../utils/constants";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { setlikedHouses, token , likedHouses } = useAuth();

  //To get user shortlisted-houses
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
      likedHouses 
    };
    if (token) {
      getall();
    }
  }, [token]);

  return (
    <div className="">
      <Navbar></Navbar>
      <Hero />
      
      <HouseScroll />
      <Usps />
      <ContactForm />
    </div>
  );
};

export default Home;
