function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
    clamp,
    randomItem,
};
