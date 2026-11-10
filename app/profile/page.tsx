"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FiUser, FiMail, FiBriefcase, FiTrash2, FiMapPin, FiEdit2, FiCheck, FiX } from "react-icons/fi";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userIdeas, setUserIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // User Profile State fetched from "users" collection
  const [username, setUsername] = useState<string>("");
  const [userDocId, setUserDocId] = useState<string>("");

  // States for Editing Username
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  // Fetch User Data from "users" collection & their posts from "business_ideas"
  useEffect(() => {
    async function fetchUserDataAndIdeas() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch or Initialize user profile from "users" collection using email as doc ID
        const userRef = doc(db, "users", session.user.email);
        const userSnap = await getDoc(userRef);

        let currentUsername = session.user.name || "Founder";

        if (userSnap.exists()) {
          // If user exists in Firestore, grab their custom username
          currentUsername = userSnap.data().username || session.user.name;
        } else {
          // If they don't exist in "users" collection yet, create their record
          await setDoc(userRef, {
            email: session.user.email,
            username: currentUsername,
            image: session.user.image || "",
            createdAt: new Date().toISOString(),
          });
        }

        setUsername(currentUsername);
        setNewUsername(currentUsername);
        setUserDocId(session.user.email);

        // 2. Fetch ideas belonging to this user from "business_ideas" collection
        const q = query(
          collection(db, "business_ideas"),
          where("authorName", "==", currentUsername)
        );
        
        const querySnapshot = await getDocs(q);
        const ideas: any[] = [];
        
        querySnapshot.forEach((docItem) => {
          ideas.push({
            id: docItem.id,
            ...docItem.data(),
          });
        });

        setUserIdeas(ideas);
      } catch (error) {
        console.error("Error fetching user data/ideas:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchUserDataAndIdeas();
    }
  }, [session, status]);

  // Handle saving the updated username to the "users" collection
  const handleSaveUsername = async () => {
    if (!newUsername.trim()) {
      alert("Username cannot be empty.");
      return;
    }

    try {
      setUpdating(true);
      
      // Update the username inside the "users" collection
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, { username: newUsername });

      // Update past posts to also reflect the new authorName
      for (const idea of userIdeas) {
        const ideaRef = doc(db, "business_ideas", idea.id);
        await updateDoc(ideaRef, { authorName: newUsername });
      }

      setUsername(newUsername);
      setIsEditingUsername(false);
      alert("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Failed to update username.");
    } finally {
      setUpdating(false);
    }
  };

  // Handle deleting a user's own idea
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this business idea?")) return;
    try {
      await deleteDoc(doc(db, "business_ideas", id));
      setUserIdeas(userIdeas.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete idea.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm">
        Loading profile data...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
        <h2 className="text-xl font-bold text-[#2F3E2C] mb-2">Access Denied</h2>
        <p className="text-xs text-slate-600 mb-6">You need to be signed in to view your profile and manage your posted ventures.</p>
        <a 
          href="/api/auth/signin" 
          className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2F3E2C]"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 font-sans">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row w-full md:w-auto">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={username || "User"}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#D1EDD3]"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#2F3E2C] text-[#D1EDD3] flex items-center justify-center text-2xl font-black">
              {username ? username.charAt(0) : <FiUser />}
            </div>
          )}
          
          <div className="space-y-1 w-full">
            <span 
              className="text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-[#2F3E2C] inline-block mb-1"
              style={{ backgroundColor: "#D1EDD3" }}
            >
              Verified Founder
            </span>

            {/* Username Display & Edit Toggle */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              {isEditingUsername ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="px-3 py-1.5 text-sm font-bold border border-slate-300 rounded-xl focus:outline-none focus:border-[#2F3E2C]"
                  />
                  <button
                    onClick={handleSaveUsername}
                    disabled={updating}
                    className="p-2 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition"
                    title="Save Username"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setNewUsername(username);
                      setIsEditingUsername(false);
                    }}
                    className="p-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition"
                    title="Cancel"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-[#2F3E2C]">{username}</h1>
                  <button
                    onClick={() => setIsEditingUsername(true)}
                    className="p-1.5 text-slate-400 hover:text-[#2F3E2C] transition"
                    title="Edit Username"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 flex items-center justify-center md:justify-start gap-1.5">
              <FiMail className="text-emerald-700" /> {session?.user?.email}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Blueprints</span>
          <span className="text-2xl font-black text-[#2F3E2C]">{userIdeas.length}</span>
        </div>
      </div>

      {/* User's Posted Ideas Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-black text-[#2F3E2C] flex items-center gap-2">
            <FiBriefcase className="text-emerald-700" /> My Published Ventures
          </h2>
        </div>

        {userIdeas.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
            <FiBriefcase className="mx-auto text-3xl text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-700">You haven't shared any business ideas yet.</p>
            <p className="text-xs text-slate-500 mt-1">Head over to the post page to share your first venture with the community!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userIdeas.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[10px] font-bold px-3 py-1 rounded-full uppercase"
                      style={{ backgroundColor: "#D1EDD3", color: "#2F3E2C" }}
                    >
                      {item.sector || "General"}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <FiMapPin className="text-emerald-700" /> {item.address || "Nigeria"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2F3E2C]">{item.businessName}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.businessInfo}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Capital Required</span>
                    <span className="font-bold text-slate-800">{item.initialCapital || "N/A"}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2.5 bg-red-50 text-red-600 rounded-xl transition hover:bg-red-100 flex items-center gap-1 text-[11px] font-bold"
                    title="Delete Venture"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}