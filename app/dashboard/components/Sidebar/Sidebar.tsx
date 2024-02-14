"use client"
import React from 'react'
import styles from "./sidebar.module.css"
import userImg from "@/public/noavatar.png"
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
} from "react-icons/md";

import Image from 'next/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useModalContext } from '@/providers/ModalProvider';
import { useAuthContext } from '@/providers/AuthProvider';
import MenuLink from './MenuLink/MenuLink';
import Loading from '@/components/ui/Loading/Loading';
import { FaStar } from 'react-icons/fa';


export default function Sidebar() {
    const { sidebarToggle, setSidebarToggle } = useModalContext();
    const { user } = useAuthContext();
    const role = user?.role;

    // menu links for users
    const userMenuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />,
                },
                // {
                //     title: "Transactions",
                //     path: "#",
                //     icon: <MdAttachMoney />,
                // },
                {
                    title: "Bookings",
                    path: "/dashboard/user/my-bookings",
                    icon: <MdShoppingBag />,
                },
                {
                    title: "Favorites",
                    path: "/dashboard/user/favorites",
                    icon: <FaStar />,
                },
            ],
        },
        {
            title: "Analytics",
            list: [
                {
                    title: "Revenue",
                    path: "#",
                    icon: <MdWork />,
                }
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Profile Settings",
                    path: "#",
                    icon: <MdOutlineSettings />,
                }
            ],
        },
    ];

    // menu links for agent
    const agentMenuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />,
                },
                {
                    title: "Add Property",
                    path: "/dashboard/agent/add-property",
                    icon: <MdSupervisedUserCircle />,
                },
                {
                    title: "Manage Properties",
                    path: "/dashboard/agent/manage-properties",
                    icon: <MdShoppingBag />,
                },
                // {
                //     title: "Transactions",
                //     path: "#",
                //     icon: <MdAttachMoney />,
                // },
                {
                    title: "Bookings",
                    path: "/dashboard/agent/bookings",
                    icon: <MdShoppingBag />,
                },
            ],
        },
        {
            title: "Analytics",
            list: [
                {
                    title: "Revenue",
                    path: "#",
                    icon: <MdWork />,
                }
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Profile Settings",
                    path: "#",
                    icon: <MdOutlineSettings />,
                }
            ],
        },
    ];

    // menu links for admin
    const adminMenuItems = [
        {
            title: "Pages",
            list: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <MdDashboard />,
                },
                {
                    title: "Properties",
                    path: "/dashboard/admin/all-properties",
                    icon: <MdShoppingBag />,
                },
                // {
                //     title: "Transactions",
                //     path: "#",
                //     icon: <MdAttachMoney />,
                // },
                {
                    title: "Users",
                    path: "/dashboard/admin/all-users",
                    icon: <MdAttachMoney />,
                },
                {
                    title: "Bookings",
                    path: "/dashboard/admin/all-bookings",
                    icon: <MdShoppingBag />,
                },
            ],
        },
        {
            title: "Analytics",
            list: [
                {
                    title: "Revenue",
                    path: "#",
                    icon: <MdWork />,
                }
            ],
        },
        {
            title: "User",
            list: [
                {
                    title: "Profile Settings",
                    path: "#",
                    icon: <MdOutlineSettings />,
                }
            ],
        },
    ];

    // const menuItems = [
    //     {
    //         title: "Pages",
    //         list: [
    //             {
    //                 title: "Dashboard",
    //                 path: "/dashboard",
    //                 icon: <MdDashboard />,
    //             },
    //             {
    //                 title: "Add Property",
    //                 path: "/dashboard/add-property",
    //                 icon: <MdSupervisedUserCircle />,
    //             },
    //             {
    //                 title: "Properties",
    //                 path: "/dashboard/my-properties",
    //                 icon: <MdShoppingBag />,
    //             },
    //             {
    //                 title: "Transactions",
    //                 path: "#",
    //                 icon: <MdAttachMoney />,
    //             },
    //             {
    //                 title: "Customers",
    //                 path: "/dashboard/customers",
    //                 icon: <MdAttachMoney />,
    //             },
    //             {
    //                 title: "Bookings",
    //                 path: "/dashboard/bookings",
    //                 icon: <MdShoppingBag />,
    //             },
    //         ],
    //     },
    //     {
    //         title: "Analytics",
    //         list: [
    //             {
    //                 title: "Revenue",
    //                 path: "#",
    //                 icon: <MdWork />,
    //             }
    //         ],
    //     },
    //     {
    //         title: "User",
    //         list: [
    //             {
    //                 title: "Profile Settings",
    //                 path: "#",
    //                 icon: <MdOutlineSettings />,
    //             }
    //         ],
    //     },
    // ];

    return (
        <div>
            <div className={styles.container}>
                <div className='flex gap-4 items-center mb-4'>
                    <Image src={userImg} alt='userImage' width={50} height={50} className='rounded-full' />
                    <div className='flex flex-col'>
                        <span>{user?.name}</span>
                        <span className='text-sm text-gray-300'>{user?.role}</span>
                    </div>
                </div>
                <ul className={styles.list}>
                    {role === "user" &&
                        userMenuItems.map((cat) => (
                            <li key={cat.title} className='mb-4'>
                                <span className={styles.cat}>{cat.title}</span>
                                {cat.list.map((item) => (
                                    <MenuLink item={item} key={item.title} />
                                ))}
                            </li>
                        ))}
                    {role === "agent" &&
                        agentMenuItems.map((cat) => (
                            <li key={cat.title} className='mb-4'>
                                <span className={styles.cat}>{cat.title}</span>
                                {cat.list.map((item) => (
                                    <MenuLink item={item} key={item.title} />
                                ))}
                            </li>
                        ))}
                    {role === "admin" &&
                        adminMenuItems.map((cat) => (
                            <li key={cat.title} className='mb-4'>
                                <span className={styles.cat}>{cat.title}</span>
                                {cat.list.map((item) => (
                                    <MenuLink item={item} key={item.title} />
                                ))}
                            </li>
                        ))}
                </ul>
            </div>

            {sidebarToggle && <div
                onClick={() => setSidebarToggle(pre => !pre)}
                className="text-3xl cursor-pointer block lg:hidden  top-4 left-5 z-50 fixed ">
                <IoIosCloseCircle />
            </div>}

            {/*//* ------Mobile Version-------*/}
            <div className={`z-40 pt-14 block lg:hidden md:hidden fixed h-full bg-[#151c2c]  p-5 shadow-lg origin-left top-0 rounded-md ${!sidebarToggle ? 'scale-x-0' : 'scale-x-100 w-72'} duration-300 rounded-md`}>
                <ul className="space-y-3 text-[#b7bac1]">
                    <ul className={styles.list}>
                        {role === "user" &&
                            userMenuItems.map((cat) => (
                                <li key={cat.title} className='mb-4'>
                                    <span className={styles.cat}>{cat.title}</span>
                                    {cat.list.map((item) => (
                                        <MenuLink item={item} key={item.title} />
                                    ))}
                                </li>
                            ))}
                        {role === "agent" &&
                            agentMenuItems.map((cat) => (
                                <li key={cat.title} className='mb-4'>
                                    <span className={styles.cat}>{cat.title}</span>
                                    {cat.list.map((item) => (
                                        <MenuLink item={item} key={item.title} />
                                    ))}
                                </li>
                            ))}
                        {role === "admin" &&
                            adminMenuItems.map((cat) => (
                                <li key={cat.title} className='mb-4'>
                                    <span className={styles.cat}>{cat.title}</span>
                                    {cat.list.map((item) => (
                                        <MenuLink item={item} key={item.title} />
                                    ))}
                                </li>
                            ))}
                    </ul>
                </ul>
            </div>
        </div>
    )
}
