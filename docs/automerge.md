# automerge 学习与实践

OT 与 CRDT 之间的区别与联系（个人看法）：

- OT 比较老，CRDT 新
- OT 基于动作（Operation），如 insert、delete 之类的，容易计算编辑距离，API 比较麻烦，需要将编辑转化为操作再存储；
- CRDT 基于状态（State），通信、存储都基于当前数据，API 比较简单，直接使用；

## 参考资料

- https://automerge.org/
- https://github.com/Operational-Transformation/ot.js
- https://github.com/Kingfish404/cloud-code
- http://objcer.com/
- https://juejin.cn/post/7027113667107749918
- https://juejin.cn/post/6976937853309698062
- https://juejin.cn/post/7028599196391309320
- https://fresh.deno.dev/
