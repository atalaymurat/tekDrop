import React from 'react'

function FiyatListe() {
  const fiyat = {
    lake: {
      duz : {
        beyaz : {
          tekYuz: 400,
          ciftYuz: 600,
        },
        ral : {
          tekYuz: 500,
          ciftYuz: 700
        }

      }
      ,
      cnc: {
        beyaz: {
          tekYuz: 1200
        }
      }
    }
  }
  return (
    <div className='w-full h-full flex flex-col'>
      <div className="">
        <img className="w-[200px] h-[200px] mx-auto object-cover" src='/dropLogo.jpeg' alt="Logo" />
      </div>
      <div className="text-center py-2">
        <h1 className='text-4xl font-extrabold capitalize'>
          fason fiyat listesi
        </h1>

      </div>
      <div className="grid grid-cols-5 mt-10">
        {/*BLOCK 1 */}
        <div className="grid grid-rows-6">
          <div className=""></div>
          <div className=""></div>
          <div className="row-span-4 flex items-end py-4 px-2 text-xl font-bold bg-gray-300">Lake</div>
        </div>
        {/*BLOCK 2 */}
        <div className="grid grid-rows-6">
          <div className=""></div>
          <div className=""></div>
          <div className="row-span-2 grid grid-cols-2 bg-gray-300 text-gray-100 font-semibold">
            <div className="flex pl-1 items-center">Mat</div>
            <div className="grid grid-rows-2">
              <div className="flex items-center pl-2">Beyaz</div>
              <div className="flex items-center pl-2">Ral</div>
            </div>
          </div>

          <div className="row-span-2 grid grid-cols-2 bg-gray-300 text-black font-semibold">
            <div className="flex pl-1 items-center">Parlak</div>
            <div className="grid grid-rows-2">
              <div className="flex items-center pl-2">Beyaz</div>
              <div className="flex items-center pl-2">Ral</div>
            </div>
          </div>
        </div>
        {/*BLOCK 3 */}
        <div className="grid grid-rows-6 bg-slate-400 rounded-t-2xl">
          <div className="font-bold text-lg flex items-center justify-center">Düz Yüzeyler</div>
          <div className="grid grid-cols-2 text-sm font-medium text-gray-800">
            <div className="flex justify-center items-center">Tek Yüz</div>
            <div className="flex justify-center items-center">Çift Yüz</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-white">
            <div className="flex items-center justify-center">400</div>
            <div className="flex items-center justify-center">600</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-white">
            <div className="flex items-center justify-center">500</div>
            <div className="flex items-center justify-center">700</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-black">
            <div className="flex items-center justify-center">650</div>
            <div className="flex items-center justify-center">850</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-black">
            <div className="flex items-center justify-center">750</div>
            <div className="flex items-center justify-center">950</div>
          </div>
        </div>

        {/*BLOCK 4 */}
        <div className="grid grid-rows-6 bg-yellow-400 rounded-t-2xl">
          <div className="font-bold text-lg flex items-center justify-center">Cnc Yüzeyler</div>
          <div className="grid grid-cols-2 text-sm font-medium text-gray-800">
            <div className="flex justify-center items-center">Tek Yüz</div>
            <div className="flex justify-center items-center">Çift Yüz</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-white">
            <div className="flex items-center justify-center">550</div>
            <div className="flex items-center justify-center">750</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-white">
            <div className="flex items-center justify-center">650</div>
            <div className="flex items-center justify-center">850</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-black">
            <div className="flex items-center justify-center">900</div>
            <div className="flex items-center justify-center">1100</div>
          </div>
          <div className="grid grid-cols-2 text-md font-medium text-black">
            <div className="flex items-center justify-center">1000</div>
            <div className="flex items-center justify-center">1200</div>
          </div>
        </div>

        {/*BLOCK 5 */}
        <div className="grid grid-rows-6 rounded-t-2xl">
          <div className="font-bold text-lg flex items-center justify-center text-white">---</div>
          <div className="grid grid-cols-2 text-sm font-medium bg-gray-300 text-gray-800">
            <div className="flex justify-center items-center">Gloss</div>
            <div className="flex justify-center items-center"></div>
          </div>
          <div className="grid grid-cols-2 text-xs font-medium text-gray-300 bg-gray-300">
            <div className="flex items-center justify-center">---</div>
            <div className="flex items-center justify-center"></div>
          </div>
          <div className="grid grid-cols-2 text-xs font-medium bg-gray-300 text-white">
            <div className="flex items-center justify-center">10,30,45</div>
            <div className="flex items-center justify-center"></div>
          </div>
          <div className="grid grid-cols-2 text-xs font-medium bg-gray-300 text-gray-300">
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-center">--</div>
          </div>
          <div className="grid grid-cols-2 text-xs font-medium text-black bg-gray-300">
            <div className="flex items-center justify-center">90</div>
            <div className="flex items-center justify-center"></div>
          </div>
        </div>





      </div>
      <div className="grid grid-cols-5">
        <div className="p-1 text-xs col-span-2">Fiyatlar 1(bir) m2 MDF yüzey için, Türk Lirası (TL) birimindendir.</div>
        <div className="bg-slate-400 shadow-md"></div>
        <div className="bg-yellow-400 shadow-md"></div>
        <div className="bg-none"></div>
      </div>

    </div>
  )
}

export default FiyatListe
