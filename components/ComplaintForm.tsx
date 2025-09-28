"use client";
import React, { useState } from "react";
import axios from "axios";

const categories = ["Product", "Service", "Support"];

export default function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState<"Low"|"Medium"|"High">("Low");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post("/api/complaints", { title, description, category, priority });
      setMsg("Complaint submitted successfully!");
      setTitle(""); 
      setDescription(""); 
      setCategory(categories[0]); 
      setPriority("Low");
    } catch (err) {
      console.error(err);
      setMsg("Error submitting complaint. Please try again.");
    } finally { 
      setLoading(false); 
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complaint Title *
          </label>
          <input 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
            placeholder="Enter a brief title for your complaint"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea 
            value={description} 
            onChange={(e)=>setDescription(e.target.value)} 
            required 
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none" 
            placeholder="Please provide detailed information about your complaint"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select 
            value={category} 
            onChange={(e)=>setCategory(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Priority *
          </label>
          <div className="flex gap-6">
            {(["Low", "Medium", "High"] as const).map((p) => (
              <label key={p} className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  checked={priority === p} 
                  onChange={()=>setPriority(p)} 
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {msg && (
          <div className={`mt-4 p-4 rounded-lg ${
            msg.includes("successfully") 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}
