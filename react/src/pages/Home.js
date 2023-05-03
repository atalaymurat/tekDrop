import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const dt = await axios.get("http://localhost:3001/offers");
      setData(dt.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-orange-500 py-4">
      <div className="my-2 border p-4 bg-slate-300">
        <h1 className="text-5xl text-center font-extrabold">
          <span className="text-xs mx-4 font-light">[home]</span>
          Drop Ahsap
        </h1>
      </div>
      <div className="px-4">
        <Link to="/offer">
          <button className="btn-warn">Yeni Teklif</button>
        </Link>
        <Link to="/liste">
          <button className="btn-warn">Fiyat Liste</button>
        </Link>
      </div>
      <div className="px-4">
        {loading && <div>Loading...</div>}
        {data.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data
              .sort((a, b) => a.createdAt < b.createdAt)
              .map((d) => {
                return (
                  <>
                    <Link to={`/offer/${d._id}`} >
                      <div className="border border-gray-600 px-2 py-4">
                        <div className="font-medium text-lg">{d.offerType}</div>
                        <div className="font-medium text-sm">
                          {d.createdAt
                            ? moment(d.createdAt).format("DD/MM/YY - HH:mm")
                            : null}
                        </div>
                        <div className="font-light text-xs">{d.customer}</div>
                        <div className="font-light text-xs">{d.itemNo}</div>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
