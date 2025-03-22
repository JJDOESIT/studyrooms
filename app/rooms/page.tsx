"use client";

import { useEffect, useState } from "react";
import { getSession } from "../functions/cookies";
import styles from "./rooms.module.css";
import hashToRGB from "../functions/hashToRgb";
import Button from "@/components/Button";

export default function Rooms() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [rooms, setRooms] = useState<null | Array<{
    roomId: string;
    title: string;
    firstName: string;
    lastName: string;
  }>>(null);

  // Create a room
  async function createRoom() {
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
    if (data.status == 200) {
      fetchAllRooms();
    }
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

    if (data.status == 200) {
      console.log(data);
      setRooms(data.rooms);
    }
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
    <div className={styles.pageContainer}>
      <Button
        onClick={() => {
          createRoom();
        }}
      >
        Create Room
      </Button>
      <div className={styles.createRoomContainer}></div>
      {rooms?.map((room) => {
        return (
          <div
            className={styles.roomContainer}
            style={{
              background: `linear-gradient(-90deg, rgb(255, 255, 255) 97%, ${hashToRGB(
                room.roomId
              )} 3%)`,
            }}
          >
            <p>{room.title}</p>
            <p>{room.firstName + " " + room.lastName}</p>
          </div>
        );
      })}
    </div>
  );
}
