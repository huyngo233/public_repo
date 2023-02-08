/*! @name videojs-ima-countdown-nzh @version 0.0.0 @license MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
	typeof define === 'function' && define.amd ? define(['video.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsImaCountdownNzh = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var setPrototypeOf = createCommonjsModule(function (module) {
	  function _setPrototypeOf(o, p) {
	    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	      o.__proto__ = p;
	      return o;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	    return _setPrototypeOf(o, p);
	  }

	  module.exports = _setPrototypeOf;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var inheritsLoose = createCommonjsModule(function (module) {
	  function _inheritsLoose(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    setPrototypeOf(subClass, superClass);
	  }

	  module.exports = _inheritsLoose;
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var version = "0.0.0";

	var defaults = {
	  debug: false,
	  text: 'AD',
	  controlBarPosition: 1
	};

	var Countdown = /*#__PURE__*/function (_Component) {
	  inheritsLoose(Countdown, _Component);

	  function Countdown(player, options) {
	    return _Component.call(this, player, options) || this;
	  }

	  var _proto = Countdown.prototype;

	  _proto.buildCSSClass = function buildCSSClass() {
	    return 'vjs-ima-countdown';
	  };

	  _proto.createEl = function createEl(tag, props, attributes) {
	    if (tag === void 0) {
	      tag = 'div';
	    }

	    if (props === void 0) {
	      props = {};
	    }

	    if (attributes === void 0) {
	      attributes = {};
	    }

	    props = {
	      className: 'vjs-ima-countdown vjs-time-control'
	    };

	    var el = _Component.prototype.createEl.call(this, tag, props, attributes);

	    this.createTextEl(el);
	    this.createTimeEl(el);
	    return el;
	  };

	  _proto.createTextEl = function createTextEl(el) {
	    this.textEl_ = videojs__default['default'].createEl('span', {
	      className: 'vjs-ima-countdown-text'
	    });

	    if (el) {
	      el.appendChild(this.textEl_);
	    }

	    if (this.options_.text !== '') {
	      this.textEl_.innerHTML = this.options_.text;
	    }

	    return this.textEl_;
	  };

	  _proto.createTimeEl = function createTimeEl(el) {
	    this.timeEl_ = videojs__default['default'].createEl('span', {
	      className: 'vjs-ima-countdown-time'
	    });

	    if (el) {
	      el.appendChild(this.timeEl_);
	    }

	    this.timeEl_.innerHTML = '';
	    return this.timeEl_;
	  };

	  return Countdown;
	}(Component);

	videojs__default['default'].registerComponent('Countdown', Countdown);
	//   const timeRemainingEl = player.countdown.timeEl;
	//   let timeHTML = '';
	//   if (remainingTime !== 0) {
	//     let remainingMinutes = Math.floor(remainingTime / 60);
	//     let remainingSeconds = Math.floor(remainingTime % 60);
	//     if (remainingSeconds.toString().length < 2) {
	//       remainingSeconds = '0' + remainingSeconds;
	//     }
	//     timeHTML = `&nbsp;${remainingMinutes}:${remainingSeconds}`;
	//   }
	//   debug(player, 'IMA Countdown Remaining: ' + timeHTML);
	//   timeRemainingEl.innerHTML = timeHTML;
	// }


	function addControl(player) {
	  var adControlBar = player.controlBar;
	  return adControlBar.addChild('Countdown', player.countdown, [player.countdown.controlBarPosition]);
	} // function timeRemaining(player) {
	//   const remainingTime = player.ima3.adsManager.getRemainingTime();
	//   if (player.ads.state !== 'ad-playback') {
	//     updateTime(player, 0);
	//   } else {
	//     updateTime(player, remainingTime);
	//   }
	// }
	// function onAdPlay(player) {
	//   debug(player, `IMA Countdown timerInterval Started`);
	//   player.countdown.timerInterval = setInterval(
	//     timeRemaining.bind(player, player), 250
	//   );
	// }
	// function onAdStop(player) {
	//   debug(player, `IMA Countdown timerInterval Stopped`);
	//   clearInterval(player.countdown.timerInterval);
	// }


	function onAdLoad(player) {
	  var countdown = addControl(player);
	  player.countdown.timeEl = countdown.timeEl_;
	  player.on('adstart', function () {
	    console.log('adstart', player); // onAdPlay(player);
	  });
	  player.on('ads-play', function () {
	    console.log('ads-play', player); // onAdPlay(player);
	  });
	  player.on('adend', function () {
	    console.log('adend', player); // onAdStop(player);
	  });
	  player.on('ads-pause', function () {
	    console.log('ads-pause', player); // onAdStop(player);
	  });
	} // Cross-compatibility for Video.js 5 and 6.


	var registerPlugin = videojs__default['default'].registerPlugin || videojs__default['default'].plugin; // const dom = videojs.dom || videojs;

	/**
	 * Function to invoke when the player is ready.
	 *
	 * This is a great place for your plugin to initialize itself. When this
	 * function is called, the player will have its DOM and child components
	 * in place.
	 *
	 * @function onPlayerReady
	 * @param    {Player} player
	 *           A Video.js player object.
	 *
	 * @param    {Object} [options={}]
	 *           A plain object containing options for the plugin.
	 */

	var onPlayerReady = function onPlayerReady(player, options) {
	  player.addClass('vjs-ima-countdown');
	  var settings = videojs__default['default'].mergeOptions({}, defaults, options || {});
	  settings.timerInterval = null;
	  settings.timeEl = null;
	  settings.timeRemaining = null;
	  player.countdown = settings;
	  console.log('playerlocal3', player);
	  var controlBar = player.controlBar.el();
	  var time = document.createElement('span');
	  time.className = 'vjs-text';
	  time.innerHTML = "0:00";
	  controlBar.appendChild(time);
	  player.on('ads-load', function () {
	    onAdLoad(player);
	  });
	};
	/**
	 * A video.js plugin.
	 *
	 * In the plugin function, the value of `this` is a video.js `Player`
	 * instance. You cannot rely on the player being in a "ready" state here,
	 * depending on how the plugin is invoked. This may or may not be important
	 * to you; if not, remove the wait for "ready"!
	 *
	 * @function imaCountdown
	 * @param    {Object} [options={}]
	 *           An object of options left to the plugin author to define.
	 */


	var imaCountdown = function imaCountdown(options) {
	  var _this = this;

	  this.ready(function () {
	    onPlayerReady(_this, videojs__default['default'].mergeOptions(defaults, options));
	  });
	}; // Register the plugin with video.js.


	registerPlugin('imaCountdown', imaCountdown); // Include the version number.

	imaCountdown.VERSION = version;

	return imaCountdown;

})));
