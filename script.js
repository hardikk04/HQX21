function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

loco();

var percent = document.querySelector(".percent");
var overlay = document.querySelector(".overlay");
// console.log(overlay);

var num = 0;
var myInterval = setInterval(function () {
  if (num < 80) {
    num = num + Math.floor(Math.random() * 21);
    percent.innerHTML = num + "%";
    overlay.style.left = num + "%";
  } else {
    num = 100;
    percent.innerHTML = num + "%";
    overlay.style.left = num + "%";
    start();
    clearInterval(myInterval);
  }
}, 100);

var t1 = gsap.timeline();

function start() {
  t1.to(".percent", {
    opacity: 0,
    delay: 0.5,
  });

  t1.to(".loder>h1", {
    opacity: 0,
  });

  t1.to(".loder", {
    opacity: 0,
    duration: 1,
  });

  t1.from(".page1", {
    scale: 0.8,
    // duration: 0.3,
  });

  t1.to(".main", {
    backgroundColor: "#fff",
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "top 5%",
      end: "top -10%",
      //   markers: true,
      scrub: 1,
    },
  });

  t1.to(".page4-elem:nth-child(2)", {
    top: "2%",
    scrollTrigger: {
      trigger: ".page4-elem:nth-child(2)",
      scroller: ".main",
      start: "top 85%",
      end: "top 55%",
      // markers: true,
      scrub: 1,
    },
  });

  t1.to(".page4-elem:nth-child(3)", {
    top: "4%",
    scrollTrigger: {
      trigger: ".page4-elem:nth-child(3)",
      scroller: ".main",
      start: "top 115%",
      end: "top 95%",
      //   markers: true,
      scrub: 1,
    },
  });

  t1.from(".page2-box-left", {
    x: -100,
    opacity: 0,
    scrollTrigger: {
      trigger: ".page2-box-left",
      scroller: ".main",
      start: "top 80%",
      end: "top 60%",
      //   markers: true,
      scrub: 1,
    },
  });

  t1.from(".page2-box-right", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      trigger: ".page2-box-left",
      scroller: ".main",
      start: "top 70%",
      end: "top 50%",
      //   markers: true,
      scrub: 1,
    },
  });

  t1.from(".page3", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".page3",
      scroller: ".main",
      start: "top 70%",
      end: "top 40%",
      //   markers: true,
      scrub: 1,
    },
  });

  t1.from(".page5", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".page5",
      scroller: ".main",
      start: "top 70%",
      end: "top 40%",
      //   markers: true,
      scrub: 1,
    },
  });
}

Shery.mouseFollower();

Shery.makeMagnet(
  ".magnet, nav>h1,.page4-left > button,.icons i,.page7-box > h1",
  {
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  }
);
