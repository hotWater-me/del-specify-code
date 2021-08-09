const fs = require('fs');
const path = require('path');
const list = [];
const curProcess = process.argv.slice(2);
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
const delConsole = (filePath, regParam) => {
  filePath.forEach((ele) => {
    const data = fs.readFileSync(ele);
    const parse = data.toString().replace(eval(regParam), '');
    fs.writeFileSync(ele, parse);
  });
};

if (setFile.param && setReg.param) {
  new Promise((resolve) => {
    console.log('Start Execution');
    resolve();
  }).then(() => {
    delConsole(listFile(setFile.param), setReg.param);
    console.log('Success');
  });
} else {
  console.log('Faild 可能路径或者正则未输入参数');
  process.exit(1);
}
