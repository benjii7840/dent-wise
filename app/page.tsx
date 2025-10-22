import About from "@/src/About";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton, SignUpButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div>
      <h1>Welcome to DentWise</h1>
      <SignOutButton>
        <SignUpButton mode="modal">Sign Up</SignUpButton>
      </SignOutButton>

      <SignedIn>
        <SignedOut>LogOut</SignedOut>
      </SignedIn>
      
    </div>
  );
}
