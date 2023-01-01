const tags = {
    ai: 'ai',
    demo: 'demo',
    fun: 'fun',
    game: 'game',
    sim: 'sim',
    tool: 'tool',
    util: 'util',
    visual: 'visual',
}

const projects = [
    {
        title: 'Timer',
        description: 'A flexible, easy to use interval timer.',
        long: 'An interval timer, designed to be easy to use. Simply fill in each row with a time in the format 1h5m30s. To delete a row just delete the text in that row.',
        link: "https://justjcurtis.dev/timer",
        status: 'NEW',
        tags: [tags.tool, tags.util],
    },
    {
        title: 'WordCode',
        description: 'An algorithm for hashing english words.',
        long: 'Enter a word to see the hash of that word generated in real time 🌈.',
        link: "https://justjcurtis.dev/wordcode",
        tags: [tags.demo, tags.tool],
    },
    {
        title: 'Bouncer',
        description: 'Quadtree optimised physics sim with "nice" visuals.',
        link: "https://justjcurtis.dev/bouncer",
        tags: [tags.fun, tags.visual, tags.sim],
    },
    {
        title: 'MarkovJnr',
        description: 'A maze generator & solver demo of the MarkovJnr algorithm.',
        long: 'The MarkovJnr algorithm turns a set of simple rules into a turing complete language which has been implemented here & then used to create this demo of random maze generator + solver.',
        link: "https://justjcurtis.dev/MarkovJnr",
        tags: [tags.demo, tags.fun, tags.visual],
    },
    {
        title: 'AlienText',
        description: 'Visualiser for cistercian numerals, with alphanumeric support.',
        long: 'Convert numbers or text to cistercian in real time, ⚠️ this one is due a makover though ☠️',
        link: "https://justjcurtis.dev/AlienText",
        tags: [tags.demo, tags.fun],
    },
    {
        title: 'Wordish',
        description: 'Different take on a word puzzle game inspired by wordle.',
        long: 'Try to guess the word & after each guess get a clue (how good your guess was) that you can use to work out the hidden word. 1 point/correct letter, 2 point/correctly placed letter',
        link: "https://justjcurtis.dev/wordish",
        tags: [tags.game, tags.fun],
    },
    {
        title: 'FlappyNeat',
        description: 'Flappy bird clone to demo my N.E.A.T implementation (JustNeat on npm).',
        long: 'Hit space or click/tap to start the sim. With ai turned on, 1000 birds will begin playing the game. Once they all die their performance will be ranked and the top 50% will breed to create the next generation of 1000 birds. A random birds "brain" can be seen in the bottom right. Turn off ai to play the game yourself.',
        link: "https://justjcurtis.dev/FlappyNeat",
        tags: [tags.ai, tags.game, tags.demo],
    },
    {
        title: 'Other projects',
        description: "Other projects I've worked on are available on github.",
        link: "https://github.com/justjcurtis",
    },
]

const getProjects = () => projects.map(p => {
    let imgpath;
    try {
        imgpath = require(`../assets/projects/${p.title.toLowerCase()}.png`)
    }
    catch (err) {

    }
    return { ...p, imgpath }
})

export { getProjects }