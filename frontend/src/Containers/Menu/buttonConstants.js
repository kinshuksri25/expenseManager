let buttonConstants = {};

buttonConstants.preLogin = [{
        link: "/login",
        id: "login",
        className: "cl_preLogin",
        name: "Login"
    },
    {
        link: "/signUp",
        id: "signUp",
        className: "cl_preLogin",
        name: "SignUp"
    }
];

buttonConstants.postLogin = [{
        link: "/dashboard/home",
        id: "home",
        className: "cl_postLogin",
        name: "Home"
    },
    {
        link: "/dashboard/settings",
        id: "settings",
        className: "cl_postLogin",
        name: "Settings"
    },
    {
        link: "/dashboard/profile",
        id: "profile",
        className: "cl_postLogin",
        name: "Profile"
    }
];

module.exports = {...buttonConstants };