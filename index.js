/*
 * @Author: your name
 * @Date: 2020-07-10 23:37:06
 * @LastEditTime: 2020-07-10 23:42:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /css/index.js
 */

var obj = { a: 1, b: 2, c: 3, d: 0, j: 0 }


/**
 * 解析自定义公式计算求值
 * @description: 
 * @param { string } formula 公式表达式
 * @param { object } context 指定公式表达式的上下文
 * @param { number } decimal 保留小数位数
 * @return: 
 */
function calc(formula, context, decimal = 2) {

  // 求得基数保证后期计算精准的小树
  const base = (() => {
    let i = '1'
    while (decimal) {
      i += '0'
      decimal -= 1
    }
    return +i
  })()

  // 1、解析公式，添加 round 解决浮点数计算进度bug
  const [resultKey, expression] = formula.split('=').map(item => item.trim());



  // 2、处理 拼接表达式
  const generateFormula = `${resultKey} = Math.round( ( ${expression} ) * ${base} ) / ${base}`

  with (context) {
    eval(generateFormula)
  };

  // 3、打印 自定义公式计算求值，以便可视化调试
  (() => {
    let newFormula = expression.split(' ');
    let pintExpression = ''
    for (let i = 0; i < newFormula.length; i++) {
      const current = newFormula[i]
      if (/(\*|\/|\+|\-|\%|\(|\)|\d)+/.test(current)) {
        pintExpression += ` ${current}`
      } else {
        pintExpression = `${pintExpression} ` + context[current]
      }
    }
    console.log(`%c 当前计算公式 ${expression}；     求值： ${pintExpression}`, 'color:#00bcd4;')
  })()
}
calc('d = c / ( 1 - a / 100 ) + b', obj, 6)
calc('j = c / ( 1 - a / 100 ) * b', obj, 6)
debugger
