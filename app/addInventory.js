"use client";

import { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { FiCalendar, FiClock, FiMapPin, FiCopy, FiBox } from "react-icons/fi";
import Image from "next/image";
import message from "../public/images/chat.png";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";

export default function AddInventory() {
  const initialForm = {
    matchEvent: "",
    ticketType: "E-ticket",
    quantity: "",
    splitType: "None",
    maxDisplay: "",
    FanArea: "Home",
    category: "Away Fan Section",
    section: "Longside Lower Tier",
    seatingArrangement: "Seated Together",
    row: "",
    firstSeat: "",
    faceValue: "",
    payoutPrice: "",
    benefits: "None",
    restrictions: "None",
    shipDate: "",
    ticketInHand: false,
    uploadTicket: "",
  };

  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [listings, setListings] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const selectOptions = {
    ticketType: ["E-ticket", "Local Delivery"],
    splitType: ["None", "Split Type"],
    category: ["Home", "Away Fan Section"],
    section: ["Longside Lower Tier", "Washington Lower Tier"],
    FanArea: ["Home", "Away"],
    seatingArrangement: ["Not Seated together", "Seated Together"],
    benefits: ["None", "Merchandise", "Free Food"],
    restrictions: ["None", "ID Required", "No Kids"],
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (
        typeof value === "string" &&
        value.trim() === "" &&
        key !== "uploadTicket"
      ) {
        errors[key] = "This field is required";
      }
      if (
        typeof value === "number" &&
        (value === 0 || value === "") &&
        key !== "uploadTicket"
      ) {
        errors[key] = "This field is required";
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddListing = () => {
    if (!validateForm()) return;

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
    setForm(initialForm);
    setFormErrors({});
    setEditId(null);
  };

  const handleEdit = (id) => {
    const item = listings.find((i) => i.id === id);
    if (item) {
      const { checked, id: _, ...rest } = item;
      setForm(rest);
      setEditId(id);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0]?.name || "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDelete = (id) => {
    setListings((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClone = (id) => {
    const item = listings.find((i) => i.id === id);
    if (item) {
      setListings([...listings, { ...item, id: Date.now(), checked: false }]);
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

  const filteredListings = listings.filter((item) =>
    item.ticketType.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Header */}
      <header className="p-4 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">Add Inventory</h2>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Request Event
            </button>
            <Image src={message} width={40} height={40} alt="message" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-2 rounded flex-wrap md:flex-nowrap">

  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap flex-1">
    <div className="w-full md:w-[300px]">
      <TextField
        fullWidth
        name="matchEvent"
        label="Choose Match Event"
        value={form.matchEvent}
        onChange={handleChange}
        error={!!formErrors.matchEvent}
        helperText={formErrors.matchEvent}
      />
    </div>

    <div className="flex items-center gap-1">
      <FiCalendar className="text-blue-600" />
      <span className="text-sm md:text-base font-medium">Sun, 10 Nov 2025</span>
    </div>

    <div className="flex items-center gap-1">
      <FiClock className="text-blue-600" />
      <span className="text-sm md:text-base font-medium">16:30</span>
    </div>

    <div className="flex items-center gap-1">
      <FiMapPin className="text-blue-600" />
      <span className="text-sm md:text-base font-medium">
        Stamford Bridge, London, United Kingdom
      </span>
    </div>
  </div>


  <div className="whitespace-nowrap">
    <h2 className="text-blue-700 font-semibold text-base md:text-lg cursor-pointer">
      View Map
    </h2>
  </div>
</div>

      </header>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
        {Object.entries(form).map(([key, value]) => {
          if (key === "matchEvent") return null; 

          if (selectOptions[key]) {
            return (
              <FormControl key={key} fullWidth error={!!formErrors[key]}>
                <InputLabel>
                  {key.replace(/([A-Z])/g, " $1")}
                  {formErrors[key] ? " *" : ""}
                </InputLabel>
                <Select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  label={key.replace(/([A-Z])/g, " $1")}
                >
                  {selectOptions[key].map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          } else if (key === "shipDate") {
            return (
              <TextField
                key={key}
                fullWidth
                type="date"
                name={key}
                label="Ship Date"
                value={value}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!formErrors[key]}
                helperText={formErrors[key]}
              />
            );
          } else if (key === "ticketInHand") {
            return (
              <div
                key={key}
                className="flex items-center justify-between border px-4 py-[9px] rounded h-[56px]"
              >
                <div className="flex items-center gap-2">
                  <FiBox className="text-blue-600" size={20} />
                  <span className="text-sm font-medium">Ticket In Hand</span>
                </div>
                <input
                  type="checkbox"
                  name="ticketInHand"
                  checked={value}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </div>
            );
          } else if (key === "uploadTicket") {
            return (
              <TextField
                key={key}
                fullWidth
                type="file"
                name={key}
                label="Upload Ticket"
              />
            );
          } else {
            return (
              <TextField
                key={key}
                fullWidth
                name={key}
                label={
                  key.replace(/([A-Z])/g, " $1") +
                  (formErrors[key] ? " *" : "")
                }
                value={value}
                onChange={handleChange}
                type={typeof value === "number" ? "number" : "text"}
                error={!!formErrors[key]}
                helperText={formErrors[key]}
              />
            );
          }
        })}
      </div>

      
      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={handleAddListing} variant="contained" color="primary">
          {editId ? "Update Listing" : "+ Add Listing"}
        </Button>
        <Button onClick={resetForm} variant="outlined">
          Reset
        </Button>
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
              {[
                "Ticket Type",
                "Qty",
                "Split",
                "Max",
                "Category",
                "Section",
                "Seating",
                "Row",
                "Seat",
                "Face",
                "Payout",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-2 text-left">
                  {header}
                </th>
              ))}
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t px-4 py-3 flex justify-end gap-2 shadow z-10">
        <Button onClick={handleDeleteSelected} variant="outlined" color="error">
          Delete Selected
        </Button>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="success">
          Publish
        </Button>
      </footer>
    </div>
  );
}
