const TimeLeaf = ({ date, title, text, isRight = false }) => {
    const gradientClassName = isRight ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
    const textSideClassName = isRight ? 'text-left' : 'text-right'
    const markerStyle = { marginLeft: isRight ? '50%' : '-70%', marginRight: isRight ? '-70%' : '50%' }
    return (
        <div className={`mb-8 flex justify-between items-center w-full ${isRight ? 'left-timeline' : 'flex-row-reverse right-timeline'}`}>
            <div style={markerStyle} className={`w-full h-1 ${gradientClassName} from-accent via-transparent to-transparent`} />
            <div className="order-1 w-5/12"></div>
            <div className={`order-1  w-5/12 px-1 py-4 ${textSideClassName}`}>
                <p className={`mb-3 text-base text-accent ${textSideClassName}`}>{date}</p>
                <h4 className={`mb-3 font-bold  text-lg md:text-2xl text-primary bg-primary-content rounded-md px-1 ${textSideClassName}`}>{title}</h4>
                <p className={`text-sm md:text-base leading-snug text-gray-50 text-opacity-100 ${textSideClassName}`}>
                    {text}
                </p>
            </div>
        </div>
    )
}

export { TimeLeaf }