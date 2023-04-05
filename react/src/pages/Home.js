import React, { useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment'
import { Link } from "react-router-dom"

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getData = async () => {
        try {
            setLoading(true)
            const dt = await axios.get('http://localhost:3001/offers')
            setData(dt.data)
            setError(null)
            setLoading(false)
        } catch (err) {
            setError(err.message);
            setData(null)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="min-h-screen w-full bg-orange-500 py-4">
            <div className="my-2 border p-4 bg-slate-300">
                <h1 className="text-5xl text-center font-extrabold"><span className="text-xs mx-4 font-light">
                    [home]
                </span>
                    Drop Ahsap</h1>
            </div>
            <div className="px-4">

                <button className="btn-warn">
                    <Link to="/offer">
                        Yeni Teklif
                    </Link>
                </button>
                <button className="btn-warn">
                    <Link to="/liste">
                        Fiyat Liste
                    </Link>
                </button>
            </div>
            <div className="px-4">
                {loading && <div>Loading...</div>}
                {data.length > 0 &&
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {data.map(d => {
                            return (
                                <div className='border border-gray-600 px-2 py-4'>
                                    <div className='font-medium text-lg'>{d.offerType}</div>
                                    <div className="font-medium text-sm">{d.createdAt ? moment(d.createdAt).format("DD/MM/YY - HH:mm") : null}</div>
                                    <div className="font-light text-xs">{d._id}</div>
                                    <div className="font-light text-xs">{d.itemNo}</div>
                                </div>
                            )
                        })}
                    </div>

                }
            </div>
        </div>
    );
}

export default Home;