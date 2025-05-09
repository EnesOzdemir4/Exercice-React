// src/components/SearchForm.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

const INDICATORS = [
  { code: "NY.GDP.MKTP.CD", label: "Produit intérieur brut (PIB)" },
  { code: "NE.IMP.GNFS.CD", label: "Importations de biens et services" },
  { code: "NY.ADJ.NNTY.PC.CD", label: "Revenu national net par habitant" },
];

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const country = searchParams.get("country") || "";
  const indicator = searchParams.get("indicator") || INDICATORS[0].code;

  const handleCountryChange = (e) => {
    setSearchParams({ country: e.target.value.toUpperCase(), indicator });
  };

  const handleIndicatorChange = (e) => {
    setSearchParams({ country, indicator: e.target.value });
  };

  return (
    <form className="p-4 flex flex-col gap-4 max-w-md mx-auto">
      <label>
        Pays (code ISO 2 lettres, ex: FR, US, CN) :
        <input
          type="text"
          value={country}
          onChange={handleCountryChange}
          className="border p-2 w-full"
          maxLength={2}
          placeholder="Ex : FR"
        />
      </label>

      <label>
        Indicateur :
        <select
          value={indicator}
          onChange={handleIndicatorChange}
          className="border p-2 w-full"
        >
          {INDICATORS.map((ind) => (
            <option key={ind.code} value={ind.code}>
              {ind.label}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}
