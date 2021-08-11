# del-specify-code

##  Install
```jsx
 npm add del-specify-code -g (global)
 npm add del-specify-code -D (local)
```

##  Usage
command
```jsx
 $ del-specify-code -p ./src -r /console\.log\(.*\)/g （文件夹）
 $ del-specify-code -p ./src/test.js -r /console\.log\(.*\)/g (文件)
```
文件配置
新建.del-specify-code.json , 配置如下
```json
 {
    "reg": "/const curName = userInfo\\?.nickName \\|\\| userInfo\\?.realName;/g",
    "path": "/Users/wangyunpeng/Desktop/backup/data-asset-management/src/pages/Property/index.js"
}
```
备注: reg有空格or正则表达式比较长,需要使用配置文件。
