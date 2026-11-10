"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";

const Ideas = () => {
    const [arr, setArr] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handleFetch = async () => {
        try {
            const dbArray: any[] = [];
            const querySnapshot = await getDocs(collection(db, "business_ideas"));
            
            querySnapshot.forEach((docItem) => {
                const data = { id: docItem.id, ...docItem.data() };
                dbArray.push(data);
            });

            setArr(dbArray);
        } catch (error) {
            console.error("Error fetching ideas>>>>", error);   
            alert("An error occurred while fetching!");
        } finally {
            setLoading(false);
        }
    };

    // Delete handler to remove document from Firestore and update state
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this business idea?")) return;
        try {
            await deleteDoc(doc(db, "business_ideas", id));
            setArr(arr.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting document:", error);
            alert("Failed to delete idea.");
        }
    };

    useEffect(() => { 
        handleFetch(); 
    }, []);

    if (loading) {
        return <p className="p-6 text-xs text-neutral-500 font-medium">Loading business ideas...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10 font-sans">
            <h1 className="text-xl md:text-2xl font-black mb-6 text-[#1A2218]">Naija Venture Hub - Business Ideas</h1>

            {arr.length === 0 ? (
                <p className="text-xs text-neutral-500">No business ideas found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {arr.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D1EDD3] text-[#115E59]">
                                        {item.sector || "General"}
                                    </span>
                                    <span className="text-[10px] text-neutral-400">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                                    </span>
                                </div>

                                <h2 className="text-base font-extrabold text-neutral-900">{item.name || "Untitled Venture"}</h2>
                                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">{item.info}</p>

                                {/* Author Section */}
                                {item.authorName && (
                                    <div className="flex items-center gap-2 pt-1">
                                        {item.authorImage ? (
                                            <img 
                                                src={item.authorImage} 
                                                alt={item.authorName} 
                                                width={20} 
                                                height={20} 
                                                className="w-5 h-5 rounded-full object-cover border border-neutral-200"
                                            />
                                        ) : (
                                            <div className="w-5 h-5 rounded-full bg-[#115E59] text-white font-bold flex items-center justify-center text-[9px]">
                                                {item.authorName?.charAt(0)}
                                            </div>
                                        )}
                                        <span className="text-[11px] text-neutral-700 font-medium">{item.authorName}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                                <div>
                                    <span className="text-[9px] text-neutral-400 block uppercase font-semibold">Initial Capital</span>
                                    <span className="font-bold text-neutral-800">₦{item.initialCapital || "N/A"}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => alert(`Viewing details for: ${item.name || "Venture"}`)}
                                        className="px-3 py-2 bg-[#115E59] text-white rounded-xl text-[11px] font-bold transition-opacity hover:opacity-90"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        title="Delete Idea"
                                        className="p-2 bg-red-50 text-red-600 rounded-xl transition-colors hover:bg-red-100 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>   
    );
};   

export default Ideas;