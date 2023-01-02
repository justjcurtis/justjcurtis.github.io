const getAge = () => {
    const today = new Date();
    const birthDate = new Date('1995-09-11');
    let age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const timeline = [
    {
        date: '2021 - Present',
        title: 'devExp++',
        text: 'Software engineer @ The Economist using React Native, GraphQL, AWS & Firebase.'
    },
    {
        date: '2018 - 2021',
        title: 'writeCode()',
        text: 'Mobile software engineer @ Ideagen using Javascript, SQL, C# & Xamarin.Forms.'
    },
    {
        date: '2017',
        title: 'Working',
        text: 'Gymnastics coaching @ Camp Awosting CT & Personal trainer @ Nuffield Health & Owner and Biomechanics coach @ FitFix.'
    },
    {
        date: '2014 - 2016',
        title: 'Higher education',
        text: 'Studying Physics BSC @ Open University'
    },
    {
        date: '2012 - 2014',
        title: 'Further education',
        text: 'Studying Physics, Maths, Philosophy, Psychology & Law @ Bilborough College'
    },
    {
        date: '2012 - 2016',
        title: 'var i = new Engineer();',
        text: 'Got back into teaching myself to code with Python, JavaScript, HTML & CSS. I revisited computer science fundementals and started learning Linux & bash.'
    },
    {
        date: '2005 - 2009',
        title: 'Initialising <dev/>',
        text: 'Began teaching myself to code, starting with batch files & VB.NET - Quickly moving on to C# & Java.'
    },
    {
        date: 'Sept 2000 - July 2012',
        title: 'Growing up',
        text: 'School & Internatonal level gymnast representing Team GB Under 16s.'
    },
    {
        date: '11th Sept 1995',
        title: 'Born',
        text: `Don't worry it wont all be this detailed, but that makes me ${getAge()} years old right now.`
    }
]

const getTimeline = () => timeline

export { getTimeline }