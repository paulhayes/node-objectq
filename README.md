# ObjectQ

A very simple persistent object queue for tiny node apps. Don't take this module seriously, it's meant for small things.

## Installation

```
npm install objectq
```

## Example Use

``` js
var ObjectQ = require('objectq').ObjectQ,
    tasks = new ObjectQ('save-to-this-file.json', saveQueueEveryMillis = 60000);

// put things into the queue
tasks.queue({ someKey: 'something you need to queue', anotherKey: 'whatever' });

// get something from the queue, removes whatever is returned
var something = tasks.shift();

// get your queue length
console.log(tasks.count());

// shutdown the queue before exiting, to make sure you save it
process.on('SIGINT', function () {
  tasks.shutdown(function (err) {
    if (err) throw err;
    console.log('queue saved. exiting.');
    process.exit(0);
  });
});
```

## License

(The MIT License)

Copyright (c) 2013 Jesus A. Domingo <jesus.domingo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
