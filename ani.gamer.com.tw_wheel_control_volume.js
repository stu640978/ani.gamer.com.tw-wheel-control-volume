// ==UserScript==
// @name         Video Volume Control with Mouse Wheel in ani.gamer.com.tw
// @name:zh-TW   巴哈姆特動畫瘋滾輪控制音量大小
// @name:zh-CN   巴哈姆特动画疯滚轮控制音量大小
// @namespace    JTRKON
// @author       JTRKON
// @version      1.1
// @description  Control the volume of video elements using mouse wheel
// @description:zh-TW   巴哈姆特動畫瘋播放器中透過滾輪控制音量大小功能
// @description:zh-CN   巴哈姆特动画疯播放器中透过滚轮控制音量大小功能
// @match        http://ani.gamer.com.tw/animeVideo.php*
// @match        https://ani.gamer.com.tw/animeVideo.php*
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  // 創建音量顯示元素
  var volumeDisplay = document.createElement("div");
  volumeDisplay.classList.add("volume-display");
  volumeDisplay.style.display = "none";
  volumeDisplay.style.position = "fixed";
  volumeDisplay.style.top = "50%";
  volumeDisplay.style.left = "50%";
  volumeDisplay.style.transform = "translate(-50%, -50%)";
  volumeDisplay.style.background = "rgba(0, 0, 0, 0.5)";
  volumeDisplay.style.color = "#fff";
  volumeDisplay.style.padding = "5px 10px";
  volumeDisplay.style.fontFamily = "Arial, sans-serif";
  volumeDisplay.style.fontSize = "16px";
  volumeDisplay.style.zIndex = "99999";

  var volumeTimeout;

  // 監聽滾輪事件，根據滾輪方向調整音量
  document.addEventListener("wheel", function (event) {
    /*if (event.cancelable) {
        event.preventDefault();
    }*/
    var video = document.querySelector("video");

    if (video) {
      if (
        document.body.classList.contains("fullscreen") ||
        document.fullscreenElement === video.parentElement
      ) {
        var volume = video.volume;
        if (!video.parentElement.querySelector(".volume-display")) {
          video.parentElement.appendChild(volumeDisplay);
        }
        if (event.deltaY < 0) {
          volume += 0.02;
        } else {
          volume -= 0.02;
        }

        // 限制音量在有效範圍內
        volume = Math.max(0, Math.min(1, volume));

        video.volume = volume;

        // 更新音量顯示
        volumeDisplay.textContent =
          "Volume: " + (video.volume * 100).toFixed(0) + "%";
        volumeDisplay.style.display = "block";

        // 清除之前的計時器
        clearTimeout(volumeTimeout);

        // 設置計時器，2秒後隱藏音量顯示
        volumeTimeout = setTimeout(function () {
          volumeDisplay.style.display = "none";
        }, 2000);
      }
    }
  });
})();
