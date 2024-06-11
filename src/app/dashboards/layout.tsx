import Header from "@/components/Header";
import DashboardTopBar from "@/components/DashboardTopBar";
import SideNav from "@/components/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            <div className="w-full h-full flex flex-row">
                <SideNav/>
                <div className="flex flex-col flex-1">
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
        </div>
    );
}