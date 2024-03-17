import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import url from "../utils/constants";

type authContextType = {
  likedHouses: string[];
  token: string;
  addHouse: (houseid: string) => void;
 
  removeHouse: (houseid: string) => void;
  setlikedHouses: Dispatch<SetStateAction<never[]>>;
};

const authContextDefaultValues: authContextType = {
  likedHouses: [],
  token: "",
  addHouse: () => {},
  removeHouse: () => {},
  setlikedHouses: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

//children type declarations
type Props = {
  children: ReactNode;
};

//functions here
export function AuthProvider({ children }: Props) {
  const [token, settoken] = useState("");
  const [likedHouses, setlikedHouses] = useState([]);

  useEffect(() => {
    let usertoken = localStorage.getItem("token");

    if (!usertoken) {
      // console.log("loggin again");
    } else {
      settoken(usertoken);
    }
  }, []);

  //addhouse to addhouse in the database
  const addHouse = async (houseid: string) => {
    
    let usertoken = localStorage.getItem("token");

    if (!usertoken) {
      // console.log("loggin again");
    } else {
      settoken(usertoken);
    }
   
    const response = await fetch(`${url}/api/v1/properties/addhouse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ houseid }),
    });

    const house = await response.json();

    let filtered  = likedHouses.filter((val) => {
      return val != houseid
    })

    if(!filtered){
      setlikedHouses(house);
    }

  };

  //removehouse  to remove house from the database
  const removeHouse = async (houseid: string) => {
    const response = await fetch(`${url}/api/v1/properties/removehouse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ houseid }),
    });

    const house = await response.json();
    setlikedHouses(house);
  };

  const value = { addHouse, removeHouse, token, likedHouses, setlikedHouses };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
