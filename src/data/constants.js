const ONE_MIN_MS = 60000
const CONSTRUCTION_PERCENTAGE = 95
const ENDPOINT = 'https://api-eu-west-2.hygraph.com/v2/clchjkt731a3801t81v2087ix/master'
const LOADING_SECONDS = 2
const LOADING_MESSAGES = ["Reticulating splines..",
    "Generating witty dialog..",
    "Swapping time and space..",
    "Spinning violently around the y-axis..",
    "Tokenizing real life..",
    "Bending the spoon..",
    "Filtering morale..",
    "Don't think of purple hippos..",
    "We need a new fuse..",
    "Have a good day.",
    "Upgrading Windows..",
    "Shh! The bits are breeding..",
    "We're building the pages as fast as we can..",
    "(Pay no attention to the man behind the curtain)",
    "..and enjoy the elevator music..",
    "Please wait while the little elves draw this site",
    "Don't worry - a few bits tried to escape, but we caught them",
    "Would you like fries with that?",
    "Checking the gravitational constant in your locale..",
    "Go ahead -- hold your breath!",
    "Follow the white rabbit",
    "Waiting for the satellite to move into position..",
    "The bits are flowing slowly today..",
    "It's still faster than you could draw it",
    "My other loading screen is much faster.",
    "(Insert 50p to continue.)",
    "Are we there yet?",
    "Just count to 10",
    "It's not you. It's me.",
    "Counting backwards from Infinity..",
    "Not panicking..",
    "Embiggening Prototypes..",
    "Do you come here often?",
    "Creating time-loop inversion field..",
    "Spinning the wheel of fortune..",
    "Loading the enchanted bunny..",
    "Computing chance of success..",
    "Looking for exact change..",
    "Sorry, was I meant to load something?!",
    "Should have used a compiled language..",
    "Is this Windows?",
    "Adjusting flux capacitor..",
    "Please wait until the sloth starts moving again.",
    "I swear it's almost done..",
    "Let's take a mindfulness minute..",
    "Unicorns are at the end of this road, I promise.",
    "Listening for the sound of one hand clapping..",
    "Keeping all the 1's and removing all the 0's..",
    "Putting the icing on the cake..",
    "Cleaning off the cobwebs..",
    "Making sure all the i's have dots..",
    "Making sure all the t's are crossed..",
    "Where did all the internets go?",
    "Granting wishes..",
    "Time flies when you’re having fun.",
    "Spinning the hamster…",
    "You shall not pass! yet..",
    "Load it and they will come.",
    "Convincing AI not to turn evil..",
    "There is no spoon. Because we are not done loading it.",
    "Your left thumb points to the right and your right thumb points to the left.",
    "How did you get here?",
    "Computing the secret to life, the universe, and everything..",
    "Never steal. The government hates competition..",
    "Why are they called apartments if they are all stuck together?",
    "Optimism – is a lack of information..",
    "I think I am, therefore, I am. I think.",
    "Constructing additional pylons..",
    "Roping some seaturtles..",
    "Locating nemo..",
    "We are not liable for any broken screens as a result of waiting.",
    "Hello IT, have you tried turning it off and on again?",
    "If you type Google into Google you can break the internet?",
    "Well, this is embarrassing.",
    "Hello, IT.. Have you tried forcing an unexpected reboot?",
    "Watching the paint dry..",
    "Boiling the tea..",
    "Walk the dog..",
    "Cooking dinner..",
    "Dividing by zero..",
    "Spawn more ram..",
    "Adding some <style>..",
    "Cracking military-grade encryption..",
    "Simulating traveling salesman..",
    "Proving P=NP..",
    "Entangling superstrings..",
    "Twiddling thumbs..",
    "Searching for plot device..",
    "Trying to sort in O(n)..",
    "Laughing at your pictures-i mean, loading..",
    "Sending data to NS-i mean, our servers..",
    "Looking for sense of humour, please hold on..",
    "Reheating the coffee..",
    "Installing dependencies..",
    "Switching to the latest JS framework..",
    "Finding someone to hold my beer..",
    "BRB, working on my side project..",
    "@todo Insert witty loading message.",
    "Let's hope it's worth the wait.",
    "Aw, snap! Not..",
    "Ordering 1s and 0s..",
    "Updating dependencies..",
    "Whatever you do, don't look behind you..",
    "Please wait.. Consulting the manual..",
    "Loading funny message..",
    "Feel free to spin in your chair.",
    "What the what?",
    "formating C:\\..",
    "Mining some bitcoin..",
    "Downloading more RAM..",
    "Updating to Windows Vista..",
    "Deleting System32 folder..",
    "Hiding all ;'s in our code..",
    "Initializing the initializer..",
    "Optimizing the optimizer..",
    "Last call for the data bus! All aboard!",
    "Shovelling coal into the server..",
    "Pushing pixels..",
    "Updating Updater..",
    "Downloading Downloader..",
    "Debugging Debugger..",
    "Reading Terms and Conditions for you..",
    "Digesting cookies..",
    "Running with scissors..",
    "Definitely not a virus..",
    "You seem like a nice person..",
    "Work, work..",
    "Patience! This is difficult, you know..",
    "Discovering new ways of making you wait..",
    "Two men walked into a bar; the third ducked.",
    "Sorry we are busy catching em' all, we're done soon..",
    "TODO: Insert elevator music",
    "Please wait while the minions do their work..",
    "Grabbing extra minions..",
    "Doing the heavy lifting..",
    "Waking up the minions..",
    "You are number 2843684714 in the queue..",
    "Please wait while we serve other customers..",
    "Feeding unicorns..",
    "Rupturing the subspace barrier..",
    "Creating an anti-time reaction..",
    "Converging tachyon pulses..",
    "Bypassing control of the matter-antimatter integrator..",
    "Adjusting the dilithium crystal converter assembly..",
    "Reversing the shield polarity..",
    "Disrupting warp fields..",
    "Up, Up, Down, Down, Left, Right, Left, Right, B, A.",
    "Do you like my loading animation? I made it myself",
    "Whoah, look at it go!..",
    "No, I'm awake. I was just resting my eyes..",
    "One mississippi, two mississippi..",
    "Don't panic.. AHHHHH!",
    "Ensuring Gnomes are still short..",
    "Baking ice cream..",
]

export { CONSTRUCTION_PERCENTAGE, ENDPOINT, LOADING_MESSAGES, LOADING_SECONDS, ONE_MIN_MS }