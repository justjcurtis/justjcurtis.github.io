const WorkCard = ({ image, name, title, tech, description, link, cols = 1, rows = 1 }) => {
    return (
        <div className={`bg-${image} rounded-md md:col-span-${cols} md:row-span-${rows} flex flex-col place-content-between`} >
            <a href={link} target="_blank" rel="noreferrer">
                <div className="p-4" >
                    <h1 className="text-primary-content ext-2xl font-bold">{name}</h1>
                    <h2 className="text-primary-content text-xl font-bold">{title}</h2>
                    <p className="text-primary-content text">{description}</p>
                </div>
            </a>
            <h3 className="text-neutral-content text-sm bg-neutral-focus bg-opacity-60 rounded-b-md p-2 mt-4 justify-self-center">{tech}</h3>
        </div >
    )
}

export { WorkCard }
