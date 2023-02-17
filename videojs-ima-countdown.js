/*! @name videojs-ima-countdown-nzh @version 0.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsImaCountdownNzh = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "0.0.0";

  /* eslint-env browser */
  // Default options for the plugin.

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

  var adRemainingTimeEl = function adRemainingTimeEl(adDurationEl) {
    return adDurationEl.querySelector('.vjs-ima-countdown-time');
  };

  var adCountAdsEl = function adCountAdsEl(adDurationEl) {
    return adDurationEl.querySelector('.vjs-ima-countdown-ads-count');
  };
  /**
   * Function to define ad time remaining then insert to dom element
   *
   * @function updateTime
   * @param {Player} player
   *        A Video.js player object.
   * @param {string} remainingTime
   *        time remaining value
   * @param {HTMLElement} adDurationEl
   *        Html node of ad time duration
   */


  function updateTime(player, remainingTime, adDurationEl) {
    // const timeRemainingEl = player.countdown.timeEl;
    var timeRemainingEl = adRemainingTimeEl(adDurationEl);
    var timeHTML = '';

    if (remainingTime !== 0) {
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);

      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }

      timeHTML = remainingMinutes + ":" + remainingSeconds;
    }

    debug(player, 'IMA Countdown Remaining: ' + timeHTML);
    timeRemainingEl.innerHTML = timeHTML;
  } // function addControl(player) {
  //   const adControlBar = player.getChild('ControlBar');
  //   return adControlBar.addChild(
  // 		'Countdown',
  // 		player.countdown,
  // 		[player.countdown.controlBarPosition]
  // 	);
  // }


  var createAdDurationEl = function createAdDurationEl() {
    var countdownDiv = document.createElement('div');
    countdownDiv.className = 'vjs-ima-countdown vjs-time-control';
    var adTxtEl = document.createElement('span');
    adTxtEl.className = 'vjs-ima-countdown-child vjs-ima-countdown-text';
    adTxtEl.innerText = defaults.text;
    countdownDiv.appendChild(adTxtEl);
    var adsCount = document.createElement('span');
    adsCount.className = 'vjs-ima-countdown-child vjs-ima-countdown-ads-count';
    adsCount.innerText = '0 of 0';
    countdownDiv.appendChild(adsCount);
    var adConectDot = document.createElement('span');
    adConectDot.className = 'vjs-ima-countdown-child vjs-ima-countdown-ad-connect-dot';
    adConectDot.innerText = '.';
    countdownDiv.appendChild(adConectDot);
    var adTime = document.createElement('span');
    adTime.className = 'vjs-ima-countdown-child vjs-ima-countdown-time';
    countdownDiv.appendChild(adTime);
    return countdownDiv;
  };
  /**
   * get ad time remaining from im3 plugin
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} adDurationEl
   *        Html node of adtime
   */


  function timeRemaining(player, adDurationEl) {
    var remainingTime = player.ima3.adsManager.getRemainingTime();

    if (player.ads.state !== 'ad-playback') {
      updateTime(player, 0, adDurationEl);
    } else {
      updateTime(player, remainingTime, adDurationEl);
    }
  }
  /**
   * Insert ad Time node into controlbar
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} adDurationEl
   *        Html node of adtime
   */


  function onAdsAdStarted(player, adDurationEl) {
    debug(player, 'Start to set current ad pos and total ads');
    var countAdsEl = adCountAdsEl(adDurationEl);
    countAdsEl.innerHTML = player.ads.pod.id + " of " + player.ads.pod.size;
  }
  /**
   * Remove ad Time node into controlbar
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} adDurationEl
   *        Html node of adtime
   */


  function onAdsAdEnded(player, adDurationEl) {
    debug(player, 'Destroy adDuration Element');
    adDurationEl.parentNode.removeChild(adDurationEl);
  }
  /**
   * Count and update time remaining for ad in Play mode
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} adDurationEl
   *        Html node of adtime
   */


  function onAdPlay(player, adDurationEl) {
    debug(player, 'IMA Countdown timerInterval Started');
    player.countdown.timerInterval = setInterval(timeRemaining.bind(player, player, adDurationEl), 250);
  }
  /**
   * Stop count and update time remaining for ad
   *
   * @param {Player} player
   *        A Video.js player object.
   */


  function onAdStop(player) {
    debug(player, 'IMA Countdown timerInterval Stopped');
    clearInterval(player.countdown.timerInterval);
  }
  /**
   * Init callbacks methods for ad
   *
   * @param {Player} player
   *        A Video.js player object.
   */


  function onAdLoad(player) {
    // const countdown = addControl(player);
    // player.countdown.timeEl = countdown.timeEl_;
    var controlBar = player.controlBar.el();
    var fullScreenToggleEl = player.getChild('ControlBar').getChild('FullscreenToggle').el();
    var adDurationEl = createAdDurationEl();
    controlBar.insertBefore(adDurationEl, fullScreenToggleEl);
    player.on('adstart', function () {
      onAdPlay(player, adDurationEl);
    });
    player.on('ads-play', function () {
      onAdPlay(player, adDurationEl);
    });
    player.on('adend', function () {
      onAdStop(player);
      onAdsAdEnded(player, adDurationEl);
    });
    player.on('ads-pause', function () {
      onAdStop(player);
    });
    player.on('ads-ad-started', function () {
      onAdsAdStarted(player, adDurationEl);
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
    console.log('playlocal24', player); // const controlBar = player.controlBar.el();
    // const adDurationEl = createAdDurationEl();
    // controlBar.appendChild(adDurationEl);
    // add control
    // const controlBar = player.getChild('ControlBar');
    // const Countdown = new CountdownComp(player, settings);
    // console.log('CountdownComp', Countdown)
    // controlBar.addChild(Countdown, player.countdown);
    // end add control

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
