import { Renderer, Camera, Texture, RenderTarget, Program, Mesh, Box } from 'ogl';

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

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

    uniform sampler2D tMap;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vec3 normal = normalize(vNormal);
        float lighting = 0.2 * dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
        vec3 tex = texture2D(tMap, vUv).rgb;
        gl_FragColor.rgb = tex + lighting + vec3(vUv - 0.5, 0.0) * 0.1;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 1, 5);
    camera.lookAt([0, 0, 0]);

    const targetCamera = new Camera(gl, { fov: 35 });
    targetCamera.position.set(0, 1, 5);
    targetCamera.lookAt([0, 0, 0]);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Only update aspect of target camera, as first scene will be drawn to a square render target
        targetCamera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Box(gl);

    // A little data texture with 4 colors just to keep things interesting
    const texture = new Texture(gl, {
        image: new Uint8Array([191, 25, 54, 255, 96, 18, 54, 255, 96, 18, 54, 255, 37, 13, 53, 255]),
        width: 2,
        height: 2,
        magFilter: gl.NEAREST,
    });

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            tMap: { value: texture },
        },
    });

    // Create render target framebuffer.
    // Uses canvas size by default and doesn't automatically resize.
    // To resize, re-create target
    const target = new RenderTarget(gl, {
        width: 512,
        height: 512,
    });

    const targetProgram = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            tMap: { value: target.texture },
        },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const targetMesh = new Mesh(gl, { geometry, program: targetProgram });

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        mesh.rotation.y -= 0.02;
        targetMesh.rotation.y -= 0.005;
        targetMesh.rotation.x -= 0.01;

        // Set background for first render to target
        gl.clearColor(0.15, 0.05, 0.2, 1);

        // Add target property to render call
        renderer.render({ scene: mesh, camera, target });

        // Change to final background
        gl.clearColor(1, 1, 1, 1);

        // Omit target to render to canvas
        renderer.render({ scene: targetMesh, camera: targetCamera });
    }
}
