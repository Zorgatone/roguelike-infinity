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
if (null === ctx) {
    throw new Error("Cannot get 2D canvas context");
}
paint();
function paint() {
    if (ctx === null) {
        return;
    }
    var tileSize = 32 * devicePixelRatio;
    var box = getBoxSize(canvas, tileSize);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(box.x + 0.5, box.y + 0.5);
    // ctx.lineTo(box.x + box.width + 0.5, box.y + 0.5);
    // ctx.lineTo(box.x + box.width + 0.5, box.y + box.height + 0.5);
    // ctx.lineTo(box.x + 0.5, box.y + box.height + 0.5);
    // ctx.lineTo(box.x + 0.5, box.y + 0.5);
    // ctx.closePath();
    // ctx.stroke();
    ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.width, box.height);
    window.requestAnimationFrame(paint);
}
function getBoxSize(canvas, tileSize) {
    var factor = 6 * devicePixelRatio;
    var box = {
        width: Math.ceil(canvas.width - factor),
        height: Math.ceil(canvas.height - factor)
    };
    var offset = {
        width: Math.ceil(box.width % tileSize),
        height: Math.ceil(box.height % tileSize)
    };
    return {
        x: Math.ceil(factor / 2) + Math.ceil(offset.width / 2),
        y: Math.ceil(factor / 2) + Math.ceil(offset.height / 2),
        width: Math.ceil(box.width - offset.width),
        height: Math.ceil(box.height - offset.height)
    };
}
function adjustCanvas(canvas) {
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
