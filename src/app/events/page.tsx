"use client";

import React, { useState, useEffect } from "react";

const events = [
	{
		title: "Only Founders",
		desc: "A 48-hour startup sprint where teams of 6 build their first digital startup across five high-impact tech domains — competing across 15 colleges.",
		details: "Only Founders was a multi-college 48-hour startup-building hackathon where teams of 6 were challenged to ideate, build, and pitch a functional digital product within a single sprint. Spanning five domains — FinTech & Digital Payments, AI Automation & Digital Media, Gaming & Entertainment Tech, Digital Health & Wellness Tech, and EdTech & Learning Automation — the event brought together participants from 15 colleges for one grand final at VIT Chennai. Teams had to go beyond pitching and actually build, making it a true test of technical execution, product thinking, and startup mindset.",
		bg: "bg-[#FFF8E7]",
		border: "border-[#F5C842]",
		text: "text-[#5C3D00]",
		borderColor: "#F5C842",
		startDate: new Date("2026-02-05"),
		endDate: new Date("2026-02-06"),
	},
	{
		title: "HACKATHRONE",
		desc: "A 24-hour hackathon challenging teams to engineer innovative solutions under time pressure.",
		details: "HACKATHRONE was a high-intensity 24-hour hackathon that pushed participants to ideate, prototype, and deliver full-stack solutions within a strict time limit. Teams tackled real-world problem statements spanning domains like AI and ML, Web development, Cybersecurity or web3, and Innovation. The format demanded rapid iteration, technical depth, and collaborative engineering — rewarding those who could balance creativity with execution under pressure.",
		bg: "bg-[#E8F0FF]",
		border: "border-[#93B4FF]",
		text: "text-[#0A1F6B]",
		borderColor: "#93B4FF",
		startDate: new Date("2025-10-29"),
		endDate: new Date("2025-10-30"),
	},
	{
		title: "DataSprint Hackathon",
		desc: "A two-level 24-hour hackathon driven by innovation in Generative AI, HealthTech, and FinTech.",
		details: "DataSprint was a two-level hackathon that challenged teams of 3–5 to build high-impact solutions across domains like Generative AI, HealthTech, and FinTech. Level 1 served as a qualifying round, with shortlisted teams advancing to the intense 24-hour Level 2 finals. Participants worked through overnight assessments, domain-focused challenges, and rigorous evaluation rounds judged on innovation, technical execution, feasibility, impact, and presentation quality — with a prize pool of INR 50,000 at stake.",
		bg: "bg-[#E8FFE8]",
		border: "border-[#7AE89A]",
		text: "text-[#064D1E]",
		borderColor: "#7AE89A",
		startDate: new Date("2025-09-04"),
		endDate: new Date("2025-09-05"),
	},
	{
		title: "REMICS",
		desc: "MIC's 5-year celebration and orientation event — revealing big initiatives, sharing the club's vision, and opening doors for the next generation of innovators.",
		details: "REMICS marked five years of the Microsoft Innovation Club at VIT Chennai — an orientation and celebration event that brought students face-to-face with the club's vision, roadmap, and community. Club leads took the stage to share future visions and what's next, followed by recruitment insights guiding students toward joining M.I.C. The event featured fun & interactive segments for students to connect, express, and play, alongside major big reveals that had been months in the making. MIC unveiled its official website, walkthrough of its structured project cycle, and opportunities like the Microsoft Learn Student Ambassador Program.",
		bg: "bg-[#F3EEFF]",
		border: "border-[#C084FC]",
		text: "text-[#3B0764]",
		borderColor: "#C084FC",
		startDate: new Date("2025-09-08"),
		endDate: new Date("2025-09-08"),
	},
	{
		title: "HEATCODE",
		desc: "A full-day competitive programming challenge where teams battle through two gruelling rounds to claim the top spot.",
		details: "HEATCODE was a high-stakes competitive programming contest built for teams of 2–4 that ran across two back-to-back elimination rounds. Participants tackled a gauntlet of algorithmic problems spanning greedy strategies, dynamic programming, graph theory, and number theory — under a strict time limit with an attractive prize pool on the line. The dual-round format separated the sharp from the elite, demanding both raw coding speed and sharp problem-solving strategy.",
		bg: "bg-[#FFE8E8]",
		border: "border-[#FF9494]",
		text: "text-[#6B0000]",
		borderColor: "#FF9494",
		startDate: new Date("2026-01-09"),
		endDate: new Date("2026-01-09"),
	},
	{
		title: "CODE CITADEL",
		desc: "A 4-round web development gauntlet — from HTML fundamentals to live deployment — where every round brought participants closer to conquering the web.",
		details: "CODE CITADEL was a progressive 4-round web development competition that took participants from the ground up. Round 1 (HTML Conquest) tested markup fundamentals with a quiz and static webpage build. Round 2 (CSS Clash) challenged teams to pixel-perfectly style an HTML page using only CSS. Round 3 (JavaScript + Git Gauntlet) combined a JS logic quiz, rapid-fire questions, and a Git branching challenge. Round 4 (The Final Siege) was the ultimate test — clone a real-world website like Spotify or GitHub using React.js or Next.js and deploy it live online.",
		bg: "bg-[#FFF0E8]",
		border: "border-[#FFBB94]",
		text: "text-[#6B2500]",
		borderColor: "#FFBB94",
		startDate: new Date("2025-10-27"),
		endDate: new Date("2025-10-27"),
	},
];

// Sorting function - displays upcoming events first, then past events from most recent to oldest
// Changed to avoid mutating the original array
const sortEventsByDate = (eventsList: typeof events) => {
	const now = new Date();
	// Reset time to start of day for accurate date comparison
	now.setHours(0, 0, 0, 0);

	const upcomingEvents = eventsList.filter((e) => e.startDate >= now);
	const pastEvents = eventsList.filter((e) => e.startDate < now);

	// Sort upcoming events by earliest date first
	upcomingEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
	// Sort past events from most recent to oldest
	pastEvents.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

	return [...upcomingEvents, ...pastEvents];
};

// Helper function to format date and time
const formatEventDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Helper function to check if event is upcoming
const isUpcoming = (date: Date): boolean => {
	const now = new Date();
	// Reset time to start of day for accurate date comparison
	now.setHours(0, 0, 0, 0);
	return date >= now;
};

type LineProps = {
	left: string;
	top: string;
	width: string;
	height: string;
	color?: string;
};

const Line: React.FC<LineProps> = ({
	left,
	top,
	width,
	height,
	color = "blue",
}) => (
	<div
		className="absolute pointer-events-none"
		style={{
			left,
			top,
			width,
			height,
			backgroundColor: color,
			borderRadius: 2,
			zIndex: 1,
		}}
	/>
);

const CalendarIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		width="16"
		height="16"
		style={style}
	>
		<rect x="3" y="5" width="18" height="16" rx="2" ry="2" fill="currentColor" opacity="0.25" />
		<path d="M7 3v2M17 3v2M3 9h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
	</svg>
);

const LandingPage = () => {
	const [openCard, setOpenCard] = useState<number | null>(null);
	const [isDarkMode, setIsDarkMode] = useState(false);
	// Events displayed in the exact order defined in the array above
	const sortedEvents = events;

	// Detect system theme preference
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		setIsDarkMode(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setIsDarkMode(e.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	React.useEffect(() => {
		// Disable scroll and zoom
		const preventScroll = (e: Event) => e.preventDefault();
		const preventZoom = (e: WheelEvent) => {
			if (e.ctrlKey) {
				e.preventDefault();
			}
		};
		const preventKeyboardZoom = (e: KeyboardEvent) => {
			if (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) {
				e.preventDefault();
			}
		};

		// add with explicit options
		const wheelOptions = { passive: false } as AddEventListenerOptions;
		const touchOptions = { passive: false } as AddEventListenerOptions;
		document.addEventListener("wheel", preventZoom, wheelOptions);
		document.addEventListener("keydown", preventKeyboardZoom);
		document.addEventListener("touchmove", preventScroll, touchOptions);

		// Only disable body scroll when a card is open
		if (openCard !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			// remove with the same options to ensure proper cleanup
			document.removeEventListener("wheel", preventZoom, wheelOptions);
			document.removeEventListener("keydown", preventKeyboardZoom);
			document.removeEventListener("touchmove", preventScroll, touchOptions);
			document.body.style.overflow = "";
		};
	}, [openCard]);

	// Theme-specific colors
	const getThemeColors = () => {
		if (isDarkMode) {
			return {
				background: "linear-gradient(to bottom, #00040d 0%, #002855 100%)",
				lineColor: "#0B3A79",
				borderColor: "#1e40af",
				textColor: "text-white",
				gridOpacity: "rgba(255, 255, 255, 0.1)",
			};
		} else {
			return {
				background: "linear-gradient(to bottom, #e0f2fe 0%, #87ceeb 100%)",
				lineColor: "#1e88e5",
				borderColor: "#3b82f6",
				textColor: "text-gray-900",
				gridOpacity: "rgba(255, 255, 255, 0.3)",
			};
		}
	};

	const themeColors = getThemeColors();

	const renderOverlay = () => {
		if (openCard === null) return null;
		const event = sortedEvents[openCard];
		return (
			<div
				className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
				style={{ backdropFilter: "blur(3px)" }}
				onClick={() => setOpenCard(null)}
			>
				<div
					className={`pixel-corners ${event.bg} ${event.text} relative shadow-2xl`}
					style={{
						width: "min(90vw, 600px)",
						maxHeight: "90vh",
						overflowY: "auto",
						border: `16px solid ${event.borderColor}`,
						padding: "2.5rem 2rem",
						boxSizing: "border-box",
						position: "relative",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						fontWeight: "bold",
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<button
						className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-red-500 transition-colors font-bold z-10"
						aria-label="Close"
						onClick={() => setOpenCard(null)}
						style={{
							background: "rgba(255,255,255,0.7)",
							border: "none",
							borderRadius: "50%",
							width: "2.5rem",
							height: "2.5rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
						}}
					>
						x
					</button>
					<span className="font-press-start text-3xl mb-4" style={{ fontSize: "clamp(20px, 4vw, 32px)" }}>
						{event.title}
					</span>
					<div
						style={{
							marginBottom: "16px",
							display: "flex",
							alignItems: "center",
							gap: "12px",
							flexWrap: "wrap",
						}}
					>
						<span
							style={{
								fontSize: "clamp(10px, 1.6vw, 12px)",
								padding: "6px 12px",
								borderRadius: "4px",
								backgroundColor: isUpcoming(event.startDate)
									? "#4ade80"
									: "#94a3b8",
								color: "white",
								fontWeight: "bold",
							}}
						>
							{isUpcoming(event.startDate) ? "UPCOMING" : "PAST"}
						</span>
						<span
							style={{
								fontFamily: "'IBM Plex Mono', monospace",
								fontSize: "clamp(12px, 1.6vw, 14px)",
								fontWeight: "normal",
								display: "flex",
								alignItems: "center",
								gap: 8,
							}}
						>
							<CalendarIcon style={{ width: 16, height: 16 }} />
							{formatEventDate(event.startDate)}
						</span>
					</div>
					<p
						className="font-IBM Plex Mono text-base mb-4"
						style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(13px, 1.2vw, 16px)" }}
					>
						{event.desc}
					</p>
					<div
						className="font-normal text-sm"
						style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "clamp(13px, 1vw, 15px)" }}
					>
						{event.details}
					</div>
				</div>
			</div>
		);
	};

	const getCardClass = (event: typeof events[0]) =>
		`pixel-corners font-press-start ${event.bg} ${event.text} cursor-pointer transition-all duration-200${openCard === null ? " hover:scale-105 hover:shadow-xl" : ""
		}`;

	return (
		<div
			className={`relative min-h-screen bg-cover bg-center overflow-y-auto overflow-x-hidden flex flex-col items-center ${themeColors.textColor}`}
			style={{
				// keep grid background and prevent edge touching via padding + absolute borders using left-6/right-6
				backgroundImage: `
          linear-gradient(to right, ${themeColors.gridOpacity} 1px, transparent 1px),
          linear-gradient(to bottom, ${themeColors.gridOpacity} 1px, transparent 1px),
          ${themeColors.background}
        `,
				backgroundSize: "30px 30px, 30px 30px, 100% 100%",
				backgroundRepeat: "repeat, repeat, no-repeat",
				backgroundPosition: "top left, top left, center",
				userSelect: "none",
				touchAction: "pan-y",
				paddingLeft: "1.5rem",
				paddingRight: "1.5rem",
				paddingTop: "1.5rem",
				paddingBottom: "1.5rem",
			}}
		>
			<div className="events-decorative hidden md:block">
				{/* Dynamic Lines - Responsive to screen size */}
				<Line
					left="3.6vw"
					top="14vh"
					width="5.8vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="9.1vw"
					top="5vh"
					width="0.3vw"
					height="9.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="3.6vw"
					top="14vh"
					width="0.3vw"
					height="70vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="3.6vw"
					top="84vh"
					width="5.6vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="9.1vw"
					top="84vh"
					width="0.3vw"
					height="9.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="9.1vw"
					top="93.5vh"
					width="80.7vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="89.5vw"
					top="84vh"
					width="0.3vw"
					height="9.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="89.8vw"
					top="84vh"
					width="6.2vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="95.8vw"
					top="14vh"
					width="0.3vw"
					height="70.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="90.6vw"
					top="14vh"
					width="5.6vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="90.6vw"
					top="5vh"
					width="0.3vw"
					height="9.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="9.2vw"
					top="5vh"
					width="81.3vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="3.6vw"
					top="45.5vh"
					width="3.9vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="7.5vw"
					top="45.5vh"
					width="0.3vw"
					height="8.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="3.6vw"
					top="53.5vh"
					width="3.9vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="92.1vw"
					top="32vh"
					width="3.6vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="92.1vw"
					top="32vh"
					width="0.3vw"
					height="8vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="92.1vw"
					top="43vh"
					width="0.3vw"
					height="4vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="92.1vw"
					top="47vh"
					width="3.9vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="78.6vw"
					top="5vh"
					width="0.3vw"
					height="6vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="69.5vw"
					top="10.5vh"
					width="9.2vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="3.9vw"
					top="76vh"
					width="4.3vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="7.9vw"
					top="69vh"
					width="0.3vw"
					height="7vh"
					color={themeColors.lineColor}
				/>
				<Line
					left="7.9vw"
					top="69vh"
					width="4.3vw"
					height="0.5vh"
					color={themeColors.lineColor}
				/>

			</div>
			{/* Ghost decorations */}
			<img
				src="/greenghost.png"
				alt="Left Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(1.8vw, 28px)",
					height: "min(1.8vw, 28px)",
					top: "70vh",
					right: "13.4vw",
				}}
			/>
			<img
				src="/redghost.png.png"
				alt="Left Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(2vw, 32px)",
					height: "min(2vw, 32px)",
					top: "21.5vh",
					left: "13.1vw",
				}}
			/>
			<img
				src="/yellowghost.png"
				alt="Left Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(2.5vw, 40px)",
					height: "min(2.1vw, 33px)",
					top: "43vh",
					left: "10.5vw",
					filter: "hue-rotate(-28deg) saturate(1.55)",
				}}
			/>
			<img
				src="/yellowghost.png"
				alt="Left Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(2vw, 32px)",
					height: "min(2vw, 32px)",
					top: "68vh",
					left: "13.8vw",
				}}
			/>
			<img
				src="/blueghost.png"
				alt="Right Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(2vw, 32px)",
					height: "min(2vw, 32px)",
					top: "24vh",
					right: "12.4vw",
				}}
			/>
			<img
				src="/yellowghost.png"
				alt="Right Decor"
				className="absolute z-30 animate-bounce"
				style={{
					width: "min(2vw, 32px)",
					height: "min(2vw, 32px)",
					top: "51vh",
					right: "8.8vw",
				}}
			/>

			{/* Main Heading */}
			<h1
				className={`${themeColors.textColor} font-press-start z-10 text-center mt-14`}
				style={{ fontSize: "min(5vw, 3rem)" }}
			>
				EVENTS
			</h1>

			<div
				className="relative flex flex-col items-center justify-center w-full z-10"
				style={{
					marginTop: "min(5vh, 80px)",
					marginBottom: "min(8vh, 80px)",
					gap: "min(4vh, 64px)",
				}}
			>
				{/* First Row - 3 cards */}
				<div
					className="grid events-grid"
					style={{
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: "min(2.5vw, 48px)",
						maxWidth: "min(63.2vw, 964px)",
						width: "100%",
					}}
				>
					{sortedEvents.slice(0, 3).map((event, i) => (
						<div
							key={i}
							className={getCardClass(event)}
							style={{
								width: "min(19.5vw, 298px)",
								height: "min(27vh, 280px)",
								borderRadius: "0px",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								justifyContent: "flex-start",
								fontWeight: "bold",
								padding: "min(1.6vw, 24px)",
								position: "relative",
								border: `min(0.8vw, 12px) solid ${event.borderColor}`,
								overflow: "hidden",
							}}
							onClick={() => setOpenCard(i)}
						>
							<span
								style={{
									fontSize: "clamp(11px, 1.3vw, 20px)",
									marginBottom: "min(0.8vh, 12px)",
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
									wordBreak: "break-word",
								}}
							>
								{event.title}
							</span>
							<p
								className="info-text font-normal"
								style={{
									fontFamily: "'IBM Plex Mono', monospace",
									fontSize: "clamp(10px, 0.9vw, 14px)",
									marginBottom: "min(0.8vh, 12px)",
									display: "flex",
									alignItems: "center",
									gap: "6px",
								}}
							>
								<CalendarIcon style={{ width: 14, height: 14, flexShrink: 0 }} />
								<span>{formatEventDate(event.startDate)}</span>
							</p>
							<p
								className="info-text font-normal"
								style={{
									fontFamily: "'IBM Plex Mono', monospace",
									fontSize: "clamp(10px, 0.9vw, 14px)",
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 3,
									WebkitBoxOrient: "vertical",
									wordBreak: "break-word",
								}}
							>
								{event.desc}
							</p>
						</div>
					))}
				</div>

				{/* Pac-Man and Pellets - Between Rows */}
				<div
					className="relative flex items-center w-full h-12"
					style={{ maxWidth: "min(63.2vw, 964px)" }}
				>
					<img
						src="/PacMan.gif"
						alt="Pac-Man"
						style={{
							width: "min(3.2vw, 48px)",
							height: "min(3.2vw, 48px)",
							position: "absolute",
							left: 0,
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 20,
						}}
					/>
					<div className="pellets-row">
						<div className="pellets-inner">
							{[...Array(48)].map((_, i) => (
								<div
									key={i}
									style={{
										width: "min(1.05vw, 16px)",
										height: "min(1.05vw, 16px)",
									}}
									className="bg-yellow-300 rounded-full shadow"
								></div>
							))}
							{[...Array(48)].map((_, i) => (
								<div
									key={i + 48}
									style={{
										width: "min(1.05vw, 16px)",
										height: "min(1.05vw, 16px)",
									}}
									className="bg-yellow-300 rounded-full shadow"
								></div>
							))}
						</div>
					</div>
				</div>

				{/* Second Row - 3 cards */}
				<div
					className="grid events-grid"
					style={{
						gridTemplateColumns: "repeat(3, 1fr)",
						gap: "min(2.5vw, 48px)",
						maxWidth: "min(63.2vw, 964px)",
						width: "100%",
					}}
				>
					{sortedEvents.slice(3, 6).map((event, i) => (
						<div
							key={i + 3}
							className={getCardClass(event)}
							style={{
								width: "min(19.5vw, 298px)",
								height: "min(27vh, 280px)",
								borderRadius: "0px",
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								justifyContent: "flex-start",
								fontWeight: "bold",
								padding: "min(1.6vw, 24px)",
								position: "relative",
								border: `min(0.8vw, 12px) solid ${event.borderColor}`,
								overflow: "hidden",
							}}
							onClick={() => setOpenCard(i + 3)}
						>
							<span
								style={{
									fontSize: "clamp(11px, 1.3vw, 20px)",
									marginBottom: "min(0.8vh, 12px)",
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
									wordBreak: "break-word",
								}}
							>
								{event.title}
							</span>
							<p
								className="info-text font-normal"
								style={{
									fontFamily: "'IBM Plex Mono', monospace",
									fontSize: "clamp(10px, 0.9vw, 14px)",
									marginBottom: "min(0.8vh, 12px)",
									display: "flex",
									alignItems: "center",
									gap: "6px",
								}}
							>
								<CalendarIcon style={{ width: 14, height: 14, flexShrink: 0 }} />
								<span>{formatEventDate(event.startDate)}</span>
							</p>
							<p
								className="info-text font-normal"
								style={{
									fontFamily: "'IBM Plex Mono', monospace",
									fontSize: "clamp(10px, 0.9vw, 14px)",
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 3,
									WebkitBoxOrient: "vertical",
									wordBreak: "break-word",
								}}
							>
								{event.desc}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Vertical Dots Right */}
			<div
				className="absolute flex-col z-50 hidden md:flex"
				style={{
					top: "34vh",
					right: "5.2vw",
					gap: "min(1vh, 14px)",
				}}
			>
				{[...Array(5)].map((_, i) => (
					<div
						key={`v-dot-${i}`}
						style={{
							width: "min(0.8vw, 12px)",
							height: "min(0.8vw, 12px)",
						}}
						className="bg-yellow-300 rounded-full"
					></div>
				))}
			</div>

			{/* Vertical Dots Left */}
			<div
				className="absolute flex-col z-50 hidden md:flex"
				style={{
					top: "48vh",
					left: "5.2vw",
					gap: "min(1vh, 14px)",
				}}
			>
				{[...Array(2)].map((_, i) => (
					<div
						key={`left-dot-${i}`}
						style={{
							width: "min(0.8vw, 12px)",
							height: "min(0.8vw, 12px)",
						}}
						className="bg-yellow-300 rounded-full"
					></div>
				))}
			</div>

			{/* Corner Ghosts */}

			<img
				src="/redghost.png.png"
				alt="Top Right Ghost"
				className="absolute top-20 right-20 z-50 animate-bounce hidden md:block"
				style={{
					width: "min(2.1vw, 32px)",
					height: "min(2.1vw, 32px)",
				}}
			/>
			<img
				src="/blueghost.png"
				alt="Bottom Left Ghost"
				className="absolute bottom-24 left-20 z-50 animate-bounce hidden md:block"
				style={{
					width: "min(2.1vw, 32px)",
					height: "min(2.1vw, 32px)",
				}}
			/>
			<img
				src="/pinkghost (1).png"
				alt="Bottom Right Ghost"
				className="absolute bottom-20 right-20 z-50 animate-bounce hidden md:block"
				style={{
					width: "min(2.1vw, 32px)",
					height: "min(2.1vw, 32px)",
				}}
			/>

			{/* Responsive Borders */}
			<div
				className="absolute top-6 left-6 right-6 z-40"
				style={{
					height: "min(0.5vh, 8px)",
					backgroundColor: themeColors.borderColor,
				}}
			></div>
			<div
				className="absolute bottom-6 left-6 right-6 z-40"
				style={{
					height: "min(0.5vh, 8px)",
					backgroundColor: themeColors.borderColor,
				}}
			></div>
			<div
				className="absolute top-6 bottom-6 left-6 z-40"
				style={{
					width: "min(0.5vw, 8px)",
					backgroundColor: themeColors.borderColor,
				}}
			></div>
			<div
				className="absolute top-6 bottom-6 right-6 z-40"
				style={{
					width: "min(0.5vw, 8px)",
					backgroundColor: themeColors.borderColor,
				}}
			></div>

			{/* Responsive Styles */}
			<style>{`
				/* Mobile: single-column cards */
				@media (max-width: 640px) {
					.events-grid {
						grid-template-columns: 1fr !important;
						max-width: 92vw !important;
						width: 92vw !important;
						gap: 16px !important;
					}
					.events-card {
						width: 100% !important;
						height: auto !important;
						min-height: 120px !important;
						padding: 16px !important;
						border-width: 6px !important;
					}
					.info-text { font-size: 11px !important; }
					.pellets-row { display: none; }
				}
				/* Tablet: 2-column */
				@media (min-width: 641px) and (max-width: 1024px) {
					.events-grid {
						grid-template-columns: repeat(2, 1fr) !important;
						max-width: 92vw !important;
						width: 92vw !important;
						gap: min(2vw, 24px) !important;
					}
					.events-card {
						width: 100% !important;
						height: auto !important;
						min-height: 160px !important;
						padding: 20px !important;
					}
					.info-text { font-size: 12px !important; }
				}
				/* Smooth card hover only on desktop */
				@media (max-width: 1024px) {
					.pellets-row { width: 100% !important; }
				}
				.pellets-row {
					overflow: hidden;
					width: 100%;
					position: relative;
					display: flex;
					align-items: center;
				}
				.pellets-inner {
					display: flex;
					gap: 12px;
					padding-left: 56px;
					animation: pellet-scroll 8s linear infinite;
				}
				@keyframes pellet-scroll {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
			`}</style>
			{/* Modal Overlay */}
			{renderOverlay()}
		</div>
	);
};

export default LandingPage;


