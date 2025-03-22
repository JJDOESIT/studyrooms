"use client";

import { useEffect, useState } from "react";
import { getSession } from "../functions/cookies";

export default function Rooms() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  async function getUserId() {
    const session = await getSession();
    if (session && session.email) {
      setUserEmail(session.email as string);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);

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
