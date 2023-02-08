/*! @name videojs-ima-countdown-nzh @version 0.0.0 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsImaCountdownNzh = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "0.0.0";

  var defaults = {
    debug: false,
    text: 'AD',
    controlBarPosition: 1
  }; // class Countdown extends Component {


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
    console.log('playerlocal2', player);
    var controlBar = player.controlBar.el();
    var time = document.createElement('span');
    time.className = 'vjs-text';
    time.innerHTML = "0:00";
    controlBar.appendChild(time);
    player.on('ads-load', function () {
      console.log('ads-load', player); // onAdLoad(player);
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
