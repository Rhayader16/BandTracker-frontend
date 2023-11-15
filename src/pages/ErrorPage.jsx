import React from "react";
import { useEffect, useState } from "react";

function ErrorPage() {
  const data = [
    {
      message: "How are things on the west coast?",
      artist: "-Interpol-",
    },
    {
      message:
        "Well what weighs more down on your plate, a ton of love? A ton of hate?",
      artist: "-Editors-",
    },
    {
      message:
        "What could I have done to make this better besides not doing what it was I did to make it worse?",
      artist: "-On an On-",
    },
    {
      message:
        "Who are you to me? Who am I supposed to be? Not exactly sure anymore",
      artist: "-Queens of the Stone Age-",
    },
  ];

  const [showPage, setShowPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPage(false);
      window.location.href = "/";
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const index = Math.floor(Math.random() * data.length);
  const message = data[index].message;
  const artist = data[index].artist;

  return (
    <>
      <div className="error-container">
        <div>
          <p className="warning">
            This is an error page, here's some questions for you:
          </p>
        </div>
        <div>
          <p className="error-message">{message}</p>
        </div>
        <div>
          <p className="error-text">{artist}</p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
