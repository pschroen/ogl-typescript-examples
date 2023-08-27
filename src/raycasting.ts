import { Renderer, Camera, Transform, Program, Mesh, Vec2, Plane, Sphere, Box, Orbit, Raycast } from 'ogl';

interface HitableMesh extends Mesh {
    isHit?: boolean;
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

    uniform float uHit;

    varying vec3 vNormal;

    void main() {
        vec3 normal = normalize(vNormal);
        float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
        vec3 color = mix(vec3(0.2, 0.8, 1.0), vec3(1.0, 0.2, 0.8), uHit);
        gl_FragColor.rgb = color + lighting * 0.1;
        gl_FragColor.a = 1.0;
    }
`;

{
    const renderer = new Renderer({ dpr: 2 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);
    gl.clearColor(1, 1, 1, 1);

    const camera = new Camera(gl);
    camera.position.set(2, 1, 5);

    const orbit = new Orbit(camera);

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    const planeGeometry = new Plane(gl);
    const sphereGeometry = new Sphere(gl);
    const cubeGeometry = new Box(gl);

    const program = new Program(gl, {
        vertex,
        fragment,
        cullFace: false,
        uniforms: {
            uHit: { value: 0 },
        },
    });

    const plane = new Mesh(gl, { geometry: planeGeometry, program });
    plane.position.set(0, 1.3, 0);
    plane.setParent(scene);

    const sphere = new Mesh(gl, { geometry: sphereGeometry, program });
    sphere.setParent(scene);

    const cube = new Mesh(gl, { geometry: cubeGeometry, program });
    cube.position.set(0, -1.3, 0);
    cube.setParent(scene);

    // assign update functions to each mesh so they can share a program but
    // still have unique uniforms by updating them just before being drawn
    function updateHitUniform({ mesh }: { mesh: HitableMesh }) {
        program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
    }
    plane.onBeforeRender(updateHitUniform);
    sphere.onBeforeRender(updateHitUniform);
    cube.onBeforeRender(updateHitUniform);

    requestAnimationFrame(update);
    function update() {
        requestAnimationFrame(update);

        orbit.update();
        renderer.render({ scene, camera });
    }

    const mouse = new Vec2();

    // Create a raycast object
    const raycast = new Raycast();

    // Define an array of the meshes we want to test our ray against
    const meshes: HitableMesh[] = [plane, sphere, cube];

    // By default, raycast.intersectBounds() tests against the bounding box.
    // Set it to bounding sphere by adding a 'raycast' property set to sphere geometry
    sphere.geometry.raycast = 'sphere';

    // Wrap in load event to prevent checks before page is ready
    window.addEventListener(
        'load',
        () => {
            document.addEventListener('mousemove', move, false);
            document.addEventListener('touchmove', move, false);
        },
        false
    );

    function move(e: TouchEvent | MouseEvent) {
        mouse.set(2.0 * ((e as MouseEvent).x / renderer.width) - 1.0, 2.0 * (1.0 - (e as MouseEvent).y / renderer.height) - 1.0);

        // Update the ray's origin and direction using the camera and mouse
        raycast.castMouse(camera, mouse);

        // Just for the feedback in this example - reset each mesh's hit to false
        meshes.forEach((mesh: HitableMesh) => (mesh.isHit = false));

        // raycast.intersectBounds will test against the bounds of each mesh, and
        // return an array of intersected meshes in order of closest to farthest
        const hits: HitableMesh[] = raycast.intersectBounds(meshes);

        // Can intersect with geometry if the bounds aren't enough, or if you need
        // to find out the uv or normal value at the hit point.
        // Optional arguments include backface culling `cullFace`, and `maxDistance`
        // Both useful for doing early exits to help optimise.
        // const hits = raycast.intersectMeshes(meshes, {
        //     cullFace: true,
        //     maxDistance: 10,
        //     includeUV: true,
        //     includeNormal: true,
        // });
        // if (hits.length) console.log(hits[0].hit.uv);

        // Update our feedback using this array
        hits.forEach((mesh: HitableMesh) => (mesh.isHit = true));
    }
}
