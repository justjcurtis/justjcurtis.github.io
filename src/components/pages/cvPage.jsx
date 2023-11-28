import { CvLeftPane } from "../cv/cvLeftPane"
import { CvHeader } from "../cv/cvHeader"
import { CvRightPane } from "../cv/cvRighPane"
import { PdfIcon } from "../pdfIcon"
import { StarryNight } from "../starryNight"

const CVPage = () => {
    return (
        <StarryNight>
            <div className="flex justify-center break-words">
                <div className="bg-white min-h-screen w-5/6 relative my-5 rounded-md pb-20 px-10">
                    <div className="absolute top-8 right-8">
                        <PdfIcon />
                    </div>
                    <CvHeader />
                    <div className="flex lg:flex-row flex-col justify-evenly mt-10">
                        <CvLeftPane />
                        <CvRightPane />
                    </div>
                </div>
            </div>
        </StarryNight>
    )
}

export { CVPage }
