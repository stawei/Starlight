---
title: DDL数据定义
date: 2024-08-22 13:29:34
categories: [学习]
tags: [笔记, Hive, 学习]
description: Hive DDL数据定义语句详解，包括数据库和表的创建、修改、删除操作
articleGPT: 本文详细介绍了Hive中的DDL（数据定义语言）操作，包括数据库的创建、修改、删除，以及表的创建、分区、内外部表等概念
references:
  - title: starlight
    url: https://github.com/stawei/vitepress-theme-curve
---

> 先一下唠嗑：最近更新的话会比较慢~~一个月一次~~，也是比较忙的。月底有可能会写一个小总结及提一下未来的小目标。博客我也是会偶尔看一下的！
> ~~言归正传以免忘记，~~以下的数据库都是test，用的是虚拟机直接复制的代码有可能会看起来有点别扭，有啥补充的，可以指点指点！

## 创建数据库
创建数据库语法：
```markdown
CREATE DATABASE [IF NOT EXISTS] database_name 
[COMMENT database_comment] 
[LOCATION hdfs_path] 
[WITH DBPROPERTIES (property_name=property_value, ...)]; 
```

1. 创建一个数据库，数据库在HDFS上的默认存储路径是`/user/hive/warehouse/*.db`。
```markdown
hive (default)> create database test;
```

2. 避免要创建的数据库已经存在错误，增加`if not exists`判断。（标准写法）
```markdown
hive (default)> create database test; 
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.DDLTask. Database 
db_hive already exists 
hive (default)> create database if not exists test; 
```

3. 创建一个数据库，指定数据库在HDFS上存放的位置
```markdown
hive (default)> create database test2 location '/test2.db';
```
## 查询数据库
#### 显示数据库

- 显示数据库

hive(default)> `show databases`;

- 过滤显示查询到数据库

hive(default)> `show databases like 'test*'`;
#### 查看数据库详情

- 显示数据库信息

hive(default)> `desc database test`;

- 显示数据库详细信息

hive(default)> `desc database extended test`;

- 创建数据库test3，并设置其createtime属性

hive(default)> `create database test3 with dbproperties('createtime'='20240819')`;
#### 切换当前数据库
hive (default)> `use test`;
## 修改数据库
用户可以使用 `ALTER DATABASE` 命令为某个数据库的 `DBPROPERTIES` 设置键-值对属性值，来描述这个数据库的属 性信息。数据库其他的元数据信息都是不可以修改的，包括数据库名和数据库所在的目录位置。
hive (default)> `alter database test set dbproperties('createtime'='20211022')`;
## 删除数据库

- 删除空数据库

hive(default)>`drop database` test2;

- 如果删除的数据库不存在，最好采用 if exists判断数据库是否存在

hive(default)> `drop database if exists` test2;

- 如果数据库不为空，可以采用`cascade`命令，强制删除
```markdown
hive(default)> drop database test; (以下是报错！！！)
FAILED: Execution Error, return code 1 from org.apache.hadoop.hive.ql.exec.DDLTask. 
InvalidOperationException(message:Database test is not empty. One or more tables exist.) 
hive(default)> drop database test cascade; 
```

## 创建表

1. 语法 create table ...
```markdown
CREATE [EXTERNAL] TABLE [IF NOT EXISTS] table_name  
[(col_name data_type [COMMENT col_comment], ...)]  
[COMMENT table_comment]  
[PARTITIONED BY (col_name data_type [COMMENT col_comment], ...)]  
[CLUSTERED BY (col_name, col_name, ...)  
[SORTED BY (col_name [ASC|DESC], ...)] INTO num_buckets BUCKETS]  
[ROW FORMAT row_format]  
[STORED AS file_format]  
[LOCATION hdfs_path] 
[TBLPROPERTIES (property_name=property_value, ...)] 
[AS select_statement] 
[LIKES existing_table_or_view_name] 
```

2. 字段解释说明

| CREATE TABLE | 创建一个指定名字的表。如果相同名字的表已经存在，则抛出异常；用户可以用 IF NOT EXISTS 选项来忽略这个异常 |
| --- | --- |
| EXTERNAL |1. 关键字可以让用户创建一个外部表 在建表的同时可以指定一个指向实际数据的路径（LOCATION）2. 在删除表的时候 内部表的元数据和数据会被一起删除， 外部表只删除元数据，不删除数据。 |
| COMMENT | 为表和列添加注释。 |
| PARTITIONED BY | 创建分区表 |
| CLUSTERED BY | 创建分桶表 |
| SORTED BY | 不常用，对桶中的一个或多个列另外排序 |
| ROW FROMAT |- ROW FORMAT DELIMITED [FIELDS TERMINATED BY char] [COLLECTION ITEMS TERMINATED BY char] [MAP KEYS TERMINATED BY char] [LINES TERMINATED BY char] &#124; SERDE serde_name [WITH SERDEPROPERTIES (property_name=property_value, property_name=property_value, ... )]- Fields 指定字段之间的分隔符 Collection 用于指定集合中元素间的分隔符 Map 用于指定map集合中键值对间的分隔符 Lines 用于指定每行记录间的分隔符 SerDe是Serialize/Deserialize的简称 用户在建表时可以自定义SerDe或使用自带的 SerDe 若未指定Row Format，则用自带的SerDe |
| STORE AS | 指定存储文件类型 常用的文件存储类型： SEQUENCEFILE（二进制序列文件）、TEXTFILE（文本）、RCFILE（列式存储格式文件） 如：store as textfile、store as sequencefile |
| LOCATION | 指定表在HDFS上的存储位置 |
| AS | 后跟查询语句，根据查询语句结果创建表 |
| LIKE | 允许用户复制现有的表结构，但是不复制数据 |

## 管理表
### 内部表
#### 理论

1. 默认创建的表都是所谓的`管理表`，有时也被称为`内部表`。
2. 管理表，Hive会控制着`元数据`和`真实数据`的生命周期。
3. Hive默认会将这些表的数据存储在`hive.metastore.warehouse.dir`定义目录的子目录下。
4. 当我们删除一个管理表时，Hive也会删除这个表中数据。
5. 管理表`不适合和其他工具共享数据`。
#### 案例实操

1. 创建数据文件，在/opt/module/hive/datas目录下创建文件student.txt，编辑如下内容：
```markdown
[root@hadoop datas]$ vim student.txt 
1001 ss1 
1002 ss2 
1003 ss3 
1004 ss4 
1005 ss5 
1006 ss6 
1007 ss7 
1008 ss8 
1009 ss9 
```

2. 在hive中创建内部表student
```markdown
create table if not exists student( 
id int, 
name string 
) 
row format delimited 
fields terminated by '\t' 
stored as textfile 
location '/user/hive/warehouse/student';
```

3. 查询表的类型

hive (default)> `desc formatted student;`

4. 根据查询结果创建表（查询的结果会添加到新创建的表中）

hive(default)> `create table if not exists student2 as select id, name from student;`

5. 根据已经存在的表结构创建表

hive(default)> `create table if not exists student3 like student;`

6. 查询表的类型

hive (default)> `desc formatted student2;`

7. 删除表student2后，观察表的元数据和数据文件是否还存在

hive(default)> `drop table student2;`
### 外部表
#### 理论
因为表是外部表，所以Hive并非认为其完全拥有这份数据。删除该表并不会删除掉这份数据，不过描述表的元数据信息会被删除掉。
使用场景：每天将收集到的网站日志定期流入HDFS文本文件。在`外部表（原始日志表）`的基础上做大量的统计分析，用到的中间表、结果表使用`内部表`存储，数据通过 SELECT+INSERT进入内部表。外部表多用于存储原始数据，为多个部门、小组所使用，采用外部表共易`共享数据`。
#### 案例实操

1. 在/opt/module/hive/datas路径上，创建teacher.txt文件，并输入如下内容。
```markdown
1001 teacher1 
1002 teacher2 
1003 teacher3 
1004 teacher4 
1005 teacher5
```

2. 上传数据到HDFS
```markdown
[root@hadoop datas]$ hadoop fs -mkdir -p /school/teacher 
[root@hadoop datas]$ hadoop fs -put teacher.txt /school/teacher 
```

3. 在hive中创建外部表teacher
```markdown
hive (default)> 
create external table if not exists teacher( 
    id int,  
    name string 
) 
row format delimited fields terminated by '\t' 
location '/school/teacher';
```

4. 查看创建的表

hive (default)> `show tables;`

5. 查看表格式化信息

hive (default)> `desc formatted dept;`

6. 删除外部表，观察表的元数据和相应hdfs中的数据

hive (default)> `drop table dept;`
### 管理表与外部表的互相转换

1. 查询表的类型
```markdown
hive (default)> desc formatted student2; 
Table Type:             MANAGED_TABLE
```

2. 修改内部表student2为外部表
```markdown
alter table student2 set tblproperties('EXTERNAL'='TRUE');
```

3. 查询表的类型
```markdown
hive (default)> desc formatted student2; 
Table Type:             EXTERNAL_TABLE
```

4. 修改外部表student2为内部表
```markdown
alter table student2 set tblproperties('EXTERNAL'='FALSE');
```

5. 查询表的类型
```markdown
hive (default)> desc formatted student2; 
Table Type:             MANAGED_TABLE
```
## 修改表
### 重命名表
语法
```markdown
ALTER TABLE table_name RENAME TO new_table_name
```
实操案例
```markdown
hive (default)> alter table student3 rename to student4;
```
### 增加、修改和删除表分区
之后的[分区表基本操作](https://zxwlove.xyz/posts/hive07.html)详情
### 增加/修改/替换列信息
#### 语法
更新列
```markdown
ALTER TABLE table_name CHANGE [COLUMN] col_old_name col_new_name column_type [COMMENT col_comment] [FIRST|AFTER column_name]
```
增加和替换列
```markdown
ALTER TABLE table_name ADD|REPLACE COLUMNS (col_name data_type [COMMENT col_comment], ...)
```
注：ADD是代表新增一字段，字段位置在所有列`后面`(partition列前)，`REPLACE则是表示替换表中所有字段`。 REPLACE使用的时候，字段的类型要跟之前的类型对应上，数量可以减少或者增加，其中就包含了更新列、增加 列、删除列的功能。
#### 实操案例

1. 查询表结构
```markdown
hive(default)> desc test2; 
OK 
col_name        data_type       comment 
id                      int 
```

2. 更新列：将列名id修改为student_id，类型不变。
```markdown
hive(default)> alter table test2 change column id student_id int; 
OK 
Time taken: 0.083 seconds 
hive(default)> desc test2; 
OK 
col_name        data_type       comment 
student_id              int
```

3. 更新列：不修改列名，仅修改列的类型为string。
```markdown
hive(default)> alter table test2 change column student_id student_id string; 
OK 
Time taken: 0.083 seconds 
hive(default)> desc test2; 
OK 
col_name        data_type       comment 
student_id
```

4. 新增列：向test2表中新增一列，列名为name，类型为string。
```markdown
hive (default)> alter table test2 add columns(name string);
hive(default)> desc test2; 
OK 
col_name        data_type       comment 
student_id              string                                       
name                    string
```

5. 调整列的位置:现在想让name的列在最前面，做如下操作：
```markdown
hive(default)> alter table test2 change name name string first; 
OK 
Time taken: 0.139 seconds 
hive (default)> desc test2; 
OK 
col_name        data_type       comment 
name                    string                                       
student_id              string                                       
Time taken: 0.036 seconds, Fetched: 2 row(s)
```

6. 调整列的位置:将name更新到指定列的后面，操作如下:
```markdown
hive (default)> alter table test2 change name name string after student_id; 
OK 
Time taken: 0.069 seconds 
hive (default)> desc test2; 
OK 
col_name        data_type       comment 
student_id              string                                       
name                    string                                       
Time taken: 0.033 seconds, Fetched: 2 row(s)
```

7. 替换列（替换所有的列）
```markdown
hive (default)> alter table test2 replace columns(id double); 
OK 
Time taken: 0.058 seconds 
hive (default)> desc test2; 
OK 
col_name        data_type       comment 
id                      double                                       
Time taken: 0.032 seconds, Fetched: 1 row(s)
```
## 删除表
删除表的操作相对简单
hive (default)> `drop table` test2;
## 清除表中数据（Truncate）
`注意`：Truncate只能删除`管理表`，不能删除`外部表`中数据
hive (default)> `truncate table` student;
