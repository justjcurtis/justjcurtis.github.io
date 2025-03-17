import { motion as m } from "framer-motion"
import { CvExperience } from "../cv/cvExperience"
const CvRightPane = () => {
    const getYearsExp = () => {
        const today = new Date()
        const startDate = new Date('2018-03-19')
        const diffTime = Math.abs(today - startDate)
        const yearInMS = 1000 * 60 * 60 * 24 * 365
        const diffYears = Math.floor(diffTime / yearInMS)
        return diffYears
    }
    return (
        <>
            <m.div initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.2, duration: (0.3 + (0.3 * Math.random())), ease: 'easeInOut' }}
                exit={{ opacity: 0, x: 6, y: 10 }}
                className="bg-primary h-100 left-0 lg:block hidden ml-10 rounded-full w-0.5" />
            <div className='lg:flex-[2_2_0%] flex flex-col justify-start text-center lg:px-10'>
                <div className="bg-primary w-100 lg:hidden block my-10 print:hidden rounded-full h-0.5" />
                <h3 className="text-2xl font-bold text-black print:mt-12">- I N T R O D U C T I O N -</h3>
                <m.p initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: (0.5 + (0.3 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-lg font-thin text-black mt-5 text-left">
                    I'm Jacson, a senior software engineer with {getYearsExp()}+ years of professional experience in the industry.
                    As a full-stack developer, I'm passionate about crafting beautiful, functional, and
                    high-performance software solutions. I thrive as a self-starter who continuously seeks
                    opportunities to enhance my technical expertise and knowledge. My collaborative approach makes me
                    an effective team player who excels at solving complex problems and delivering exceptional products. <br />

                    I actively maintain several <a className="text-secondary-focus underline" href="https://justjcurtis.dev/#/projects" target="_blank" rel="noreferrer">side projects</a>, including <a className="text-secondary-focus underline" href="https://justjcurtis.dev" target="_blank" rel="noreferrer">this website</a>, which I developed using React and Tailwind CSS.
                    I'm consistently seeking new challenges and growth opportunities, so if you're interested in collaboration,
                    I welcome you to connect!
                </m.p>
                <h3 className="text-2xl font-bold text-black mt-10 mb-5">- E X P E R I E N C E -</h3>
                <CvExperience employer="Rippl"
                    role="Tech Lead"
                    dates="Jan 2024 - July 2024"
                    bullets={[
                        "Led a team of engineers to successfully deliver new features and enhancements to mobile applications",
                        "Conducted regular 1-1 meetings with team members to foster personal and professional development",
                        "Architected and developed a new mobile application using React-Native, TypeScript, Jest, and Detox",
                        "Provided strategic input to design decisions, leveraging both my expertise and the collective knowledge of colleagues",
                        "Mentored and coached team members to strengthen cultural alignment, technical cohesion, and individual growth",
                        "Interviewed engineers across all levels to build a high-performing team with strong technical skills and cultural fit",
                        "Created and maintained cloud services to support mobile applications with analytics, authentication, and data storage",
                        "Established and optimized CI/CD pipelines for mobile applications to ensure efficient delivery",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="Zopa Bank"
                    role="Senior Software Engineer"
                    dates="Jun 2023 - Oct 2023"
                    bullets={[
                        "Developed enterprise-level mobile applications using React-Native, TypeScript, Jest, and Detox",
                        "Maintained comprehensive Detox E2E test suites to ensure high-quality mobile applications",
                        "Facilitated cross-team communication to ensure alignment of goals and objectives",
                        "Led a small team of engineers to deliver new features and improvements to mobile applications",
                        "Conducted regular 1-1 meetings with team members to support personal and professional development",
                        "Implemented process improvements to enhance team efficiency and effectiveness",
                        "Committed to weekly personal development to strengthen skills aligned with project, team, and company needs",
                        "Optimized CI/CD pipelines to ensure quality and timely delivery of mobile applications",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="The Economist"
                    role="Senior Software Engineer"
                    dates="Jan 2021 - Jun 2023"
                    bullets={[
                        "Developed enterprise-level mobile applications using React-Native, TypeScript, Jest, and Detox",
                        "Actively contributed to daily and weekly team meetings, sharing valuable ideas and insights with a multidisciplinary team to resolve challenges",
                        "Expertly utilized Agile and Scrum methodologies, adapting workflows as needed to optimize team performance",
                        "Maintained comprehensive unit test suites to enhance quality assurance and reduce QA team workload",
                        "Provided strategic input to architectural and design decisions, leveraging both personal expertise and collective team knowledge",
                        "Established strong communication channels within the team to prevent knowledge silos and ensure effective collaboration",
                        "Coached and mentored team members to foster cultural alignment, technical excellence, and professional growth",
                        "Conducted technical interviews across all engineering levels to build a high-performing team with strong technical skills and cultural fit",
                        "Designed and maintained cloud services using Firebase and AWS to support mobile applications",
                        "Implemented CI/CD pipelines using CircleCI and GitHub Actions to streamline mobile application delivery",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="Ideagen PLC"
                    role="Software Engineer"
                    dates="Mar 2018 - Jan 2021"
                    bullets={[
                        "Demonstrated a proactive \"can-do\" attitude while encouraging team members to ensure optimal cohesion and continuous improvement",
                        "Developed multiple enterprise-level mobile applications using diverse technologies including JavaScript, C#, .NET, and React-Native",
                        "Implemented comprehensive unit testing to enhance quality assurance and streamline the QA process",
                        "Identified and implemented innovative technologies and strategies across various projects to overcome challenges and improve efficiency",
                        "Provided cross-team support, often on short notice, to maintain quality standards while meeting critical deadlines",
                        "Facilitated onboarding processes and mentored work experience participants to ensure smooth integration",
                        "Successfully maintained legacy applications, delivered new features for existing projects, and contributed to architecture design for new mobile applications",
                        "Engineered robust local data management solutions using SQLite.NET ORM to handle local storage and synchronization with remote databases for form and template data",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100 print:hidden" />
                <CvExperience employer="Other Experience"
                    role="Side Projects"
                    dates="Mar 2018 - Present"
                    bullets={[
                        "Re-wrote, my squareSumChecker (github.com/justjcurtis/squareSumChecker) project in zig for a massive performance boost (previously written in javascript)",
                        "Designed, developed, and launched CS2CFGR (cs2cfgr.com), a sophisticated web application for Counter-Strike 2 players to visually create and manage game configurations, built with Vite, React, and Supabase, hosted on Vercel",
                        "Engineered premium features for CS2CFGR including cloud saves, config sharing, and an Electron desktop application that seamlessly synchronizes configurations with game files",
                        "Implemented Stripe payment processing to handle subscriptions and establish a sustainable business model for CS2CFGR",
                        "Architected a custom React game engine hook (useGame) that enables efficient game development leveraging both Canvas and HTML elements as game objects",
                        "Created classic games for my portfolio including Pong, Snake, and Space Invaders using my custom useGame hook",
                        "Developed a highly optimized Rock Paper Scissors simulation featuring thousands of entities interacting in real-time, utilizing a custom quadtree implementation for efficient swarm behavior and collision detection",
                        "Learned and used go to participate in Advent of Code 2023 and 2024, aiming for the most performant solutions possible using as much concurrency as possible along with the standard library and extreamly optimised algorithms",
                        "Implemented NEAT Machine Learning algorithm from the original research paper as a library (available on NPM supporting Node.js and browser) and created a Flappy Bird clone to demonstrate its capabilities",
                        "Designed and maintained a personal portfolio website using React, Tailwind CSS, and GraphQL (justjcurtis.dev)",
                        "Built and maintained an in-house Rock Paper Scissors AI tournament platform with a REST API using Svelte, Node.js, and MongoDB",
                        "Mentored multiple colleagues in JavaScript, React, Node.js, HTML, and CSS, enabling them to successfully secure their first positions in the industry",
                        "Designed and maintained this interactive CV using React and Tailwind CSS (justjcurtis.dev/#/cv)",
                        "Self-taught 3D modeling and CAD using Fusion 360 and OnShape to support 3D printing projects and other technical endeavors",
                        "Studied physics at degree level, providing a strong foundation in mathematical principles and analytical problem-solving",
                        "Pursue diverse interests including 3D printing, playing guitar, reading, and continuous learning in code, mathematics, physics, and philosophy",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100 print:hidden" />
                <m.p initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: (0.5 + (0.3 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-lg font-thin text-black mt-5 text-left print:hidden">
                    For additional details about my professional experience, please visit my <a className="text-secondary-focus underline" href="https://www.linkedin.com/in/justjcurtis" target="_blank" rel="noreferrer">LinkedIn</a> profile. To explore my current projects and portfolio, you can visit <a className="text-secondary-focus underline" href="https://justjcurtis.dev">my personal website</a> or review my contributions on <a className="text-secondary-focus underline" href="https://github.com/justjcurtis">GitHub</a>.
                </m.p>
                <h3 className="text-xl font-thin text-primary-focus mt-8 hidden print:block">References Available On Request</h3>
            </div>
        </>
    );
}

export { CvRightPane }
