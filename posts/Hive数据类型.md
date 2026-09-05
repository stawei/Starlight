---
title: jQuery操作
date: 2024-06-14 12:32:00
categories: [学习]
tags:
  - 笔记
  - jQuery
  - 学习
description: jQuery操作
articleGPT: 本文详细介绍了jQuery的样式操作、DOM操作、事件处理等核心功能，包括CSS方法、类样式操作、元素创建与删除、属性操作等内容，适合前端开发者学习参考。
references:
  - title: jQuery操作
    url: https://github.com/stawei/vitepress-theme-curve
---
##  基本数据类型
|  Hive数据类型   |  Java数据类型   |  长度   |  例子  |
| --- | --- | --- | --- |
| TINYINT | byte | 1byte有符号整数 | 20 |
| SMALINT | short | 2byte有符号整数 | 20 |
| `INt` | int | 4byte有符号整数 | 20 |
| `BIGINT` | long | 8byte有符号整数 | 20 |
| BOOLEAN | boolean | 布尔类型，true或者false | TRUE FALSE |
| FLOAT | float | 单精度浮点数 | 3.14159 |
| `DOUBLE` | double | 双精度浮点数 | 3.14159 |
| `STRING` | string | 字符系列。可以指定字符集。可以使用单引号或者双引号 |  ‘now is the time’ “for all good men“ |

对于Hive的String类型相当于数据库的varchar类型，该类型是一个可变的字符串，不过它不能声明其中 最多能存储多少个字符，理论上它可以存储2GB的字符数.
## 集合数据类型
| 数据类型 | 描述 | 语法示例 |
| --- | --- | --- |
| STRUCT | 和c语言中的struct类似，都可以通过“点”符号访问元素内容。例如：如果某个列的数据类型是STRUCT{first STRING, last STRING},那么第1个元素可以通过字段.first来引用。 | struct() 例如： struct< street:string, city:string  > |
| MAP |  MAP是一组键-值对元组集合，使用数组表示法可以访问数据。例如：如果某个列的数据类型是MAP，其中键->值对是’first’->’John’和’last’->’ Doe’，那么可以通过字段名[‘last’]获取最后一个元素 |  map() 例如： map< string, int  > |
| ARRAY | 数组是一组具有相同类型和名称的变量的集合。这些变量称为数组的元素，每个数组元素都有一个编号，编号从零开始。例如： 数组值为[‘John’, ‘Doe’]，那么第2个元素可以通过数组名[1]进行引用。   |  Array() 例如：array< string  > |

Hive有三种复杂数据类型ARRAY、MAP 和 STRUCT。ARRAY和MAP与Java中的Array和Map类似，而 STRUCT与C语言中的Struct类似，它封装了一个命名字段集合，复杂数据类型允许任意层次的嵌套.

## 类型转换

1. Hive 的基本数据类型是可以进行隐式转换的，类似于Java的类型转换

例如:某表达式使用INT类型，TINYINT会自动转换为INT类型，但是Hive不会进行反向转化
例如，某表达式使用TINYINT 类型，INT 不会自动转换为TINYINT 类型，它会返回错误，除非使用CAST 操作。  

2. 隐式类型转换规则如下
- 任何整数类型都可以隐式地转换为一个范围更广的类型，如INT可以转换成BIGINT。
- 所有整数类型、FLOAT和STRING类型都可以隐式地转换成DOUBLE。
- TINYINT、SMALLINT、INT 都可以转换为FLOAT。
- BOOLEAN 类型不可以转换为任何其它的类型。
3. 可以使用CAST操作显示进行数据类型转换
例如：CAST('1' AS INT)将把字符串'1' 转换成整数1；
如果强制类型转换失败，如执行CAST('X' AS INT)，表达式返回空值 NULL。
```markdown
hive(default)> select '1'+2, cast('1'as int) + 2; 
+------+------+--+ 
| _c0  | _c1  | 
+------+------+--+ 
| 3.0  | 3    | 
+------+------+--+ 
```
