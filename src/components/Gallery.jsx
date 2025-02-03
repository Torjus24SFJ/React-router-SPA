import { useState, useEffect } from "react";
import style from "./Gallery.module.css";

export const Gallery = () => {
const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchImages = async() => {
            try {
                const response = await fetch("https://restcountries.com/v2/all")
                const countries = await response.json();
                setCountries(countries.splice(0, 4));
            }
            catch(error) {
                console.log("Error!", error)
            }
        };
        fetchImages();
    },[]);

  return (
    <>
      <h1 className="title_header_text">This is the gallery!</h1>
      <div className="main_content_container">
        <div className={style.grid_gallery_container}>
            {countries.map((countries, index) => (
                <div key={index} className={style.picture_card}><img src={countries.flags.png} alt={countries.name}/></div>
            ))}
        </div>
      </div>
    </>
  );
};
