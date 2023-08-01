import { CvLineItem } from "../cv/cvLineItem"
import { CvIconLineItem } from "../cv/cvIconLineItem"

const CvLeftPane = () => {
    return (
        <div className="flex flex-col flex-1 text-center">
            <h3 className="text-2xl font-bold text-neutral-focus mb-5">- C O N T A C T -</h3>
            <CvLineItem leftText="ADDRESS:" rightTexts={["Watnall", "Nottingham, NG16"]} />
            <CvLineItem leftText="PHONE:" rightTexts={["+447868952031"]} />
            <CvLineItem leftText="EMAIL:" rightTexts={["justjcurtis@gmail.com"]} />
            <CvLineItem leftText="WEBSITE:" rightTexts={["https://justjcurtis.dev"]} />
            <h3 className="text-2xl font-bold text-neutral-focus mb-5 mt-10">- O N L I N E -</h3>
            <CvIconLineItem username="justjcurtis" title="GitHub" href="https://github.com/justjcurtis">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </CvIconLineItem>
            <CvIconLineItem username="justjcurtis" title="LinkedIn" href="https://www.linkedin.com/in/justjcurtis">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </CvIconLineItem>
            <CvIconLineItem username="justjcurtis" title="HackerRank" href="https://www.hackerrank.com/justjcurtis">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 512 512"><path d="M477.5 128C463 103.05 285.13 0 256.16 0S49.25 102.79 34.84 128s-14.49 230.8 0 256 192.38 128 221.32 128S463 409.08 477.49 384s14.51-231 .01-256zM316.13 414.22c-4 0-40.91-35.77-38-38.69.87-.87 6.26-1.48 17.55-1.83 0-26.23.59-68.59.94-86.32 0-2-.44-3.43-.44-5.85h-79.93c0 7.1-.46 36.2 1.37 72.88.23 4.54-1.58 6-5.74 5.94-10.13 0-20.27-.11-30.41-.08-4.1 0-5.87-1.53-5.74-6.11.92-33.44 3-84-.15-212.67v-3.17c-9.67-.35-16.38-1-17.26-1.84-2.92-2.92 34.54-38.69 38.49-38.69s41.17 35.78 38.27 38.69c-.87.87-7.9 1.49-16.77 1.84v3.16c-2.42 25.75-2 79.59-2.63 105.39h80.26c0-4.55.39-34.74-1.2-83.64-.1-3.39.95-5.17 4.21-5.2 11.07-.08 22.15-.13 33.23-.06 3.46 0 4.57 1.72 4.5 5.38C333 354.64 336 341.29 336 373.69c8.87.35 16.82 1 17.69 1.84 2.88 2.91-33.62 38.69-37.58 38.69z" fill="#a6adbb" /></svg>
            </CvIconLineItem>
            <h3 className="text-2xl font-bold text-neutral-focus mb-5 mt-10 print:mt-16">- E D U C A T I O N -</h3>
            <CvLineItem leftText="TECH:" rightTexts={["Institute for Apprenticeships & Technical Education", "Mar 2018 - Jan 2021"]} />
            <CvLineItem leftText="Software Dev - L4" rightTexts={["PASS"]} />
            <CvLineItem leftText="Microsoft C# 483" rightTexts={["PASS"]} />
            <div className="bg-secondary-focus mt-5 rounded-full h-px w-100" />
            <CvLineItem leftText="A-LEVELS:" rightTexts={["Bilborough College", "Sep 2012 - Jul 2014"]} />
            <CvLineItem leftText="Physics" rightTexts={["C"]} />
            <CvLineItem leftText="Maths" rightTexts={["C"]} />
            <CvLineItem leftText="Philosophy" rightTexts={["B"]} />
            <CvLineItem leftText="Law" rightTexts={["B"]} />
            <div className="bg-secondary-focus mt-5 rounded-full h-px w-100" />
            <CvLineItem leftText="GCSE'S:" rightTexts={["Bluecoat Academy", "Sep 2007 - Jul 2012"]} />
            <CvLineItem leftText="Maths" rightTexts={["B"]} />
            <CvLineItem leftText="English" rightTexts={["C"]} />
            <CvLineItem leftText="Physics" rightTexts={["A"]} />
            <CvLineItem leftText="Chemistry" rightTexts={["A"]} />
            <CvLineItem leftText="Biology" rightTexts={["A"]} />
            <CvLineItem leftText="Psychology" rightTexts={["B"]} />
            <CvLineItem leftText="P.E." rightTexts={["A"]} />
            <CvLineItem leftText="Business" rightTexts={["PASS (B-TEC)"]} />
            <div className="bg-secondary-focus mt-5 rounded-full h-px w-100" />
            <h3 className="text-xl font-thin text-primary-focus mb-5 mt-10 print:hidden">References Available On Request</h3>
        </div>
    );
}

export { CvLeftPane }
