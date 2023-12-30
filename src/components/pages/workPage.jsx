import { WorkCard } from '../workCard'
const WorkPage = () => {
    return (
        <div className='min-h-full w-full py-16'>
            <div className="bg-red-800 bg-red-600 md:row-span-2 md:col-span-2" />
            <div className='max-w-7xl mx-auto' >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 m-4 lg:gap-3">
                    <WorkCard cols="2" bg="base-200" name="Work" title="2018 - Present" description="Here's some of my real world work. Each card contains info about the project, the tech stack used and a link to the project. I have tried to highlight my favorite parts of each project along with any memorable challenges that the respective team and I faced. Each of these project has taught me a lot about not only mobile development specifically but software engineering in general. I've also grown a lot along the way and have learned that teamwork and communication is just as important as great engineering and that mentoring can be even more fun than writing code (especially when you're surrounded by a talented team)." />
                    <WorkCard bg="accent" name="Zopa" title="Banking app - 2023" tech="Typescript, React-Native, Jest, Detox" description="I worked on the savings team for Zopa Bank as a senior software engineer. During that time I helped improve communication across the savings team, coached and mentored more junior members of the team and worked on the react native app." link="https://www.zopa.com/help/article/how-to-download-zopa-app" />
                    <WorkCard rows="2" bg="red-800" name="Espresso" title="Newspaper app - 2022" tech="Typescript, React-Native, Jest, Detox, Firebase, AWS" description="I joined this team as the only in house engineer and helped create the app from the ground up while growing the team and mentoring more junior members. During this time I worked on keeping code quality high with great unit test coverage and by fostering a culture of leaving the code better than it was found. Implementing a responsive tablet and mobile layout throughout the app whilst including accessibilty was a challenge that required clean architechture across the codebase which the team and I had fun creating." link="https://www.economist.com/get-the-espresso-app" />
                    <WorkCard bg="red-600" name="Economist" title="Newspaper app - 2021" tech="Typescript, React-Native, Jest, Detox, Firebase, AWS" description="I started work on this project when the team was small very close to the beginning of the project. I helped grow the team and keep code quality high as the speed of the project and larger team lead us into new challenges." link="https://www.economist.com/get-the-app" />
                    <WorkCard cols="2" bg="blue-500" name="Coruson" title="Reporting & Auditing app - 2020" tech="Xamarin.Forms, SQL, SkiaSharp, N-Unit" description="I worked as part of a small team on this app from the very beginning of the project. The app supported iOS, Android and UWP and I helped architect and implement many features along the way including: local sync, bg annotation, file downloads and download management all while refining my ability to write clean and reusable code and battling the ever changing landscape that is Xamarin." link="https://ideagen.com/solutions/quality/coruson" />
                </div>
            </div>
        </div>
    )
}

export { WorkPage }
