import Navigation from "@/components/shared/Navigation";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="container px-4">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default RootLayout;
