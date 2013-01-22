var EventEmitter = require('events').EventEmitter,
    fs = require('fs');

var TinyQ = function (path, interval) {

  this._fpath = path;
  this._queue = null;

  if (fs.existsSync(this._fpath))
    this._queue = JSON.parse(fs.readFileSync(this._fpath));
  else
    this._queue = [];

  this._dirty = 0;

  this._flushing = false;

  this._timer = setInterval(function (self) {
    self.flush();
  }, interval || 30000, this);
};

TinyQ.prototype.flush = function (cb) {

  if (this._flushing)
    return;

  this._flushing = true;

  cb = cb || function () {};

  if (this._dirty) {
    var self = this;
    fs.writeFile(self._fpath, JSON.stringify(self._queue), function (err) {
      self._flushing = false;
      if (err) {
        cb(err);
      } else {
        self._dirty = false;
        cb(null);
      }
    });
  }
};

TinyQ.prototype.queue = function (obj) {
  this._queue.push(obj);
  this._dirty = true;
};

TinyQ.prototype.shift = function () {
  var obj = this._queue.shift();
  this._dirty = (typeof obj != 'undefined');
  return obj;
};

TinyQ.prototype.unshift = function (obj) {
  this._queue.unshift(obj);
  this._dirty = true;
};

TinyQ.prototype.shutdown = function (cb) {
  clearInterval(this._timer);
  this.flush(cb);
};

TinyQ.prototype.count = function () {
  return this._queue.length;
};

module.exports = {
  TinyQ: TinyQ
};
