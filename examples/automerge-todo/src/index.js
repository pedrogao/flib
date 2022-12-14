import * as Automerge from "@automerge/automerge";
import * as localforage from "localforage";

//
// automerge
//
let docId = window.location.hash.replace("/^#/", "");
console.log("new document: ", docId);

let channel = new BroadcastChannel(docId); // 浏览器多窗口通信
let binary = await localforage.getItem(docId);
let doc = Automerge.init();
if (binary) {
  doc = Automerge.load(binary); // 本地加载
  render(doc);
}
loadFromRemote(docId); // 从远端加载

channel.onmessage = (ev) => {
  console.log("receive new message: ", ev.origin);
  // 监听新的数据，得到数据后load，然后merge
  let newDoc = Automerge.merge(doc, Automerge.load(ev.data));
  doc = newDoc;
  render(newDoc);
};
// let actorId = Automerge.getActorId(doc);
// console.log(actorId);

function updateDoc(newDoc) {
  doc = newDoc;
  // console.log(newDoc);
  render(newDoc);
  let binary = Automerge.save(newDoc);
  // 同步三部曲：
  // 1. 本地存储
  localforage.setItem(docId, binary).catch((err) => console.log(err));
  // 2. 通信到其他窗口
  channel.postMessage(binary);
  // 3. 存储到服务器
  saveToRemote(docId, binary);
}

function saveToRemote(docId, binary) {
  fetch(`http://localhost:5000/${docId}`, {
    body: binary,
    method: "post",
    headers: {
      "Content-Type": "application/octet-stream",
    },
  }).catch((err) => console.log(err));
}

async function loadFromRemote(docId) {
  const response = await fetch(`http://localhost:5000/${docId}`);
  if (response.status !== 200)
    throw new Error("No saved draft for doc with id=" + docId);
  const respbuffer = await response.arrayBuffer();
  if (respbuffer.byteLength === 0)
    throw new Error("No saved draft for doc with id=" + docId);

  const view = new Uint8Array(respbuffer);
  let newDoc = Automerge.merge(doc, Automerge.load(view)); // 注意：远端加载的需要与本地加载来merge
  doc = newDoc;
  render(newDoc);
}

function render(doc) {
  let list = document.querySelector("#todo-list");
  list.innerHTML = "";
  doc.items &&
    doc.items.forEach((item, index) => {
      let itemEl = document.createElement("li");
      itemEl.innerText = item.text;
      itemEl.style = item.done ? "text-decoration: line-through" : "";
      itemEl.onclick = () => {
        toggle(index);
      };
      list.appendChild(itemEl);
    });
}

function toggle(index) {
  let newDoc = Automerge.change(doc, (doc) => {
    if (doc.items) {
      doc.items[index].done = !doc.items[index].done;
    }
  });
  updateDoc(newDoc);
}

function addItem(text) {
  // change不会改变原来的doc，会新增一个新的newDoc
  let newDoc = Automerge.change(doc, (doc) => {
    if (!doc.items) {
      doc.items = [];
    }
    doc.items.push({ text, done: false });
  });
  updateDoc(newDoc);
}

//
// 数据
//
const todos = {
  items: [
    {
      text: "water the plants",
      done: false,
    },
    {
      text: "feed the cat",
      done: true,
    },
  ],
};

//
// 视图脚本
//
let form = document.querySelector("form");
let input = document.querySelector("#new-todo");
form.onsubmit = (ev) => {
  ev.preventDefault();
  addItem(input.value);
  input.value = null;
};
