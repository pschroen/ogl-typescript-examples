import { Renderer, Camera, Transform, Program, Mesh, Box } from 'ogl';

declare global {
    var setMeshCount: Function;
}

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;

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
        vec3 normal = normalize(vNormal);
        float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
        gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer();
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl, {fov: 35, far: 3000});

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({aspect: gl.canvas.width / gl.canvas.height});
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    // Create base geometry
    const cubeGeometry = new Box(gl);

    // Using the shader from the base primitive example
    const program = new Program(gl, {
        vertex,
        fragment,
    });

    // mesh container
    let meshes: Mesh[] = [];

    globalThis.setMeshCount = function setMeshCount(count: number | string) {

        // sanitize input
        count = parseInt(count as string) || 1000;

        // remove old meshes
        for(let i = 0; i < meshes.length; ++i) scene.removeChild(meshes[i]);
        meshes = [];

        // create our meshes according to input
        for (let i = 0; i < count; ++i){
            let mesh = new Mesh(gl, {geometry: cubeGeometry, program});

            // position meshes in a random position between -100 / +100 in each dimension
            mesh.position.set(
                -100 + Math.random() * 200,
                -100 + Math.random() * 200,
                -100 + Math.random() * 200
            );
            mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
            scene.addChild(mesh);
            meshes.push(mesh)
        }

        // set input counter value to make sure
        // (document.getElementById('meshCountInput') as HTMLInputElement).value = count as unknown as string;

    };

    setMeshCount(1000);

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        // rotate camera
        let time = performance.now() / 30000;
        camera.position.set(Math.sin(time) * 180, 80, Math.cos(time) * 180);
        camera.lookAt([0, 0, 0]);

        // rotate meshes
        for(let i = 0; i < meshes.length; ++i){
            meshes[i].rotation.x += 0.01
            meshes[i].rotation.y += 0.01
        }

        renderer.render({scene, camera});
    }
}
