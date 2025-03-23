"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./roomchat.module.css";
import { stringToColor } from "../functions/colors";
import { getMessages, Message, sendMessage } from "../functions/messages";
import { getUserId } from "../functions/session";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/Button";

export default function Roomchat() {
  // URL parameters
  const searchParams = useSearchParams();
  const roomName = searchParams.get("roomname");
  const roomId = searchParams.get("room") as string;

  // State to track the input fields, message array, and current_user
  const [contentInput, setContentInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const prevLength = useRef(messages.length);
  const [userId, setuserId] = useState<number>();
  const [rosterOpen, setRosterOpen] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  // Roster
  const [roster, setRoster] = useState<Array<{
    firstName: string;
    lastName: string;
    admin: Boolean;
  }> | null>(null);

  // Ref to the messages container for scrolling
  const containerRef = useRef<HTMLDivElement | null>(null);

  //   // Scroll to the bottom whenever a new message appears
  //   useEffect(() => {
  //     if (containerRef.current) {
  //       containerRef.current.scrollTop = containerRef.current.scrollHeight;
  //     }
  //   }, [messages]);

  // query user id on page load
  useEffect(() => {
    getUserId().then((data: any) => {
      setuserId(data);
    });
  }, []);

  // load messages once every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) {
        getMessages(userId, roomId).then((data) => {
          setMessages(data);
        });
      }
    }, 100);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId]);

  useEffect(() => {
    if (messages.length > prevLength.current) {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    prevLength.current = messages.length;
  }, [messages]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission (if inside a form)
      addMessage();
    }
  };

  // Function to handle adding a new message
  const addMessage = () => {
    if (contentInput && userId) {
      sendMessage(userId, roomId, contentInput);
      setContentInput("");
    }
  };

  // Fetch roster
  async function fetchRoster(roomId: string) {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/py/fetch-roster",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: roomId }),
      }
    );
    if (!response.ok) {
      console.log(response.status);
      return;
    }

    const data = await response.json();

    if (data.status == 200) {
      setRoster(data.data);
    }
  }

  // Fetch roster
  useEffect(() => {
    fetchRoster(roomId);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden animate__animated animate__fadeIn animate__slow">
      <div
        className={styles.rosterSidebar}
        ref={sideBarRef}
        style={
          rosterOpen
            ? { transform: "translateX(-300px)" }
            : { transform: "translateX(0px)" }
        }
      >
        <div className={styles.rosterContainer}>
          <div className={styles.adminContainer}>Admin</div>
          {roster?.map((person) => {
            return (
              <div>
                {person.admin && (
                  <div className="font-bold">
                    {person.firstName + " " + person.lastName}
                  </div>
                )}
              </div>
            );
          })}
          <div className={styles.studentContainer}>Student</div>
          {roster?.map((person) => {
            return (
              <div>
                {!person.admin && (
                  <div>{person.firstName + " " + person.lastName}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div
        ref={containerRef}
        className={`flex flex-col space-y-4 overflow-auto h-[85%] mr-[5px] relative ${styles.scrollbarthin}`}
      >
        <div className="w-[90%] h-[50px] min-h-[50px] text-2xl font-bold bg-white rounded-xl text-black mt-[5px] shadow-md px-3 py-2 sticky top-5 mx-auto flex items-center border-1 border-black justify-between">
          <div className={styles.navbarLeft}>
            <ArrowLeftCircleIcon
              height={25}
              width={25}
              className="inline mr-5 hover:cursor-pointer"
              onClick={() => {
                window.location.href = "/rooms";
              }}
            ></ArrowLeftCircleIcon>
            <p className="m-0">Room:&nbsp;</p>
            <p className="m-0">{roomName}</p>
          </div>
          <Button
            onClick={() => {
              setRosterOpen((prev) => {
                return !prev;
              });
            }}
          >
            Roster
          </Button>
        </div>
        <div className="min-h-[30px]"></div>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              key={index}
              className={`flex items-start mx-4 ${
                msg.id === userId ? "justify-end" : ""
              }`}
            >
              {
                <div
                  className={`text-black px-2 py-1 rounded-xl max-w-xs break-words border-white border-[1px] bg-white`}
                >
                  <p
                    className="px-3 py-1 font-bold rounded-xl w-fit"
                    style={{
                      backgroundColor: stringToColor(msg.name),
                      color: "white",
                    }}
                  >
                    {msg.name}
                  </p>
                  <p>{msg.content}</p>
                </div>
              }
            </motion.li>
          ))}
        </AnimatePresence>
        <div className="h-[30px]"></div>
      </div>

      <div className="flex space-x-2 bg-white h-[10%] flex items-center justify-center rounded-xl mx-[5px] p-3">
        <input
          type="text"
          placeholder="Message"
          value={contentInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setContentInput(e.target.value)}
          className="flex-grow p-2 text-black border rounded-md"
        />
        <button
          onClick={addMessage}
          className="p-2 text-white bg-blue-500 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
