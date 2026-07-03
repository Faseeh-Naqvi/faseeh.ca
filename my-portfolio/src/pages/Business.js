import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaInstagram, FaYoutube, FaLinkedin, FaTiktok } from 'react-icons/fa';
import './Business.css';

const statusDefinitions = {
	active: 'Actively launched and running, seeking clients, or serving users.',
	'pre-launch': 'Completed the earlier phases, but a blocker is preventing the next step.',
	research: 'Looking into market need and how the product can be optimized for users.',
	ideation: 'Working through the idea and turning it into something concrete.',
	attempted: 'Tried to get it off the ground, but ultimately failed.',
};

const frozenDefinition = 'Frozen means the venture is paused in its current phase instead of moving forward right now.';

const businesses = [
	{
		name: 'Sigfig AI Security Services',
		status: 'pre-launch',
		frozen: true,
		note: 'AI-powered tailgating detection for gyms. Preventing revenue loss and improving security with 24/7 monitoring.',
		links: [
			{ url: '/projects#sigfig-prototype', icon: <FaGlobe />, internal: true, label: 'View Prototype' },
			{ url: 'https://sigfigsecurity.com', icon: <FaGlobe /> },
			{ url: 'https://www.linkedin.com/company/sigfig-ai/', icon: <FaLinkedin /> },
			{ url: 'https://www.instagram.com/sigfigsecurity/', icon: <FaInstagram /> },
		],
		updates: [
			{ date: '2025-05-10', text: 'Got idea when I was going to the gym with some friends and noticed how many people sneak in. Also noticed how easy it was to bypass the system. It is far too expensive to sit at the camera all day and monitor it 24/7 Began brainstorming' },
			{ date: '2025-08-01', text: 'Co-founder and I had gotten busy and idea died out, made a mistake, should have executed faster.' },
			{ date: '2026-01-20', text: 'Found another person to work with and started working on the idea again and made a team of 3, this time executing faster and more effectively.' },
			{ date: '2026-02-02', text: 'Conducted market research and began development of the MVP. Started posting regularly on LinkedIn and managing the team.' },
			{ date: '2026-02-15', text: 'Made first Slide Deck and more market research.' },
			{ date: '2026-02-26', text: 'Got first real landing page up with registered domain!' },
			{ date: '2026-04-03', text: 'Got first yes in a cold call to join the waitlist.' },
			{ date: '2026-05-29', text: 'Talked to an experienced entrepreneur about the business and he explained how there may not be strong product-market fit. Based on my cold calls, people were interested, but ultimately not able to make the leap.' },
			{ date: '2026-05-31', text: 'Did a 3-day sprint with my co-founder to finalize the MVP. Glad to report we have a working prototype built around ESP32 microcontrollers, C++, breadboarded circuitry, soldered hardware, IoT networking, server communication, and enclosure/design work in Autodesk Tinkercad and Fusion 360.' },
			{ date: '2026-06-06', text: 'First time in a real film studio. Filmed a commercial and investor pitch video explaining the product and our prototype. We went overtime, but it was our first time and we were figuring a lot out as we went. Murphy\'s law came into full effect when our prototype stopped working because the internet was not connecting. On the drive back, we found out a key recording was lost, so we had to re-record later on in our own time. It was still a super fun experience despite the stress.' },
			{ date: '2026-06-21', text: 'Applied to an accelerator. The continuation of this business is dependent on this accelerator and its funding.' },
		],
	},
	{
		name: 'Unnamed Short Form Content Addiction Therapy App',
		alias: 'Reelranked / Brainrot App',
		status: 'research',
		note: 'B2C app to help people track and reduce short-form content addiction.',
		links: [
			{ url: 'https://reelranked.com', icon: <FaGlobe /> },
			{ url: 'https://brainrotapp.lol', icon: <FaGlobe /> },
			{ url: 'https://www.instagram.com/reel.ranked/', icon: <FaInstagram /> },
			{ url: 'https://www.tiktok.com/@reelranked.tk', icon: <FaTiktok /> },

		],
		updates: [
			{ date: '2024-12-03', text: 'Came up with the idea after scrolling the whole day away. Realized that this is an idea that has not been done before.' },
			{ date: '2025-01-15', text: 'Started working on the app, found out that I would need Google accessibility settings which the app did not qualify for' },			
			{ date: '2025-01-15', text: 'Gave up on the project and got distracted by other projects. Everyone got busy with exams, one co-founder dropped it.' },
			{ date: '2025-10-05', text: 'Talked to a friend about the old idea, and they were interested in it and I realized it may have market footing' },
			{ date: '2025-12-01', text: 'Found a way to make the app profitable. But still facing the Google permissions issue.' },
			{ date: '2026-01-20', text: 'Started brainstorming and re-evaluating the app idea and its potential. Changed the core philosophy of the app from gimmick to real tool for change and to not use the features that would require permissions from Google.' },
			{ date: '2026-02-12', text: 'Changed name from "brainrot app" to "Reel Ranked" and started planning this new app' },
			{ date: '2026-02-14', text: 'Started working on the app again, this time with a new strategy and development plan.' },
			{ date: '2026-02-17', text: 'Saw a reel where someone was building an app with a feature that requires accessibility permissions but it is not an accessibility app. Revisiting Google policies and possibly restarting old idea.' },
			{ date: '2026-02-25', text: 'Talked to a friend and reviewed goolgle policies to pivot to a health first application rather than a social app. The name must be changed. Unsure what to change it to. Might make this a social app as well as the base tech will remain' },
			{ date: '2026-03-02', text: 'Paused work on the app.' },
			{ date: '2026-04-03', text: 'Started looking into it again. Still figuring out Play Store compliance and technical feasibility due to strict tracking laws.' },
			{ date: '2026-06-25', text: 'Name changed again. Now it is an unnamed short-form content addiction therapy app. I am planning a research study to back this. If it goes well, it might launch as a standalone app. I really care about this problem because I and many others close to me have faced it. More to come soon. This is now in the research phase and I will be working on it in the coming months.' },
		],
		
	},
	{
		name: 'Civil Engineering Software',
		status: 'research',
		frozen: true,
		note: 'Software solutions for civil engineers, focusing on improving efficiency and accuracy in research.',
		links: [
		],
		updates: [
			{ date: '2025-02-24', text: 'Talked to my roomate who is in civil engineering and he mentioned some inefficiencies in current tools used in the field.' },
			{ date: '2025-02-26', text: 'Began research on what/how to build to solve the issues' },
			{ date: '2026-03-20', text: 'Put on pause to devote time to other things.' },
			{ date: '2026-04-30', text: 'Got way too busy with SigFig and building the prototype, so this will have to go on freeze. This was still in the research phase beforehand and still needs market validation.' },
		],
	},
	{ name: 'GoatedGames',
	  status: 'attempted',
	  note: 'Small indie game studio focused on creating unique and engaging gaming experiences. Our mission is to bring innovative gameplay to Mobile and browser platforms, with a focus on community-driven development and player feedback.',
	  links: [{ url: 'https://goatedgames.ca', icon: <FaGlobe /> },{ url: 'https://www.instagram.com/goatedgames.ig/', icon: <FaInstagram /> },],
	  updates: [
		{ date: '2026-02-12', text: 'Started the company with a friend as a fun project to work on together and to have a creative outlet. Always loved games growing up and this was a way to reconnect with my roots.' },
		{ date: '2026-02-16', text: 'Started working on our first game, a satirical app mocking games that give you points for engaging with advertisements. The twist is, this app donates a portion of the proceeds to charity.' },
		{ date: '2026-02-17', text: 'Registered business in Ontario, applied for D&B DUNS number for the Google and Apple Play Store so we can post apps.' },
		{ date: '2026-02-20', text: 'Finished and began testing advertisment philanthropy app.' },
	],
	  lessons: ['We had little interest in the actual product and mostly thought it would be cool to build.', 'Both of us were super busy, so we could not put in enough effort to keep it afloat.'],

	},
	{
		name: 'Ai-Psych-Marketing tool',
		status: 'research',
		frozen: true,
		note: 'Trying to bridge the gap between psychology and marketing using AI. Really combining many of my interests together.',
		updates: [
			{ date: '2025-09-20', text: 'Got the idea after trying to find a thesis project that combined my interests in psychology and marketing.' },
			{ date: '2025-09-30', text: 'Conducted market research and talked to people in the field. Turns out it would be more difficult to make than anticipated and may not derive the intended results efficiently.' }
		],
		links: [],
	},
	{
		name: 'Custom Microcontroller',
		status: 'attempted',
		note: 'Make a custom CISC microcontroller that is optimized for a specific niche ',
		updates: [
			{ date: '2025-11-10', text: 'My friend in electrical eng wanted to start this with me. Not scalable enough to be worth it. If it was a big market, there are already huge players with large market share.' },
			{ date: '2025-12-24', text: 'Friend got internship and does not have the time for a business this technical' }
		],
		lessons: ['Niche markets dominated by large players are hard to break into', 'Co-founder availability and commitment is crucial'],
		links: [],
	},
	{
		name: 'Pharmacy software',
		status: 'attempted',
		note: 'pharmacy software is very inefficient and outdated. There is a lot of room for improvement and innovation in this space.',
		updates: [
			{ date: '2024-06-21', text: 'Got idea after talking to someone in the pharmacy space.' },
			{ date: '2024-09-15', text: 'Logistics were too tricky. Very slow moving industry. May pick up again.' }
		],
		lessons: ['Industry momentum and regulatory complexity matter', 'Understand the full supply chain before committing'],
		links: [],
	},
	{
		name: 'Silo AI',
		status: 'attempted',
		note: 'An AI-powered smart silo system for farmers, optimizing grain storage and reducing losses with real-time monitoring and predictive analytics.',
		updates: [
			{ date: '2025-06-23', text: 'Knew I wanted to do work in the agricultural space, so I started market research' },
			{ date: '2025-09-15', text: 'Conducted market research and Landed on an idea and started rough designs with logistics & marketing plans' },
			{ date: '2025-10-12', text: 'Consulted with engineers I know and started working on a feasible rough prototype. It is too difficult of an engineering problem. Would have to literally build our own silos.' }
		],
		lessons: ['Validate engineering feasibility early', 'Manufacturing requirements can make ideas impractical', 'Talk to domain experts sooner in the research phase'],
		links: [],
	},
	{
		name: 'AI content sponsorship platform',
		status: 'research',
		frozen: true,
		note: 'Connecting content creators with sponsors using an AI-powered platform that matches creators with relevant brands based on their content and audience demographics, streamlining the sponsorship process and increasing revenue opportunities for creators while helping brands reach their target audience more effectively.',
		updates: [
			{ date: '2025-09-01', text: 'Came up with the idea after seeing how much content creators struggled to find sponsorships and how much time it took.' },
			{ date: '2025-09-24', text: 'Conducted market research and found that there are already many companies in this space, making it difficult to compete. Although, I still do think my specific implementation has an edge due to its proprietary algorithm. Paused for now.' }
		],
		links: [],
	},
	{
		name: 'AI Automation Agency',
		status: 'attempted',
		note: 'custom Zapier/Integromat/Make.com style automation solutions for small businesses, using AI to create more complex and tailored automations than existing platforms allow.',
		updates: [
			{ date: '2025-02-15', text: 'Came up with the idea after talking with a friend that runs a small business. I made a small automation for him and it worked well.' },
			{ date: '2025-05-10', text: 'After market research, found it was too saturated to be scalable with so many people offering similar services' }
		],
		lessons: ['Market saturation kills margins', 'A working proof of concept doesn\'t guarantee scalability', 'Look for defensible competitive advantages'],
		links: [],
	},
	{
		name: 'Unnamed Communication App',
		status: 'research',
		note: 'Communication software idea based on a problem a friend was facing in his career.',
		updates: [
			{ date: '2026-06-24', text: 'A good friend called me and mentioned a problem he was facing in his career. I looked it over and we started talking about potential solutions. We kind of spiraled out of control and ended up with a huge app.' },
			{ date: '2026-06-28', text: 'Sat down and started real research on this. Worked backward and cut down the product to its key functionality. Now it is in validation, trying to figure out if this would actually benefit the initial customer base. Reaching out to customers so we can use their feedback to narrow down the idea.' },
		],
		links: [],
	},
	{
		name: 'LLM Encryptor App',
		status: 'ideation',
		frozen: true,
		note: 'Privacy tool for protecting personal information before sharing it with LLMs.',
		updates: [
			{ date: '2026-05-28', text: 'Got the idea while looking at my own life and seeing how much personal info I feed into LLMs without thinking. I looked up research papers into potential solutions and found one, but have not gotten the chance to implement it yet. Still in rough ideation, but closer to research because of the work already done. Frozen for now.' },
		],
		links: [],
	},
	
	
	{
		name: 'FasTech.dev',

		status: 'attempted',
		note: ' Freelance web development agency',
		links: [{ url: 'https://fastech.dev', icon: <FaGlobe /> },{url: 'https://www.linkedin.com/company/fastech-developers/', icon: <FaLinkedin /> }],
		updates: [
			{ date: '2018-10-15', text: 'Thought of the company name in grade 9 for a school project (faseeh + Fast + Tech = FasTech) ' },
			{ date: '2023-02-25', text: 'Started the company as a freelance web development agency, building websites for local businesses and friends. I applied to the Ontario youth business employment grant and was rejected.' },
			{ date: '2024-06-14', text: 'Unfortunately, I was not able to get any traction with the company. It is my fault, I let it stagnate and did not put enough effort to grow it.' },
			{ date: '2025-02-27', text: 'One last ditch LinkedIn run. Had few clients and no long term ones. I have decided to put the company on hold for now, but I may try to revive it in the future. I have learned a lot from this experience and I am grateful for the opportunity to have tried.' }
		],
		lessons: ['Consistent marketing is essential for growth', 'You need a long-term strategy, not sporadic efforts', 'Lack of action kills momentum'],
	},
	{
		name: 'Mustang Tutors',

		status: 'Attempted',
		note: 'tutoring agency for k-12 students in London Ontario',
		links: [{ url: 'https://www.instagram.com/mustangtutors/', icon: <FaInstagram /> }],
		lessons: ['Cold outreach is critical for early traction', 'move fast before the spark dies out', 'Interest requires immediate follow-through'],
	},
	
	
	{
		name: 'Bob Clothing',
		alias: 'Bob',
		status: 'Attempted',
		note: 'Clothing brand I started in covid',
		links: [
			{ url: 'https://bob-bob-bob.creator-spring.com/', icon: <FaGlobe /> },
			{ url: 'https://www.youtube.com/@Bob-gm1xn', icon: <FaYoutube /> },
		],
		lessons: ['Clothing is very hard to break into', 'Marketing effort doesn\'t guarantee sales, sometimes volume is key'],
	},
	{
		name: 'Epic Gamer Time Clothing',
		alias: 'Epic Gamer Time',

		status: 'Attempted',
		note: 'Clothing brand I started in covid',
		links: [{ url: 'https://epic-gamer-time.creator-spring.com', icon: <FaGlobe /> }],
		lessons: ['Meme marketing requires authentic community engagement', 'Viral trends are unpredictable and short-lived', 'Novelty-based products lack staying power'],
	},
	{
		name: 'Shums Clothing',
		alias: 'Shums',

		status: 'Attempted',
		note: 'Clothing brand I started in covid',
		links: [{ url: 'https://shums.creator-spring.com', icon: <FaGlobe /> }],
		lessons: ['Good products require active promotion', 'Clothing is a competitive market requiring differentiation', 'Passive sales channels don\'t work for niche products'],
	},
	{
		name: 'SFHN Food Drive (non-profit)',
		alias: 'SFHN',
		status: 'Attempted',
		note: 'When I was 14, I tried starting this food drive to help my community.',
		links: [],
		lessons: ['Team alignment on mission is critical', 'Clear operational planning separates intentions from impact', 'Non-profits require passion throughout the entire team'],
	},
];

const formatStatus = (status) => status
	.split('-')
	.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	.join(' ');

const getSortedUpdates = (updates = []) => [...updates].sort((a, b) => a.date.localeCompare(b.date));

const statusOrder = {
	active: 0,
	'pre-launch': 1,
	research: 2,
	ideation: 3,
	attempted: 4,
};

const getBusinessSortValue = (business) => {
	const status = business.status.toLowerCase();

	if (status === 'attempted') {
		return 200 + statusOrder.attempted;
	}

	return (business.frozen ? 100 : 0) + (statusOrder[status] ?? 99);
};

function StatusBadge({ status }) {
	const base = status.toLowerCase();

	return (
		<span className={`status-badge status-${base}`} title={statusDefinitions[base]}>
			{formatStatus(status)}
		</span>
	);
}

function FrozenBadge() {
	return (
		<span className="status-badge status-frozen" title={frozenDefinition}>
			Frozen
		</span>
	);
}

/* ---------- PAGE ---------- */
export default function Businesses() {
	const phaseCounts = Object.keys(statusDefinitions).map((status) => ({
		status,
		count: businesses.filter((business) => business.status.toLowerCase() === status).length,
	}));
	const orderedBusinesses = [...businesses].sort((a, b) => getBusinessSortValue(a) - getBusinessSortValue(b));

	return (
		<div className="container py-5 business-page">
			<div className="business-hero mb-4">
				<h1 className="fw-bold mb-2 text-center">Businesses & Ventures</h1>
				<p className="text-center text-muted">
					A portfolio of entrepreneurial ventures, experiments, and lessons learned
				</p>
			</div>

			<section className="phase-board mb-4" aria-label="Business phase key">
				<div className="phase-board-header">
					<div>
						<h2>Phase Key</h2>
						<p>Current stage for each idea, plus whether it is frozen.</p>
					</div>
				</div>
				<div className="phase-scoreboard row g-3 mb-3">
					{phaseCounts.map(({ status, count }) => (
						<div key={status} className="col-6 col-md">
							<div className={`phase-score-card phase-${status}`}>
								<h6>{formatStatus(status)}</h6>
								<div>{count}</div>
								<small>{statusDefinitions[status]}</small>
							</div>
						</div>
					))}
				</div>
				<div className="phase-key-grid">
					{phaseCounts.map(({ status }) => (
						<div key={status} className={`phase-key-card phase-${status}`}>
							<div className="phase-key-topline">
								<StatusBadge status={status} />
							</div>
							<p>{statusDefinitions[status]}</p>
						</div>
					))}
					<div className="phase-key-card phase-frozen">
						<div className="phase-key-topline">
							<FrozenBadge />
						</div>
						<p>{frozenDefinition}</p>
					</div>
				</div>
			</section>

			<div className="row g-4">
			{orderedBusinesses.map((b, i) => (
				<div key={i} className="col-sm-6 col-lg-4">
					<div className={`business-card card h-100 card-${b.status.toLowerCase()}${b.frozen ? ' card-frozen' : ''}`}>
						<div className="card-body d-flex flex-column">
							<div className="business-card-header">
								<h5 className="card-title mb-0">{b.name}</h5>
								<div className="business-badges">
									<StatusBadge status={b.status} />
									{b.frozen && <FrozenBadge />}
								</div>
							</div>

								{/* Alias */}
								{b.alias && (
									<small className="text-muted">AKA "{b.alias}"</small>
								)}

								{/* Note */}
								<p className="card-text flex-grow-1 mt-2">{b.note}</p>
							{/* Updates Section */}
							{b.updates && b.updates.length > 0 && (
								<div className="business-section mt-3 mb-2">
									<button
										className="btn btn-sm btn-outline-secondary w-100 business-toggle"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#updates-${i}`}
										aria-expanded="false"
										aria-controls={`updates-${i}`}
									>
										Updates ({b.updates.length})
									</button>
									<div className="collapse mt-2" id={`updates-${i}`}>
										<div className="updates-panel">
											{getSortedUpdates(b.updates).map((u, k) => (
												<div key={`${u.date}-${k}`} className="update-item">
													<time dateTime={u.date}>{u.date}</time>
													<p>{u.text}</p>
												</div>
											))}
										</div>
									</div>
								</div>
							)}

							{/* Lessons Section */}
							{b.lessons && b.lessons.length > 0 && (
								<div className="business-section mt-3 mb-2">
									<button
										className="btn btn-sm btn-outline-warning w-100 business-toggle"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#lessons-${i}`}
										aria-expanded="false"
										aria-controls={`lessons-${i}`}
									>
										Key Lessons ({b.lessons.length})
									</button>
									<div className="collapse mt-2" id={`lessons-${i}`}>
										<div className="lessons-panel">
											<ul className="mb-0 ps-3">
												{b.lessons.map((lesson, k) => (
													<li key={k} className="small text-dark mb-1">{lesson}</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							)}

								{/* Links */}
								{(b.links || []).length > 0 && (
									<div className="business-links">
										{b.links.map((l, k) => 
											l.internal ? (
												<Link
													key={k}
													to={l.url}
													className="btn btn-outline-primary btn-sm d-inline-flex align-items-center justify-content-center"
													style={{ gap: '0.5rem' }}
												>
													{l.icon}
													{l.label || 'View Details'}
												</Link>
											) : (
												<a
													key={k}
													href={l.url}
													className="btn btn-outline-primary btn-sm d-inline-flex align-items-center justify-content-center"
													target="_blank"
													rel="noopener noreferrer"
													style={{ gap: '0.5rem' }}
												>
													{l.icon}
													{l.label || 'Visit'}
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