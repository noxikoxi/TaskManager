'use client'

import Link from 'next/link';
import SearchBar from './SearchBar';
import MainNav from "@/components/MainNav";
import MobileNav from "@/components/MobileNav";



const Header = () => {
    return (
        <div className="bg-gray-400 py-6  border-2 border-gray-500">
            <div className="container flex flex-row items-center justify-between mx-auto">
                <Link className="hidden md:block text-white font-semibold ps-5 text-4xl tracking-tight" href="/">
                    Notes
                </Link>
                <SearchBar onSubmit={() => console.log("Button")} placeholder="My last note" searchQuery=""/>
                <div className="md:hidden block">
                    <MobileNav/>
                </div>
                <div className="hidden md:block">
                    <MainNav/>
                </div>
            </div>
        </div>
    )

}

export default Header;