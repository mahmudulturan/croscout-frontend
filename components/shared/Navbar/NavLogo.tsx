'use client';

import { useToggleContext } from "@/providers/ToggleProvider";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NavLogo = () => {
    const router = useRouter();
    const { setNavUserToggle } = useToggleContext();
    const pathname = usePathname();
    const isDashboard = pathname.includes('/dashboard')
    return (
        <div
            onClick={() => setNavUserToggle(false)}
            className="h-[24px] md:h-[48px] md:w-[336px] w-[200px] relative">
            {!isDashboard ? <Image
                onClick={() => router.push("/")}
                className="cursor-pointer"
                src="/images/navLogo.svg"
                alt="Logo"
                height={24}
                width={336}
            /> : <Image
                onClick={() => router.push("/")}
                className="cursor-pointer"
                src="/images/navlogo_transparent.png"
                alt="Logo"
                height={24}
                width={336}
            />}
        </div>
    );
}

export default NavLogo;