"use client";
import { useEffect, useState } from "react";

// Define an interface for the items
interface Item {
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

export default function Home() {
  // Set the initial state with the type of Item[]
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=95sVRGRuKuxK7G4EbKXs_4mOdrM-i972ArkNaxNvLShP_rHK95JqBJAX0F6vLeBajLOdLiqrja4446YzQQrjx1y-WsPdY9IRm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNeLpbCYvbDf9c02fCKYz9mkNFI_S7GweNjtUHz-iF3PikxATRcGZGL2YM-BV4A7IDfg6gH5Fex79IjmQ1k5LpPgAa4UMbUb19z9Jw9Md8uu&lib=MaPxkVbATuJxkHwkmBYLu8E_-SwxRi180"
      );
      const jsonData = await res.json();
      console.log(jsonData);
      setData(jsonData.data); // Assuming your API wraps data in a 'data' property
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item: Item, index: number) => (
        <div key={index}>
          <p>
            {item.name} - {item.email}
          </p>
        </div>
      ))}
    </div>
  );
}
