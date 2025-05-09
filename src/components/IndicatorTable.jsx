// src/components/IndicatorTable.jsx
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function IndicatorTable() {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const indicator = searchParams.get("indicator");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country || !indicator) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=100`
        );
        const json = await res.json();

        if (!json[1]) {
          throw new Error("Aucune donnée trouvée.");
        }

        
        const filtered = json[1].filter((item) => item.value !== null);
        setData(filtered);
      } catch (err) {
        setError(err.message || "Erreur inconnue");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country, indicator]);

  if (!country || !indicator) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {loading && <p>Chargement des données...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Année</th>
              <th className="border p-2 text-left">Valeur</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.date}>
                <td className="border p-2">{entry.date}</td>
                <td className="border p-2">
                  {Number(entry.value).toLocaleString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
