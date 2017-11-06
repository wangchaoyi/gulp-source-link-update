/**
 * Created by 55hudong on 2016/4/6.
 */

'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var jsdom = require("jsdom");
var path = require("path");
var fs = require("fs");
var concat = require("gulp-concat");

/**
 * 判断合法的link标签
 * @param s
 * @returns {boolean}
 */
function isStyleTag(s) {
    return /<link\s+[^]*?\/>/.test(s);
}

/**
 * 判断合法的script标签
 * @param s
 * @returns {boolean}
 */
function isScriptTag(s) {
    return /<script\s+[^]*?<\/script>/.test(s);
}

/**
 * 传入一个字符串，判断里面全部样式链接地址
 * @param s
 * @returns {Array}
 */
function getStyleSrc(s) {
    var links = [];
    var r = /<link[^]*?href=(["'])([^]*?)(\1)[^]*?\/>/g;
    var result;

    while ((result = r.exec(s)) !== null) {
        links.push(result[2]);
    }

    return links;
}

/**
 * 传入一个字符串，判断里面全部的脚本链接地址
 * @param s
 * @returns {Array}
 */
function getScriptSrc(s) {
    var links = [];
    var r = /<script[^]*?src=(["'])([^]*?)(\1)[^]*?<\/script>/g;
    var result;

    while ((result = r.exec(s)) !== null) {
        links.push(result[2]);
    }

    return links;
}

/**
 * 解析html内容，返回所有css链接和js链接
 */
function parseHtmlContent(htmlContent) {

    // 判断作用域
    //  /<!--\s*?(build)\s*start\((.*)\)([^]*?)<!--\s*?build\s*?end\s*?-->/g

    // 读取自定义变量
    // /(\w+)=([\w.\-_]+)/g

    var scopeReg = /<!--\s*?(build)\s*start\((.*)\)\s+-->([^]*?)<!--\s*?build\s*?end\s*?-->/g,
        result;

    var cssList = [],
        jsList = [];

    htmlContent = htmlContent || fs.readFileSync("tests/demo1/index.html");

    while ((result = scopeReg.exec(htmlContent)) !== null) {
        if(isStyleTag(result[3])){
            getStyleSrc(result[3]).forEach(function (src) {
                cssList.push(src);
            });

        }else if(isScriptTag(result[3])){
            getScriptSrc(result[3]).forEach(function (src) {
                jsList.push(src);
            });
        }

    }

    return {
        css: cssList,
        js: jsList
    }
}

function parseHtml(fileOrFiles) {
    var files = [],
        cssList = [],
        jsList = [];

    if(typeof fileOrFiles === "string"){
        files.push(fileOrFiles);
    }else if(Array.isArray(fileOrFiles)){
        fileOrFiles.forEach(function (file) {
            files.push(file);
        });
    }

    files.forEach(function (file) {
        var obj = parseHtmlContent(fs.readFileSync(file).toString());
        cssList = cssList.concat(obj.css);
        jsList = jsList.concat(obj.js);
    });

    cssList = cssList.filter(function (src, index) {
        return cssList.indexOf(src) === index;
    });

    jsList = jsList.filter(function (src, index) {
        return jsList.indexOf(src) === index;
    });

    return {
        css: cssList,
        js: jsList
    }
}


module.exports = function (options) {


    return through.obj(function (file, enc, cb) {

        var _this = this;

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        // 将文件内容转成字符串，file.contents.toString();
        // 然后将处理后的字符串，再转成Buffer形式
        var content = file.contents.toString();


        // 下面这两句基本是标配啦，可以参考下 through2 的API
        _this.push(file);

        cb();


    });
};

exports = module.exports;

exports.isStyleTag = isStyleTag;
exports.isScriptTag = isScriptTag;
exports.getScriptSrc = getScriptSrc;
exports.getStyleSrc = getStyleSrc;
exports.parseHtml = parseHtml;
exports.parseHtmlContent = parseHtmlContent;
