import { Renderer, Camera, Transform, Texture, Program, Mesh, Box, Orbit } from 'ogl';

const vertex = /* glsl */ `
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec3 vDir;

    void main() {
        vDir = normalize(position);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    // uniform type is samplerCube rather than sampler2D
    uniform samplerCube tMap;

    varying vec3 vDir;

    void main() {

        // sample function is textureCube rather than texture2D
        vec3 tex = textureCube(tMap, vDir).rgb;

        gl_FragColor.rgb = tex;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(-2, 1, -3);

    const controls = new Orbit(camera);

    /* document.querySelector('#dropdown')!.addEventListener('change', (event: Event) => {
        const { value } = event.target as HTMLInputElement;
        controls.zoomStyle = value;
    }); */

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    // Create an empty texture using the gl.TEXTURE_CUBE_MAP target
    const texture = new Texture(gl, {
        target: gl.TEXTURE_CUBE_MAP,
    });

    loadImages();
    async function loadImages() {
        function loadImage(src: string): Promise<HTMLImageElement> {
            return new Promise((res) => {
                const img = new Image();
                img.onload = () => res(img);
                img.src = src;
            });
        }

        // Must be in this order (it's a WebGL thing)
        // gl.TEXTURE_CUBE_MAP_POSITIVE_X Right
        // gl.TEXTURE_CUBE_MAP_NEGATIVE_X Left
        // gl.TEXTURE_CUBE_MAP_POSITIVE_Y Top
        // gl.TEXTURE_CUBE_MAP_NEGATIVE_Y Bottom
        // gl.TEXTURE_CUBE_MAP_POSITIVE_Z Back
        // gl.TEXTURE_CUBE_MAP_NEGATIVE_Z Front

        const images: HTMLImageElement[] = await Promise.all([
            loadImage('assets/cube/posx.jpg'),
            loadImage('assets/cube/negx.jpg'),
            loadImage('assets/cube/posy.jpg'),
            loadImage('assets/cube/negy.jpg'),
            loadImage('assets/cube/posz.jpg'),
            loadImage('assets/cube/negz.jpg'),
        ]);

        // Once all are loaded, we can update the texture image, which will upload them
        texture.image = images;
    }

    const geometry = new Box(gl);

    const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            tMap: { value: texture },
        },
        cullFace: false,
    });

    const skybox = new Mesh(gl, { geometry, program });
    skybox.setParent(scene);
    skybox.scale.set(20);

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        controls.update();

        mesh.rotation.y += 0.003;
        renderer.render({ scene, camera });
    }
}
