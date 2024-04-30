"use client";
import React, { useEffect, useState } from "react";

// Define the structure of each solicitud
interface Solicitud {
  id: string;
  date: string;
  name: string;
  email: string;
  article: string;
  quantity: number;
  unit: string;
  brand: string;
  supplier: string;
  required_date: string;
  remarks: string;
}

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  useEffect(() => {
    async function fetchCsv() {
      try {
        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vTC43drhP1AX02OkaSr3zBOK9J11of8Z72hqhzaxxeUKZMJbwNC-yaLfULZECJSM0xlx9HloB-5WHZM/pub?gid=0&single=true&output=csv"
        );
        const csvText = await response.text();
        const csvData = csvText
          .split("\n")
          .slice(1)
          .map((row) => {
            const [
              id,
              date,
              name,
              email,
              article,
              quantity,
              unit,
              brand,
              supplier,
              required_date,
              remarks,
            ] = row.split(",");
            return {
              id,
              date,
              name,
              email,
              article,
              quantity: Number(quantity),
              unit,
              brand,
              supplier,
              required_date,
              remarks,
            };
          });
        setSolicitudes(csvData);
      } catch (error) {
        console.error("Failed to fetch the CSV data:", error);
      }
    }

    fetchCsv();
  }, []);

  return (
    <div>
      {solicitudes.map((solicitud) => (
        <div key={solicitud.id}>
          <p>
            {solicitud.name} - {solicitud.article}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Solicitudes;
