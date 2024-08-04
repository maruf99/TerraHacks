import { Link } from "@tanstack/react-router";
import { Bars3Icon } from "@heroicons/react/24/solid";

import logo from "../assets/logo-transparent.png";
import SearchBox from "./SearchBox";

const links = [
	{
		label: "Home",
		link: "/",
	},
	{
		label: "Explore",
		links: [
			{ label: "By Region", link: "/explore/region" },
			{ label: "By Endangerment Level", link: "/explore/level" },
		],
	},
];

const mappedLinks = links.map((link) => {
	return (
		<li>
			{"links" in link ? (
				<details>
					<summary>{link.label}</summary>
					<ul className="p-2">
						{link.links!.map((l) => {
							return (
								<li>
									<Link key={l.label} to={l.link}>
										{l.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</details>
			) : (
				<Link key={link.label} to={link.link}>
					{link.label}
				</Link>
			)}
		</li>
	);
});

const mappedLinksDisclosure = links.map((link) => {
	return (
		<li>
			{"links" in link ? (
				<>
					<a key={link.label}>{link.label}</a>
					<ul className="p-2">
						{link.links!.map((l) => {
							return (
								<li>
									<Link key={l.label} to={l.link}>
										{l.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</>
			) : (
				<Link key={link.label} to={link.link}>
					{link.label}
				</Link>
			)}
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
						{mappedLinksDisclosure}
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
			<div className="navbar-end">
				<div className="px-2">
					<SearchBox/>
				</div>
			</div>
		</div>
	);
}
