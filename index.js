import { HashMap } from "./hash.js";

const testHash = new HashMap();

// testHash.set('Fred','fredword')
// testHash.set('Jim','jimword')
// testHash.set('Alex','alexword')
// testHash.set('Frank','frankword')
// console.log(testHash.get('Fred'))
// console.log(testHash.get('Steve'))
// console.log(testHash.has('Alex'))
// console.log(testHash.has('Joe'))
// console.log(testHash.keys())
// console.log(testHash.entries())
// console.log(testHash.has('Jim'))
// console.log(testHash.remove('Jim'))
// console.log(testHash.entries())
// console.log(testHash.has('Jim'))
// console.log(testHash.length)

for (let i = 0; i < 100; i++) {
    testHash.set(`Key${i}`, `Value${i}`);
    if (i % 10 === 0) {
        console.log(`After ${i + 1} iterations:`);
        console.log(`${testHash.length} / ${testHash.capacity} spots taken.`);
        console.log('------------------------');
    }
}