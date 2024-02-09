"use client"
import { useToggleContext } from "@/providers/ToggleProvider";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import navbarStyles from "./navbar.module.css"
import { useModalContext } from "@/providers/ModalProvider";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { useAuthContext } from "@/providers/AuthProvider";
import { logoutUser } from "@/lib/database/authUser";
import toast from "react-hot-toast";
import { clearToken } from "@/utils/tokenStorage";
import { usePathname } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";

const Navbar = () => {
    const { navUserToggle, setNavUserToggle } = useToggleContext();
    const { setLoginModal, setSignupModal, sidebarToggle,
        setSidebarToggle } = useModalContext();
    const { user, setUser } = useAuthContext();

    // navbar will be hidden if them pathname matches the include pathname
    const pathname = usePathname();
    const isResetPassword = /\/reset-password\/[^/]+$/.test(pathname);
    const isDashboard = pathname.includes('/dashboard')

    const handleLogout = async () => {
        try {
            // const dbResponse = await logoutUser();
            // if(dbResponse.isLogout){
            toast.success("Successfully Logout")
            setUser(null)
            clearToken();
            // }
        } catch (error) {
            console.log(error);
        }
    }

    {/*//*-----====== Handle open menubar to close sidebar=====------*/ }
    const handleMenuToggle = () => {
        setNavUserToggle(pre => !pre);
        setSidebarToggle(false); // Close the sidebar menu
    };

    {/*//*--=== Handle open sidebar to close menubar===-----*/ }
    const handleSidebarToggle = () => {
        setSidebarToggle(pre => !pre);
        setNavUserToggle(false); // Close the menuList 
    };

    return (
        <nav hidden={isResetPassword} id="topbar" className={`py-5   z-40 sticky top-0 ${isDashboard ? "bg-[#182237]" : "bg-primary"}`}>
            {/* Wrapper */}
            <div className={` flex-between items-center relative ${isDashboard ? "w-full px-6" : "wrapper"}`}>
                <div className="text-white lg:hidden">
                    {isDashboard && <div
                        onClick={handleSidebarToggle}
                        className="text-2xl cursor-pointer block lg:hidden">
                        {sidebarToggle ? <IoIosCloseCircle /> : <CgMenuGridR color="white" />}
                    </div>}
                </div>
                {/* Logo */}
                <NavLogo />

                {/* NavMenu - Visible for Version */}
                <NavMenu />

                {/* Menu Button - Visible for Mobile Version */}
                <button
                    onClick={handleMenuToggle}
                    className="block md:hidden text-white select-none text-2xl">
                    {navUserToggle ? <IoIosCloseCircle /> : <AiOutlineMenu color="white" />}
                </button>



                {/* User Menu Dropdown */}
                <ul className={`${navbarStyles.navUserMenu} ${navUserToggle ? "scale-y-100" : "scale-y-0"}`}>
                    {
                        user ?
                            <>
                                <button className={navbarStyles.dashboardBtn}>{user?.name}</button>

                                <Link className={navbarStyles.dashboardBtn} href={"/dashboard"}>Dashboard</Link>

                                <button

                                    onClick={handleLogout}
                                >Logout</button>
                            </>
                            :
                            <>
                                <button
                                    onClick={() => {
                                        setLoginModal(true);
                                        setNavUserToggle(false);

                                    }}
                                >Login</button>
                                <button
                                    onClick={() => {
                                        setSignupModal(true);
                                        setNavUserToggle(false);

                                    }}
                                >Signup</button>


                            </>
                    }
                </ul>
            </div>
        </nav >
    );
};

export default Navbar;