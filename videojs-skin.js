/*! @name videojs-skin-nzherald @version 2.0.0 @license UNLICENSED */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsSkinNzherald = factory(global.videojs));
})(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "2.0.0";

  // This is a CSS class name which will be created and contain skip buttons for mobile version only
  const skipMobileBtnsContainerCss = ".skip-buttons-container";
  const displayMobileSkipBtns = currentVideoPlayer => {
    const currentVideoPlayerRef = document.getElementById(currentVideoPlayer.id());
    const skipButtonsContainer = currentVideoPlayerRef.querySelector(skipMobileBtnsContainerCss);
    if (!skipButtonsContainer) {
      // create new container for skip buttons
      currentVideoPlayerRef.querySelector('video').insertAdjacentHTML('afterend', `<div class="${skipMobileBtnsContainerCss.replace('.', '')}"><div class="row"></div></div>`);
    }

    // Select the skip / play / pause buttons to be cut
    const [skipBackwardBtn, playPauseBtn, skipForwardBtn] = ['.vjs-skip-backward-button', '.vjs-play-control', '.vjs-skip-forward-button'].map(selector => currentVideoPlayerRef.querySelector(selector));

    // Select the target div for the above buttons
    const targetDiv = currentVideoPlayerRef.querySelector(skipMobileBtnsContainerCss + " " + '.row');

    // Cut the buttons from its current location and retain its data and events
    const [backwardBtnEl, playPauseBtnEl, forwardBtnEl] = [skipBackwardBtn, playPauseBtn, skipForwardBtn].map(btn => btn.parentNode.removeChild(btn));

    // Attach the cut buttons to the target div
    targetDiv.appendChild(backwardBtnEl);
    targetDiv.appendChild(playPauseBtnEl);
    targetDiv.appendChild(forwardBtnEl);
  };
  const displayMobileBtns = currentVideoPlayer => {
    displayMobileSkipBtns(currentVideoPlayer);
  };

  const Plugin = videojs__default["default"].getPlugin('plugin');

  // Default options for the plugin.
  const defaults = {};

  /**
   * An advanced Video.js plugin. For more information on the API
   *
   * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
   */
  class SkinNzherald extends Plugin {
    /**
     * Create a SkinNzherald plugin instance.
     *
     * @param  {Player} player
     *         A Video.js Player instance.
     *
     * @param  {Object} [options]
     *         An optional options object.
     *
     *         While not a core part of the Video.js plugin architecture, a
     *         second argument of options is a convenient way to accept inputs
     *         from your plugin's caller.
     */
    constructor(player, options) {
      // the parent class will add player under this.player
      super(player);
      this.options = videojs__default["default"].mergeOptions(defaults, options);
      this.player.ready(() => {
        this.player.addClass('vjs-skin-nzherald');
        this.player.on('play', () => {
          var _document;
          const mobileVideoPlayers = (_document = document) == null ? void 0 : _document.querySelectorAll('.video-js.vjs-touch-enabled');
          if (mobileVideoPlayers && mobileVideoPlayers.length !== 0) {
            displayMobileBtns(this.player);
          }
        });
      });
    }
  }

  // Define default values for the plugin's `state` object here.
  SkinNzherald.defaultState = {};

  // Include the version number.
  SkinNzherald.VERSION = version;

  // Register the plugin with video.js.
  videojs__default["default"].registerPlugin('skinNzherald', SkinNzherald);

  return SkinNzherald;

}));
