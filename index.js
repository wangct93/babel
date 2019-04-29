/**
 * Created by wangct on 2018/12/22.
 */
const babel = require('@babel/core');
const path = require('path');
const appDir = process.cwd();
const resolve = (...paths) => path.resolve(appDir,...paths);
const fs = require('fs');

const util = require('wangct-server-util');


class Babel {
    constructor(option) {
        this.init(option);
    }
    init(option) {
        const state = {
            accept: ['js', 'jsx','ts','tsx'],
            option:{
                presets: ['@babel/preset-typescript','@babel/preset-react','@babel/preset-env'],
                plugins: [
                  ["@babel/plugin-proposal-decorators",{legacy:true}]
                ]
            }
        };
        this.props = {
            ...state,
            ...option,
            output: resolve(option.output)
        };
        this.start();
    }
    start() {
        const {props} = this;
        util.copyFile({
            src:props.src,
            output:props.output,
            transform:(filePath,outputFilePath,callback) => {
                const extname = path.extname(filePath).substr(1);
                if(this.props.accept.includes(extname)){
                    babel.transformFile(filePath, props.option, (err, result) => {
                        if (err) {
                            callback(err);
                        } else {
                            fs.writeFile(outputFilePath.replace(/\.tsx?$/,'.js'), result.code, callback);
                        }
                    });
                }else{
                    const rs = fs.createReadStream(filePath);
                    const ws = fs.createWriteStream(outputFilePath);
                    rs.pipe(ws);
                    ws.on('close',() => {
                        callback();
                    });
                }
            },
            success:props.success
        });
    }
}

module.exports = Babel;