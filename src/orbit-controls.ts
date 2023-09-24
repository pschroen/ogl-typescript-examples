import { Renderer, Camera, Transform, Texture, Program, Geometry, Mesh, Vec3, Orbit } from 'ogl';
import type { ZoomStyle } from 'ogl';

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform sampler2D tMap;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 tex = texture2D(tMap, vUv).rgb;

        vec3 light = normalize(vec3(0.5, 1.0, -0.3));
        float shading = dot(normal, light) * 0.15;
        gl_FragColor.rgb = tex + shading;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(-2, 1, 2);

    // Create controls and pass parameters
    const controls = new Orbit(camera, {
        target: new Vec3(0, 0.7, 0),
    });

    document.querySelector('#dropdown')!.addEventListener('change', (e: Event) => {
        const { value } = e.target as HTMLInputElement;
        controls.zoomStyle = value as ZoomStyle;
    });

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    const texture = new Texture(gl);
    const img = new Image();
    img.onload = () => (texture.image = img);
    img.src = 'assets/macaw.jpg';

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            tMap: { value: texture },
        },
        cullFace: false,
    });

    let mesh;
    loadModel();
    async function loadModel() {
        const data = await (await fetch(`assets/macaw.json`)).json();

        const geometry = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(data.position) },
            uv: { size: 2, data: new Float32Array(data.uv) },
            normal: { size: 3, data: new Float32Array(data.normal) },
        });

        mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);
    }

    requestAnimationFrame(update);
    function update(t: DOMHighResTimeStamp) {
        requestAnimationFrame(update);

        // Need to update controls every frame
        controls.update();
        renderer.render({ scene, camera });
    }
}
