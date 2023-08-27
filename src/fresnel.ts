import { Renderer, Camera, Orbit, Transform, Program, Torus, Mesh, Color } from 'ogl';

const params = {
    backgroundColor: new Color('#B6D8F2'),
    baseColor: new Color('#B6D8F2'),
    fresnelColor: new Color('#F7F6CF'),
    fresnelFactor: 1.5,
};

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelMatrix;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform vec3 cameraPosition;

    varying vec3 vWorldNormal;
    varying vec3 vViewDirection;

    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
        vViewDirection = normalize(cameraPosition - worldPosition.xyz);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform vec3 uBaseColor;
    uniform vec3 uFresnelColor;
    uniform float uFresnelPower;

    varying vec3 vWorldNormal;
    varying vec3 vViewDirection;

    void main() {
        float fresnelFactor = abs(dot(vViewDirection, vWorldNormal));
        float inversefresnelFactor = 1.0 - fresnelFactor;

        // Shaping function
        fresnelFactor = pow(fresnelFactor, uFresnelPower);
        inversefresnelFactor = pow(inversefresnelFactor, uFresnelPower);

        gl_FragColor = vec4(fresnelFactor * uBaseColor + inversefresnelFactor * uFresnelColor, 1.0);
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(...(params.backgroundColor as unknown as [red: number, green: number, blue: number]), 1);

    const camera = new Camera(gl, { fov: 35 });
    camera.position.set(0, 1, 7);
    camera.lookAt([0, 0, 0]);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();
    const controls = new Orbit(camera);

    const uniforms = {
        uBaseColor: { value: params.baseColor },
        uFresnelColor: { value: params.fresnelColor },
        uFresnelPower: { value: params.fresnelFactor },
    };

    const program = new Program(gl, {
        vertex: vertex,
        fragment: fragment,
        uniforms: uniforms,
    });

    const torusGeometry = new Torus(gl, {
        radius: 1,
        tube: 0.4,
        radialSegments: 32,
        tubularSegments: 64,
    });

    const torus = new Mesh(gl, { geometry: torusGeometry, program });
    torus.setParent(scene);

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        torus.rotation.x += 0.01;

        controls.update();
        renderer.render({ scene, camera });
    }
}
