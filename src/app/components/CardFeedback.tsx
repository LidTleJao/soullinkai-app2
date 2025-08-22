'use client';
import { useState } from "react";
import { sendFeedback } from "../services/feedbackService";
import useAuthGuard from "../hooks/useAuthGuard";

const CardFeedback = () => {
    useAuthGuard();
    const [text, setText] = useState("");
    
    const submit = async () => {
        if (!text.trim()) return;
        await sendFeedback(text.trim());
        setText("");
        alert("Thanks for your feedback!");
    };
    
    return (
        <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">Send Feedback</h1>
        <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your suggestion..."
            className="w-full h-64 bg-black/40 border border-white/20 rounded p-3"
        />
        <button onClick={submit} className="mt-3 bg-white text-black px-6 py-2 rounded-full">
            Send
        </button>
        </div>
    );
    }
export default CardFeedback;