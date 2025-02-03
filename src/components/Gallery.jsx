import { useState, useEffect } from "react";
import style from "./Gallery.module.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export const Gallery = () => {
const {data, error, isLoading} = useSWR("https://restcountries.com/v2/all", fetcher);

const [countries, setCountries] = useState([]);

/* TODO sort countries by search term input

const [searchTerm, setSearchTerm] = useState("");
const [names, setNames] = useState([]);

useEffect(() => {
  if (searchTerm === "") {
    setNames([]);
    return;
  }
}, [searchTerm, data]);

 */

useEffect(() => {
  if (data && countries.length === 0) {
    setCountries(data.slice(0, 8));
  }
}, [data, countries.length]);


const shuffleCountries = () => {
  if (data) {
    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 8);
    setCountries(shuffled);
  }
}



if(isLoading) return <div>Loading...</div>
if(error) return <div>Error loading data</div>


    return (
      <>
        <h1 className="title_header_text">This is the gallery!</h1>
        <div className="main_content_container">
          <button className={style.randomize_button} onClick={shuffleCountries}>Randomize</button>
          <div className={style.grid_gallery_container}>
            {countries.map((country, index) => (
              <div key={index} className={style.picture_card}>
                <img src={country.flags.png} alt={country.name} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
