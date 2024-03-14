export function node(key, value) {
    return {
        key: key,
        value: value,
        nextNode: null,
    };
}

export function LinkedList() {
    return {
        head: null,
        tail: null,
        length: 0,
        append(key, value) {
            const newNode = new node(key, value);

            if (this.head === null) {
                // Empty so the first newNode becomes both head and tail
                this.head = newNode;
                this.tail = newNode;
            } else {
                //current tail.nextNode become the newNode and THEN the newNode becomes the tail
                this.tail.nextNode = newNode;
                this.tail = newNode;
            }
            // list length increases
            this.length++;
        },
        prepend(key, value) {
            const newNode = new node(key, value);

            if (this.head === null) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                newNode.nextNode = this.head
                this.head = newNode;
            }
            this.length++;
        },
        at(index) {
            let counter = 0
            for (let curr = this.head; curr !== null; curr=curr.nextNode) {
                if (counter === index) {
                    return curr.value
                }
                counter++
            }
            return false
        },
        pop() {
            let prev = null;
            for (let curr = this.head; curr !== null; curr=curr.nextNode) {
                if (curr.nextNode === null) {
                    prev.nextNode = null;
                    this.length--;
                    this.tail = prev;
                    return curr.value
                }
                prev = curr;
                curr = curr.nextNode;
            }
            return false
        },
        containsKey(key) {
            for (let curr = this.head; curr !== null; curr=curr.nextNode) {
                if (curr.key === key) {
                    return true
                }
            }
            return false
        },
        containsValue(value) {
            for (let curr = this.head; curr !== null; curr=curr.nextNode) {
                if (curr.value === value) {
                    return true
                }
            }
            return false
        },
        findValueByKey(key) {
            let curr = this.head;

            for (let i = 0; i < this.length; i++) {
                if (curr === null) {
                    return null;
                } else if (curr.key === key) {
                    return curr.value;
                }
                curr = curr.nextNode;
            }
            return null;
        },
        toString() {
            let curr = this.head;
            let string = '';

            for (let i = 0; i < this.length; i++) {
                if (curr === null) {
                    string += 'null'
                    return string;
                } else {
                    string += `( ${curr.key}: ${curr.value} ) -> `
                }
                curr = curr.nextNode;
            }
            return string;
        },
        getKeys() {
            let curr = this.head
            let valueArray = []
            for (let i = 0; i < this.length; i++) {
                valueArray.push(curr.key)
                curr = curr.nextNode
            }
            return valueArray
        },
        getValues() {
            let curr = this.head
            let valueArray = []
            for (let i = 0; i < this.length; i++) {
                valueArray.push(curr.value)
                curr = curr.nextNode
            }
            return valueArray
        },
        clear() {
            this.head = null;
            this.tail = null;
            this.length = 0;
        },
        removeKey(key) {
            let prev = null;
            let curr = this.head;

            for (let i = 0; i < this.length; i++) {
                if (curr.nextNode === null && curr.key === key) { 
                    this.clear()
                    return `Removed '${key}' from list`
                } 
                else if (curr.key === key) {
                    prev.nextNode = curr.nextNode;
                    this.length--;
                    return `Removed '${key}' from list`
                }
                prev = curr;
                curr = curr.nextNode;
            }
            return `'${key}' does not exist`
            
            const removeHelper = (key, prev=null, curr=this.head) => {
                if (curr === null) {
                    return null
                }
                if (curr.key === key) {
                    if (prev === null) {
                        this.head = curr.nextNode
                    } else {
                        prev.nextNode = curr.nextNode
                    }
                    this.length--;
                    return curr.key
                }
                return removeHelper(key, curr, curr.nextNode)
            }
            return removeHelper(key)
        }
    }
}