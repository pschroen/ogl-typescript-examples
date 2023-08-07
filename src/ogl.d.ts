// Type definitions for ogl 1.0.0
// Project: https://github.com/oframe/ogl
// Definitions by: Patrick Schroen <https://github.com/pschroen>
//                 Cody Bennett <https://github.com/CodyJasonBennett>
//                 Xin Chen <https://github.com/nshen>
// Definitions: https://github.com/oframe/ogl

declare module 'ogl' {
    /**
     * Implementation of {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Euler.js | Source}
     */
    export class Euler extends Array<number> {
        x: number;
        y: number;
        z: number;

        constructor(x?: number, y?: number, z?: number, order?: string);

        set(x: number, y?: number, z?: number): this;

        copy(v: Euler): this;

        reorder(order: string): this;

        fromRotationMatrix(m: Mat3, order?: string): this;

        fromQuaternion(q: Quat, order?: string): this;

        fromArray(a: Float32Array | Array<number>, o?: number): this;

        toArray(a?: Float32Array | Array<number>, o?: number): Float32Array | Array<number>;
    }

    /**
     * Implementation of a quaternion.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Quat.js | Source}
     */
    export class Quat extends Array<number> {}

    /**
     * 2D vector.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Vec2.js | Source}
     */
    export class Vec2 extends Array<number> {
        x: number;
        y: number;

        constructor(x?: number, y?: number);

        set(x: number, y?: number): this;

        copy(v: Vec2): this;

        add(va: Vec2, vb?: Vec2): this;

        sub(va: Vec2, vb?: Vec2): this;

        multiply(v: Vec2): this;

        divide(v: Vec2): this;

        inverse(v: Vec2): this;

        len(): number;

        distance(v: Vec2): number;

        squaredLen(): number;

        squaredDistance(v: Vec2): number;

        negate(v: Vec2): this;

        cross(va: Vec2, vb: Vec2): number;

        scale(v: Vec2): this;

        normalize(): this;

        dot(v: Vec2): number;

        equals(v: Vec2): boolean;

        applyMatrix3(mat3: Mat3): this;

        applyMatrix4(mat4: Mat4): this;

        lerp(v: Vec2, a: number): this;

        clone(): Vec2;

        fromArray(a: Float32Array | Array<number>, o?: number): this;

        toArray(a?: Float32Array | Array<number>, o?: number): Float32Array | Array<number>;
    }

    /**
     * 3D vector.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Vec3.js | Source}
     */
    export class Vec3 extends Array<number> {
        constructor(x?: number | Vec3, y?: number, z?: number);

        get x(): number;

        get y(): number;

        get z(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set(x: number | Vec3, y?: number, z?: number): this;

        copy(v: Vec3): this;

        add(va: Vec3, vb?: Vec3): this;

        sub(va: Vec3, vb?: Vec3): this;

        multiply(v: Vec3 | number): this;

        divide(v: Vec3 | number): this;

        inverse(v?: Vec3): this;

        len(): number;

        distance(v?: Vec3): number;

        squaredLen(): number;

        squaredDistance(v?: Vec3): number;

        negate(v?: Vec3): this;

        cross(va: Vec3, vb?: Vec3): this;

        scale(v: number): this;

        normalize(): this;

        dot(v: Vec3): number;

        equals(v: Vec3): boolean;

        applyMatrix3(mat3: Mat3): this;

        applyMatrix4(mat4: Mat4): this;

        scaleRotateMatrix4(mat4: Mat4): this;

        applyQuaternion(q: Quat): this;

        angle(v: Vec3): number;

        lerp(v: Vec3, t: number): this;

        clone(): Vec3;

        fromArray(a: Float32Array | Array<number>, o?: number): this;

        toArray(a?: Float32Array | Array<number>, o?: number): Float32Array | Array<number>;

        transformDirection(mat4: Mat4): this;
    }

    /**
     * 3x3 matrix.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Mat3.js | Source}
     */
    export class Mat3 extends Array<number> {}

    /**
     * 4x4 matrix.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Mat4.js | Source}
     */
    export class Mat4 extends Array<number> {
        x: number;
        y: number;
        z: number;
        w: number;

        constructor(
            m00?: number,
            m01?: number,
            m02?: number,
            m03?: number,
            m10?: number,
            m11?: number,
            m12?: number,
            m13?: number,
            m20?: number,
            m21?: number,
            m22?: number,
            m23?: number,
            m30?: number,
            m31?: number,
            m32?: number,
            m33?: number,
        );

        set(
            m00: number,
            m01: number,
            m02: number,
            m03: number,
            m10: number,
            m11: number,
            m12: number,
            m13: number,
            m20: number,
            m21: number,
            m22: number,
            m23: number,
            m30: number,
            m31: number,
            m32: number,
            m33: number,
        ): this;

        translate(v: Mat4, m: Mat4): this;

        rotate(v: Mat4, axis: Vec3, m: Mat4): this;

        scale(v: Mat4, m: Mat4): this;

        add(ma: Mat4, mb?: Mat4): this;

        sub(ma: Mat4, mb?: Mat4): this;

        multiply(ma: Mat4, mb: Mat4): this;

        identity(): this;

        copy(m: Mat4): this;

        fromPerspective(options?: object): this;

        fromOrthogonal(options: object): this;

        fromQuaternion(q: Quat): this;

        setPosition(v: Vec3): this;

        inverse(m: Mat4): this;

        compose(q: Quat, pos: Vec3, scale: Vec3): this;

        getRotation(q: Quat): this;

        getTranslation(pos: Vec3): this;

        getScaling(scale: Vec3): this;

        getMaxScaleOnAxis(): Vec3;

        lookAt(eye: Vec3, target: Vec3 | [number, number, number], up: Vec3): this;

        determinant(): number;

        fromArray(a: Float32Array | Array<number>, o?: number): this;

        toArray(a?: Float32Array | Array<number>, o?: number): Float32Array | Array<number>;
    }

    /**
     * Represents a color.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Color.js | Source}
     */
    export class Color extends Array<number> {
        r: number;
        g: number;
        b: number;

        constructor();
        constructor(color: [number, number, number]);
        constructor(color: number, g: number, b: number);
        constructor(color: string);
        constructor(color: number);
        constructor(color?: any);

        set(color: any): this;

        copy(v: Color): this;
    }

    /**
     * A class for creating curves.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Curve.js | Source}
     */
    export interface CurveOptions {
        points: Vec3[];
        divisions: number;
        type: 'catmullrom' | 'cubicbezier' | 'quadraticbezier';
    }

    export class Curve {
        static CATMULLROM: 'catmullrom';
        static CUBICBEZIER: 'cubicbezier';
        static QUADRATICBEZIER: 'quadraticbezier';

        points: Vec3[];
        divisions: number;
        type: 'catmullrom' | 'cubicbezier' | 'quadraticbezier';

        constructor(options?: Partial<CurveOptions>);

        getPoints(divisions?: number, a?: number, b?: number): Vec3[];
    }

    /**
     * The base class for most objects and provides a set of properties and methods for manipulating
     * objects in 3D space.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Transform.js | Source}
     */
    export class Transform {
        /**
         * The parent.
         * @see {@link https://en.wikipedia.org/wiki/Scene_graph | scene graph}.
         */
        parent: Transform | null;

        /**
         * An array with the children.
         */
        children: Transform[];

        /**
         * The visibility.
         */
        visible: boolean;

        matrix: Mat4;
        worldMatrix: Mat4;
        matrixAutoUpdate: boolean;

        /**
         * The local position.
         */
        position: Vec3;

        /**
         * The local rotation as {@link Euler | Euler angles}.
         */
        rotation: Euler;

        /**
         * The local rotation as a {@link Quat | Quaternion}.
         */
        quaternion: Quat;

        /**
         * The local scale.
         * @defaultValue `new Vec3(1)`
         */
        scale: Vec3;

        /**
         * Up vector used by the {@link lookAt | lookAt} method.
         * @defaultValue `new Vec3(0, 1, 0)`
         */
        up: Vec3;

        constructor();

        /**
         * Set the parent.
         * @param {Transform | null} parent The parent.
         * @param {boolean} [notifyParent=true] Adds this as a child of the parent.
         */
        setParent(parent: Transform | null, notifyParent?: boolean): void;

        /**
         * Add a child.
         * @param {Transform} child The child.
         * @param {boolean} [notifyChild=true] Sets the parent of the child to
         */
        addChild(child: Transform, notifyChild?: boolean): void;

        /**
         * Remove a child.
         * @param {Transform} child The child.
         * @param {boolean} [notifyChild=true] Sets the parent of the child to null.
         */
        removeChild(child: Transform, notifyChild?: boolean): void;

        /**
         * Update world transform.
         */
        updateMatrixWorld(force?: boolean): void;

        /**
         * Update local transform.
         */
        updateMatrix(): void;

        traverse(callback: (node: Transform) => boolean | void): void;

        decompose(): void;

        lookAt(target: Vec3 | [number, number, number], invert?: boolean): void;
    }

    /**
     * A perspective or orthographic camera.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Camera.js | Source}
     */
    export interface CameraOptions {
        near: number;
        far: number;
        fov: number;
        aspect: number;
        left: number;
        right: number;
        bottom: number;
        top: number;
        zoom: number;
    }

    export class Camera extends Transform {
        near: number;
        far: number;
        fov: number;
        aspect: number;
        left: number;
        right: number;
        bottom: number;
        top: number;
        zoom: number;

        projectionMatrix: Mat4;
        viewMatrix: Mat4;
        projectionViewMatrix: Mat4;
        worldPosition: Vec3;

        type: 'perspective' | 'orthographic';

        constructor(gl: OGLRenderingContext, options?: Partial<CameraOptions>);

        perspective(options?: Partial<CameraOptions>): this;

        orthographic(options?: Partial<CameraOptions>): this;

        updateMatrixWorld(): this;

        lookAt(target: Vec3 | [number, number, number]): this;

        project(v: Vec3): this;

        unproject(v: Vec2): this;

        updateFrustum(): void;

        frustumIntersectsMesh(node: any, worldMatrix?: Mat4): boolean;

        frustumIntersectsSphere(center: Vec3, radius: number): boolean;
    }

    /**
     * A mesh, line, or point geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Geometry.js | Source}
     */
    export interface Attribute {
        data: ArrayLike<number> | ArrayBufferView;
        size: number;
        instanced: null | number | boolean;
        type: GLenum;
        normalized: boolean;

        buffer: WebGLBuffer;
        stride: number;
        offset: number;
        count: number;
        min: any;
        max: any;

        target: number;
        id: number;
        divisor: number;
        needsUpdate: boolean;
    }

    export type AttributeMap = Record<string, Partial<Attribute>>;

    export type Bounds = {
        min: Vec3;
        max: Vec3;
        center: Vec3;
        scale: Vec3;
        radius: number;
    };

    export class Geometry {
        gl: OGLRenderingContext;
        attributes: AttributeMap;
        id: number;

        VAOs: object;
        drawRange: {
            start: number;
            count: number;
        };
        instancedCount: number;
        glState: RenderState;

        isInstanced: boolean;
        bounds: Bounds;

        constructor(gl: OGLRenderingContext, attributes?: AttributeMap);

        addAttribute(key: string, attr: Partial<Attribute>): void;

        updateAttribute(attr: Partial<Attribute>): void;

        setIndex(value: Attribute): void;

        setDrawRange(start: number, count: number): void;

        setInstancedCount(value: number): void;

        createVAO(program: Program): void;

        bindAttributes(program: Program): void;

        draw(options: object): void;

        getPosition(): Attribute | boolean | void;

        computeBoundingBox(attr?: Partial<Attribute>): void;

        computeBoundingSphere(attr?: Partial<Attribute>): void;

        remove(): void;
    }

    /**
     * A triangle geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Triangle.js | Source}
     */
    export class Triangle extends Geometry {}

    /**
     * A plane geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Plane.js | Source}
     */
    export interface PlaneOptions {
        width: number;
        height: number;
        widthSegments: number;
        heightSegments: number;
        attributes: AttributeMap;
    }

    export class Plane extends Geometry {
        constructor(gl: OGLRenderingContext, options?: Partial<PlaneOptions>);

        static buildPlane(
            position: Float32Array,
            normal: Float32Array,
            uv: Float32Array,
            index: Uint32Array | Uint16Array,
            width: number,
            height: number,
            depth: number,
            wSegs: number,
            hSegs: number,
            u: number,
            v: number,
            w: number,
            uDir: number,
            vDir: number,
            i: number,
            ii: number,
        ): void;
    }

    /**
     * A box geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Box.js | Source}
     */
    export interface BoxOptions {
        width: number;
        height: number;
        depth: number;
        widthSegments: number;
        heightSegments: number;
        depthSegments: number;
        attributes: AttributeMap;
    }

    export class Box extends Geometry {
        constructor(gl: OGLRenderingContext, options?: Partial<BoxOptions>);
    }

    /**
     * A sphere geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Sphere.js | Source}
     */
    export interface SphereOptions {
        radius: number;
        widthSegments: number;
        heightSegments: number;
        phiStart: number;
        phiLength: number;
        thetaStart: number;
        thetaLength: number;
        attributes: AttributeMap;
    }

    export class Sphere extends Geometry {
        constructor(gl: OGLRenderingContext, options?: Partial<SphereOptions>);
    }

    /**
     * A cylinder geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Cylinder.js | Source}
     */
    export interface CylinderOptions {
        radiusTop: number;
        radiusBottom: number;
        height: number;
        radialSegments: number;
        heightSegments: number;
        openEnded: boolean;
        thetaStart: number;
        thetaLength: number;
        attributes: AttributeMap;
    }

    export class Cylinder extends Geometry {
        constructor(gl: OGLRenderingContext, options?: Partial<CylinderOptions>);
    }

    /**
     * A torus geometry.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Torus.js | Source}
     */
    export interface TorusOptions {
        radius: number;
        tube: number;
        radialSegments: number;
        tubularSegments: number;
        arc: number;
        attributes: AttributeMap;
    }

    export class Torus extends Geometry {
        constructor(gl: OGLRenderingContext, options?: Partial<TorusOptions>);
    }

    /**
     * A WebGL program.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Program.js | Source}
     */
    export interface ProgramOptions {
        vertex: string;
        fragment: string;
        uniforms: Record<string, any>;
        transparent: boolean;
        cullFace: GLenum | false;
        frontFace: GLenum;
        depthTest: boolean;
        depthWrite: boolean;
        depthFunc: GLenum;
    }

    export interface BlendFunc {
        src: GLenum;
        dst: GLenum;
        srcAlpha: GLenum;
        dstAlpha: GLenum;
    }

    export interface BlendEquation {
        modeRGB: GLenum;
        modeAlpha: GLenum;
    }

    export class Program {
        gl: OGLRenderingContext;
        uniforms: Record<string, any>;
        id: number;

        transparent: boolean;
        cullFace: GLenum | false;
        frontFace: GLenum;
        depthTest: boolean;
        depthWrite: boolean;
        depthFunc: GLenum;
        blendFunc: BlendFunc;
        blendEquation: BlendEquation;
        uniformLocations: Map<number, WebGLUniformLocation>;
        attributeLocations: Map<any, any>;
        attributeOrder: string;

        constructor(gl: OGLRenderingContext, options?: Partial<ProgramOptions>);

        setBlendFunc(src: GLenum, dst: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void;

        setBlendEquation(modeRGB: GLenum, modeAlpha: GLenum): void;

        applyState(): void;

        use(options?: object): void;

        remove(): void;
    }

    /**
     * A normal program.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/NormalProgram.js | Source}
     */
    export class NormalProgram extends Program {
        constructor(gl: OGLRenderingContext, options?: Partial<ProgramOptions>);
    }

    /**
     * Represents a {@link https://en.wikipedia.org/wiki/Polygon_mesh | polygon mesh}.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Mesh.js | Source}
     */
    export interface MeshOptions<
        TGeometry extends Geometry = Geometry,
        TProgram extends Program = Program,
    > {
        geometry: TGeometry;
        program: TProgram;
        mode: GLenum;
        frustumCulled: boolean;
        renderOrder: number;
    }

    export interface DrawOptions {
        camera: Camera;
    }

    export class Mesh<
        TGeometry extends Geometry = Geometry,
        TProgram extends Program = Program,
    > extends Transform {
        gl: OGLRenderingContext;
        id: number;

        geometry: TGeometry;
        program: TProgram;
        mode: GLenum;
        frustumCulled: boolean;
        renderOrder: number;

        modelViewMatrix: Mat4;
        normalMatrix: Mat3;

        beforeRenderCallbacks: Function[];
        afterRenderCallbacks: Function[];

        constructor(gl: OGLRenderingContext, options?: Partial<MeshOptions>);

        onBeforeRender(f: Function): this;

        onAfterRender(f: Function): this;

        draw(options: Partial<DrawOptions>): void;
    }

    /**
     * A special version of {@link Mesh | Mesh} with instanced frustum culling.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/InstancedMesh.js | Source}
     */
    export class InstancedMesh extends Mesh {
        readonly isInstancedMesh: true;

        addFrustumCull(): void;

        removeFrustumCull(): void;
    }

    /**
     * A polyline mesh.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Polyline.js | Source}
     */
    export interface PolylineOptions {
        points: Vec3[];
        vertex: string;
        fragment: string;
        uniforms: Record<string, any>;
        attributes: AttributeMap;
    }

    export class Polyline {
        gl: OGLRenderingContext;
        points: Vec3[];
        count: number;

        position: Float32Array;
        prev: Float32Array;
        next: Float32Array;

        geometry: Geometry;

        resolution: { value: Vec2 };
        dpr: { value: number };
        thickness: { value: number };
        color: { value: Color };
        miter: { value: number };

        program: Program;

        mesh: Mesh;

        constructor(gl: OGLRenderingContext, options?: Partial<PolylineOptions>);

        updateGeometry(): void;

        resize(): void;
    }

    /**
     * A surface, reflection, or refraction map.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Texture.js | Source}
     */
    export type CompressedImage = {
        isCompressedTexture?: boolean;
    } & {
        data: Uint8Array;
        width: number;
        height: number;
    }[];

    export type ImageRepresentation =
        | HTMLImageElement
        | HTMLVideoElement
        | HTMLImageElement[]
        | ArrayBufferView
        | CompressedImage

    export interface TextureOptions {
        image: ImageRepresentation;
        target: number;
        type: number;
        format: number;
        internalFormat: number;
        wrapS: number;
        wrapT: number;
        generateMipmaps: boolean;
        minFilter: number;
        magFilter: number;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        flipY: boolean;
        anisotropy: number;
        level: number;
        width: number;
        height: number;
    }

    export class Texture {
        ext: string;
        gl: OGLRenderingContext;
        id: number;

        image: ImageRepresentation;
        target: number;
        type: number;
        format: number;
        internalFormat: number;
        wrapS: number;
        wrapT: number;
        generateMipmaps: boolean;
        minFilter: number;
        magFilter: number;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        flipY: boolean;
        anisotropy: number;
        level: number;
        width: number;
        height: number;

        texture: WebGLTexture;
        store: {
            image: any;
        };
        glState: RenderState;

        state: {
            minFilter: number;
            magFilter: number;
            wrapS: number;
            wrapT: number;
            anisotropy: number;
        };

        loaded: Promise<Texture>; // Set from texture loader

        constructor(gl: OGLRenderingContext, options?: Partial<TextureOptions>);

        bind(): void;

        update(textureUnit?: number): void;
    }

    /**
     * The texture loader.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/TextureLoader.js | Source}
     */
    export class TextureLoader {
        static load(gl: OGLRenderingContext, options?: object): Texture;

        static getSupportedExtensions(gl: OGLRenderingContext): string[];

        static loadKTX(src: string, texture: Texture): Promise<void>;

        static loadImage(
            gl: OGLRenderingContext,
            src: string,
            texture: Texture,
            flipY: boolean,
        ): Promise<HTMLImageElement | ImageBitmap>;

        static clearCache(): void;
    }

    /**
     * A {@link https://github.com/binomialLLC/basis_universal | Basis Universal GPU Texture} loader.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/BasisManager.js | Source}
     */
    export type BasisImage = (Uint8Array | Uint16Array) & {
        width: number
        height: number
        isCompressedTexture: boolean
        internalFormat: number
        isBasis: boolean
    };

    export class BasisManager {
        constructor(workerSrc: string | URL, gl?: OGLRenderingContext);

        getSupportedFormat(gl?: OGLRenderingContext): 'astc' | 'bptc' | 's3tc' | 'etc1' | 'pvrtc' | 'none';

        initWorker(workerSrc: string | URL): void;

        onMessage(event: { data: { id: number; error: string; image: BasisImage } }): void;

        parseTexture(buffer: ArrayBuffer): Promise<BasisImage>;
    }

    /**
     * A mesh with a skeleton and bones for animation.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GLTFSkin.js | Source}
     */
    export interface GLTFSkinSkeleton {
        joints: { worldMatrix: Mat4; bindInverse: Mat4 }[];
    }

    export interface GLTFSkinOptions {
        skeleton: GLTFSkinSkeleton;
        geometry: Geometry;
        program: Program;
        mode: GLenum;
    }

    export class GLTFSkin<
        TProgram extends Program = Program,
    > extends Mesh {
        skeleton: GLTFSkinSkeleton;
        program: TProgram;

        boneMatrices: Float32Array;
        boneTextureSize: number;
        boneTexture: Texture;

        constructor(gl: OGLRenderingContext, options?: Partial<GLTFSkinOptions>);

        createBoneTexture(): void;

        updateUniforms(): void;

        draw(options?: { camera?: Camera }): void;
    }

    /**
     * A class for animation.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GLTFAnimation.js | Source}
     */
    export interface GLTFAnimationData {
        node: any;
        transform: any;
        interpolation: any;
        times: any;
        values: any;
    }

    export class GLTFAnimation {
        data: GLTFAnimationData[];
        elapsed: number;
        weight: number;
        loop: boolean;
        startTime: number;
        endTime: number;
        duration: number;

        constructor(data: GLTFAnimationData[], weight?: number);

        update(totalWeight?: number, isSet?: boolean): void;

        cubicSplineInterpolate(t: number, prevVal: any, prevTan: any, nextTan: any, nextVal: any): any;
    }

    /**
     * A {@link https://www.khronos.org/gltf/ | glTF (GL Transmission Format)} loader.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GLTFLoader.js | Source}
     */
    export interface GLTFAnimationReference {
        name: string;
        animation: GLTFAnimation;
    }

    export interface GLTFLightOptions {
        name: string;
        color: { value: Color };
        direction: { value: Vec3 };
        position: { value: Vec3 };
        distance: { value: number };
        decay: { value: number };
    }

    export interface GLTFLights {
        directional: Partial<GLTFLightOptions>[];
        point: Partial<GLTFLightOptions>[];
        spot: Partial<GLTFLightOptions>[];
    }

    export interface GLTFAccessor {
        data: ArrayLike<number>;
        size: number;
        type: number | string;
        normalized: boolean;
        buffer: WebGLBuffer;
        stride: number;
        offset: number;
        count: number;
        min: number;
        max: number;
    }

    export interface GLTFSkinReference {
        inverseBindMatrices: GLTFAccessor;
        skeleton: GLTFSkinSkeleton;
        joints: { worldMatrix: Mat4; bindInverse: Mat4 }[];
    }

    export interface GLTFMaterial {
        name: string;
        extensions: object;
        extras: object;
        baseColorFactor: [number, number, number, number];
        baseColorTexture: { texture: Texture; scale: number };
        metallicFactor: number;
        roughnessFactor: number;
        metallicRoughnessTexture: { texture: Texture; scale: number };
        normalTexture: { texture: Texture; scale: number };
        occlusionTexture: { texture: Texture; scale: number };
        emissiveTexture: { texture: Texture; scale: number };
        emissiveFactor: [number, number, number];
        alphaMode: string;
        alphaCutoff: number;
        doubleSided: boolean;
    }

    export interface GLTFProgram extends NormalProgram {
        gltfMaterial: GLTFMaterial;
    }

    export interface GLTFPrimitive {
        geometry: Geometry;
        program: GLTFProgram;
        mode: number;
    }

    export interface GLTFMesh {
        primitives: (InstancedMesh | Mesh)[];
        weights: number[];
        name: string;
    }

    export interface GLTFDescription {
    }

    export interface GLTF {
        json: GLTFDescription;
        buffers: ArrayBuffer[];
        bufferViews: ArrayBufferView[];
        images: (HTMLImageElement | ImageBitmap)[];
        textures: Texture[];
        materials: GLTFMaterial[];
        meshes: GLTFMesh[];
        nodes: (InstancedMesh | Mesh)[];
        lights: GLTFLights;
        animations: GLTFAnimationReference[];
        scenes: Transform[];
        scene: Transform[];
    }

    export class GLTFLoader {
        static setBasisManager(manager: BasisManager): void;

        static load(gl: OGLRenderingContext, src: string): Promise<GLTF>;

        static parse(gl: OGLRenderingContext, desc: GLTFDescription, dir: string): Promise<GLTF>;

        static parseDesc(src: string): Promise<GLTFDescription>;

        static unpackGLB(glb: ArrayBuffer): GLTFDescription;

        static resolveURI(uri: string, dir: string): string;

        static loadBuffers(desc: GLTFDescription, dir: string): Promise<ArrayBuffer[]> | null;

        static parseBufferViews(gl: OGLRenderingContext, desc: GLTFDescription, buffers: ArrayBuffer[]): ArrayBufferView[] | null;

        static parseImages(gl: OGLRenderingContext, desc: GLTFDescription, dir: string, bufferViews: ArrayBufferView[]): Promise<(HTMLImageElement | ImageBitmap)[]> | null;

        static parseTextures(gl: OGLRenderingContext, desc: GLTFDescription, images: (HTMLImageElement | ImageBitmap)[]): Texture[] | null;

        static createTexture(gl: OGLRenderingContext, desc: GLTFDescription, images: (HTMLImageElement | ImageBitmap)[], options: { sample: any; source: any; name: any; extensions: any; extras: any }): Texture;

        static parseMaterials(gl: OGLRenderingContext, desc: GLTFDescription, textures: Texture[]): GLTFMaterial[] | null;

        static parseSkins(gl: OGLRenderingContext, desc: GLTFDescription, bufferViews: ArrayBufferView[]): GLTFSkinReference[] | null;

        static parseMeshes(gl: OGLRenderingContext, desc: GLTFDescription, bufferViews: ArrayBufferView[], materials: GLTFMaterial[], skins: GLTFSkinReference[]): GLTFMesh[] | null;

        static parsePrimitives(gl: OGLRenderingContext, primitives: object[], desc: GLTFDescription, bufferViews: ArrayBufferView[], materials: GLTFMaterial[], numInstances: number, isLightmap: boolean): GLTFPrimitive[];

        static parseAccessor(index: number, desc: GLTFDescription, bufferViews: ArrayBufferView[]): GLTFAccessor;

        static parseNodes(gl: OGLRenderingContext, desc: GLTFDescription, meshes: GLTFMesh[], skins: GLTFSkinReference[], images: (HTMLImageElement | ImageBitmap)[]): (InstancedMesh | Mesh)[] | null;

        static populateSkins(skins: GLTFSkinReference[], nodes: (InstancedMesh | Mesh)[]): void;

        static parseAnimations(gl: OGLRenderingContext, desc: GLTFDescription, nodes: (InstancedMesh | Mesh)[], bufferViews: ArrayBufferView[]): GLTFAnimationReference[] | null;

        static parseScenes(desc: GLTFDescription, nodes: (InstancedMesh | Mesh)[]): Transform[] | null;

        static parseLights(gl: OGLRenderingContext, desc: GLTFDescription, nodes: (InstancedMesh | Mesh)[], scenes: Transform[]): GLTFLights;
    }

    /**
     * A render target.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/RenderTarget.js | Source}
     */
    export interface RenderTargetOptions {
        width: number;
        height: number;
        target: GLenum;
        color: number;
        depth: boolean;
        stencil: boolean;
        depthTexture: boolean;
        wrapS: GLenum;
        wrapT: GLenum;
        minFilter: GLenum;
        magFilter: GLenum;
        type: GLenum;
        format: GLenum;
        internalFormat: GLenum;
        unpackAlignment: number;
        premultiplyAlpha: boolean;
    }

    export class RenderTarget {
        gl: OGLRenderingContext;
        width: number;
        height: number;
        depth: boolean;
        buffer: WebGLFramebuffer;
        target: number;

        textures: Texture[];
        texture: Texture;

        constructor(gl: OGLRenderingContext, options?: Partial<RenderTargetOptions>);

        setSize(width: number, height: number): void;
    }

    /**
     * The WebGL renderer.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Renderer.js | Source}
     */
    export interface RendererOptions {
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
        dpr: number;
        alpha: boolean;
        depth: boolean;
        stencil: boolean;
        antialias: boolean;
        premultipliedAlpha: boolean;
        preserveDrawingBuffer: boolean;
        powerPreference: string;
        autoClear: boolean;
        webgl: number;
    }

    export type OGLRenderingContext = {
        renderer: Renderer;
        canvas: HTMLCanvasElement;
    } & (WebGL2RenderingContext | WebGLRenderingContext);

    export type RenderState = {
        blendFunc: { src: GLenum; dst: GLenum; srcAlpha?: any; dstAlpha?: any };
        blendEquation: { modeRGB: GLenum; modeAlpha?: any };
        cullFace: GLenum | false;
        frontFace: number;
        depthMask: boolean;
        depthFunc: number;
        premultiplyAlpha: boolean;
        flipY: boolean;
        unpackAlignment: number;
        viewport: { width: number | null; height: number | null };
        textureUnits: Array<number>;
        activeTextureUnit: number;
        framebuffer: any;
        boundBuffer: any;
        uniformLocations: Map<number, WebGLUniformLocation>;
    };

    export type RenderExtensions = Record<string, any>;

    export type DeviceParameters = {
        maxTextureUnits: number;
        maxAnisotropy: number;
    };

    export class Renderer {
        dpr: number;
        alpha: boolean;
        color: boolean;
        depth: boolean;
        stencil: boolean;
        premultipliedAlpha: boolean;
        autoClear: boolean;
        id: number;

        gl: OGLRenderingContext;
        isWebgl2: boolean;
        width: number;
        height: number;

        state: RenderState;
        extensions: RenderExtensions;

        vertexAttribDivisor: Function;
        drawArraysInstanced: Function;
        drawElementsInstanced: Function;
        createVertexArray: Function;
        bindVertexArray: Function;
        deleteVertexArray: Function;
        drawBuffers: Function;

        parameters: DeviceParameters;

        constructor(options?: Partial<RendererOptions>);

        setSize(width: number, height: number): void;

        setViewport(width: number, height: number, x?: number, y?: number): void;

        setScissor(width: number, height: number, x?: number, y?: number): void;

        enable(id: GLenum): void;

        disable(id: GLenum): void;

        setBlendFunc(src: GLenum, dst: GLenum, srcAlpha: GLenum, dstAlpha: GLenum): void;

        setBlendEquation(modeRGB: GLenum, modeAlpha: GLenum): void;

        setCullFace(value: GLenum): void;

        setFrontFace(value: GLenum): void;

        setDepthMask(value: GLboolean): void;

        setDepthFunc(value: GLenum): void;

        activeTexture(value: number): void;

        bindFramebuffer(options?: object): void;

        getExtension(extension: string, webgl2Func: string, extFunc: string): Function;

        sortOpaque(a: number, b: number): number;

        sortTransparent(a: number, b: number): number;

        sortUI(a: number, b: number): number;

        getRenderList(options: object): void;

        render(options: object): void;
    }

    /**
     * Orbit controls based on the three.js `OrbitControls` class, rewritten using ES6 with some
     * additions and subtractions.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Orbit.js | Source}
     * @see {@link https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/OrbitControls.js | `OrbitControls` Source}
     */
    export interface OrbitOptions {
        element: HTMLElement;
        enabled: boolean;
        target: Vec3;
        ease: number;
        inertia: number;
        enableRotate: boolean;
        rotateSpeed: number;
        autoRotate: boolean;
        autoRotateSpeed: number;
        enableZoom: boolean;
        zoomSpeed: number;
        zoomStyle: 'dolly' | 'fov' | string;
        enablePan: boolean;
        panSpeed: number;
        minPolarAngle: number;
        maxPolarAngle: number;
        minAzimuthAngle: number;
        maxAzimuthAngle: number;
        minDistance: number;
        maxDistance: number;
    }

    export class Orbit {
        enabled: boolean;
        target: Vec3;
        zoomStyle: 'dolly' | 'fov' | string;

        minDistance: number;
        maxDistance: number;

        offset: Vec3;

        constructor(object: Transform & { fov: number }, options?: Partial<OrbitOptions>);

        update(): void;

        forcePosition(): void;

        remove(): void;
    }

    /**
     * A class for {@link https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units | GPGPU (General Purpose GPU)} calculations.
     *
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GPGPU.js | Source}
     */
    export interface GPGPUPass {
        mesh: Mesh;
        program: Program;
        uniforms: Record<string, any>;
        enabled: boolean;
        textureUniform: string;
    }

    export interface GPGPUOptions {
        data: Float32Array
        geometry: Triangle
        type: Texture['type']
    }

    export class GPGPU {
        gl: OGLRenderingContext;
        passes: GPGPUPass[];
        geometry: Triangle;
        dataLength: number;
        size: number;
        coords: Float32Array;
        uniform: { value: any };
        fbo: { read: RenderTarget; write: RenderTarget; swap: () => void };

        constructor(gl: OGLRenderingContext, options?: Partial<GPGPUOptions>);

        addPass(options?: {
            vertex?: string;
            fragment?: string;
            uniforms?: Record<string, any>;
            textureUniform?: string;
            enabled?: boolean;
        }): GPGPUPass;

        render(): void;
    }
}
