var TinyQ = require('./tinyq').TinyQ,
    tasks = new TinyQ('data.json', 5000),
    count = tasks.count();

var i = 0;

setInterval(function () {
  tasks.queue({ name: 'x-job#' + i, data: i });
  console.log('job#%s is queued...', i++);
}, 1000);

process.on('SIGINT', function () {
  tasks.shutdown(function (err) {
    console.log('Exiting...');
    process.exit(0);
  });
});
