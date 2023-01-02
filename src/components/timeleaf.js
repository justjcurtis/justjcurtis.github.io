const TimeLeaf = ({ date, title, text, isRight = false }) => {
    return (
        <div className={`mb-8 flex justify-between items-center w-full ${isRight ? 'left-timeline' : 'flex-row-reverse right-timeline'}`}>
            <div style={{ marginLeft: isRight ? '50%' : '-70%', marginRight: isRight ? '-70%' : '50%' }} className={`w-full h-1 bg-gradient-to-${isRight ? 'r' : 'l'} from-accent via-transparent to-transparent`} />
            <div className="order-1 w-5/12"></div>
            <div className={`order-1  w-5/12 px-1 py-4 ${isRight ? 'text-left' : 'text-right'}`}>
                <p className={`mb-3 text-base text-accent ${isRight ? 'text-left' : 'text-right'}`}>{date}</p>
                <h4 className={`mb-3 font-bold  text-lg md:text-2xl text-primary bg-primary-content rounded-md px-1 ${isRight ? 'text-left' : 'text-right'}`}>{title}</h4>
                <p className={`text-sm md:text-base leading-snug text-gray-50 text-opacity-100 ${isRight ? 'text-left' : 'text-right'}`}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export { TimeLeaf }