import { Renderer, Camera, Orbit, Transform, Geometry, WireMesh, Cylinder, Vec3, Color, NormalProgram } from 'ogl';

{
    main();
    async function main() {
        const modelData = await fetch('./assets/fox.json').then(r => r.json());

        const renderer = new Renderer();
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);

        const camera = new Camera(gl, { fov: 15 });
        camera.position.set(15, 4, 20);

        const controls = new Orbit(camera, {
            target: new Vec3(0, 0, 0),
        });

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize, false);
        resize();

        const scene = new Transform();

        const cylinderGeometry = new Cylinder(gl);

        /* Just switch between Mesh and WireMesh to see mesh wireframe.
        In WireMesh `program` property are not required and will be ignored */
        // const cylinderMesh = new Mesh(gl, { geometry: cylinderGeometry, program: new NormalProgram(gl) });
        const cylinderMesh = new WireMesh(gl, { geometry: cylinderGeometry, program: new NormalProgram(gl) });
        cylinderMesh.setParent(scene);
        cylinderMesh.position.y = 1.5;

        const modelGeometry = new Geometry(gl, {
            position: { size: 3, data: new Float32Array(modelData.position), },
            normal: { size: 3, data: new Float32Array(modelData.normal), },
            uv: { size: 2, data: new Float32Array(modelData.uv), }
        });

        /* Use wireColor to change wire color */
        // const modelMesh = new Mesh(gl, { geometry: modelGeometry, program: new NormalProgram(gl) });
        const modelMesh = new WireMesh(gl, { geometry: modelGeometry, wireColor: new Color(1, 0.75, 0) });
        modelMesh.setParent(scene);
        modelMesh.scale.set(0.75, 0.75, 0.75);
        modelMesh.position.y = -1.5;

        requestAnimationFrame(update);
        function update(t: DOMHighResTimeStamp) {
            requestAnimationFrame(update);

            scene.rotation.y += -0.005;

            controls.update();
            renderer.render({ scene, camera });
        }
    }
}
