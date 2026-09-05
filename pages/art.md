---
title: 艺术展
aside: false
---

<script setup>
import Art from "@/views/Art.vue"

// 艺术展数据配置（内联）
const artExhibitionData = [
  {
    class_name: '艺术',
    description: '探索数字时代的艺术表达',
    tip: '用代码和像素创造无限可能',
    top_background: 'https://pic.netbian.com/uploads/allimg/260730/215240-1785419560b648.jpg',
    buttonText: '关于',
    buttonLink: 'https://www.behance.net/',
    artworks: [
      {
        title: '📖文学（第五艺术）',
        description: '眼睛到不了的地方，文字可以。',
        artworks: [
          {
            name: '小王子Le Petit Prince',
            artist: '<法国>安东尼·德·圣-埃克苏佩里(Antoine de Saint-Exupery)',
            description: '小王子是一个超凡脱俗的仙童，他住在一颗只比他大一丁点儿的小行星上。陪伴他的是一朵他非常喜爱的小玫瑰花。',
            image: 'https://pic3.zhimg.com/41c72017f602092a229ce5b52cb4189a_r.jpg',
            link: 'https://www.diancang.xyz/waiguomingzhu/9227/'
          },
          {
            name: '鲁迅全集',
            artist: '鲁迅&周树人',
            description: '《鲁迅全集》涵盖了鲁迅创作、翻译、古籍辑校和科学普及这四个方面的重要成就，文体全面，是鲁迅作品一次全方位的展示。',
            image: 'https://pic1.zhimg.com/v2-e3910c64b5cce306a8623d2aa57c1a9a_1440w.jpg',
            link: 'https://www.jingdianbook.com/luxun/'
          },
          {
            name: '红楼梦',
            artist: '<清>曹雪芹',
            description: '原名《石头记》。长篇小说。一百二十回。前八十回为曹雪芹作，后四十回一般认为是高鹗所续。',
            image: 'https://pic1.zhimg.com/v2-191a9c16c9799be6577a5a307c635047_qhd.jpg',
            link: 'https://www.diancang.xyz/wenxueyishu/hongloumeng/'
          },
          {
            name: '唐·吉诃德Don Quijote de la Mancha',
            artist: '<西班牙>塞万提斯·萨维德拉',
            description: '塞万提斯笔下沉迷骑士小说的乡绅唐吉诃德，带着侍从桑丘踏上荒诞冒险，在疯癫幻想中践行着纯粹的理想主义。',
            image: 'https://pic4.zhimg.com/v2-b79b6196d672a07b5c6bdbb4c98b6af6_r.jpg?source=172ae18b',
            link: 'https://www.kepub.net/book/104434'
          }
        ]
      },
      {
        title: '📽️电影（第八艺术）',
        description: '静下来，感受电影的魅力！',
        artworks: [
          {
            name: '阿甘正传',
            artist: '汤姆·汉克斯',
            description: '先天心智不足的阿甘，以纯粹执着的奔跑穿越动荡时代，用简单的善意与坚持活出了充满奇迹的一生……',
            image: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.W4MH2uheFXobog8ujQ6OxgHaEK?rs=1&pid=ImgDetMain',
            link: 'https://ysgcyy.com/covodplay/2116-1-1.html'
          },
          {
            name: '肖申克的救赎',
            artist: '导演：弗兰克·德拉邦特 ',
            description: '蒙冤入狱的银行家安迪，凭借20年的隐忍与智慧成功越狱，完成自我与他人的双重救赎……',
            image: 'https://pic1.zhimg.com/v2-d93d5df3f088b46b6cadd9c766d880a4_1440w.jpg',
            link: 'https://ysgcyy.com/covoddetail/18005.html'
          },
          {
            name: '楚门的世界',
            artist: '导演：彼得·威尔 ',
            description: '讲述了被全程直播在虚假真人秀中长大的楚门，发现真相后毅然冲破布景走向真实自由世界的故事……',
            image: 'https://picx.zhimg.com/80/v2-41f31066237f253aa9eaaf5930f1efe4_1440w.webp?source=1def8aca',
            link: 'https://ysgcyy.com/covoddetail/25030.html'
          },
          {
            name: '熊出没之雪岭熊风',
            artist: '导演：丁亮 刘富源 ',
            description: '讲述熊二重逢童年山神团子，携手化解白熊山火山危机的国产动画经典故事。',
            image: 'https://p1.ssl.qhimg.com/t01459cec335eb1a0c2.jpg',
            link: 'https://ysgcyy.com/covoddetail/67939.html'
          }
        ]
      },
      {
        title: '🎮游戏（第九艺术）',
        description: '故事始于一片朦胧的晨光中。',
        artworks: [
          {
            name: '王者荣耀',
            artist: '腾讯   ID:梦归碧落星辰',
            description: '王者荣耀是一款由腾讯游戏开发和运营的5V5竞技手游，拥有多种英雄、皮肤、玩法和赛事。',
            image: 'https://game.gtimg.cn/images/yxzj/web202311/bg-ClAKvwxK.jpg',
            link: 'https://pvp.qq.com/'
          },
          {
            name: '纸嫁衣',
            artist: '纸嫁衣工作室 ',
            description: '两间之地，故人将逢；香魂未断，唯卿不负。',
            image: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.0Kf_fkQqJkNAo8W2XAXokgHaD7?rs=1&pid=ImgDetMain',
            link: 'https://www.cdjfkj.cn/'
          }
        ]
      }
    ]
  },
  // {
  //   class_name: '传统工艺',
  //   description: '传承千年的匠心之作',
  //   tip: '感受手工艺的温度与灵魂',
  //   top_background: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1920&q=80',
  //   buttonText: 'Etsy',
  //   buttonLink: 'https://www.etsy.com/',
  //   artworks: [
  //     {
  //       title: '陶瓷艺术',
  //       description: '泥土与火焰的对话',
  //       artworks: [
  //         {
  //           name: '青花瓷韵',
  //           artist: '陶艺大师',
  //           description: '传统青花瓷工艺的现代演绎，蓝白相间的经典美学',
  //           image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
  //           link: 'https://example.com/ceramic1'
  //         }
  //       ]
  //     }
  //   ]
  // }
]
</script>

<Art :data="artExhibitionData" />
