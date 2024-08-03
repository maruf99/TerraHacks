import { Link } from "@tanstack/react-router";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import logo from "../assets/logo-transparent.png";

const links = [
	{
		label: "Home",
		link: "/",
	},
	{
		label: "About",
		link: "/about",
	},
];

const mappedLinks = links.map((link) => {
	return (
		<li>
			<Link key={link.label} to={link.link}>
				{link.label}
			</Link>
		</li>
	);
});

export default function Navbar() {
	return (
		<div className="navbar bg-base-200">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<Bars3Icon className="w-6 h-6" />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{mappedLinks}
					</ul>
				</div>
				<div className="btn-square p-1">
					<img src={logo} />
				</div>
				<div>
					<h1 className="text-xl font-bold">TerraTect</h1>
				</div>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 space-x-1">
					{mappedLinks}
				</ul>
			</div>
			<div className="navbar-end" />
		</div>
	);
}
