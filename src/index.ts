import { Renderer, Camera, Orbit, Transform, Program, Torus, Mesh } from 'ogl';

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat3 normalMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec3 vNormal;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    varying vec3 vNormal;

    void main() {
        gl_FragColor.rgb = normalize(vNormal);
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(5, 3, 6);
    camera.lookAt([0, 0, 0]);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();
    const controls = new Orbit(camera);

    const program = new Program(gl, {
        vertex,
        fragment,
    });

    const torusGeometry = new Torus(gl, {
        radius: 1,
        tube: 0.4,
        radialSegments: 16,
        tubularSegments: 32,
    });

    const torus = new Mesh(gl, { geometry: torusGeometry, program });
    torus.setParent(scene);

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        torus.rotation.x += 0.001;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.003;

        controls.update();
        renderer.render({ scene, camera });
    }
}
