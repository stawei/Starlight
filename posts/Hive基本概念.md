---
title: Hive基本概念
date: 2024-06-25 10:45:03
categories: [学习]
tags: [笔记, Hive, 学习]
description: hive基本概念
articleGPT: 关于Hive的基本介绍，包括官网地址、文档查看地址、下载地址和GitHub地址
references:
  - title: Hive
    url: https://hive.apache.org/
---

Hive 官网地址[http://hive.apache.org/]() 
文档查看地址[https://cwiki.apache.org/confluence/display/Hive/GettingStarted ](https://cwiki.apache.org/confluence/display/Hive/GettingStarted)
下 载 地 址 [http://archive.apache.org/dist/hive/ ]()
github 地 址[https://github.com/apache/hive]()

## Hive
###  Hive 简介  

- Hive：由Facebook 开源用于解决海量`结构化`日志的数据统计工具。 
- Hive 是基于 Hadoop 的一个`数据仓库工具`，将结构化的数据文件映射为一张表，并提供类 `SQL(HQL)`查询功能。  
### Hive 本质：将HQL（hiveSQL）转化成MapReduce 程序  
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1719277640464-89e82cf8-d66f-410b-9e1e-e2eb6b99343a.png#averageHue=%23c8dfb8&clientId=uca2645df-768a-4&from=paste&height=602&id=uc2d648ac&originHeight=1204&originWidth=2346&originalType=binary&ratio=2&rotation=0&showTitle=false&size=530726&status=done&style=none&taskId=u75006f44-91c1-4335-9e50-8f9cd513f14&title=&width=1173)

1.  Hive 处理的`数据存储在HDFS ` 
2.  Hive 分析`数据底层`的实现是`MapReduce`  
3.  执行程序运行在`Yarn`上  
4.  结构化文件如何映射成一张表的？借助存储在`元数据数据库`中的元数据来`解析结构化文件`  
##  Hive架构原理  
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1719277538344-810dfdf7-2de1-4f1b-b31c-7eb0a0c2ba6e.png#averageHue=%23ededed&clientId=uca2645df-768a-4&from=paste&height=456&id=uf0a0e45b&originHeight=912&originWidth=1298&originalType=binary&ratio=2&rotation=0&showTitle=false&size=95182&status=done&style=none&taskId=uab191bbd-8e50-4f1b-82e5-4703c012fc9&title=&width=649)
###  Hive架构介绍
|  1）用户接口： Client   |  CLI（command-line interface）、 JDBC/ODBC(jdbc访问hive)、   |  |
| --- | --- | --- |
|  2）元数据： Metastore |  元数据包括： 表名、表所属的数据库（默认是default）、表的拥有者、列/分区字段、表的 类型（是否是外部表）、表的数据所在目录等； 默认存储在自带的`derby`数据库中，推荐使用`MySQL`存储Metastore   |  |
|  3）Hadoop   |  使用HDFS进行存储，使用MapReduce进行计算。 |  |
|  4）驱动器： Driver   |  解析器（SQL P arser）：   |  将SQL字符串转换成`抽象语法树AST`， 这一步一般都用第三方工具库完成，比如 antlr；对AST进行语法分析，比如表是否存 在、字段是否存在、SQL语义是否有误。   |
|  |  编译器（Physical Plan）：   |  将AST编译生成`逻辑执行计划`。   |
|  |  优化器（Query Optimizer）：   |  对逻辑执行计划进行优化。   |
|  |  执行器（Execution）：   |  把逻辑执行计划转换成可以运行的物理计 划。对于Hive来说，就是`MR/Spark`。   |

###  Hive的运行机制
![image.png](https://cdn.nlark.com/yuque/0/2024/png/29368235/1719278121708-e9d17492-ec59-44c8-a905-d44b1b4780fe.png#averageHue=%23f7efe8&clientId=uca2645df-768a-4&from=paste&height=512&id=u492b8d2f&originHeight=1024&originWidth=2134&originalType=binary&ratio=2&rotation=0&showTitle=false&size=457167&status=done&style=none&taskId=uc3cbe20a-39f4-4f39-848d-1177a9bffcb&title=&width=1067)
 hive通过给用户提供的一系列交互接口，接收到的用户的指令（SQl），使用自己的Driver，结合元数据 （MetaStore），将这些指令翻译成MapReduce，提交到Hadoop中执行，最后，将执行返回的结果输出到用户 交互接口中。  
##  Hive和 数据库比较  
| | Hive | MySQL |
| -- | --- | --- |
| 语言 | 类sql | sql |
| 数据规模 | 大数据pb及以上 |  数据量小一般百万左右到达单表极限   |
| 数据插入 |  能增加insert,不能update,delete   |  能insert,update,delete   |
|  数据存储  |  Hdfs   |  拥有自己的存储空间   |
|  计算引擎  |  Mapreduce/spark/tez   |  自己的引擎innodb   |

##  Hive的优缺点  
| 优点                                            | 缺点          |                                                                            |
|-----------------------------------------------|-------------|----------------------------------------------------------------------------|
| 1. 提供了类SQl语法操作接口， 具备快速开发的能力（简单、易上 手）          | Hive的HQL 表达能力有限 | 1）Hive自动生成MapReduce作业，通常情况下 不够智能化                                          |
| 2. 避免了去写MapReduce，减少 开发者的学习成本                 |             | 2）数据挖掘方面不擅长（多个子查询），由于 MapReduce数据处理流程的限制，效率更高的算 法却无法实现                     |
| 3. Hive优势在于处理大数据，在 处理小数据时没有优势，因为 Hive的执行延迟较高。 | Hive的效率比 较低 | 1）Hive的执行延迟比较高，因为Hive常用于数 据分析，对实时性要求不高的场合                                  |
|                                               |             | 2）Hive调优比较困难，粒度较粗                                                          |
| 4. Hive支持用户自定义函数，用 户可以根据自己的需求来实现自己 的函数        | Hive不支持实 时查询和行级别更新 | hive分析的数据是存储在HDFS上的，而HDFS 仅支持追加写，所以在hive中不能update和 delete，只能select和insert。 |

