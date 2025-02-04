import { useState, useEffect } from "react";
import style from "./Gallery.module.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
export const Gallery = () => {
  const { data, error, isLoading } = useSWR(
    "https://restcountries.com/v2/all",
    fetcher
  );

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
    if (data && countries.length === 0) {
      setCountries(data.slice(0, 8));
    }
  }, [data, countries.length]);

  useEffect(() => {
    if (searchTerm === "") {
      setCountries(data.slice(0, 8))
    } else {
      const filtered = data.filter((country) => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCountries(filtered);
    }
  }, [searchTerm, data]);


  const shuffleCountries = () => {
    if (data) {
      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 8);
      setCountries(shuffled);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <h1 className="title_header_text">This is the gallery!</h1>
      <div className={style.top_buttons_flex}>
        <input
          type="text"
          className={style.searchCountry}
          placeholder="Search for a country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={style.randomize_button} onClick={shuffleCountries}>
          Randomize
        </button>
      </div>
      <div className="main_content_container">
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
