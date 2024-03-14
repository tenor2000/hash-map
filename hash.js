import { LinkedList } from "./linkedlist.js";

export function HashMap(initialCapacity=17, loadFactor = .75) {
    let capacity = initialCapacity;
    let threshold = Math.floor(initialCapacity * loadFactor)
    let buckets = new Array(capacity).fill(null).map(() => new LinkedList())

    return {
        capacity: capacity,
        buckets: buckets,
        length: 0,
        hash(key) {
            let hashCode = 0;
        
            const primeNumber = 31;
            for (let i = 0; i < key.length; i++) {
                hashCode = primeNumber * hashCode + key.charCodeAt(i);
            }
        
            return hashCode;
        },
        set(key, value) {
            const hashKey = this.hash(key);
            const bucketIndex = hashKey % this.capacity;

            
            this.buckets[bucketIndex].append(key, value)
            this.length++
            

            if (threshold <= this.length) {
                this.resize();
            }
        },
        get(key) {
            const hashKey = this.hash(key);
            const bucketIndex = hashKey % this.capacity;
            const currBucket = this.buckets[bucketIndex]
            if (currBucket === null) {
                return currBucket === null
            } else if (currBucket.containsKey(key)) {
                return currBucket.findValueByKey(key)
            } else {
                return null;
            }
        },
        has(key) {
            const hashKey = this.hash(key);
            const bucketIndex = hashKey % this.capacity;
            const currBucket = this.buckets[bucketIndex]
            
            return currBucket.containsKey(key)
        },
        remove(key) {
            const hashKey = this.hash(key);
            const bucketIndex = hashKey % this.capacity;
            const currBucket = this.buckets[bucketIndex]
            this.length--;
            return currBucket.removeKey(key)
        },
        clear() {
            this.buckets.forEach(bucket => bucket.clear())
        },
        keys() {
            let keyArray = []
            this.buckets.forEach((bucket) => {
                keyArray = keyArray.concat(bucket.getKeys());
            })
            return keyArray
        },
        values() {
            let valArray = []
            this.buckets.forEach((bucket) => {
                valArray = valArray.concat(bucket.getValues());
            })
            return valArray
        },
        entries() {
            let keyValArray = []
            this.buckets.forEach((bucket) => {
                bucket.getKeys().forEach((key) => {
                    keyValArray.push([key, bucket.findValueByKey(key)])
                })
            })
            return keyValArray
        },
        resize() {
            const newCapacity = this.capacity * 2;
            const newBuckets = new Array(newCapacity).fill(null).map(() => new LinkedList());

            this.entries().forEach(([key, value]) => {
                const hashKey = this.hash(key);
                const bucketIndex = hashKey % newCapacity;
                newBuckets[bucketIndex].append(key, value);
            })

            // this.buckets.forEach((bucket) => {
            //     for (let node = bucket.head; node !== null; node = node.nextNode) {
            //         const hashKey = this.hash(node.key);
            //         const bucketIndex = hashKey % newCapacity;

            //         if (!newBuckets[bucketIndex]) {
            //             newBuckets[bucketIndex] = new LinkedList();
            //         }
            //         newBuckets[bucketIndex].append(node.key, node.value);
            //     }
            // });
            threshold = Math.floor(newCapacity * loadFactor)
            this.buckets = newBuckets;
            this.capacity = newCapacity;
        }
    }
}