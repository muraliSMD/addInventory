"use client";

import { useState } from "react";
import { AiFillEdit, AiOutlineDelete, AiFillMessage  } from "react-icons/ai";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import message from "../public/images/chat.png"
import Image from "next/image";

export default function AddInventory() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({
    ticketType: "E-ticket",
    quantity: 5,
    splitType: "None",
    maxDisplay: 5,
    FanArea: "Home",
    category: "Away Fan Section",
    section: "Longside Lower Tier",
    seatingArrangement: "Seated Together",
    row: 5,
    firstSeat: 3,
    faceValue: 90000,
    payoutPrice: 90000,
    benefits: "None",
    restrictions: "None",
    shipDate: "",
    ticketInHand: false,
    uploadTicket: "",
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const handleAddListing = () => {
    if (editId !== null) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...form, id: editId, checked: false } : item
        )
      );
      setEditId(null);
    } else {
      setListings([...listings, { ...form, id: Date.now(), checked: false }]);
    }
    resetForm();
  };

  const resetForm = () => {
    setForm({
      ticketType: "E-ticket",
      quantity: 5,
      splitType: "None",
      maxDisplay: 5,
      FanArea: "Home",
      category: "Away Fan Section",
      section: "Longside Lower Tier",
      seatingArrangement: "Seated Together",
      row: 5,
      firstSeat: 3,
      faceValue: 90000,
      payoutPrice: 90000,
      benefits: "None",
      restrictions: "None",
      shipDate: "",
      ticketInHand: false,
      uploadTicket: "",
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0]?.name || "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleCheckbox = (id) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSelectAll = () => {
    const newSelect = !selectAll;
    setSelectAll(newSelect);
    setListings((prev) =>
      prev.map((item) => ({ ...item, checked: newSelect }))
    );
  };

  const handleDeleteSelected = () => {
    setListings((prev) => prev.filter((item) => !item.checked));
  };

  const handleEdit = (id) => {
    const item = listings.find((i) => i.id === id);
    if (item) {
      setForm({ ...item });
      setEditId(id);
    }
  };

  const handleClone = (id) => {
    const item = listings.find((i) => i.id === id);
    if (item) {
      setListings([...listings, { ...item, id: Date.now(), checked: false }]);
    }
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((i) => i.id !== id));
  };

  const filteredListings = listings.filter((item) =>
    item.ticketType.toLowerCase().includes(filter.toLowerCase())
  );

  const selectOptions = (name) => {
    const options = {
      ticketType: ["E-ticket", "Local Delivery"],
      splitType: ["None", "Split Type"],
      category: ["Home", "Away Fan Section"],
      section: ["Longside Lower Tier", "Washington Lower Tier"],
      FanArea: ["Home", "Away"],
      seatingArrangement: ["Not Seated together", "Seated Together"],
      benefits: ["None", "Merchandise", "Free Food"],
      restrictions: ["None", "ID Required", "No Kids"],
    };
    return options[name] || [];
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-2xl font-semibold">Add Inventory</h2>
      </div>
        <div>
        <button
          className="bg-blue-600 text-white px-4 py-2 m-2 rounded"
        >
          Request Event
        </button>
        <div>
<Image src ={message} width={50} height={50} alt="message" />
        </div>
        
        </div>
        
      </div>

      <div className="flex gap-4 p-2 rounded">
        {/* Left Section - 75% */}
        <div className="flex flex-row w-3/4 items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <input
              className="border rounded w-100 px-2 py-1"
              type="text"
              placeholder="Chelsea Vs arsenal - premier league"
            />
          </div>

          <div className="flex items-center gap-1">
            <FiCalendar className="text-blue-600" />
            <h2 className="text-xl font-semibold">Sun, 10 Nov 2025</h2>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="text-blue-600" />
            <h2 className="text-xl font-semibold">16:30</h2>
          </div>
          <div className="flex items-center gap-1">
            <FiMapPin className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Stamford Bridge, London, United Kingdom
            </h2>
          </div>
        </div>

        {/* Right Section - 25% */}
        <div className="flex justify-end items-center w-1/4">
          <h2 className="text-xl font-semibold text-blue-700 cursor-pointer">
            View Map
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium capitalize mb-1">
              {key.replace(/([A-Z])/g, " $1")} *
            </label>
            {selectOptions(key).length > 0 ? (
              <select
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                {selectOptions(key).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : key === "shipDate" ? (
              <input
                type="date"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            ) : key === "ticketInHand" ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="ticketInHand"
                  checked={form.ticketInHand}
                  onChange={handleChange}
                />
                <label className="text-sm">Ticket In Hand</label>
              </div>
            ) : key === "uploadTicket" ? (
              <input
                type="file"
                name="uploadTicket"
                onChange={handleChange}
                disabled
                className="border px-3 py-2 rounded"
              />
            ) : (
              <input
                type={typeof value === "number" ? "number" : "text"}
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleAddListing}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Listing" : "+ Add Listing"}
        </button>
        <button onClick={resetForm} className="border px-4 py-2 rounded">
          Reset
        </button>
      </div>

      <div className="overflow-x-auto border rounded-md max-h-[400px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2 text-left">Ticket Type</th>
              <th className="px-4 py-2 text-left">Qty</th>
              <th className="px-4 py-2 text-left">Split</th>
              <th className="px-4 py-2 text-left">Max</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Section</th>
              <th className="px-4 py-2 text-left">Seating</th>
              <th className="px-4 py-2 text-left">Row</th>
              <th className="px-4 py-2 text-left">Seat</th>
              <th className="px-4 py-2 text-left">Face</th>
              <th className="px-4 py-2 text-left">Payout</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheckbox(item.id)}
                  />
                </td>
                <td className="px-4 py-2">{item.ticketType}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.splitType}</td>
                <td className="px-4 py-2">{item.maxDisplay}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.section}</td>
                <td className="px-4 py-2">{item.seatingArrangement}</td>
                <td className="px-4 py-2">{item.row}</td>
                <td className="px-4 py-2">{item.firstSeat}</td>
                <td className="px-4 py-2">₹{item.faceValue}</td>
                <td className="px-4 py-2">₹{item.payoutPrice}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(item.id)}>
                    <AiFillEdit className="text-blue-600" size={18} />
                  </button>
                  <button onClick={() => handleClone(item.id)}>
                    <FiCopy className="text-gray-600" size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <AiOutlineDelete className="text-red-600" size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="mt-6 flex justify-end gap-2 border-t pt-4">
        <button
          onClick={handleDeleteSelected}
          className="border px-4 py-2 rounded text-red-600"
        >
          Delete Selected
        </button>
        <button className="border px-4 py-2 rounded">Cancel</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Publish
        </button>
      </footer>
    </div>
  );
}
