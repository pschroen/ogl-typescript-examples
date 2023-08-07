import { Renderer, Camera, Transform, Texture, Program, Mesh, Plane } from 'ogl';

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D tMap;
    uniform sampler2D tMapA;
    uniform float fSlide;

    varying vec2 vUv;

    void main() {
        vec3 tex = texture2D(tMap, vUv).rgb;
        vec3 texA = texture2D(tMapA, vUv).rgb;

        gl_FragColor.rgb = mix(tex, texA, step(fSlide, vUv.x)) + 0.1;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl);
    camera.position.set(0, 0, 1);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    // By default, anisotropy is not active
    const texture = new Texture(gl);

    // Pass in number of anisotropic samples to activate
    const textureAnisotropy = new Texture(gl, { anisotropy: 16 });

    const img = new Image();
    img.src = 'assets/grid.jpg';
    img.onload = () => {
        texture.image = img;
        textureAnisotropy.image = img;
    };

    const geometry = new Plane(gl);

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            tMap: { value: texture },
            tMapA: { value: textureAnisotropy },
            fSlide: { value: 0.5 },
        },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.scale.set(1, 2, 1);
    mesh.rotation.set(-1.5, 0, 0);

    mesh.setParent(scene);

    gl.canvas.addEventListener('mousemove', (event) => {
        const x = (2 * event.x) / gl.canvas.width;
        program.uniforms.fSlide.value = x;
    });

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        renderer.render({ scene, camera });
    }
}
