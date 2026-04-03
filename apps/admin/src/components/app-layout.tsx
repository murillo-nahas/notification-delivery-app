import { Outlet } from "react-router";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
