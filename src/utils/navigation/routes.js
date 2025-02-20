export const AppRoutes = {
    home: '/',
    work: '/work',
    projects: '/projects',
    about: '/about',
    cv: '/cv',
    wip: '/wip',
    games: '/games/:gameName',
    notFound: '*'
}

export const getGameRoute = (gameName) => `/games/${gameName}`
