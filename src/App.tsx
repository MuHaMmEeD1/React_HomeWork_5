import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ContactList from "./components/ContactList/ContactList";

function App() {
  return (
    <>
      <ImageGallery />
    </>
  );
  // return (
  //   <>
  //     <ContactList />
  //   </>
  // );
}

export default App;
