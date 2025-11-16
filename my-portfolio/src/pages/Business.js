import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
//Status: active, paused, stealth, attempted
const businesses = [
	{
		name: 'Ai-Psych-Marketing tool',
		status: 'Stealth - Market Research',
		note: 'Trying to bridge the gap between psychology and marketing using AI. Really combining many of my interests together.',
		links: [],
	},
	{
		name: 'Custom Microcontroller',
		status: 'Stealth - Market Research',
		note: 'Working on finding a niche to work into',
		links: [],
	},
	{
		name: 'Pharmacy software',
		status: 'paused',
		note: 'Stopped after marketing logistics were too tricky. May pickup again.',
		links: [],
	},
	{
		name: 'Silo (name TBD)',
		status: 'Paused',
		note: 'working on taking the research in-person',
		links: [],
	},
	{
		name: 'AI content sponsorship platform',
		status: 'attempted',
		note: 'This specific niche is already saturated. There have been companies since 2019. The idea of AI-generated content sponsorships is still very promising',
		links: [],
	},
	{
		name: 'AI Automation Agency',
		status: 'attempted',
		note: 'Became too saturated to be scalable with so many people offering similar services',
		links: [],
	},
	{
		name: 'Sigfig AI Security Services',
		status: 'paused',
		note: 'AI-powered tailgating detection for gyms. Preventing revenue loss and improving security with 24/7 monitoring.',
		links: [{ url: '/sigfig-ai', icon: <FaGlobe />, internal: true }],
	},
	
	{
		name: 'FasTech.dev',

		status: 'Paused',
		note: 'Thought of the company name in grade 9 for a school project (faseeh + Fast + Tech = FasTech) | Learnt that it is neccessary to put yourself out there, especially when you have a good product',
		links: [{ url: 'https://fastech.dev', icon: <FaGlobe /> },{url: 'https://www.linkedin.com/company/fastech-developers/', icon: <FaLinkedin /> }],
	},
	{
		name: 'Mustang Tutors',

		status: 'Attempted',
		note: 'Learnt that cold outreach is a must starting off, also that you need to move fast before the spark dies out',
		links: [{ url: 'https://www.instagram.com/mustangtutors/', icon: <FaInstagram /> }],
	},
	{
		name: 'Brainrot App',
		status: 'Paused',
		note: 'Learnt that you need to focus on the core product and get it out rather than trying to add every feature under the sun before release',
		links: [],
	},
	
	{
		name: 'Bob Clothing',
		alias: 'Bob',
		status: 'Attempted',
		note: 'Learnt marketing dosent always work',
		links: [
			{ url: 'https://bob-bob-bob.creator-spring.com/', icon: <FaGlobe /> },
			{ url: 'https://www.youtube.com/@Bob-gm1xn', icon: <FaYoutube /> },
		],
	},
	{
		name: 'Epic Gamer Time Clothing',
		alias: 'Epic Gamer Time',

		status: 'Attempted',
		note: 'Learnt that marketing through `memes` can be harder than traditional marketing',
		links: [{ url: 'https://epic-gamer-time.creator-spring.com', icon: <FaGlobe /> }],
	},
	{
		name: 'Shums Clothing',
		alias: 'Shums',

		status: 'Attempted',
		note: 'Learnt that clothing wont sell itself',
		links: [{ url: 'https://shums.creator-spring.com', icon: <FaGlobe /> }],
	},
	{
		name: 'SFHN Food Drive (non-profit)',
		alias: 'SFHN',
		status: 'Attempted',
		note: 'Tried starting this when I was 14. Learnt that you have to have a clear plan and a team that believes in the mission to execute a non-profit effectively',
		links: [],
	},
];

function StatusBadge({ status }) {
	const base = status.toLowerCase();
	const variant =
		base.includes('active') ? 'success' :
		base.includes('paused') ? 'warning' :
		base.includes('stealth') ? 'info' :
		base.includes('attempted') ? 'dark' :
		'secondary';//Teniary operator to determine the badge color based on status

	return (
		<span className={`badge bg-${variant}`} title={status}>
			{status}
		</span>
	);
}

/* ---------- PAGE ---------- */
export default function Businesses() {
	return (
		<div className="container py-5">
			<h1 className="fw-bold mb-4 text-center">Businesses & Ventures</h1>

			{/* Scoreboard & Stats */}
			{(() => {
				const normalized = businesses.map((b) => {
					const status = (b.status || '').toLowerCase();
					const name = (b.name || '').toLowerCase();
					const success = status.includes('active');
					const failure = status.includes('attempted');
					const midwayNames = [
						'fastech.dev',
						'sigfig ai security services',
						'brainrot app',
					];
					const midway = midwayNames.some((m) => name.includes(m));
					const paused = status.includes('paused');
					const stealth = status.includes('stealth');
					return { ...b, success, failure, midway, paused, stealth };
				});

				const total = normalized.length;
				const successCount = normalized.filter((x) => x.success).length; // expected 0 for now
				const failureCount = normalized.filter((x) => x.failure).length;
				// Midway now includes all paused + named midway, excluding wins/failures
				const midwayCount = normalized.filter((x) => (x.paused || x.midway) && !x.success && !x.failure).length;
				const stealthCount = normalized.filter((x) => x.stealth).length;
				const otherCount = Math.max(
					0,
					total - (successCount + failureCount + midwayCount + stealthCount)
				);
				const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

				return (
					<>
						<div className="row g-4 align-items-stretch mb-4">
							{/* Scoreboard */}
							<div className="col-md-4">
								<div className="card h-100 text-center shadow-sm">
									<div className="card-body">
										<h6 className="text-uppercase text-muted mb-2">Successes</h6>
										<div className="display-4 fw-bold text-success">{successCount}</div>
										<small className="text-muted">Currently no winners</small>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="card h-100 text-center shadow-sm">
									<div className="card-body">
										<h6 className="text-uppercase text-muted mb-2">Failures</h6>
										<div className="display-4 fw-bold text-danger">{failureCount}</div>
										<small className="text-muted">Counted as “Attempted”</small>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="card h-100 text-center shadow-sm">
									<div className="card-body">
										<h6 className="text-uppercase text-muted mb-2">Midway</h6>
										<div className="display-4 fw-bold text-primary">{midwayCount}</div>
										<small className="text-muted">Paused ventures count as midway</small>
									</div>
								</div>
							</div>
						</div>


					</>
				);
			})()}

			<div className="row g-4">
				{businesses.map((b, i) => (
					<div key={i} className="col-sm-6 col-lg-4">
						<div className="card h-100 shadow-sm">
							<div className="card-body d-flex flex-column">
								{/* Title & status */}
								<h5 className="card-title mb-1">
									{b.name}{' '}
									<StatusBadge status={b.status} />
								</h5>

								{/* Alias */}
								{b.alias && (
									<small className="text-muted">AKA “{b.alias}”</small>
								)}

								{/* Note */}
								<p className="card-text flex-grow-1 mt-2">{b.note}</p>

								{/* Links */}
								{b.links.length > 0 && (
									<div className="d-flex flex-wrap gap-2">
										{b.links.map((l, k) => 
											l.internal ? (
												<Link
													key={k}
													to={l.url}
													className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center"
												>
													<span className="me-1">{l.icon}</span>
													View Details
												</Link>
											) : (
												<a
													key={k}
													href={l.url}
													className="btn btn-outline-primary btn-sm rounded-pill d-flex align-items-center"
													target="_blank"
													rel="noopener noreferrer"
												>
													<span className="me-1">{l.icon}</span>
													Visit
												</a>
											)
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}