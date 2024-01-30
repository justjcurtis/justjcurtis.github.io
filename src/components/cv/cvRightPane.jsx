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
                    I'm Jacson, a senior software engineer with {getYearsExp()}+ years of experience in the industry.
                    I'm a full-stack developer with a passion for building beautiful, functional, and
                    performant software. I'm a self-starter who loves to learn and is always
                    looking for ways to improve my skills and knowledge. I'm a team player who enjoys
                    working with others to solve problems and build great products. <br />

                    I'm currently working as a Tech Lead at <a className="text-secondary-focus underline" href="https://rippl.work" target="_blank" rel="noreferrer">Rippl</a><br />
                    I'm also working on a few <a className="text-secondary-focus underline" href="https://justjcurtis.dev/#/projects" target="_blank" rel="noreferrer">side projects</a>, including <a className="text-secondary-focus underline" href="https://justjcurtis.dev" target="_blank" rel="noreferrer">this website</a>, which I built using React and Tailwind CSS.
                    I'm always looking for new opportunities to learn and grow, so if you're interested in working together,
                    please don't hesitate to reach out!
                </m.p>
                <h3 className="text-2xl font-bold text-black mt-10 mb-5">- E X P E R I E N C E -</h3>
                <CvExperience employer="Rippl"
                    role="Tech Lead"
                    dates="Jan 2024 - Present"
                    bullets={[
                        "Lead a team of engineers to deliver new features and improvements to mobile applications",
                        "Conducted 1-1 meetings with team members to ensure personal and professional development",
                        "Architected and developed a new mobile application using React-Native, Typescript, Jest, and Detox",
                        "Informed and contributed to design decisions, drawing on the experience and knowledge of colleagues & myself",
                        "Menotred and coached team members to ensure cultural and technical cohesion and individual development",
                        "Interviewed engineers of all levels to build the team and ensure technical skills and cultural fit",
                        "Created and maintained cloud serviced to support mobile applications with analytics, authentication, and data storage",
                        "Created and maintained CI/CD pipelines for mobile applications",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="Zopa Bank"
                    role="Senior Software Engineer"
                    dates="Jun 2023 - Oct 2023"
                    bullets={[
                        "Developed enterprise-level mobile applications using React-Native, Typescript, Jest, and Detox",
                        "Maintained detox e2e test suite to ensure quality of mobile applications",
                        "Engaged in cross team communication to ensure alignment of goals and objectives",
                        "Lead small team of engineers to deliver new features and improvements to mobile applications",
                        "Conducted 1-1 meetings with team members to ensure personal and professional development",
                        "Contributed to changes in process to improve team efficiency and effectiveness",
                        "Engaged in personal development on a weekly basis to improve skills in line with project, team, and company needs",
                        "Wokred on CI/CD pipelines to ensure quality and timely delivery of mobile applications",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="The Economist"
                    role="Senior Software Engineer"
                    dates="Jan 2021 - Jun 2023"
                    bullets={[
                        "Developed enterprise-level mobile applications using React-Native, Typescript, Jest, and Detox",
                        "Contributed to daily and weekly team meetings, sharing ideas and insights with a multidisciplinary team to overcome/manage issues",
                        "Utilised agile and scrum workflows and methodologies, problem-solving and modifying them as needed",
                        "Maintained unit test projects to reduce the workload for the testing team and ensure the quality of development work",
                        "Contributed to architectural and design decisions, drawing on the experience and knowledge of colleagues & myself",
                        "Fostered strong communication within the team to prevent \"knowledge siloing\" and ensure effective, efficient teamwork",
                        "Coached and mentored members of the team, ensuring cultural and technical cohesion and individual development",
                        "Interviewed engineers of all levels to build the team and ensure technical skills and cultural fit",
                        "Created and maintained services using firebase and AWS to support mobile applications",
                        "Used CircleCI and github actions to create CI/CD pipelines for mobile applications",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100" />
                <CvExperience employer="Ideagen PLC"
                    role="Software Engineer"
                    dates="Mar 2018 - Jan 2021"
                    bullets={[
                        "Maintained an engaging \"can do\" attitude and challenged others to ensure optimal team cohesion and progression",
                        "Developed multiple enterprise-level mobile applications using various technologies, such as JS, C#, .NET, and React-Native",
                        "Maintained unit test projects to reduce the workload for the testing team and ensure quality development work",
                        "Identified and implemented technologies and strategies within various projects, helping the team overcome issues and improve efficiency",
                        "Helped other teams, sometimes in a short notice Ad-Hoc manner, to ensure quality was maintained while deadlines were met",
                        "Helped with onboarding and work experience projects when required",
                        "Maintained legacy applications, produced features and improvements for current projects & helped architect and set up new mobile applications",
                        "Worked extensively with local SQL database using SQLite.NET ORM to manage local storage and syncronisation with remote databases for both form and template data.",

                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100 print:hidden" />
                <CvExperience employer="Other Experience"
                    role="Side Projects"
                    dates="Mar 2018 - Present"
                    bullets={[
                        "Wrote and maintained a personal website using React, Tailwind CSS and GrpahQL (justjcurtis.dev)",
                        "Created many projects for education and fun using various technologies, such as React, P5js, three.js, webGL, Nodejs, Go and Rust",
                        "Created and maintained an in house Rock Paper Scissors AI tournament website and rest api using svelte and Nodejs and MongoDB",
                        "Coached multiple friends in JavaScript, React, Nodejs, HTML and CSS enabling them to land their first jobs in the industry",
                        "Implemented NEAT Machine Learning from the original paper as a library (available on NPM supporting Nodejs and browser) along with creating a Flappy Bird clone to demonstrate the library",
                        "Created and maintained this CV, written using React and Tailwind CSS (justjcurtis.dev/#/cv)",
                        "I'm currently learning Go by creating a GraphQL API for another personal project",
                        "I've taught myself 3D modelling and CAD using Fusion 360 and OnShape to support my 3D printing hobby & other projects",
                        "Previously studied physics at degree level, giving me a strong understanding of mathematics and physics principles",
                        "I love problem solving, maths and physics, and I'm always looking for new challenges to overcome",
                        "In my spare time I enjoy 3D printing, playing guitar, reading, learning about code, maths, physics and philosophy",
                    ]} />
                <div className="bg-secondary-focus mt-10 rounded-full h-px w-100 print:hidden" />
                <m.p initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ delay: 0.3, duration: (0.5 + (0.3 * Math.random())), ease: 'easeInOut' }}
                    exit={{ opacity: 0, x: 6, y: 10 }}
                    className="text-lg font-thin text-black mt-5 text-left print:hidden">
                    For more information about my experience, please see my <a className="text-secondary-focus underline" href="https://www.linkedin.com/in/justjcurtis" target="_blank" rel="noreferrer">LinkedIn</a> profile. To see some of the stuff I'm working on in my spare time you can go to <a className="text-secondary-focus underline" href="https://justjcurtis.dev">my personal website</a> or <a className="text-secondary-focus underline" href="https://github.com/justjcurtis">my github profile</a>.
                </m.p>
                <h3 className="text-xl font-thin text-primary-focus mt-8 hidden print:block">References Available On Request</h3>
            </div>
        </>
    );
}

export { CvRightPane }
