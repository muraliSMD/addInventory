import React from 'react'

export default function addInventory() {
  return (
    <div className='min-h-screen bg-gray-100 p-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'></h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <input className="border p-2 rounded w-full" placeholder="Choose Match Event" />
                 <input type="date" className="border p-2 rounded w-full"  />
                  <input type="time" className="border p-2 rounded w-full" defaultValue="16:30" />

                  <select className="border p-2 rounded">
                    <option>Local Delivery</option>
                      <option>E-ticket</option>
                  </select>
                  <input  type="number"  className="border p-2 rounded" />
                   <select  className="border p-2 rounded">
                    <option>None</option>
                      <option>Split Type A</option>
                  </select>
                  <select className='border p-2 ropunded'>
                    <option>Not Seated Together</option>
                     <option>Seated Together</option>
                  </select>
                 <input type="number" className="border p-2 rounded" />
                 <select className='border p-2 rounded'>
                    <option>Home</option>
                     <option>Away</option>
                 </select>
                 <select className='border p-2 rounded'>
                    <option>Away Fans Section</option>
                 </select>
                 <input type="text" className='border p-2 rounded' placeholder='Section/Block' />
                 <input type="number" className='border p-2 rounded'/>
                 <input type="number" className='border p-2 rounded'/>
                 <input type="number" className='border p-2 rounded'/>
                 <input type="number" className='border p-2 rounded'/>

                 <select className='border p-2 rounded'>
                    <option value="">None</option>
                 </select>
                  <select className='border p-2 rounded'>
                    <option value="">None</option>
                 </select>
            </div>
            <button className='mt-4 bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700'>
                + Add Listing
            </button>
        </div>
    </div>
  )
}
