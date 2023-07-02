// ==UserScript==
// @name         Video Volume Control with Mouse Wheel in ani.gamer.com.tw
// @name:zh-TW   巴哈姆特動畫瘋滾輪控制音量大小
// @name:zh-CN   巴哈姆特动画疯滚轮控制音量大小
// @namespace    JTRKON
// @author       JTRKON
// @version      1.0
// @description  Control the volume of video elements using mouse wheel
// @description:zh-TW   巴哈姆特動畫瘋播放器中透過滾輪控制音量大小功能
// @description:zh-CN   巴哈姆特动画疯播放器中透过滚轮控制音量大小功能
// @match        http://ani.gamer.com.tw/animeVideo.php*
// @match        https://ani.gamer.com.tw/animeVideo.php*
// @grant        none
// @license      MIT
// ==/UserScript==
 
(function() {
    'use strict';
 
    // 要控制音量的 video 元素选择器
    var videoSelector = 'video';
 
    // 创建一个用于显示音量的元素
    var volumeDisplay = document.createElement('div');
    volumeDisplay.classList.add('volume-display');
    volumeDisplay.style.display = 'none';
    volumeDisplay.style.position = 'fixed';
    volumeDisplay.style.top = '50%';
    volumeDisplay.style.left = '50%';
    volumeDisplay.style.transform = 'translate(-50%, -50%)';
    volumeDisplay.style.background = 'rgba(0, 0, 0, 0.5)';
    volumeDisplay.style.color = '#fff';
    volumeDisplay.style.padding = '5px 10px';
    volumeDisplay.style.fontFamily = 'Arial, sans-serif';
    volumeDisplay.style.fontSize = '16px';
    volumeDisplay.style.zIndex = '99999';
 
    var volumeTimeout;
 
    // 监听滚轮事件，根据滚动方向调整音量大小
    document.addEventListener('wheel', function(event) {
        /*if (event.cancelable) {
            event.preventDefault();
        }*/
        var video = document.querySelector('video');
 
        if (video) {
            if (document.fullscreenElement === video.parentElement) {
                var volume = video.volume;
                if (!video.parentElement.querySelector('.volume-display')) {
                    video.parentElement.appendChild(volumeDisplay);
                }
                if (event.deltaY < 0) {
                    volume += 0.02;
                } else {
                    volume -= 0.02;
                }
 
                // 限制音量在有效范围内
                volume = Math.max(0, Math.min(1, volume));
 
                video.volume = volume;
 
                // 更新音量显示
                volumeDisplay.textContent = 'Volume: ' + (video.volume * 100).toFixed(0) + '%';
                volumeDisplay.style.display = 'block';
 
                // 清除之前的定时器
                clearTimeout(volumeTimeout);
 
                // 设置定时器，2秒后隐藏音量显示
                volumeTimeout = setTimeout(function() {
                    volumeDisplay.style.display = 'none';
                }, 2000);
            }
        }
    });
})();