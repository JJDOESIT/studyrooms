"use client";

import { useEffect, useState } from "react";
import { getSession } from "../functions/cookies";

export default function Rooms() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Create a room
  async function createRoom() {
    console.log(userEmail);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/py/create-room",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();
  }

  // Fetch all rooms
  async function fetchAllRooms() {
    console.log(userEmail);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/py/fetch-all-rooms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();
    console.log(data);
  }

  async function getUserId() {
    const session = await getSession();
    if (session && session.email) {
      setUserEmail(session.email as string);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchAllRooms();
    }
  }, [userEmail]);

  return (
    <div>
      <input
        type="button"
        onClick={() => {
          createRoom();
        }}
        value="Create Room"
      ></input>
    </div>
  );
}
