const findDuplicate = (arr) => {
    tortoise = arr[0];
    hare = arr[0];
    
    while (true) {
        tortoise = arr[tortoise];
        hare = arr[arr[hare]];
        if (tortoise === hare)
            break
    }
    
    pointer1 = arr[0];
    pointer2 = tortoise;
    
    while (pointer1 !== pointer2) {
        pointer1 = arr[pointer1];
        pointer2 = arr[pointer2];
    }
    
    return pointer1;
}

let exampleArr = [1,3,5,6,4,6,2];

console.log(findDuplicate(exampleArr));

/**
 * module.exports = {
 *      findDuplicate
 * }
 */
