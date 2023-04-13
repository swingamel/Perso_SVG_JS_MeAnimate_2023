gsap.registerPlugin(CustomEase, CustomWiggle);

const meAnimation = gsap.timeline({
    onComplete: addMouseEvent,
    delay: 1,
});

gsap.set(".background", { transformOrigin: "50% 50%" });
gsap.set(".right ear", { transformOrigin: "0% 50%" });
gsap.set(".left ear", { transformOrigin: "100% 50%" });
gsap.set(".me", { opacity: 1 });

meAnimation.from(
    ".me",
    {
        duration: 1,
        yPercent: 100,
        ease: "elastic.out(0.5, 0.4)",
    },
    0.5
)
    .from(
        ".head , .hair , .shadow",
        {
            duration: 0.9,
            yPercent: 20,
            ease: "elastic.out(0.58, 0.25)",
        },
        0.6
    )
    .from(
        ".right ear",
        {
            duration: 1,
            rotate: 40,
            yPercent: 10,
            ease: "elastic.out(0.5, 0.2)",
        },
        0.7
    )
    .from(
        ".left ear",
        {
            duration: 1,
            rotate: -40,
            yPercent: 10,
            ease: "elastic.out(0.5, 0.2)",
        },
        0.7
    )
    .from(
        ".eyebrow-right , .eyebrow-left",
        {
            duration: 1,
            yPercent: 300,
            ease: "elastic.out(0.5, 0.2)",
        },
        0.7
    )
    .to(
        ".eye-right , .eye-left",
        {
            duration: 0.01,
            opacity: 1,
        },
        0.85
    );

const blink_eye = gsap.timeline({
    repeat: -1,
    repeatDelay: 5,
    paused: true,
});

blink_eye
    .to(
        ".eye-right, .eye-left",
        {
            duration: 0.01,
            opacity: 0,
        },
        0
    )
    .to(
        ".eye-right-2, .eye-left-2",
        {
            duration: 0.01,
            opacity: 1,
        },
        0
    )
    .to(
        ".eye-right, .eye-left",
        {
            duration: 0.01,
            opacity: 1,
        },
        0.15
    )
    .to(
        ".eye-right-2 , .eye-left-2",
        {
            duration: 0.01,
            opacity: 0,
        },
        0.15
    );

const giddy = gsap.timeline({
    paused: true,
    onComplete: () => {
        dizzyIsPlaying = false;
    },
});

giddy
    .to(
        ".eyes",
        {
            duration: 0.01,
            opacity: 0,
        },
        0
    )
    .to(
        ".mouth",
        {
            duration: 0.01,
            opacity: 0,
        },
        0
    )
    .to(
        ".head, .hair-brown, .shadow",
        {
            duration: 6,
            rotate: 2,
            transformOrigin: "50% 50%",
            ease: "myWiggle",
        },
        0
    )
    .to(
        ".me",
        {
            duration: 6,
            rotate: -2,
            transformOrigin: "50% 100%",
            ease: "myWiggle",
        },
        0
    )
    .to(
        ".me",
        {
            duration: 4,
            scale: 0.99,
            transformOrigin: "50% 100%",
            ease: "lessWiggle",
        },
        0
    )
    .to(
        ".giddy-1",
        {
            rotate: -360,
            duration: 1,
            repeat: 5,
            transformOrigin: "50% 50%",
            ease: "none",
        },
        0.01
    )
    .to(
        ".giddy-2",
        {
            rotate: 360,
            duration: 1,
            repeat: 5,
            transformOrigin: "50% 50%",
            ease: "none",
        },
        0.01
    )
    .to(
        ".eyes",
        {
            duration: 0.01,
            opacity: 1,
        },
        4
    )
    .to(
        ".giddy",
        {
            duration: 0.01,
            opacity: 0,
        },
        4
    )
    .to(
        ".mouth",
        {
            duration: 0.01,
            opacity: 1,
        },
        4
    );

let xPos;
let yPos;

let height;
let width;

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}

let dizzyIsPlaying;
function updateScreenCoords(event) {
    if (!dizzyIsPlaying) {
        xPos = event.clientX;
        yPos = event.clientY;
    }
    if (!dizzyIsPlaying && Math.abs(event.movementX) > 500) {
        dizzyIsPlaying = true;
        giddy.restart();
    }
}

let storedXPos = 0;
let storedYPos = 0;

const dom = {
    face: document.querySelector(".face"),
    eye: document.querySelectorAll(".eye"),
    innerFace: document.querySelector(".inner-face"),
    hairFront: document.querySelector(".hair-front"),
    hairBrown: document.querySelector(".hair-brown"),
    shadow: document.querySelectorAll(".shadow"),
    ear: document.querySelectorAll(".ear"),
    eyeLeft: document.querySelector(".eyebrow-left"),
    eyeRight: document.querySelector(".eyebrow-right"),
};

function animateFace() {
    if(!xPos) return;
    // important, only recalculating if the value changes
    if (storedXPos === xPos && storedYPos === yPos) return;

    // range from -50 to 50
    x = percentage(xPos, width) - 50;
    y = percentage(yPos, height) - 50;

    // range from -20 to 80
    yHigh = percentage(yPos, height) - 20;
    // range from -80 to 20
    yLow = percentage(yPos, height) - 80;

    gsap.to(dom.face,{
        yPercent: yLow / 30,
        xPercent: x / 30,
    });
    gsap.to(dom.eye,{
        yPercent: yHigh / 3,
        xPercent: x / 2,
    });
    gsap.to(dom.innerFace,{
        yPercent: y / 6,
        xPercent: x / 8,
    });
    gsap.to(dom.hairFront,{
        yPercent: yHigh / 15,
        xPercent: x / 22,
    });
    gsap.to([dom.hairBrown, dom.shadow],{
        yPercent: (yLow / 20) * -1,
        xPercent: (x / 20) * -1,
    });
    gsap.to(dom.ear,{
        yPercent: (y / 1.5) * -1,
        xPercent: (x / 10) * -1,
    });
    gsap.to([dom.eyeLeft, dom.eyeRight],{
        yPercent: y * 2.5,
    });

    storedXPos = xPos;
    storedYPos = yPos;
}

function addMouseEvent() {
    const safeToAnimate = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
    ).matches;

    if (safeToAnimate) {
        window.addEventListener("mousemove", updateScreenCoords);

        // gsap's RAF, falls back to set timeout
        gsap.ticker.add(animateFace);

        blink_eye.play();
    }
}

function updateWindowSize() {
    height = window.innerHeight;
    width = window.innerWidth;
}
updateWindowSize();
window.addEventListener("resize", updateWindowSize);
