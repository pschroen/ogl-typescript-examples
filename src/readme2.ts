import { Renderer, Geometry, Program, Mesh } from 'ogl';

{
    const renderer = new Renderer({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    // Triangle that covers viewport, with UVs that still span 0 > 1 across viewport
    const geometry = new Geometry(gl, {
        position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });
    // Alternatively, you could use the Triangle class.

    const program = new Program(gl, {
        vertex: /* glsl */ `
            attribute vec2 uv;
            attribute vec2 position;

            varying vec2 vUv;

            void main() {
                vUv = uv;
                gl_Position = vec4(position, 0, 1);
            }
        `,
        fragment: /* glsl */ `
            precision highp float;

            uniform float uTime;

            varying vec2 vUv;

            void main() {
                gl_FragColor.rgb = vec3(0.8, 0.7, 1.0) + 0.3 * cos(vUv.xyx + uTime);
                gl_FragColor.a = 1.0;
            }
        `,
        uniforms: {
            uTime: { value: 0 },
        },
    });

    const mesh = new Mesh(gl, { geometry, program });

    requestAnimationFrame(update);
    function update(t: DOMHighResTimeStamp) {
        requestAnimationFrame(update);

        program.uniforms.uTime.value = t * 0.001;

        // Don't need a camera if camera uniforms aren't required
        renderer.render({ scene: mesh });
    }
}
