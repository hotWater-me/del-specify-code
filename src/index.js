#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const list = [];
const curProcess = process.argv.slice(2);
if (curProcess[0] === '-v') {
  console.log(require('../package.json').version);
  process.exit(0);
}
const opt = curProcess.filter((ele) => ele.substring(0, 5).indexOf('-') !== -1);
const findParam = (param) => {
  const judgePar = curProcess.findIndex((ele) => ele === param);
  if (
    judgePar !== -1 &&
    curProcess[judgePar + 1] &&
    curProcess[judgePar + 1].substring(0, 5).indexOf('-') === -1
  ) {
    return { opt: param, param: curProcess[judgePar + 1] };
  }
  return { opt: param };
};

const allParam = opt.map((ele) => {
  return findParam(ele);
});
let setFile = allParam.find(
  (item) => item.opt === '--path' || item.opt === '-p',
);
let setReg = allParam.find((item) => item.opt === '--reg' || item.opt === '-r');

function listFile(dir) {
  if (dir.charAt(0) === '.') {
    dir = path.join(process.cwd(), dir);
  }
  const arr = fs.readdirSync(dir);
  arr.forEach(function (item) {
    var fullpath = path.join(dir, item);
    var stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      listFile(fullpath);
    } else {
      list.push(fullpath);
    }
  });
  return list;
}
const delMatch = (filePath, regParam) => {
  filePath.forEach((ele) => {
    const data = fs.readFileSync(ele);
    const parse = data.toString().replace(eval(regParam), '');
    fs.writeFileSync(ele, parse);
  });
};

const delFile = (singlefile, regParam) => {
  const data = fs.readFileSync(singlefile);
  const parse = data.toString().replace(eval(regParam), '');
  fs.writeFileSync(singlefile, parse);
}

if (setFile && setReg && setFile.param && setReg.param) {
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    if (fs.lstatSync(setFile.param).isFile()) {
      delFile(setFile.param, setReg.param)
    } else {
      delMatch(listFile(setFile.param), setReg.param);
    }
  });
} else {
  process.exit(1);
};