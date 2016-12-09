(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _document = document,
    body = _document.body;

var canvas = getCanvas();
window.addEventListener("resize", function (event) {
    if (!event.isTrusted) {
        return;
    }
    adjustCanvas(canvas);
}, true);
adjustCanvas(canvas);
var ctx = canvas.getContext("2d");
function paint() {
    if (ctx === null) {
        return;
    }
    var tileSize = 32;
    var box = getBoxSize(canvas, tileSize);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    window.requestAnimationFrame(paint);
}
function getBoxSize(canvas, tileSize) {
    var offset = {
        width: canvas.width % tileSize,
        height: canvas.height % tileSize
    };
    return {
        x: Math.ceil(offset.width / 2),
        y: Math.ceil(offset.height / 2),
        width: canvas.width - offset.width,
        height: canvas.height - offset.height
    };
}
paint();
function adjustCanvas(canvas) {
    var _window = window,
        devicePixelRatio = _window.devicePixelRatio;

    Object.assign(canvas, {
        width: body.offsetWidth * devicePixelRatio,
        height: body.offsetHeight * devicePixelRatio
    });
}
function getCanvas() {
    var tmp = document.getElementById("game");
    if (!(tmp instanceof HTMLCanvasElement)) {
        throw new Error("Cannot find game canvas");
    }
    return tmp;
}

},{}]},{},[1]);
