"use client";

import { useEffect, useState } from "react";
import { getSession } from "../functions/cookies";
import styles from "./rooms.module.css";
import hashToRGB from "../functions/hashToRgb";
import Button from "@/components/Button";
import {
  TrashIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Rooms() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [displayOption, setDisplayOption] = useState("");
  const [rooms, setRooms] = useState<null | Array<{
    roomId: string;
    title: string;
    adminId: number;
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
        body: JSON.stringify({ email: userEmail, title: title }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();
    if (data.status == 200) {
      setDisplayOption("");
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

  // Set the user id and email
  async function getUserId() {
    const session = await getSession();
    if (session && session.email && session.id) {
      setUserEmail(session.email as string);
      setUserId(session.id as number);
    } else {
      window.location.href = "/login";
    }
  }

  // Set the user id and email on render
  useEffect(() => {
    getUserId();
  }, []);

  // Fetch all rooms once the user is authenticated
  useEffect(() => {
    if (userEmail) {
      fetchAllRooms();
    }
  }, [userEmail]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.initialButtonContainer}>
        <div>
          <Button
            onClick={() => {
              setTitle("");
              setDisplayOption("create");
            }}
          >
            Create Room
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              setRoomCode("");
              setDisplayOption("join");
            }}
          >
            Join Room
          </Button>
        </div>
      </div>
      <div
        className={styles.createRoomContainer}
        style={
          displayOption == "create"
            ? { opacity: 1, zIndex: 1 }
            : { opacity: 0, zIndex: -1 }
        }
      >
        <label className={styles.titleLabel}>
          Class Name <span>*</span>
        </label>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="CSIS 3710"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <div className={styles.createButtonContainer}>
          <Button
            bgColor="bg-red-200"
            hoverFromColor="from-white"
            hoverToColor="to-red-200"
            onClick={() => {
              setDisplayOption("");
            }}
          >
            Back
          </Button>
          <Button
            bgColor="bg-green-200"
            hoverFromColor="from-white"
            hoverToColor="to-green-200"
            onClick={() => {
              createRoom();
            }}
          >
            Create
          </Button>
        </div>
      </div>
      <div
        className={styles.joinRoomContainer}
        style={
          displayOption == "join"
            ? { opacity: 1, zIndex: 1 }
            : { opacity: 0, zIndex: -1 }
        }
      >
        <label className={styles.roomCodeLabel}>
          Class Name <span>*</span>
        </label>
        <input
          className={styles.roomCodeInput}
          type="text"
          placeholder="ABCDEF"
          onChange={(event) => {
            setRoomCode(event.target.value);
          }}
        ></input>
        <div className={styles.joinButtonContainer}>
          <Button
            bgColor="bg-red-200"
            hoverFromColor="from-white"
            hoverToColor="to-red-200"
            onClick={() => {
              setDisplayOption("");
            }}
          >
            Back
          </Button>
          <Button
            bgColor="bg-green-200"
            hoverFromColor="from-white"
            hoverToColor="to-green-200"
            onClick={() => {
              createRoom();
            }}
          >
            Join
          </Button>
        </div>
      </div>
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
            <div className={styles.roomRightContainer}>
              <p>{room.firstName + " " + room.lastName}</p>
              {room.adminId == userId ? (
                <TrashIcon
                  className={styles.trashIcon}
                  color="red"
                  width="20"
                  height="20"
                ></TrashIcon>
              ) : (
                <ArrowLeftStartOnRectangleIcon
                  className={styles.trashIcon}
                  color="red"
                  width="20"
                  height="20"
                ></ArrowLeftStartOnRectangleIcon>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
