const googleDatabase = ['cats.com', 'souprecipes.com', 'flowers.com', 'animals.com', 'catspictures.com', 'myfavoritecats.com'];

const googleSearch = (searchInput='cats', db) => {
    // console.log(process.argv);
    const matches = db.filter(site => { return site.includes(searchInput)});
    // console.log(`Searching for '${searchInput}' returned: ${matches}`);
    return matches.length > 3 ? matches.slice(0,3) : matches
}

const args = process.argv.slice(2);

// console.log(`Searching for matches for '${args[0]}'...`);
console.log(googleSearch(args[0], googleDatabase));

module.exports = googleSearch