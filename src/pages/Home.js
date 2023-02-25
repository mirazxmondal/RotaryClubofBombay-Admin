import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const navigate = useNavigate();
  const [allDocs, setAllDocs] = useState([]);
  // const [singleDoc, setSingleDoc] = useState({});

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigate("sign-in");
  //     })
  //     .catch((error) => alert(error.message));
  // };

  async function fetchListings() {
    try {
      const listingRef = collection(db, "users");
      const querySnap = await getDocs(listingRef);
      // setLastFetchListing(lastVisible);
      const docs = querySnap.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;

        return data;
      });
      setAllDocs(docs);
      console.log(allDocs);
    } catch (error) {
      console.log("Could not fetch listing");
    }
  }

  // function RedirectExample() {
  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       // 👇️ redirects to an external URL
  //       window.location.replace(
  //         "https://docs.google.com/spreadsheets/d/1Q33Mkk89-cPTQs437bjcoNatBKWZN7sV126udR0_Z4Y/edit#gid=0"
  //       );
  //     }, 3000);

  //     return () => clearTimeout(timeout);
  //   }, []);

  //   return <>Will redirect in 3 seconds...</>;
  // }

  return (
    <div className="m-2">
      <div className="flex flex-col justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto space-y-4">
        <button
          className="w-[40%] align-center bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase shadow-md rounded hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          onClick={() => navigate("/home")}
        >
          Get the Data
        </button>
        {/* <div>
          {allDocs.forEach((doc) => {
            return <p>${doc}</p>;
          })}
        </div> */}
      </div>
    </div>
  );
}

export default Home;
