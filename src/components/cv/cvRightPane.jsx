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
                <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 + 0.3 * Math.random(), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-lg font-thin text-black mt-5 text-left"
                >
                    I'm Jacson, a Tech Lead with {getYearsExp()}+ years of professional experience.
                    As a full-stack engineer, I specialise in building high-performance, scalable, and maintainable software solutions.
                    I thrive as a self-starter, continuously enhancing my technical expertise, and I excel at collaborating across teams to solve complex problems and deliver exceptional products.

                    I actively maintain several <a className="text-secondary-focus underline" href="https://justjcurtis.dev/#/projects" target="_blank" rel="noreferrer">side projects</a>, including <a className="text-secondary-focus underline" href="https://justjcurtis.dev" target="_blank" rel="noreferrer">this website</a>, built with React and Tailwind CSS.
                    I'm always seeking new challenges and growth opportunities, so if you’re interested in collaboration, I’d love to connect!
                    <br />
                    <br />
                    This CV is also available online @ <a className="text-secondary-focus underline" href="https://justjcurtis.dev/#/cv" target="_blank" rel="noreferrer">justjcurtis.dev/#/cv</a>
                </m.p>
                <h3 className="text-2xl font-bold text-black mt-10 mb-5">- E X P E R I E N C E -</h3>
                <CvExperience
                    employer="CitNOW"
                    role="Tech Lead"
                    dates="May 2025 – Present"
                    bullets={[
                        "Lead the React Native development team, collaborating with offshore developers and onshore native mobile teams",
                        "Design and develop mobile applications using TypeScript, React Native, and modern JavaScript frameworks",
                        "Define and enforce technical standards and best practices for React Native development across the organisation",
                        "Mentor junior developers, supporting technical excellence and professional growth",
                        "Partner with product and design teams to deliver high-quality, user-focused mobile experiences",
                        "Design, implement, and optimise CI/CD pipelines to enable efficient and reliable mobile delivery",
                        "Conduct thorough code reviews, providing constructive feedback to improve code quality and team performance",
                        "Drive architectural decisions to ensure scalable, maintainable, and performant mobile solutions",
                        "Lead the re-architecture, reimplementation, and optimisation of existing mobile applications to improve performance, user experience, and maintainability",
                    ]}
                />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience
                    employer="Rippl"
                    role="Tech Lead"
                    dates="Jan 2024 – Jul 2024"
                    bullets={[
                        "Led a cross-functional team of engineers to deliver new features and enhancements for mobile applications",
                        "Held regular one-to-one meetings to support team members’ personal development, performance, and career progression",
                        "Architected and built a new mobile application using React Native, TypeScript, Jest, and Detox",
                        "Provided strategic input into product and technical design decisions, balancing individual expertise with team collaboration",
                        "Mentored and coached engineers to strengthen technical alignment, team culture, and individual growth",
                        "Interviewed and assessed engineers across multiple seniority levels to build a high-performing, culturally aligned team",
                        "Designed and maintained cloud-based services supporting mobile applications, including analytics, authentication, and data storage",
                        "Designed and optimised CI/CD pipelines to enable reliable and efficient mobile application delivery",
                    ]}
                />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience
                    employer="Zopa Bank"
                    role="Senior Software Engineer"
                    dates="Jun 2023 – Oct 2023"
                    bullets={[
                        "Developed enterprise-scale mobile applications using React Native, TypeScript, Jest, and Detox",
                        "Built and maintained comprehensive Detox end-to-end test suites to ensure high-quality mobile releases",
                        "Led a group of engineers to deliver new features and improvements within the mobile application",
                        "Facilitated cross-team collaboration to align technical delivery with product and business objectives",
                        "Held regular one-to-one meetings to support engineers’ performance, growth, and engagement",
                        "Introduced process improvements that increased team efficiency and delivery reliability",
                        "Optimised CI/CD pipelines to improve build stability, testing confidence, and release cadence",
                    ]}
                />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience
                    employer="The Economist"
                    role="Senior Software Engineer"
                    dates="Jan 2021 – Jun 2023"
                    bullets={[
                        "Developed and maintained enterprise-scale mobile applications using React Native, TypeScript, Jest, and Detox",
                        "Collaborated within a multidisciplinary team to solve complex technical challenges and deliver high-quality mobile features",
                        "Applied Agile and Scrum methodologies, adapting team processes to improve delivery efficiency and predictability",
                        "Built and maintained robust unit test suites to improve code quality and reduce reliance on manual QA",
                        "Contributed to architectural and design decisions, balancing technical excellence with product requirements",
                        "Improved team communication practices to reduce knowledge silos and strengthen cross-functional collaboration",
                        "Mentored and coached engineers to support technical growth, team cohesion, and cultural alignment",
                        "Interviewed engineers across multiple seniority levels to help build a high-performing, diverse engineering team",
                        "Designed and maintained cloud-based services using Firebase and AWS to support mobile application functionality",
                        "Implemented and maintained CI/CD pipelines using CircleCI and GitHub Actions to streamline mobile delivery",
                    ]}
                />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience
                    employer="Ideagen PLC"
                    role="Software Engineer"
                    dates="Mar 2018 – Jan 2021"
                    bullets={[
                        "Developed and maintained multiple enterprise mobile applications using JavaScript, C#, .NET, and React Native",
                        "Implemented comprehensive unit test suites to improve code quality and reduce QA effort",
                        "Contributed to the maintenance and enhancement of legacy applications while delivering new features",
                        "Supported architectural design and technical decision-making for new mobile applications",
                        "Designed and implemented local data management and synchronisation solutions using SQLite.NET ORM",
                        "Collaborated across teams to meet tight deadlines while maintaining high engineering standards",
                        "Supported onboarding and mentored junior engineers and work experience participants",
                    ]}
                />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100 print:hidden" />
                <CvExperience
                    employer="Other Experience"
                    role="Side Projects"
                    dates="Mar 2018 – Present"
                    bullets={[
                        "Collaborating on a React Native + Expo golf app with 2 other developers, building the backend in Go with SQLC and PostgreSQL, focusing on scalable architecture and cross-platform mobile delivery",
                        "Completed Advent of Code 2025 in Go with highly optimised, concurrent solutions; min runtime across all 12 days’ solutions was 6ms on an M2 MacBook Air",
                        "Rewrote the squareSumChecker project from JavaScript to Zig, achieving a significant performance boost through low-level optimisation",
                        "Designed, built, and launched CS2CFGR (cs2cfgr.com), a production web application for Counter-Strike 2 players to create, manage, and share game configurations using Vite, React, Supabase, and Vercel",
                        "Implemented premium features for CS2CFGR including cloud saves, configuration sharing, desktop synchronisation via Electron, and Stripe-based subscriptions",
                        "Architected a lightweight reusable React game engine hook (useGame) supporting Canvas and DOM-based rendering, used to build multiple interactive games (demos available on justjcurtis.dev)",
                        "Developed performance-focused simulations and games, including large-scale real-time Rock Paper Scissors simulations using a custom quadtree for efficient entity interaction",
                        "Implemented the NEAT machine learning algorithm from the original research paper as a reusable library, demonstrated via a Flappy Bird AI project",
                        "Built and maintained additional full-stack projects including REST APIs and real-time applications using Svelte, Node.js, MongoDB, and modern frontend tooling",
                        "Mentored engineers in JavaScript, React, and Node.js, supporting several individuals in securing their first roles in the software industry",
                        "Designed and maintain a personal portfolio and interactive CV using React and Tailwind CSS (justjcurtis.dev/#/cv)",
                    ]}
                />
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
