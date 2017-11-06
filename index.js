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


function isStyleTag(s){
    return /<link\s+[^]*?\/>/.test(s);
}
function isScriptTag(s){
    return /<script\s+[^]*?<\/script>/.test(s);
}

function getStyleSrc(s){
    var links = [];
    var r = /<link[^]*?href=(["'])([^]*?)(\1)[^]*?\/>/g;
    var result;
    
    while((result = r.exec(s)) !== null){
        links.push(result[2]);
    }
    
    return links; 
}

function getScriptSrc(s){
    var links = [];
    var r = /<script[^]*?src=(["'])([^]*?)(\1)[^]*?<\/script>/g;
    var result;
    
    while((result = r.exec(s)) !== null){
        links.push(result[2]);
    }
    
    return links;    
}

/**
 * 解析html文件
 */ 
function parse(htmlContent){
    // 判断作用域
    //  /<!--\s*?(build)\s*start\((.*)\)([^]*?)<!--\s*?build\s*?end\s*?-->/g
    
    // 读取自定义变量
    // /(\w+)=([\w.\-_]+)/g
    
    
    
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
