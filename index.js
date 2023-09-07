// const axios = require('axios');
const geolib = require('geolib');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getCoordinatesFromGoogleMapsURL(url) {
    const match = url.match(/\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    // console.log(match);

    if (match) {
        const latitude = parseFloat(match[1]);
        const longitude = parseFloat(match[2]);
        return { latitude, longitude };
    } else {
        console.log('Invalid Google Maps URL format');
        return null;
    }
}

function calculateDistance(coord1, coord2) {
    return geolib.getDistance(coord1, coord2) / 1000; // Convert meters to kilometers
}

rl.question('Enter the first Google Maps URL: ', async (url1) => {
    rl.question('Enter the second Google Maps URL: ', async (url2) => {
        const coord1 = await getCoordinatesFromGoogleMapsURL(url1);
        const coord2 = await getCoordinatesFromGoogleMapsURL(url2);

        if (coord1 && coord2) {
            const distance = calculateDistance(coord1, coord2);
            console.log(`Distance between the two points: ${distance.toFixed(2)} km`);
        }

        rl.close();
    });
});
