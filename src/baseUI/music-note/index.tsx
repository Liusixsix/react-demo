import React, {
  forwardRef,
  useRef,
  useEffect,
  RefForwardingComponent,
  useImperativeHandle
} from "react";
import "./index.scss";
const MusicNote = forwardRef((props,ref) => {
  const iconsRef = useRef<any>();

  const ICON_NUMBER = 10;

  const createNode = (txt) => {
    const template = `<div class='icon_wrapper'>${txt}</div>`;
    let tempNode = document.createElement("div");
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  useEffect(() => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let node = createNode(`<div class="iconfont icon-yinle"></div>`);
      iconsRef.current.appendChild(node);
    }
    let domArray = iconsRef.current.children;
    Array.from(domArray).forEach((ele: any) => {
      ele.addEventListener("transitionend", function () {
        this.style["display"] = "none";
        this.style["transform"] = `translate3d(0, 0, 0)`;
        this.running = false;
        let icon = this.querySelector("div");
        icon.style["transform"] = `translate3d(0, 0, 0)`;
      });
    }, false);
  }, []);

  const startAnimation = ({ x, y }) => {
    for (let i = 0; i < ICON_NUMBER; i++) {
      let domArray = Array.from(iconsRef.current.children);
      let item: any = domArray[i];

      if (!item.running) {
        item.style.left = x + "px";
        item.style.top = y + "px";
        item.style.display = "inline-block";
        setTimeout(() => {
          item.running = true;
          item.style['transform'] = `translate3d(0, 750px, 0)`;
          let icon = item.querySelector("div");
          icon.style['transform'] = `translate3d(-40px, 0, 0)`;
        }, 20);
        break;
      }
    }
  };
  useImperativeHandle(ref, () => ({
    startAnimation
}))

  return <div className="MusicNote-container" ref={iconsRef}></div>;
});

export default MusicNote;
