'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import styles from './roomchat.module.css'
import { stringToColor } from '../functions/colors';
import { getMessages, Message, sendMessage } from '../functions/messages';
import { getUserId } from '../functions/session';
import { userAgent } from 'next/server';

export default function Roomchat() {
    // URL parameters
    const searchParams = useSearchParams()
    const roomName = searchParams.get('roomname')
    const roomId = searchParams.get('room') as string

    // State to track the input fields, message array, and current_user
    const [contentInput, setContentInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [userId, setuserId] = useState<number>();

    // Ref to the messages container for scrolling
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Scroll to the bottom whenever a new message appears
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);


    // query user id on page load
    useEffect(() => {
        getUserId().then((data : any) => {
            setuserId(data);
        })
    }, []);

    // load messages once every second
    useEffect(() => {
        const interval = setInterval(() => {
          if (userId) {
            getMessages(userId, roomId).then((data) => {setMessages(data)});
          }
        }, 100);
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [userId]);
    
    // Function to handle adding a new message
    const addMessage = () => {
        if (contentInput && userId) {
            sendMessage(userId, roomId, contentInput);
            setContentInput('');
        }
    };

    return (
        <div className='w-full h-full'>
            <div className='w-full h-[5%] text-2xl font-bold'>
                {roomName}
            </div>
            <div ref={containerRef} className={`flex flex-col space-y-4 overflow-auto h-[85%] mr-[5px] ${styles.scrollbarthin}`}>
                <div className='h-[30px]'></div>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex items-start mx-4 ${msg.id === userId ? 'justify-end' : ''}`}
                    >
                        <div 
                            className={`text-black px-2 py-1 rounded-xl max-w-xs break-words border-white border-[1px] bg-white`}
                        >
                            <p 
                                className="font-bold rounded-xl py-1 px-3 w-fit"
                                style={{ backgroundColor: stringToColor(msg.name), color: 'white' }}
                            >{msg.name}</p>
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div className='h-[30px]'></div>
            </div>
            
            <div className="flex space-x-2 bg-white h-[10%] flex items-center justify-center rounded-xl mx-[5px] p-3">
                <input
                type="text"
                placeholder="Message"
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
                className="border p-2 rounded-md flex-grow text-black"
                />
                <button
                onClick={addMessage}
                className="bg-blue-500 text-white p-2 rounded-md"
                >
                Send
                </button>
            </div>
        </div>
    );
}
