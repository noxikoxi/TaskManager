import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col relative">
            <div className="w-full h-full flex flex-col md:flex-row">
                <div className="md:hidden flex flex-row p-3 w-full bg-primary">
                    <MobileNav/>
                </div>
                <div className="w-[250px] hidden md:block fixed top-0 left-0 h-full">
                    <SideNav/>
                </div>
                <div className="w-[250px] hidden md:block"></div>

                <div className="flex flex-col flex-1">
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
        </div>
    );
}