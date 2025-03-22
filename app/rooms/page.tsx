"use client";

import { useEffect, useState } from "react";
import { getSession } from "../functions/cookies";

export default function Rooms() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  async function getUserId() {
    const session = await getSession();
    if (session && session.email) {
      setUserEmail(session.email as string);
    }
  }

  useEffect(() => {
    getUserId();
  }, []);
  return <div>Rooms!</div>;
}
