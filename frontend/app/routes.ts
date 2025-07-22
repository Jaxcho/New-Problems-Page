import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
    route("/login", "routes/login.tsx"),
    route("/resources", "routes/resources.tsx"),
    route("/problems", "routes/problems.tsx"),
    route("/problems/post","routes/post_problem.tsx"),
    route("/signout", "routes/signout.tsx"),
    route("/account", "routes/account_page.tsx"),

    ] satisfies RouteConfig;
