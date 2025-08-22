"use client";
import Script from "next/script";
import { verifyIdToken } from "../services/authService";

export default function GoogleSigninButton({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.google?.accounts.id.initialize({
            client_id: clientId,
            callback: async (resp: unknown) => {
              // ตรวจสอบว่า resp เป็น object และมี credential
              if (resp && typeof resp === "object" && "credential" in resp) {
                // TypeScript จะรู้ว่า resp มี property credential
                const credential = (resp as { credential: string }).credential;
                await verifyIdToken(credential);
                onSuccess();
              }
            },
          });
          // window.google?.accounts.id.initialize({
          //   client_id: clientId,
          //   callback: async (resp:any) => {
          //     if (resp?.credential) {
          //       await verifyIdToken(resp.credential);
          //       onSuccess();
          //     }
          //   },
          // });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.google?.accounts.id.renderButton(
            document.getElementById("gsi-btn"),
            { theme: "outline", size: "large", width: 260 }
          );
        }}
      />
      <div id="gsi-btn" />
    </>
  );
}
