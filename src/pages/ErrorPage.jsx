import React from "react";
import { useEffect, useState } from "react";
import "../pages/ErrorPage.css";

function ErrorPage() {
  const data = [
    {
      picture: "./src/assets/FalloutErr.jpg",

      message: "War. War never changes.",
    },
    { picture: "./src/assets/GLaDOSError.png", message: "The cake is a lie." },
    {
      picture: "./src/assets/MarioError.png",
      message: "Thank you Mario! But our princess is in another castle!",
    },
    {
      picture: "./src/assets/ZeldaError.png",
      message: "It's dangerous to go alone! Take this",
    },
  ];

  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false);
      window.location.href = "/";
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const index = Math.floor(Math.random() * data.length);
  const pic = data[index].picture;
  const mess = data[index].message;

  return (
    <>
      <div className="error-container">
        <div>
          <p className="error-message">{mess}</p>
        </div>
        <div>
          <img className="error-image" src={pic} />
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
