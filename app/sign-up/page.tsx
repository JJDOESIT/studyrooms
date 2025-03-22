"use client";

import { useEffect, useState } from "react";

export default function SignUp() {
  async function test() {
    const user = {
      email: "jjdoesit@gmail.com",
      password: "Turtle66",
      firstName: "James",
      lastName: "Paschke",
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/py/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server the type of data being sent
        },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    test();
  }, []);

  return <div>Sign Up</div>;
}
