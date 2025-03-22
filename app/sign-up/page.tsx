"use client";

import styles from "./sign-up.module.css";

import { useEffect, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Function to create user
  async function createUser() {
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/py/create-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
    createUser();
  }, []);

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.pageContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.emailLabel}>
            Email <span>*</span>
          </label>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="johndoe@gmail.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <label className={styles.passwordLabel}>
            Password <span>*</span>
          </label>
          <input
            className={styles.passwordInput}
            type="password"
            placeholder="123"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <label className={styles.firstNameLabel}>
            First Name <span>*</span>
          </label>
          <input
            className={styles.firstNameInput}
            type="text"
            placeholder="John"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          ></input>
          <label className={styles.lastNameLabel}>
            Last Name <span>*</span>
          </label>
          <input
            className={styles.lastNameInput}
            type="text"
            placeholder="Doe"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          ></input>
          <div className={styles.submit}>
            <input
              type="submit"
              value="Sign Up"
              onClick={() => {
                createUser();
              }}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
