"use client";
import React from "react";
import { useState } from "react";

export default function addInventory() {
  return (
   <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Inventory</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Choose Match Event *</label>
            <input name="event" className="border p-2 mb-2 rounded w-full" placeholder="chelsia VS Arsenal Premier league" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium"></label>
          <p className="pt-6">Date : 22/06/2025</p>
          </div>
          <div className="flex flex-col">
            <p className="pt-6">Date : 22/06/2025</p>
          </div>
          <div className="flex flex-col">
            <p className="pt-6">location from amster broidge USA </p>
          </div>
           <div className="flex flex-col">
            <p className="pt-6">View Map</p>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

           {[
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
            ["Restrictions", "restrictions", "select", ["None"]],
          ].map(([label, name, type, options], idx) => (
            <div key={idx} className="relative flex flex-col">
              <label className="text-sm font-medium">{label} *</label>
              {type === "select" ? (
                <select className="border p-2 rounded">
                  {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              ) : (
                <input className="border p-2 rounded" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Listing
          </button>
        </div>
      </div>
      <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
         <h2 className="text-lg font-semibold mb-2">Listings</h2>
       <table className="w-full text-left">
          <thead>
          <tr className="bg-blue-900 text-white">
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
            <tr>
            <td><input  /></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2 flex gap-2">
                  
                </td>
            </tr>
          </tbody>
        </table>
         
      </div>
      <div className="flex justify-between">
        <div className="mt-4 flex justify-start gap-4">
         <button className="pl-4 pr-4 pt-1 pb-1 bg-gray-400 text-blue-950" >Edit</button>
                  <button className="pl-4 pr-4 pt-1 pb-1 bg-gray-400 text-blue-950" >Clone</button>
                  <button className="pl-4 pr-4 pt-1 pb-1 bg-gray-400 text-red-600" >Delete</button>
        </div>
      <div className="mt-4 flex justify-end gap-4">
          <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100">Cancel</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Publish Live</button>
        </div>
      </div>
    </div>
  );
}
