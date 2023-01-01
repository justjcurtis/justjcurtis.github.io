import { Modal } from "./modal"

const ProjectCard = ({ title, description, link, long, imgpath, status, tags = [] }) => {
    const cardClicked = () => {
        if (!link) return
        if (!long) {
            window.open(link, '_blank')
            return
        }
    }
    return (
        <>
            <label onClick={cardClicked} htmlFor={title}>
                <div className="card w-50 bg-base-100 shadow-xl">
                    <figure>{imgpath ? <img className="h-80 object-cover" src={imgpath} alt={title} /> : <div className="text-center h-80"><h1 className="mt-20 text-3xl">Image coming soon..</h1></div>}</figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {title}
                            {status && <div className="badge badge-secondary">{status}</div>}
                        </h2>
                        <p>{description}</p>
                        <div className="card-actions justify-end">
                            {tags.map((t, i) => <div key={i} className="badge badge-outline">{t}</div>)}
                        </div>
                    </div>
                </div >
            </label>
            {long && <Modal id={title} link={link} title={title} description={long} />}
        </>
    )
}

export { ProjectCard }