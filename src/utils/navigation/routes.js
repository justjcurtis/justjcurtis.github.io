export const AppRoutes = {
    home: '/',
    work: '/work',
    projects: '/projects',
    about: '/about',
    gap: '/gap',
    cv: '/cv',
    wip: '/wip',
    games: '/games/:gameName',
    notFound: '*'
}

export const getGameRoute = (gameName) => `/games/${gameName}`
