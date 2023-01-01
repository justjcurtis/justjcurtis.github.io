const Modal = ({ id, title, description, link }) => {
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{description}</p>
                    <div className="modal-action">
                        <label htmlFor={id} className="btn">Close</label>
                        <a href={link} target={'_blank'} className="btn" rel="noreferrer">Go 🚀</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Modal }