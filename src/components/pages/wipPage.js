const WipPage = ({ percentage }) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Contruction In Progress 🛠</h1>
                    <p className="py-6">Check back later to see how it went 👀</p>
                    <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": percentage }}>{percentage}%</div>
                </div>
            </div>
        </div>
    )
}

export { WipPage }