import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import Router from "next/router";
import { useState,useEffect } from "react";
import Loader from "../components/Loader"
import Head from "next/head"
import NProgress from "nprogress"
import AOS from 'aos';
import 'aos/dist/aos.css'
import "../styles/nprogress1.css";

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])

  const[loading,setloading] = useState(false)
   
   Router.events.on("routeChangeStart", (url) => {
        setloading(true)
        NProgress.start();
  })

  Router.events.on("routeChangeComplete", (url) => {
   
    setloading(false)
    NProgress.done();
  })

  return (
    <>
    
    <Layout>
      <Toaster />
      <AuthProvider>
       {loading && <Loader/>}
       
        <Component {...pageProps} />
      </AuthProvider>
    </Layout>
    </>
  );
}

export default MyApp;
