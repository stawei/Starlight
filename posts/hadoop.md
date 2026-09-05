---
title: Hadoop大数据开发基础
date: 2024-05-30 02:48:42
categories: [学习]
tags: [笔记, Hadoop]
description: Hadoop大数据开发基础入门教程
articleGPT: 本文介绍了Hadoop大数据开发的基础知识，包括Hadoop生态系统、HDFS分布式文件系统、MapReduce计算框架等核心概念
references:
  - title: Hadoop
    url: https://hadoop.apache.org/
---

# Hadoop大数据开发基础

>题外话：关于Hadoop的知识点非常多，总结都不一定全面，有可能需要分非常多的部分组成一大类还要延生到Hive相关的知识点还有数据库等等，需要用到的工具部署起来也是非常复杂的，此篇仅供本人复习使用，如有需要你也可以参考我的知识点----浅小兮

>[Hadoop官网](https://hadoop.apache.org/)地址https://hadoop.apache.org/

#### Hadoop系列导航
>[Hadoop基础介绍](https://hadoop.apache.org/)→当前页面
2.Hadoop环境搭建
3.待更新中…………
#### 1. Hadoop 生态系统
Hadoop 生态系统包含多个组件，每个组件都有其特定的功能。以下是一些主要的组件：
- **Hadoop Distributed File System (HDFS)**：Hadoop 的文件系统，用于存储大数据集。
- **YARN (Yet Another Resource Negotiator)**：资源管理器，负责集群中的资源分配和管理。
- **Hadoop MapReduce**：分布式计算框架，用于处理大规模数据集的并行计算。
- **Hadoop Common**：提供 Hadoop 生态系统中其他组件所共用的库和工具。
- **Hadoop 生态系统中的其他组件**：如 Hive (数据仓库)、HBase (分布式存储)、ZooKeeper (分布式协调服务) 等。
#### 2. HDFS (Hadoop Distributed File System)
HDFS 是 Hadoop 的文件系统，它将数据分成多个块（默认大小为 128MB），并存储在不同的服务器上。HDFS 提供了高吞吐量和容错能力，适合存储大量数据。
#### 3. YARN (Yet Another Resource Negotiator)
YARN 是 Hadoop 的资源管理器，它负责集群中的资源分配和管理。YARN 允许用户运行多种类型的分布式应用程序，而不仅仅是 MapReduce 应用程序。
#### 4. Hadoop MapReduce
MapReduce 是 Hadoop 的分布式计算框架，用于处理大规模数据集的并行计算。MapReduce 包含两个主要阶段：Map 阶段和 Reduce 阶段。
- **Map 阶段**：对输入数据进行分割，并将其分发给集群中的多个节点进行处理。每个节点处理一部分数据，并生成中间结果。
- **Reduce 阶段**：将 Map 阶段生成的中间结果合并，生成最终结果。
#### 5. Hadoop 生态系统中的其他组件
- **Hive**：是一个数据仓库工具，用于数据提取、转换和加载（ETL）。它允许用户使用类似 SQL 的查询语言（HQL）来处理大规模数据集。
- **HBase**：是一个分布式的、可扩展的、面向列的数据库，用于存储大量结构化和半结构化数据。
- **ZooKeeper**：是一个分布式协调服务，用于维护配置信息、命名服务、分布式同步和提供其他一些基础服务。
#### 6.Hadoop特点

1. **可扩展性**：Hadoop 设计为可扩展的，允许用户根据需要添加更多的节点来处理更多的数据。它支持从几个节点到数千个节点的扩展。
2. **容错性**：Hadoop 设计时考虑了容错性，当集群中的某个节点出现故障时，Hadoop 能够自动重新分配任务到其他健康的节点上，确保数据处理不会中断。
3. **高吞吐量**：Hadoop 能够并行处理数据，因此在处理大量数据时具有很高的吞吐量。
4. **低成本**：Hadoop 可以使用廉价的服务器来构建集群，这使得它成为处理大数据集的低成本解决方案。
5. **灵活性**：Hadoop 支持多种数据格式，包括文本、结构化数据、半结构化数据和非结构化数据。
6. **可移植性**：Hadoop 是开源的，可以在多种操作系统上运行，包括 Linux、Windows 和 macOS。