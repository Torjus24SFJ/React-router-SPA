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
  const [region, setRegion] = useState("");

  //! Setting init countries
  useEffect(() => {
    if (data && countries.length === 0) {
      setCountries(data.slice(0, 8));
    }
  }, [data, countries.length]);

  //! Setting countries based on searchTerm
  useEffect(() => {
    if (!isLoading) {
      if (searchTerm === "") {
        setCountries(data.slice(0, 8));
      } else {
        const filtered = data.filter((country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCountries(filtered);
      }
    }
  }, [searchTerm, data, isLoading]);

  //! Setting countries based on regions
  useEffect(() => {
    if(!isLoading){
      if (region === "") {
        setCountries(data.slice(0, 8));
      } else {
        const filtered = data.filter((country) => country.region === region);
        setCountries(filtered);
      }
    }
  }, [region, data, isLoading]);

  //! Setting random countries on button press
  const shuffleCountries = () => {
    if (!isLoading) {
      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 8);
      setCountries(shuffled);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
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
      <div className={style.filtered_button}>
        <label>Filter by Region</label>
        <br />
        <select onChange={(e) => setRegion(e.target.value)} value={region}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
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
