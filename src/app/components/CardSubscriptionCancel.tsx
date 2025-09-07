"use client";

import { useRouter } from "next/navigation";

const CardSubscriptionCancel = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/Subscription");
  };

  return (
    <div 
    // className="min-h-screen w-full flex items-center justify-center bg-[url(https://firebasestorage.googleapis.com/v0/b/website-soullinkai-563d7.firebasestorage.app/o/Image%2FpersonaAll.jpg?alt=media&token=4fa3c745-4d04-4eef-b8fe-7c71a6dc7afb)] bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]"
    className="min-h-screen w-full flex items-center justify-center bg-base-100 bg-cover bg-center p-4 font-[family-name:var(--font-el-messiri)]"
    >
      <div className="card border-2 border-green-300 text-base-content p-8 rounded-xl max-w-lg w-full text-center shadow-xl">
        <h1 className="text-3xl font-bold mb-4 no-caret">
          ❌ Subscription Cancelled
        </h1>
        <p className="mb-6 opacity-80 no-caret">
          Your subscription process was cancelled. You can try again anytime.
        </p>
        <button
          onClick={goBack}
          className="btn btn-neutral bg-blue-300 border-0 text-white w-full sm:w-auto no-caret rounded-2xl"
        >
          Back to Subscription
        </button>
      </div>
    </div>
  );
};

export default CardSubscriptionCancel;
