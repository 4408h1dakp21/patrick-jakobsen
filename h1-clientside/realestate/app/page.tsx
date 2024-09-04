import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
   <main>
    <SignedIn>
    <SignOutButton />
    </SignedIn>
    <SignedOut>
    <SignInButton mode="modal" />
    </SignedOut>
   </main>
  );
}
