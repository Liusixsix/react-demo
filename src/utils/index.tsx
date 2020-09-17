/**
 * 节流
 * @param {function} func 执行的函数
 * @param {number} delay 节流间隔
 */
export function throttle(func: (e) => void, delay: number) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 防抖
 * @param func {函数}
 * @param delay {间隔}
 */

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
}

/**
 * @description 找出第一个没有歌名的排行榜的索引
 * @param {Array} rankList 排行榜
 * @returns index 下标
 */
export const filterIndex = (rankList: any[]): number => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

//处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};


//转换歌曲播放时间
export const formatPlayTime = interval => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};


//判断一个对象是否为空对象
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;


// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机算法
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}
