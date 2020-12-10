const sortWithKey = (comparatorKey) => {
    return (objA, objB) => {
        if (objA[comparatorKey] > objB[comparatorKey]) {
            return 1
        } else if (objA[comparatorKey] < objB[comparatorKey]) {
            return -1
        } return 0
    }
}

const sortWithPopulation = (objA, objB) => {
    if (objA.einwohner > objB.einwohner) {
        return 1
    } else if (objA.einwohner < objB.einwohner) {
        return -1
    } return 0
}

module.exports = {
    sortWithKey,
    sortWithPopulation
}