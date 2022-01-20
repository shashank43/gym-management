import React from "react";

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';
import PaidIcon from '@mui/icons-material/Paid';

const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Members",
        icon: <PeopleIcon />,
        link: "/members"
    },
    {
        title: "Payments",
        icon: <PaidIcon />,
        link: "/payments"
    },
    {
        title: "Analytics",
        icon: <InsightsIcon />,
        link: "/analytics"
    },
    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/settings"
    }
];

export default SidebarData;