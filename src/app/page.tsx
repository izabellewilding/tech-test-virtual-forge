import Image from "next/image";
import { SideNavbar } from "./components/SideNavigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SideNavbar>
        <p>Hello</p>
      </SideNavbar>
    </main>
  );
}
