"use client";

import { useState } from "react";
// import { FaCalendarAlt } from "react-icons/fa";
// import { BsFillPlusCircleFill } from "react-icons/bs";
// import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
// import { FiCopy } from "react-icons/fi";
// import { MdOutlinePublish } from "react-icons/md";

export default function AddInventory() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    event: "Chelsea vs Arsenal - Premier League",
    ticketType: "ticketType",
    quantity: 5,
    splitType: "None",
    seatingArrangement: "Not Seated Together",
    maxDisplay: 30,
    fanArea: "Home",
    category: "Away Fans Section",
    section: "Longside Lower Tier",
    row: 5,
    firstSeat: 3,
    faceValue: 90000,
    payoutPrice: 90000,
    benefits: "None",
    restrictions: "None",
    shipDate: "2014-11-29",
  });
  const [editId, setEditId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  const handleAddListing = () => {
    if (editId !== null) {
      setListings(prev => prev.map(item => item.id === editId ? { ...form, id: editId, checked: item.checked } : item));
      setEditId(null);
    } else {
      setListings([...listings, { ...form, id: Date.now(), checked: false }]);
    }
    resetForm();
  };

const handleChange = (e) => {
  const { name, value, type } = e.target;

  const formattedValue =
    type === "number" ? parseInt(value, 10) || 0 : value;

  setForm((prevForm) => ({
    ...prevForm,
    [name]: formattedValue,
  }));
};


  const toggleCheckbox = (id) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleSelectAll = () => {
    const newSelect = !selectAll;
    setSelectAll(newSelect);
    setListings(prev => prev.map(item => ({ ...item, checked: newSelect })));
  };

  const handleDeleteSelected = () => {
    setListings(prev => prev.filter(item => !item.checked));
  };

  const handleEdit = (id) => {
    const item = listings.find(l => l.id === id);
    if (item) {
      setForm({ ...item });
      setEditId(id);
    }
  };

  const handleClone = (id) => {
    const item = listings.find(l => l.id === id);
    if (item) {
      const cloned = { ...item, id: Date.now(), checked: false };
      setListings([...listings, cloned]);
    }
  };

  const handleDelete = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  const resetForm = () => {
    setForm({
      event: "Chelsea vs Arsenal - Premier League",
      ticketType: "Local Delivery",
      quantity: 5,
      splitType: "None",
      seatingArrangement: "Not Seated Together",
      maxDisplay: 30,
      fanArea: "Home",
      category: "Away Fans Section",
      section: "Longside Lower Tier",
      row: 5,
      firstSeat: 3,
      faceValue: 90000,
      payoutPrice: 90000,
      benefits: "None",
      restrictions: "None",
      shipDate: "2014-11-29",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Inventory</h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Choose Match Event *</label>
            <input name="event" value={form.event} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Date to Ship *</label>
            <input name="shipDate" type="date" value={form.shipDate} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Time *</label>
            <input type="time" className="border p-2 rounded w-full" defaultValue="16:30" />
          </div>

          {[...formFields()].map(([label, name, type, options], idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-sm font-medium">{label} *</label>
              {type === "select" ? (
                <select name={name} onChange={handleChange} value={form[name]} className="border p-2 rounded">
                  {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : (
                <input name={name} type={type} value={form[name]} onChange={handleChange} className="border p-2 rounded" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-start gap-4">
          <button onClick={handleAddListing} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editId ? "Update Listing" : "+ Add Listing"}
          </button>
          <button onClick={resetForm} className="text-gray-600">Clear</button>
        </div>
      </div>

      <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">Listings</h2>
          <div className="space-x-2">
            <button onClick={handleSelectAll} className="text-sm border px-2 py-1 rounded">
              {selectAll ? "Deselect All" : "Select All"}
            </button>
            <button onClick={handleDeleteSelected} className="text-sm border px-2 py-1 rounded text-red-500">
              Delete Selected
            </button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2"><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
              <th className="p-2">Ticket Type</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Split</th>
              <th className="p-2">Max</th>
              <th className="p-2">Category</th>
              <th className="p-2">Section</th>
              <th className="p-2">Row</th>
              <th className="p-2">Seat</th>
              <th className="p-2">Face</th>
              <th className="p-2">Payout</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2"><input type="checkbox" checked={item.checked} onChange={() => toggleCheckbox(item.id)} /></td>
                <td className="p-2">{item.ticketType}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.splitType}</td>
                <td className="p-2">{item.maxDisplay}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.section}</td>
                <td className="p-2">{item.row}</td>
                <td className="p-2">{item.firstSeat}</td>
                <td className="p-2">{item.faceValue}</td>
                <td className="p-2">{item.payoutPrice}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(item.id)}className="text-blue-600" size={18} >Edit</button>
                  <button onClick={() => handleClone(item.id)}className="text-gray-600" size={18} >Clone</button>
                  <button onClick={() => handleDelete(item.id)}className="text-red-600" size={18} >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end gap-4">
          <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">Cancel</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Publish Live</button>
        </div>
      </div>
    </div>
  );
}

const formFields = () => [
  ["Ticket Type", "ticketType", "select", ["Local Delivery", "E-ticket"]],
  ["Quantity", "quantity", "number"],
  ["Split Type", "splitType", "select", ["None", "Split Type A"]],
  ["Seating Arrangement", "seatingArrangement", "select", ["Not Seated Together", "Seated Together"]],
  ["Max Display Quantity", "maxDisplay", "number"],
  ["Fan Area", "fanArea", "select", ["Home", "Away"]],
  ["Category", "category", "select", ["Away Fans Section"]],
  ["Section/Block", "section", "text"],
  ["Row", "row", "number"],
  ["First Seat", "firstSeat", "number"],
  ["Face Value", "faceValue", "number"],
  ["Payout Price", "payoutPrice", "number"],
  ["Benefits", "benefits", "select", ["None"]],
  ["Restrictions", "restrictions", "select", ["None"]]
];
