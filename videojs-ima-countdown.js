/*! @name videojs-ima-countdown-nzh @version 0.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsImaCountdownNzh = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "0.0.0";

  videojs__default['default'].getComponent('Component'); // Default options for the plugin.

  var defaults = {
    debug: false,
    text: 'AD',
    controlBarPosition: 1
  }; // class CountdownComp extends Component {
  //   constructor(player, options = {}) {
  //     super(player, options);
  //   }
  //   buildCSSClass() {
  //     return 'vjs-ima-countdown';
  //   }
  //   createEl(tag = 'div', props = {}, attributes = {}) {
  //     props = {
  //       className: 'vjs-ima-countdown vjs-time-control'
  //     };
  //     let el = super.createEl(tag, props, attributes);
  //     this.createTextEl(el);
  //     this.createTimeEl(el);
  //     return el;
  //   }
  //   createTextEl(el) {
  //     this.textEl_ = videojs.createEl('span', {
  //       className: 'vjs-ima-countdown-text'
  //     });
  //     if (el) {
  //       el.appendChild(this.textEl_);
  //     }
  //     if (this.options_.text !== '') {
  //       console.log(this.options_)
  //       this.textEl_.innerHTML = this.options_.text;
  //     }
  //     return this.textEl_;
  //   }
  //   createTimeEl(el) {
  //     this.timeEl_ = videojs.createEl('span', {
  //       className: 'vjs-ima-countdown-time'
  //     });
  //     if (el) {
  //       el.appendChild(this.timeEl_);
  //     }
  //     this.timeEl_.innerHTML = '';
  //     return this.timeEl_;
  //   }
  // }
  // videojs.registerComponent('CountdownComp', CountdownComp);

  var debug = function debug(player, value) {
    /* eslint-disable no-console */
    if (player.countdown.debug) {
      console.info(value);
    }
    /* eslint-enable no-console */

  };

  function updateTime(player, remainingTime) {
    // const timeRemainingEl = player.countdown.timeEl;
    var timeRemainingEl = adRemainingTimeEl();
    var timeHTML = '';

    if (remainingTime !== 0) {
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);

      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }

      timeHTML = "&nbsp;" + remainingMinutes + ":" + remainingSeconds;
    }

    debug(player, 'IMA Countdown Remaining: ' + timeHTML);
    console.log('timeHTML', timeHTML);
    timeRemainingEl.innerHTML = timeHTML;
  } // function addControl(player) {
  //   const adControlBar = player.getChild('ControlBar');
  //   return adControlBar.addChild(
  // 		'Countdown',
  // 		player.countdown,
  // 		[player.countdown.controlBarPosition]
  // 	);
  // }


  var adRemainingTimeEl = function adRemainingTimeEl(adDurationEl) {
    if (!adDurationEl) return null;
    return adDurationEl.querySelector(".vjs-ima-countdown-time");
  };

  var createAdDurationEl = function createAdDurationEl() {
    var countdownDiv = document.createElement("div");
    countdownDiv.className = "vjs-ima-countdown vjs-time-control";
    var adTxtEl = document.createElement("span");
    adTxtEl.className = "vjs-ima-countdown-child vjs-ima-countdown-text";
    adTxtEl.innerText = defaults.text;
    countdownDiv.appendChild(adTxtEl);
    var adsCount = document.createElement("span");
    adsCount.className = "vjs-ima-countdown-child vjs-ima-countdown-ads-count";
    adsCount.innerText = "0 of 0";
    countdownDiv.appendChild(adsCount);
    var adTime = document.createElement("span");
    adTime.className = "vjs-ima-countdown-child vjs-ima-countdown-time";
    countdownDiv.appendChild(adTime);
    return countdownDiv;
  };

  function timeRemaining(player) {
    var remainingTime = player.ima3.adsManager.getRemainingTime();

    if (player.ads.state !== 'ad-playback') {
      updateTime(player, 0);
    } else {
      updateTime(player, remainingTime);
    }
  }

  function onAdPlay(player) {
    debug(player, "IMA Countdown timerInterval Started");
    player.countdown.timerInterval = setInterval(timeRemaining.bind(player, player), 250);
  }

  function onAdLoad(player) {
    // const countdown = addControl(player);
    // player.countdown.timeEl = countdown.timeEl_;
    player.on('adstart', function () {
      console.log('adstart', player);
      onAdPlay(player);
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
    console.log('playerlocal12', player);
    var controlBar = player.controlBar.el();
    var adDurationEl = createAdDurationEl();
    controlBar.appendChild(adDurationEl); // add control
    // const controlBar = player.getChild('ControlBar');
    // const Countdown = new CountdownComp(player, settings);
    // console.log('CountdownComp', Countdown)
    // controlBar.addChild(Countdown, player.countdown);
    // end add control

    player.on('ads-load', function () {
      onAdLoad(player);
    });
    console.log('last-player', player);
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
