import { Renderer, Program, Texture, Mesh, Vec2, Flowmap, Triangle } from 'ogl';

interface VelocityVec2 extends Vec2 {
    needsUpdate: boolean;
}

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D tWater;
    uniform sampler2D tFlow;
    uniform float uTime;

    varying vec2 vUv;

    void main() {

        // R and G values are velocity in the x and y direction
        // B value is the velocity length
        vec3 flow = texture2D(tFlow, vUv).rgb;

        // Use flow to adjust the uv lookup of a texture
        vec2 uv = gl_FragCoord.xy / 600.0;
        uv += flow.xy * 0.05;
        vec3 tex = texture2D(tWater, uv).rgb;

        // Oscillate between raw values and the affected texture above
        tex = mix(tex, flow * 0.5 + 0.5, smoothstep( -0.3, 0.7, sin(uTime)));

        gl_FragColor.rgb = tex;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    // Variable inputs to control flowmap
    let aspect = 1;
    const mouse = new Vec2(-1);
    const velocity = new Vec2() as VelocityVec2;

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        aspect = window.innerWidth / window.innerHeight;
    }
    window.addEventListener('resize', resize, false);
    resize();

    const flowmap = new Flowmap(gl);

    // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    const geometry = new Triangle(gl);

    const texture = new Texture(gl, { wrapS: gl.REPEAT, wrapT: gl.REPEAT });
    const img = new Image();
    img.onload = () => (texture.image = img);
    img.src = 'assets/water.jpg';

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            uTime: { value: 0 },
            tWater: { value: texture },

            // Note that the uniform is applied without using an object and value property
            // This is because the class alternates this texture between two render targets
            // and updates the value property after each render.
            tFlow: flowmap.uniform,
        },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Create handlers to get mouse position and velocity
    const isTouchCapable = 'ontouchstart' in window;
    if (isTouchCapable) {
        window.addEventListener('touchstart', updateMouse, false);
        window.addEventListener('touchmove', updateMouse, false);
    } else {
        window.addEventListener('mousemove', updateMouse, false);
    }

    let lastTime: number;
    const lastMouse = new Vec2();
    function updateMouse(e: TouchEvent | MouseEvent) {
        let x!: number;
        let y!: number;
        if ((e as TouchEvent).changedTouches && (e as TouchEvent).changedTouches.length) {
            x = (e as TouchEvent).changedTouches[0].pageX;
            y = (e as TouchEvent).changedTouches[0].pageY;
        }
        if (x === undefined) {
            x = (e as MouseEvent).pageX;
            y = (e as MouseEvent).pageY;
        }

        // Get mouse value in 0 to 1 range, with y flipped
        mouse.set(x / gl.renderer.width, 1.0 - y / gl.renderer.height);

        // Calculate velocity
        if (!lastTime) {
            // First frame
            lastTime = performance.now();
            lastMouse.set(x, y);
        }

        const deltaX = x - lastMouse.x;
        const deltaY = y - lastMouse.y;

        lastMouse.set(x, y);

        let time = performance.now();

        // Avoid dividing by 0
        let delta = Math.max(14, time - lastTime);
        lastTime = time;

        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;

        // Flag update to prevent hanging velocity values when not moving
        velocity.needsUpdate = true;
    }

    requestAnimationFrame(update);
    function update(t: DOMHighResTimeStamp) {
        requestAnimationFrame(update);

        // Reset velocity when mouse not moving
        if (!velocity.needsUpdate) {
            mouse.set(-1);
            velocity.set(0);
        }
        velocity.needsUpdate = false;

        // Update flowmap inputs
        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);

        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len() ? 0.5 : 0.1);

        flowmap.update();

        program.uniforms.uTime.value = t * 0.001;

        renderer.render({ scene: mesh });
    }
}
