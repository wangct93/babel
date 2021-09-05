/**
 * Created by wangct on 2018/12/22.
 */
const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const {copyFile} = require('@wangct/node-util');
module.exports = start;

/**
 * 开始方法
 */
function start(options){
    const babelOptions = {
        presets:getPresets(),
        plugins:getPlugins(options),
        ...options.options,
    };
    return copyFile(options.src,options.output,{
        ...options,
        transform:(filePath,outputFilePath) => {
            return new Promise(callback => {
                const extname = path.extname(filePath).substr(1);
                if(['js', 'jsx','ts','tsx'].includes(extname)){
                    babel.transformFile(filePath, babelOptions, (err, result) => {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            fs.writeFile(outputFilePath.replace(/\.tsx?$/,'.js'), result.code, callback);
                        }
                        console.log('已完成文件：',outputFilePath.replace(/\.tsx?$/,'.js'));
                    });
                }else{
                    const rs = fs.createReadStream(filePath);
                    const ws = fs.createWriteStream(outputFilePath);
                    rs.pipe(ws);
                    ws.on('close',() => {
                        callback();
                        console.log('拷贝完成：',outputFilePath);
                    });
                }
            })
        }
    });
}


function getPlugins(options = {}){
    const plugins = [
        ['@babel/plugin-transform-typescript', {
            isTSX: true,
            allExtensions: true
        }],
        '@babel/plugin-syntax-dynamic-import',
        ['import', {
            libraryName: 'antd',
            libraryDirectory:'es',
            style: 'css',
        },'ant'],
        ['@babel/plugin-proposal-decorators',{legacy:true}],
        ['@babel/plugin-proposal-class-properties',{loose:true}],
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-export-default-from'
    ];
    if(options.runtime){
        plugins.unshift('@babel/plugin-transform-runtime');
    }
    return plugins;
}

function getPresets(){
    return ['@babel/preset-react', ['@babel/preset-env',{
        loose:true,
    }]];
}
