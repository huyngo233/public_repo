/*! @name videojs-ima-countdown-nzh @version 0.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsImaCountdownNzh = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "0.0.0";

  var Component = videojs__default['default'].getComponent('Component'); // Default options for the plugin.

  var defaults = {
    debug: false,
    text: 'AD',
    controlBarPosition: 1
  }; // const Countdown = videojs.extend(Component, {
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
  // function addControl(player) {
  //   const adControlBar = player.getChild('ControlBar');
  //   return adControlBar.addChild(
  // 		'Countdown',
  // 		player.countdown,
  // 		[player.countdown.controlBarPosition]
  // 	);
  // }
  // function timeRemaining(player) {
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
    // const countdown = addControl(player);
    // player.countdown.timeEl = countdown.timeEl_;
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
    console.log('playerlocal4', player);
    var controlBar = player.controlBar.el();
    var time = document.createElement('span');
    time.className = 'vjs-text';
    time.innerHTML = "0:00";
    controlBar.appendChild(time);
    var newComponent = new Component(player);
    var countdownComp = new newComponent(player, {
      children: ['div', {
        name: 'span',
        controlText: defaults.text,
        className: 'vjs-ima-countdown-text'
      }, {
        name: 'span',
        controlText: '',
        className: 'vjs-ima-countdown-time'
      }]
    });
    player.getChild('ControlBar').addChild(countdownComp);
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
