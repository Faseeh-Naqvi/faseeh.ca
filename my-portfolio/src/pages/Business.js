import React, { useState } from 'react';
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
		status: 'active',
		featured: true,
		note: 'AI-powered tailgating detection for gyms. Preventing revenue loss and improving security with 24/7 monitoring.',
		links: [
			{ url: 'https://www.sigfigsecurity.com/dashboard?mode=demo', icon: <FaGlobe />, label: 'View demo' },
			{ url: '/projects#sigfig-prototype', icon: <FaGlobe />, internal: true, label: '(old v1 prototype)', quiet: true },
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
			{ date: '2026-07-16', text: 'Western Uni accelerator interview. We prepped for a few days. It was quite stressful beforehand, but the interview was easier than we thought.' },
			{ date: '2026-07-24', text: 'Working on a Claude artifact dashboard to automate outreach.' },
			{ date: '2026-07-24', text: 'Found out that one of our key targets, Vive Fitness, has a GymMaster system already. It is concerning that companies that do access control are offering the same solution as us. It is much less friction than us. Although I do believe our system is more robust and targeted to revenue recovery, not to mention we are access control system agnostic. GymMaster tailgating would only work well with a GymMaster system installed already, increasing the switching cost. One big concern is that they are cheaper than us at the moment. To be fair, we were kind of shooting in the dark with our pricing. We need to adjust accordingly. They are at (~$56 CAD) $40 USD a month with (~$560 CAD) $400 USD one time cost. Our shot in the dark is 150-300 CAD monthly and 800-1500 CAD one time. We need to drastically lower or adjust features in a way that it makes up for the money.' },
			{ date: '2026-07-31', text: 'Got the official acceptance.' },
			{ date: '2026-08-05', text: 'Officially accepted the offer to join. This is now unfrozen and active. Trying to get clients. Might reach out to that old potential who dropped out and offer it for free for learning. Trust is big and I fear I may have lost his. I must do more robust research on pricing before putting a price. And also offer for free always when starting out. The knowledge is much more valuable than any money I could earn at the start. Knowledge compounds.' },
			{ date: '2026-09-29', text: 'Sat down and did a bunch of cold calls. I somehow climbed the corporate ladder at a franchise in Michigan. It started with the front desk, then she passed me to her manager. As soon as he picked up, he said, "Stop calling me. I don\'t want to buy anything." I don\'t fully know how, but I played it off and kept him interested by mentioning that we are doing it for free. He passed us to a higher manager, who then gave us the CEO\'s email. The CEO replied once. When we tried to book a meeting, he ghosted us.' },
			{ date: '2026-10-01', text: 'Got our first accelerator cheque a bit ago. I put all of it into a Wise business account after a friend recommended it. Wise closed the account, and now the money is stuck. I can\'t submit a ticket because the account is banned, so I have to call. Their phone lines are only open on the weekend, so that is when I have to call. About $3k is stuck in there right now.' },
			{ date: '2026-10-02', text: 'Finalized our first pilot. They messaged a "yes" on July 28, but we only got the actual plan down today. Set up a virtual meeting with him for the coming Tuesday.' },
			{ date: '2026-10-06', text: 'Had two meetings booked today. One in Montreal, and one in Georgina, Ontario.' },
			{ date: '2026-10-09', text: 'The Georgina location started ghosting us, so we no longer have contact with them. I also reached out to Hamilton again, and they ghosted as well.' },
			{ date: '2026-10-16', text: 'Went in and did our first install in Montreal. It was scary, because we only got the contract signed the day before. We had sent a waitlist agreement much earlier, but it never got signed.' },
			{ date: '2026-10-19', text: 'Got introduced to our mentor. He is very cool and energetic, and I am expecting great things from this relationship.' },
			{ date: '2026-10-30', text: 'Getting slowly used to the meetings. There are a lot of them. I am trying to talk to as many people as possible. We had an intro with a potential champion, so hopefully that goes well. I am also considering bringing on a fourth co-founder in electrical engineering. He was my roommate, and he has good manufacturing experience. He might be a strong addition to the team, and he fits where I want the company to go. Our hardware costs are too high, and this would help.' },
		],
	},
	{
		name: 'Unnamed Short Form Content Addiction Therapy App',
		alias: 'Reelranked / Brainrot App',
		status: 'research',
		frozen: true,
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
			{ date: '2026-08-05', text: 'I used a new LLM council skill over the past few days on this idea and I have landed on something I think could be useful. Right now, I am working on reaching out to people in the space, doctors, counsellors, coaches, etc... to see if this tool would be useful for them with their patients.' },
			{ date: '2026-11-01', text: 'Freezing this. I am focusing on getting Sigfig off the ground.' },
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
		name: 'Loop',
		status: 'research',
		frozen: true,
		note: 'App focused on open and closed loops; helping people track unfinished commitments and actually close them.',
		updates: [
			{ date: '2026-06-24', text: 'A good friend called me and mentioned a problem he was facing in his career. I looked it over and we started talking about potential solutions. We kind of spiraled out of control and ended up with a huge app.' },
			{ date: '2026-06-28', text: 'Sat down and started real research on this. Worked backward and cut down the product to its key functionality. Now it is in validation, trying to figure out if this would actually benefit the initial customer base. Reaching out to customers so we can use their feedback to narrow down the idea.' },
			{ date: '2026-07-17', text: 'Talked to a friend and realized similar things already exist as internal tools. Debated the idea with Claude and landed on the fact that this is too broad. It looks cool, but other companies have tried the whole "communication network graph" angle and failed. I need to differentiate and actually reduce friction somewhere.' },
			{ date: '2026-07-20', text: 'Pivoted to a tighter version called Loop, prioritizing open and closed loops. Asked around and got negative responses from friends and mentors. I disagree though. Based on market research, there are many competitors doing similar but different things. I need to ideate on this enough to make it better and more useful.' },
			{ date: '2026-08-05', text: 'Freezing. I need to wait for a pivoting idea to come to me. I have talked to people in industry and debated over it and it seems that this might not be as big of a problem as I thought it was. This will be super tricky to get off ground and I suspect the market education cost will be too much. I need to figure out how to lower the activation potential while differentiating from similar competitors in the space, like Kai.' },
		],
		links: [],
	},
	{
		name: 'AI Personal Coach',
		status: 'attempted',
		note: 'AI coach that calls and texts you, holds memory, reminds you of goals, and tries to convince you to follow through. It can even spam-call you to wake you up like a friend.',
		updates: [
			{ date: '2026-07-10', text: 'Came up with an AI personal coach that physically calls and texts you. You can call or text it as much as you want. It holds memory, reminds you of things through call and text, is specifically geared toward helping you achieve your goals, and tries to convince you to do them. It can even spam call you to wake you up like a friend. Boardy is similar, but I think this is different enough.' },
			{ date: '2026-07-22', text: 'Did some market research and asked around. This did not seem useful. Letting it go.' },
		],
		lessons: ['An accountability product whose core feature is friction is a product people pay to escape.'],
		links: [],
	},
	{
		name: 'Roblox Economy Tycoon',
		status: 'attempted',
		note: 'Roblox game with a Neopets-style points and mini-stocks economy, player-run firms, tycoon gameplay, a public rankings site, and a Bloomberg-style terminal with fake global news.',
		updates: [
			{ date: '2025-03-12', text: 'Had the idea for a Roblox economy game. At minimum, duplicate the Neopets points system with their mini stocks. Maybe let players make their own firms, tie in multiple tycoons, and list their stock on the market once they reach a certain stage. External website to confirm rankings. Maybe a way for top players to make real money. A more educational kids version. A Bloomberg terminal equivalent with fake global news and politics. Have the game do the math so players actually fulfill buy and sell orders, with a bot baseline so people can always play.' },
			{ date: '2025-04-18', text: 'Stopped working on this due to the complexity and time commitment of making an actually good Roblox game. I do not see a ROI for this yet.' },
		],
		lessons: ['Scope and production quality for games can kill ROI before you even start', 'Ambitious multi-system game ideas need a much smaller first slice'],
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
	.toLowerCase()
	.split('-')
	.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
	.join(' ');

const newestFirst = (updates = []) => [...updates].sort((a, b) => b.date.localeCompare(a.date));

const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const parseIso = (iso) => {
	const [year, month, day] = iso.split('-').map(Number);
	return new Date(year, month - 1, day);
};

const formatFull = (iso) => parseIso(iso).toLocaleDateString('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
});

const formatMonth = (key) => {
	const [year, month] = key.split('-').map(Number);
	return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});
};

const daysAgo = (iso) => {
	const today = new Date();
	const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	return Math.round((start - parseIso(iso)) / 86400000);
};

const relativeLabel = (iso) => {
	const days = daysAgo(iso);
	if (days < 0 || days > 45) return null;
	if (days === 0) return 'today';
	if (days === 1) return 'yesterday';
	if (days < 14) return `${days} days ago`;
	const weeks = Math.round(days / 7);
	return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
};

const excerpt = (text, max = 180) => {
	const clean = text.replace(/\s+/g, ' ').trim();
	if (clean.length <= max) return clean;
	const sliced = clean.slice(0, max);
	const lastSpace = sliced.lastIndexOf(' ');
	const cut = lastSpace > 100 ? sliced.slice(0, lastSpace) : sliced;
	return `${cut.trim()}…`;
};

const updatesSpan = (updates = []) => {
	if (!updates.length) return null;
	const dates = updates.map((update) => update.date).sort();
	const count = updates.length;
	return `${count} update${count === 1 ? '' : 's'}, from ${formatMonth(dates[0].slice(0, 7))} to ${formatMonth(dates[dates.length - 1].slice(0, 7))}. Newest first.`;
};

const newestUpdate = (items) => items
	.flatMap((business) => business.updates || [])
	.sort((a, b) => b.date.localeCompare(a.date))[0];

const linkLabel = (link) => {
	if (link.label) return link.label;
	const url = link.url || '';
	if (url.includes('linkedin.com')) return 'LinkedIn';
	if (url.includes('instagram.com')) return 'Instagram';
	if (url.includes('tiktok.com')) return 'TikTok';
	if (url.includes('youtube.com')) return 'YouTube';
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return 'Website';
	}
};

const laneOf = (business) => {
	if (business.status.toLowerCase() === 'attempted') return 'tried';
	if (business.frozen) return 'ice';
	return 'motion';
};

const lanes = [
	{ id: 'all', label: 'All' },
	{ id: 'motion', label: 'Still moving' },
	{ id: 'ice', label: 'On ice' },
	{ id: 'tried', label: 'Tried' },
];

const laneTitle = {
	motion: 'Still moving',
	ice: 'On ice',
	tried: 'What I tried',
};

const laneCopy = {
	ice: 'Paused where they are.',
	tried: 'They stopped. The useful part is the lesson at the end.',
};

const groupByMonth = (entries) => {
	const groups = [];
	entries.forEach((entry) => {
		const key = entry.date.slice(0, 7);
		const last = groups[groups.length - 1];
		if (!last || last.key !== key) {
			groups.push({ key, label: formatMonth(key), entries: [entry] });
		} else {
			last.entries.push(entry);
		}
	});
	return groups;
};

const splitByRecentMonths = (sorted, monthsToKeep) => {
	const keys = [];
	sorted.forEach((entry) => {
		const key = entry.date.slice(0, 7);
		if (!keys.includes(key)) keys.push(key);
	});
	if (keys.length <= monthsToKeep) return { recent: sorted, earlier: [] };
	const keep = new Set(keys.slice(0, monthsToKeep));
	return {
		recent: sorted.filter((entry) => keep.has(entry.date.slice(0, 7))),
		earlier: sorted.filter((entry) => !keep.has(entry.date.slice(0, 7))),
	};
};

const venturePreview = (business) => {
	const latest = newestFirst(business.updates)[0];
	if (latest) {
		return { kicker: formatFull(latest.date), text: excerpt(latest.text) };
	}
	if (business.lessons?.[0]) {
		return { kicker: 'Lesson', text: excerpt(business.lessons[0]) };
	}
	return null;
};

const readLabel = (business, open) => {
	if (open) return 'Close';
	const notes = business.updates?.length || 0;
	const lessons = business.lessons?.length || 0;
	if (notes) return `Read ${notes} update${notes === 1 ? '' : 's'}`;
	if (lessons === 1) return 'Read lesson';
	if (lessons) return `Read ${lessons} lessons`;
	return 'Read';
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

function VentureLinks({ links = [] }) {
	if (!links.length) return null;

	return (
		<div className="log-links">
			{links.map((link) => {
				const label = linkLabel(link);
				const content = (
					<>
						<span className="log-link-icon" aria-hidden="true">{link.icon}</span>
						{label}
					</>
				);

				const className = link.quiet ? 'log-link log-link-quiet' : 'log-link';

				if (link.internal) {
					return (
						<Link key={link.url} to={link.url} className={className}>
							{content}
						</Link>
					);
				}

				return (
					<a
						key={link.url}
						href={link.url}
						className="log-link"
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${label} (opens in a new tab)`}
					>
						{content}
					</a>
				);
			})}
		</div>
	);
}

function LogEntry({ entry, isLatest }) {
	const relative = relativeLabel(entry.date);

	return (
		<li className={isLatest ? 'log-entry is-latest' : 'log-entry'}>
			<p className="log-when">
				<time dateTime={entry.date}>{formatFull(entry.date)}</time>
				{relative && <span className="log-relative">{relative}</span>}
				{isLatest && <span className="log-latest-tag">Latest</span>}
			</p>
			<p className="log-body">{entry.text}</p>
		</li>
	);
}

function MonthGroups({ entries, latest }) {
	return groupByMonth(entries).map((group) => (
		<section key={group.key} className="log-month-group">
			<p className="log-month">{group.label}</p>
			<ol className="log-entries">
				{group.entries.map((entry, index) => (
					<LogEntry
						key={`${group.key}-${index}`}
						entry={entry}
						isLatest={entry === latest}
					/>
				))}
			</ol>
		</section>
	));
}

function UpdateLog({ updates, recentMonths = 0 }) {
	const [showEarlier, setShowEarlier] = useState(false);
	const sorted = newestFirst(updates);
	if (!sorted.length) return null;

	const { recent, earlier } = recentMonths
		? splitByRecentMonths(sorted, recentMonths)
		: { recent: sorted, earlier: [] };
	const latest = sorted[0];

	return (
		<div className="update-log">
			<MonthGroups entries={recent} latest={latest} />
			{earlier.length > 0 && (
				<>
					<button
						type="button"
						className="log-earlier"
						aria-expanded={showEarlier}
						onClick={() => setShowEarlier((open) => !open)}
					>
						{showEarlier ? 'Hide earlier updates' : `Show ${earlier.length} earlier updates`}
					</button>
					{showEarlier && <MonthGroups entries={earlier} latest={latest} />}
				</>
			)}
		</div>
	);
}

function Lessons({ lessons = [] }) {
	if (!lessons.length) return null;

	return (
		<aside className="log-lessons">
			<p className="log-lessons-title">What I took from it</p>
			<ul>
				{lessons.map((lesson) => (
					<li key={lesson}>{lesson}</li>
				))}
			</ul>
		</aside>
	);
}

function VentureRow({ business, open, onToggle }) {
	const slug = slugify(business.name);
	const panelId = `${slug}-log`;
	const notes = business.updates?.length || 0;
	const lessonCount = business.lessons?.length || 0;
	const canOpen = notes + lessonCount > 0;
	const preview = venturePreview(business);

	const stateClass = `status-${business.status.toLowerCase()}${business.frozen ? ' is-frozen' : ''}`;

	return (
		<article className={`venture ${stateClass}${open ? ' is-open' : ''}`} id={slug}>
			<div className="venture-top">
				<div className="venture-heading">
					<h3>{business.name}</h3>
					<div className="log-badges">
						<StatusBadge status={business.status} />
						{business.frozen && <FrozenBadge />}
					</div>
				</div>
				{canOpen && (
					<button
						type="button"
						className="venture-toggle"
						aria-expanded={open}
						aria-controls={panelId}
						onClick={onToggle}
					>
						{readLabel(business, open)}
					</button>
				)}
			</div>
			{business.alias && <p className="venture-alias">Also called {business.alias}</p>}
			<p className="venture-note">{business.note}</p>
			{preview && !open && (
				<p className="venture-preview">
					<span>{preview.kicker}</span>
					{preview.text}
				</p>
			)}
			<VentureLinks links={business.links} />
			{open && (
				<div className="log-panel" id={panelId}>
					<UpdateLog updates={business.updates} />
					<Lessons lessons={business.lessons} />
					{notes > 4 && (
						<button type="button" className="log-earlier" onClick={onToggle}>
							Close
						</button>
					)}
				</div>
			)}
		</article>
	);
}

export default function Businesses() {
	const [lane, setLane] = useState('all');
	const [openSlug, setOpenSlug] = useState(null);
	const featured = businesses.find((business) => business.featured);
	const phaseSummary = ['active', 'pre-launch', 'research', 'ideation', 'attempted']
		.map((status) => {
			const matching = businesses.filter((business) => business.status.toLowerCase() === status);
			return {
				status,
				count: matching.length,
				frozenCount: matching.filter((business) => business.frozen).length,
				label: status === 'attempted' ? 'Failures' : formatStatus(status),
			};
		})
		.filter((item) => item.count > 0);
	const frozenTotal = businesses.filter((business) => business.frozen).length;
	const showLane = (nextLane) => {
		setLane(nextLane);
		setOpenSlug(null);
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById('other-ventures')?.scrollIntoView({
			behavior: reduceMotion ? 'auto' : 'smooth',
			block: 'start',
		});
	};
	const archive = businesses.filter((business) => business !== featured);
	const newest = newestUpdate(businesses);
	const counts = lanes
		.map((item) => ({
			...item,
			count: item.id === 'all'
				? archive.length
				: archive.filter((business) => laneOf(business) === item.id).length,
		}))
		.filter((item) => item.id === 'all' || item.count > 0);
	const visibleGroups = ['motion', 'ice', 'tried'].filter((id) => lane === 'all' || lane === id);

	return (
		<div className="container py-5">
			<main className="business-log">
				<header className="log-hero">
					<figure className="summary-chart" aria-label={`Summary of ventures by phase, including ${frozenTotal} frozen`}>
						<div className="summary-bar" aria-hidden="true">
							{phaseSummary.map((item) => {
								const liveCount = item.count - item.frozenCount;
								return (
									<span key={item.status} className="summary-segment-wrap" style={{ flexGrow: item.count }}>
										{liveCount > 0 && (
											<span className={`summary-segment summary-${item.status}`} style={{ flexGrow: liveCount }} />
										)}
										{item.frozenCount > 0 && (
											<span className={`summary-segment summary-${item.status} is-frozen`} style={{ flexGrow: item.frozenCount }} />
										)}
									</span>
								);
							})}
						</div>
						<ul className="summary-legend">
							{phaseSummary.map((item) => {
								const body = (
									<>
										<span className={`summary-swatch summary-${item.status}`} aria-hidden="true" />
										<span className="summary-count">{item.count}</span>
										<span className="summary-label">{item.label}</span>
									</>
								);
								return (
									<li key={item.status} className={`summary-stat summary-${item.status}`}>
										{item.status === 'attempted' ? (
											<button
												type="button"
												className="summary-hit"
												title={statusDefinitions.attempted}
												onClick={() => showLane('tried')}
											>
												{body}
											</button>
										) : (
											<span className="summary-hit" title={statusDefinitions[item.status]}>
												{body}
											</span>
										)}
									</li>
								);
							})}
							{frozenTotal > 0 && (
								<li className="summary-stat summary-frozen">
									<button
										type="button"
										className="summary-hit"
										title={frozenDefinition}
										onClick={() => showLane('ice')}
									>
										<span className="summary-swatch summary-frozen" aria-hidden="true" />
										<span className="summary-count">{frozenTotal}</span>
										<span className="summary-label">Frozen</span>
									</button>
								</li>
							)}
						</ul>
					</figure>
					<p className="log-kicker">Business log</p>
					<h1>Businesses</h1>
					<p className="log-intro">
						A log of what I am building, what I paused, and what I tried.
						{newest && (
							<>
								{' '}
								The current company is open below, newest update first. Last update {formatFull(newest.date)}.
							</>
						)}
					</p>
					<a className="log-jump" href="#other-ventures">The rest of the log</a>
				</header>

				{featured && (
					<article className={`log-feature status-${featured.status.toLowerCase()}${featured.frozen ? ' is-frozen' : ''}`} id={slugify(featured.name)} aria-labelledby="current-company">
						<p className="log-kicker">Right now</p>
						<div className="log-feature-head">
							<h2 id="current-company">{featured.name}</h2>
							<div className="log-badges">
								<StatusBadge status={featured.status} />
								{featured.frozen && <FrozenBadge />}
							</div>
						</div>
						<p className="log-dek">{featured.note}</p>
						{updatesSpan(featured.updates) && <p className="log-span">{updatesSpan(featured.updates)}</p>}
						<VentureLinks links={featured.links} />
						<UpdateLog updates={featured.updates} recentMonths={2} />
						<Lessons lessons={featured.lessons} />
					</article>
				)}

				<section className="log-archive" id="other-ventures" aria-labelledby="other-ventures-title">
					<div className="log-archive-head">
						<h2 id="other-ventures-title">The rest of the log</h2>
						<p>The current company stays above. Open anything else when you want to read it.</p>
					</div>
					<div className="log-filter" aria-label="Filter the rest of the log">
						{counts.map((item) => (
							<button
								key={item.id}
								type="button"
								aria-pressed={lane === item.id}
								onClick={() => {
									setLane(item.id);
									setOpenSlug(null);
								}}
							>
								{item.label}
								<span>{item.count}</span>
							</button>
						))}
					</div>

					{visibleGroups.map((id) => {
						const items = archive.filter((business) => laneOf(business) === id);
						if (!items.length) return null;

						return (
							<div key={id} className={`log-group log-group-${id}`}>
								<p className="log-group-label">
									{laneTitle[id]}
									<span className="log-group-count">{items.length}</span>
								</p>
								{laneCopy[id] && <p className="log-group-copy">{laneCopy[id]}</p>}
								<div className="venture-list">
									{items.map((business) => {
										const slug = slugify(business.name);
										return (
											<VentureRow
												key={business.name}
												business={business}
												open={openSlug === slug}
												onToggle={() => setOpenSlug((current) => (current === slug ? null : slug))}
											/>
										);
									})}
								</div>
							</div>
						);
					})}

					{featured && (
						<a className="log-back" href={`#${slugify(featured.name)}`}>Back to the current company</a>
					)}
				</section>

				<details className="log-legend">
					<summary>What the labels mean</summary>
					<dl>
						{Object.entries(statusDefinitions).map(([status, text]) => (
							<div key={status}>
								<dt><StatusBadge status={status} /></dt>
								<dd>{text}</dd>
							</div>
						))}
						<div>
							<dt><FrozenBadge /></dt>
							<dd>{frozenDefinition}</dd>
						</div>
					</dl>
				</details>
			</main>
		</div>
	);
}
