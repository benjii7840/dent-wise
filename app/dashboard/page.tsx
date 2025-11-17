
import WelcomeSection from "@/components/dashboardpage/WelcomeSection";
import MainActions from "@/components/dashboardpage/MainActions";
import ActivityOverview from "@/components/dashboardpage/ActivityOverview";
import Navbar from "@/components/Navbar";

import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

function DashboardPage() {

  return (
    <>
      <Navbar />
       <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection/>
        <MainActions/>
        <ActivityOverview/>

       </div>

    </> 
  );
}

export default DashboardPage;
