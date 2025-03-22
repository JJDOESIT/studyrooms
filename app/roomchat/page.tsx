'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';
import { getSession } from '../functions/cookies';
import styles from './roomchat.module.css'

export default function Roomchat() {
    const searchParams = useSearchParams()
    const roomName = searchParams.get('roomname')

    const [userEmail, setuserEmail] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);

    async function getUserId() {
        const session = await getSession();
        setuserEmail("you@gmail.com");  // Using session email directly
        // if (session && session.email) {
        //   // Set the username to session email or a test value
        //   setUserName("you@gmail.com");  // Using session email directly
        // }
    }

    function emailToColor(email : string) {
        // Step 1: Hash the email
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
          hash = (hash << 5) - hash + email.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
        }
      
        // Step 2: Convert hash to RGB values (using bitwise operations)
        const r = (hash & 0xFF0000) >> 16;
        const g = (hash & 0x00FF00) >> 8;
        const b = hash & 0x0000FF;
      
        // Step 3: Adjust the color to make it pastel
        // Pastel colors are light, so we blend the original color with white.
        const pastelR = Math.min(255, r*0.7); // Increase red component
        const pastelG = Math.min(255, g); // Increase green component
        const pastelB = Math.min(255, b); // Increase blue component
      
        // Return the pastel RGB color as a string
        return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
    }

    function getContrastingColor(rgb: string){
        // Parse the RGB string (e.g., "rgb(255, 0, 0)")
        const match = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
        if (!match) return null;  // Invalid RGB format
      
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
      
        // Calculate the luminance using the formula
        const luminance = r +  g +  b;
      
        // If luminance is high, use black for contrast (dark color), otherwise use white
        // return luminance < 2 ? 'black' : 'white';
        return 'white';
    }

    async function call() {
        console.log(process.env.NEXT_PUBLIC_BASE_URL + "api/py/fetch-messages");
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "api/py/f",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              //body: JSON.stringify({ userId: 69, roomId: "8b7d5d" }),
            }
          );
    }

    useEffect(() => {
        call();
        getUserId();
    }, []);

    const [messages, setMessages] = useState([
        { email: "alice@gmail.com", user: 'Aliawce', content: 'Hello there!' },
        { email: "bob@gmail.com", user: 'Boab', content: 'Hi Alice, how are you?' },
        { email: "you@gmail.com", user: 'Yawdou', content: 'Hi Alice, how are you?' },
        { email: "bob@gmail.com", user: 'Bobawd', content: 'Hi Alice, how are you?' },
        { email: "you@gmom", user: 'You3', content: 'Hi Alice, how are you?' },
        { email: "bob@gmai3erdqw3efdwom", user: 'Bowb', content: 'Hi Alice, how are you?' },
        { email: "youwefweail.com", user: 'Yoawdu', content: 'Hi Alice, how are you?' },
        { email: "boefwefw@gmail.com", user: 'Boaaab', content: 'Hi Alice, how are you?' },
        { email: "you@gmahg34hefjkil.com", user: 'Yoawdawu', content: 'Hi Alice, how are you?' },
    ]);

    // State to track the input fields
    const [contentInput, setContentInput] = useState('');
    
    
    // Function to handle adding a new message
    const addMessage = () => {
        if (contentInput) {
        setMessages([
            ...messages,
            { email: userEmail, user: "You", content: contentInput },
        ]);
        setContentInput('');
            }
      };

    useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    }, [messages]);

    const handleEnterPress = (event :any) => {
        if (event.key === 'Enter') {
          addMessage();
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
                        className={`flex items-start mx-4 ${msg.email === userEmail ? 'justify-end' : ''}`}
                    >
                        <div 
                            className={`text-black px-2 py-1 rounded-xl max-w-xs break-words border-white border-[1px] bg-white`}
                        >
                            <p 
                                className="font-bold rounded-xl py-1 px-3 w-fit"
                                style={{ backgroundColor: emailToColor(msg.email), color: 'white' }}
                            >{msg.user}</p>
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
