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

  var defaults = {
    debug: false,
    text: 'AD',
    controlBarPosition: 1
  };

  var debug = function debug(player, value) {
    /* eslint-disable no-console */
    if (player.countdown.debug) {
      console.info(value);
    }
    /* eslint-enable no-console */

  };
  /**
   * @function adImaCountdownEl
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  var adImaCountdownEl = function adImaCountdownEl(controlBar) {
    return controlBar.querySelector('.vjs-ima-countdown.vjs-time-control');
  };
  /**
   * @function adRemainingTimeEl
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  var adRemainingTimeEl = function adRemainingTimeEl(controlBar) {
    var currentImaCountdownEl = adImaCountdownEl(controlBar);
    return currentImaCountdownEl ? currentImaCountdownEl.querySelector('.vjs-ima-countdown-time') : null;
  };
  /**
   * @function adCountAdsEl
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  var adCountAdsEl = function adCountAdsEl(controlBar) {
    var currentImaCountdownEl = adImaCountdownEl(controlBar);
    return currentImaCountdownEl ? currentImaCountdownEl.querySelector('.vjs-ima-countdown-ads-count') : null;
  };
  /**
   * Function to define ad time remaining then insert to dom element
   *
   * @function updateTime
   * @param {Player} player
   *        A Video.js player object.
   * @param {string} remainingTime
   *        time remaining value
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  function updateTime(player, remainingTime, controlBar) {
    var timeRemainingEl = adRemainingTimeEl(controlBar);
    if (!timeRemainingEl) return null;
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
  }

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
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  function timeRemaining(player, controlBar) {
    var remainingTime = player.ima3.adsManager.getRemainingTime();

    if (player.ads.state !== 'ad-playback') {
      updateTime(player, 0, controlBar);
    } else {
      updateTime(player, remainingTime, controlBar);
    }
  }
  /**
   * Insert ad Time node into controlbar
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  function onAdsAdStarted(player, controlBar) {
    debug(player, 'Start to set current ad pos and total ads');
    var countAdsEl = adCountAdsEl(controlBar);
    countAdsEl.innerHTML = player.ads.ad.index + 1 + " of " + player.ads.pod.size;
  }
  /**
   * Remove ad Time node into controlbar
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} adDurationEl
   *        Html node of adtime
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  function onAdsAdEnded(player, adDurationEl, controlBar) {
    debug(player, 'Destroy adDuration Element');
    controlBar.removeChild(adDurationEl);
  }
  /**
   * Count and update time remaining for ad in Play mode
   *
   * @param {Player} player
   *        A Video.js player object.
   * @param {HTMLElement} controlBar
   *        Html node of controlbar
   */


  function onAdPlay(player, controlBar) {
    debug(player, 'IMA Countdown timerInterval Started');
    player.countdown.timerInterval = setInterval(timeRemaining.bind(player, player, controlBar), 250);
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
    var controlBar = player.controlBar.el();
    var fullScreenToggleEl = player.getChild('ControlBar').getChild('FullscreenToggle').el();
    var adDurationEl = createAdDurationEl();
    player.on('adstart', function () {
      if (!adImaCountdownEl(controlBar)) {
        controlBar.insertBefore(adDurationEl, fullScreenToggleEl);
      }

      onAdPlay(player, controlBar);
    });
    player.on('ads-play', function () {
      onAdPlay(player, controlBar);
    });
    player.on('adend', function () {
      onAdStop(player);
      onAdsAdEnded(player, adDurationEl, controlBar);
    });
    player.on('ads-pause', function () {
      onAdStop(player);
    });
    player.on('ads-ad-started', function () {
      onAdsAdStarted(player, controlBar);
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
