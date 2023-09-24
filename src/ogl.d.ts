// Type definitions for ogl 1.0.0
// Project: https://github.com/oframe/ogl
// Definitions by: Xin Chen <https://github.com/nshen>
//                 Cody Bennett <https://github.com/CodyJasonBennett>
//                 Patrick Schroen <https://github.com/pschroen>
// Definitions: https://github.com/oframe/ogl

declare module 'ogl' {
    export type EulerTuple = [x: number, y: number, z: number];

    export type EulerOrder = 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';

    /**
     * Implementation of {@link https://en.wikipedia.org/wiki/Euler_angles | Euler angles}.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Euler.js | Source}
     */
    export class Euler extends Array<number> {
        order: EulerOrder;
        onChange: () => void;

        constructor(x?: number, y?: number, z?: number, order?: EulerOrder);

        get x(): number;

        get y(): number;

        get z(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set(x: number | Euler | EulerTuple, y?: number, z?: number): this;

        copy(v: Euler): this;

        reorder(order: EulerOrder): this;

        fromRotationMatrix(m: Mat4, order?: EulerOrder): this;

        fromQuaternion(q: Quat, order?: EulerOrder): this;

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;
    }

    export type QuatTuple = [x: number, y: number, z: number, w: number];

    /**
     * Implementation of a quaternion.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Quat.js | Source}
     */
    export class Quat extends Array<number> {
        onChange: () => void;

        constructor(x?: number, y?: number, z?: number, w?: number);

        get x(): number;

        get y(): number;

        get z(): number;

        get w(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set w(v: number);

        identity(): this;

        set(x: number | Quat | QuatTuple, y: number, z: number, w: number): this;

        rotateX(a: number): this;

        rotateY(a: number): this;

        rotateZ(a: number): this;

        inverse(q?: Quat): this;

        conjugate(q?: Quat): this;

        copy(q: Quat): this;

        normalize(q?: Quat): this;

        multiply(qA: Quat, qB?: Quat): this;

        dot(v: Quat): number;

        fromMatrix3(matrix3: Mat3): this;

        fromEuler(euler: Euler): this;

        fromAxisAngle(axis: Vec3, a: number): this;

        slerp(q: Quat, t: number): this;

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;
    }

    export type Vec2Tuple = [x: number, y: number];

    /**
     * 2D vector.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Vec2.js | Source}
     */
    export class Vec2 extends Array<number> {
        constructor(x?: number, y?: number);

        get x(): number;

        get y(): number;

        set x(v: number);

        set y(v: number);

        set(x: number | Vec2 | Vec2Tuple, y?: number): this;

        copy(v: Vec2): this;

        add(va: Vec2, vb?: Vec2): this;

        sub(va: Vec2, vb?: Vec2): this;

        multiply(v: Vec2 | number): this;

        divide(v: Vec2 | number): this;

        inverse(v?: Vec2): this;

        len(): number;

        distance(v?: Vec2): number;

        squaredLen(): number;

        squaredDistance(v?: Vec2): number;

        negate(v?: Vec2): this;

        cross(va: Vec2, vb?: Vec2): number;

        scale(v: number): this;

        normalize(): this;

        dot(v: Vec2): number;

        equals(v: Vec2): boolean;

        applyMatrix3(mat3: Mat3): this;

        applyMatrix4(mat4: Mat4): this;

        lerp(v: Vec2, a: number): this;

        clone(): Vec2;

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;
    }

    export type Vec3Tuple = [x: number, y: number, z: number];

    /**
     * 3D vector.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Vec3.js | Source}
     */
    export class Vec3 extends Array<number> {
        constructor(x?: number, y?: number, z?: number);

        get x(): number;

        get y(): number;

        get z(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set(x: number | Vec3 | Vec3Tuple, y?: number, z?: number): this;

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

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;

        transformDirection(mat4: Mat4): this;
    }

    export type Vec4Tuple = [x: number, y: number, z: number, w: number];

    /**
     * 4D vector.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Vec4.js | Source}
     */
    export class Vec4 extends Array<number> {
        constructor(x?: number, y?: number, z?: number, w?: number);

        get x(): number;

        get y(): number;

        get z(): number;

        get w(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set w(v: number);

        set(x: number | Vec4 | Vec4Tuple, y?: number, z?: number, w?: number): this;

        copy(v: Vec4): this;

        normalize(): this;

        multiply(v: number): this;

        dot(v: Vec4): number;

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;
    }

    export type Mat3Tuple = [
        m00: number,
        m01: number,
        m02: number,
        m10: number,
        m11: number,
        m12: number,
        m20: number,
        m21: number,
        m22: number,
    ];

    /**
     * 3x3 matrix.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Mat3.js | Source}
     */
    export class Mat3 extends Array<number> {
        constructor(
            m00?: number,
            m01?: number,
            m02?: number,
            m10?: number,
            m11?: number,
            m12?: number,
            m20?: number,
            m21?: number,
            m22?: number,
        );

        set(
            m00: number | Mat3 | Mat3Tuple,
            m01: number,
            m02: number,
            m10: number,
            m11: number,
            m12: number,
            m20: number,
            m21: number,
            m22: number,
        ): this;

        translate(v: Vec2, m?: Mat3): this;

        rotate(v: number, m?: Mat3): this;

        scale(v: Vec2, m?: Mat3): this;

        multiply(ma: Mat3, mb?: Mat3): this;

        identity(): this;

        copy(m: Mat3): this;

        fromMatrix4(m: Mat4): this;

        fromQuaternion(q: Quat): this;

        fromBasis(vec3a: Vec3, vec3b: Vec3, vec3c: Vec3): this;

        inverse(m?: Mat3): this;

        getNormalMatrix(m: Mat4): this;
    }

    export type Mat4Tuple = [
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
    ];

    /**
     * 4x4 matrix.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Mat4.js | Source}
     */
    export class Mat4 extends Array<number> {
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

        get x(): number;

        get y(): number;

        get z(): number;

        get w(): number;

        set x(v: number);

        set y(v: number);

        set z(v: number);

        set w(v: number);

        set(
            m00: number | Mat4 | Mat4Tuple,
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

        translate(v: Vec3, m?: Mat4): this;

        rotate(v: number, axis: Vec3, m?: Mat4): this;

        scale(v: Vec3 | number, m?: Mat4): this;

        add(ma: Mat4, mb?: Mat4): this;

        sub(ma: Mat4, mb?: Mat4): this;

        multiply(ma: Mat4 | number, mb?: Mat4): this;

        identity(): this;

        copy(m: Mat4): this;

        fromPerspective(options: {fov: number; aspect: number; near: number; far: number}): this;

        fromOrthogonal(options: {
            left: number;
            right: number;
            bottom: number;
            top: number;
            near: number;
            far: number;
        }): this;

        fromQuaternion(q: Quat): this;

        setPosition(v: Vec3): this;

        inverse(m?: Mat4): this;

        compose(q: Quat, pos: Vec3, scale: Vec3): this;

        getRotation(q: Quat): this;

        getTranslation(pos: Vec3): this;

        getScaling(scale: Vec3): this;

        getMaxScaleOnAxis(): number;

        lookAt(eye: Vec3, target: Vec3 | Vec3Tuple, up: Vec3): this;

        determinant(): number;

        fromArray(a: number[] | AttributeData, o?: number): this;

        toArray<T extends number[] | AttributeData>(a?: T, o?: number): T;
    }

    export type ColorTuple = [r: number, g: number, b: number];

    export type ColorRepresentation =
        | number
        | 'black'
        | 'white'
        | 'red'
        | 'green'
        | 'blue'
        | 'fuchsia'
        | 'cyan'
        | 'yellow'
        | 'orange'
        | string
        | ColorTuple;

    /**
     * Represents a color.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/math/Color.js | Source}
     */
    export class Color extends Array<number> {
        constructor(color?: number | Color | ColorRepresentation, g?: number, b?: number);

        get r(): number;

        get g(): number;

        get b(): number;

        set r(v: number);

        set g(v: number);

        set b(v: number);

        set(color?: number | Color | ColorRepresentation, g?: number, b?: number): this;

        copy(v: Color): this;
    }

    /**
     * A class for creating curves.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Curve.js | Source}
     */
    export type CurveType = 'catmullrom' | 'cubicbezier' | 'quadraticbezier';

    export interface CurveOptions {
        points: Vec3[];
        divisions: number;
        type: CurveType;
    }

    export class Curve {
        static CATMULLROM: 'catmullrom';
        static CUBICBEZIER: 'cubicbezier';
        static QUADRATICBEZIER: 'quadraticbezier';

        points: Vec3[];
        divisions: number;
        type: CurveType;

        constructor(options?: Partial<CurveOptions>);

        getPoints(divisions?: number, a?: number, b?: number): Vec3[];
    }

    /**
     * Path builder.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Path/Path.js | Source}
     */
    export class Path {
        tiltFunction: Function | null;

        constructor();

        moveTo(p: Vec3, tilt?: number): void;

        bezierCurveTo(cp1: Vec3, cp2: Vec3, p: Vec3, tilt?: number): this;

        quadraticCurveTo(cp: Vec3, p: Vec3, tilt?: number): this;

        lineTo(p: Vec3, tilt?: number): this;

        addSegment(segment: object): this;

        getSegments(): object[];

        updateLength(): void;

        getLength(): number;

        findSegmentIndexAtLength(len: number): [number, number];

        getPointAtLength(len: number, out?: Vec3): Vec3;

        getPointAt(t: number, out?: Vec3): Vec3;

        getTangentAtLength(len: number, out?: Vec3): number;

        getTangentAt(t: number, out?: Vec3): number;

        getTiltAtLength(len: number): number;

        getTiltAt(t: number): number;

        getPoints(divisions?: number): Vec3[];

        computeFrenetFrames(
            divisions?: number,
            closed?: boolean,
        ): {tangents: Vec3[]; normals: Vec3[]; binormals: Vec3[]};
    }

    /**
     * The base class for most objects and provides a set of properties and methods for manipulating
     * objects in 3D space.
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

        /**
         * The local transform matrix.
         */
        matrix: Mat4;

        /**
         * The world transform matrix.
         */
        worldMatrix: Mat4;

        /**
         * When set, it updates the local transform matrix every frame and also updates the worldMatrix
         * property.
         * @defaultValue `true`
         */
        matrixAutoUpdate: boolean;

        /**
         * When set, it updates the world transform matrix in that frame and resets this property to
         * false.
         * @defaultValue `false`
         */
        worldMatrixNeedsUpdate: boolean;

        /**
         * The local position.
         */
        position: Vec3;

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
         * The local rotation as {@link Euler | Euler angles}.
         */
        rotation: Euler;

        /**
         * Up vector used by the {@link lookAt | lookAt} method.
         * @defaultValue `new Vec3(0, 1, 0)`
         */
        up: Vec3;

        /**
         * Creates a new transform object.
         */
        constructor();

        /**
         * Set the parent.
         * @param {Transform | null} parent The parent.
         * @param {boolean} [notifyParent=true] Adds this as a child of the parent.
         */
        setParent(parent: Transform | null, notifyParent?: boolean): void;

        /**
         * Adds a child.
         * @param {Transform} child The child.
         * @param {boolean} [notifyChild=true] Sets the parent of the child to this.
         */
        addChild(child: Transform, notifyChild?: boolean): void;

        /**
         * Removes a child.
         * @param {Transform} child The child.
         * @param {boolean} [notifyChild=true] Sets the parent of the child to null.
         */
        removeChild(child: Transform, notifyChild?: boolean): void;

        /**
         * Updates the world transform matrix.
         */
        updateMatrixWorld(force?: boolean): void;

        /**
         * Updates the local transform matrix.
         */
        updateMatrix(): void;

        /**
         * Executes the callback on this transform object and all descendants.
         * @param {Function} callback The callback.
         */
        traverse(callback: (node: Transform) => boolean | void): void;

        /**
         * Decomposes this transform object into it's position, quaternion and scale components.
         */
        decompose(): void;

        /**
         * Rotates this transform object to face a target vector.
         * @param {Vec3 | Vec3Tuple} target A target vector to look at.
         * @param {boolean} [invert=false] Invert the local position and target vector.
         */
        lookAt(target: Vec3 | Vec3Tuple, invert?: boolean): void;
    }

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

    export interface PerspectiveOptions
        extends Pick<CameraOptions, 'near' | 'far' | 'fov' | 'aspect'> {}

    export interface OrthographicOptions
        extends Pick<CameraOptions, 'near' | 'far' | 'left' | 'right' | 'bottom' | 'top' | 'zoom'> {}

    export type CameraType = 'perspective' | 'orthographic';

    /**
     * A perspective or orthographic camera.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Camera.js | Source}
     */
    export class Camera extends Transform {
        projectionMatrix: Mat4;
        viewMatrix: Mat4;
        projectionViewMatrix: Mat4;
        worldPosition: Vec3;

        type: CameraType;

        near: number;
        far: number;
        fov: number;
        aspect: number;
        left: number;
        right: number;
        bottom: number;
        top: number;
        zoom: number;

        frustum: (Vec3 & {
            constant: number;
        })[];

        constructor(gl: OGLRenderingContext, options?: Partial<CameraOptions>);

        perspective(options?: Partial<PerspectiveOptions>): this;

        orthographic(options?: Partial<OrthographicOptions>): this;

        updateMatrixWorld(): this;

        lookAt(target: Vec3 | Vec3Tuple): this;

        project(v: Vec3): this;

        unproject(v: Vec3): this;

        updateFrustum(): void;

        frustumIntersectsMesh(node: Mesh, worldMatrix?: Mat4): boolean;

        frustumIntersectsSphere(center: Vec3, radius: number): boolean;
    }

    export type AttributeMap = Record<string, Partial<Attribute>>;

    export type AttributeData = Float32Array | Uint32Array | Uint16Array;

    export interface Attribute {
        data: AttributeData;
        size: number;
        instanced: null | number | boolean;
        type: GLenum;
        normalized: boolean;

        buffer: WebGLBuffer;
        stride: number;
        offset: number;
        count: number;
        target: number;
        id: number;
        divisor: number;
        needsUpdate: boolean;
        usage: number;
    }

    export interface Bounds {
        min: Vec3;
        max: Vec3;
        center: Vec3;
        scale: Vec3;
        radius: number;
    }

    export type GeometryRaycast = 'sphere' | 'box';

    /**
     * A mesh, line, or point geometry.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Geometry.js | Source}
     */
    export class Geometry {
        gl: OGLRenderingContext;
        attributes: AttributeMap;
        id: number;

        VAOs: {
            [programKey: string]: WebGLVertexArrayObject;
        };

        drawRange: {
            start: number;
            count: number;
        };
        instancedCount: number;

        glState: RenderState;

        isInstanced: boolean;
        bounds: Bounds;

        raycast?: GeometryRaycast; // User defined

        constructor(gl: OGLRenderingContext, attributes?: AttributeMap);

        addAttribute(key: string, attr: Partial<Attribute>): number | undefined;

        updateAttribute(attr: Partial<Attribute>): void;

        setIndex(value: Attribute): void;

        setDrawRange(start: number, count: number): void;

        setInstancedCount(value: number): void;

        createVAO(program: Program): void;

        bindAttributes(program: Program): void;

        draw(options: {program: Program; mode?: number}): void;

        getPosition(): Partial<Attribute>;

        computeBoundingBox(attr: Partial<Attribute>): void;

        computeBoundingSphere(attr?: Partial<Attribute>): void;

        remove(): void;
    }

    /**
     * A triangle geometry.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Triangle.js | Source}
     */
    export class Triangle extends Geometry {}

    /**
     * A plane geometry.
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
     * A tube geometry.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Tube.js | Source}
     */
    export interface TubeOptions {
        path: Path;
        radius: number;
        tubularSegments: number;
        radialSegments: number;
        closed: boolean;
        attributes: AttributeMap;
    }

    export class Tube extends Geometry {
        path: Path;
        radius: number;
        tubularSegments: number;
        radialSegments: number;
        closed: boolean;

        frenetFrames: object;

        positions: Float32Array;
        normals: Float32Array;
        uvs: Float32Array;
        indices: Uint32Array | Uint16Array;

        constructor(gl: OGLRenderingContext, options?: Partial<TubeOptions>);
    }

    /**
     * A text geometry.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Text.js | Source}
     */
    export type TextAlign = 'left' | 'right' | 'center';

    export interface TextOptions {
        font: object;
        text: string;
        width: number;
        align: TextAlign;
        size: number;
        letterSpacing: number;
        lineHeight: number;
        wordSpacing: number;
        wordBreak: boolean;
    }

    export class Text {
        buffers: {
            position: Float32Array;
            uv: Float32Array;
            id: Float32Array;
            index: Uint32Array | Uint16Array;
        };
        numLines: number;
        height: number;
        width: number;

        constructor(options?: Partial<TextOptions>);

        resize(options: {width: number}): void;

        update(options: {text: string}): void;
    }

    export interface ProgramOptions {
        vertex: string;
        fragment: string;
        uniforms: Record<string, any>;
        transparent: boolean;
        cullFace: GLenum | false | null;
        frontFace: GLenum;
        depthTest: boolean;
        depthWrite: boolean;
        depthFunc: GLenum;
    }

    export interface UniformInfo extends WebGLActiveInfo {
        uniformName: string;
        nameComponents: string[];
        isStruct: boolean;
        isStructArray: boolean;
        structIndex: number;
        structProperty: string;
    }

    /**
     * A WebGL program.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Program.js | Source}
     */
    export class Program {
        gl: OGLRenderingContext;
        uniforms: Record<string, any>;
        id: number;

        transparent: boolean;
        cullFace: GLenum | false | null;
        frontFace: GLenum;
        depthTest: boolean;
        depthWrite: boolean;
        depthFunc: GLenum;
        blendFunc: BlendFunc;
        blendEquation: BlendEquation;

        program: WebGLProgram;
        uniformLocations: Map<UniformInfo, WebGLUniformLocation>;
        attributeLocations: Map<WebGLActiveInfo, GLint>;
        attributeOrder: string;

        constructor(gl: OGLRenderingContext, options?: Partial<ProgramOptions>);

        setBlendFunc(src: GLenum, dst: GLenum, srcAlpha?: GLenum, dstAlpha?: GLenum): void;

        setBlendEquation(modeRGB: GLenum, modeAlpha: GLenum): void;

        applyState(): void;

        use(options?: {flipFaces?: boolean}): void;

        remove(): void;
    }

    /**
     * A normal program.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/NormalProgram.js | Source}
     */
    export class NormalProgram extends Program {
        constructor(gl: OGLRenderingContext, options?: Partial<ProgramOptions>);
    }

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

    export type MeshRenderCallback = (renderInfo: {mesh: Mesh; camera?: Camera}) => any;

    /**
     * Represents a {@link https://en.wikipedia.org/wiki/Polygon_mesh | polygon mesh}.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Mesh.js | Source}
     */
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
        beforeRenderCallbacks: MeshRenderCallback[];
        afterRenderCallbacks: MeshRenderCallback[];

        hit?: Partial<RaycastHit>; // Set from raycaster

        constructor(gl: OGLRenderingContext, options?: Partial<MeshOptions>);

        onBeforeRender(f: MeshRenderCallback): this;

        onAfterRender(f: MeshRenderCallback): this;

        draw(options?: {camera?: Camera}): void;
    }

    /**
     * A special version of {@link Mesh | Mesh} with instanced frustum culling.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/InstancedMesh.js | Source}
     */
    export class InstancedMesh extends Mesh {
        readonly isInstancedMesh: true;

        addFrustumCull(): void;

        removeFrustumCull(): void;
    }

    /**
     * A wireframe mesh.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/WireMesh.js | Source}
     */
    export interface WireMeshOptions extends MeshOptions {
        wireColor: Color;
    }

    export class WireMesh extends Mesh {
        constructor(gl: OGLRenderingContext, options?: Partial<WireMeshOptions>);
    }

    /**
     * Axes helper.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/helpers/AxesHelper.js | Source}
     */
    export interface AxesHelperOptions {
        size: number;
        symmetric: boolean;
        xColor: Color;
        yColor: Color;
        zColor: Color;
    }

    export class AxesHelper extends Mesh {
        constructor(gl: OGLRenderingContext, options?: Partial<AxesHelperOptions>);
    }

    /**
     * Vertex normals helper.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/helpers/VertexNormalsHelper.js | Source}
     */
    export interface VertexNormalsHelperOptions {
        size: number;
        color: Color;
    }

    export class VertexNormalsHelper extends Mesh {
        constructor(object: Mesh, options?: Partial<VertexNormalsHelperOptions>);
    }

    /**
     * Face normals helper.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/helpers/FaceNormalsHelper.js | Source}
     */
    export interface FaceNormalsHelperOptions {
        size: number;
        color: Color;
    }

    export class FaceNormalsHelper extends Mesh {
        constructor(object: Mesh, options?: Partial<FaceNormalsHelperOptions>);
    }

    /**
     * Grid helper.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/helpers/GridHelper.js | Source}
     */
    export interface GridHelperOptions {
        size: number;
        divisions: number;
        color: Color;
    }

    export class GridHelper extends Mesh {
        constructor(gl: OGLRenderingContext, options?: Partial<GridHelperOptions>);
    }

    /**
     * A polyline mesh.
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

        resolution: {value: Vec2};
        dpr: {value: number};
        thickness: {value: number};
        color: {value: Color};
        miter: {value: number};

        program: Program;

        mesh: Mesh;

        constructor(gl: OGLRenderingContext, options?: Partial<PolylineOptions>);

        updateGeometry(): void;

        resize(): void;
    }

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
        | CompressedImage;

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

    /**
     * A surface, reflection, or refraction map.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Texture.js | Source}
     */
    export class Texture {
        gl: OGLRenderingContext;
        id: number;

        image?: ImageRepresentation;
        target: number;
        type: number;
        format: number;
        internalFormat: number;
        minFilter: number;
        magFilter: number;
        wrapS: number;
        wrapT: number;
        generateMipmaps: boolean;
        premultiplyAlpha: boolean;
        unpackAlignment: number;
        flipY: boolean;
        anisotropy: number;
        level: number;
        width: number;
        height: number;
        texture: WebGLTexture;

        store: {
            image?: ImageRepresentation | null;
        };

        glState: RenderState;

        state: {
            minFilter: number;
            magFilter: number;
            wrapS: number;
            wrapT: number;
            anisotropy: number;
        };

        needsUpdate: boolean;
        onUpdate?: () => void;

        // Set from texture loader
        ext?: string;
        name?: string;
        loaded?: Promise<Texture>;

        constructor(gl: OGLRenderingContext, options?: Partial<TextureOptions>);

        bind(): void;

        update(textureUnit?: number): void;
    }

    /**
     * The texture loader.
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
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/BasisManager.js | Source}
     */
    export type BasisManagerFormat = 'astc' | 'bptc' | 's3tc' | 'etc1' | 'pvrtc' | 'none';

    export type BasisImage = (Uint8Array | Uint16Array) & {
        width: number;
        height: number;
        isCompressedTexture: boolean;
        internalFormat: number;
        isBasis: boolean;
    };

    export class BasisManager {
        constructor(workerSrc: string | URL, gl?: OGLRenderingContext);

        getSupportedFormat(gl?: OGLRenderingContext): BasisManagerFormat;

        initWorker(workerSrc: string | URL): void;

        onMessage(event: {data: {id: number; error: string; image: BasisImage}}): void;

        parseTexture(buffer: ArrayBuffer): Promise<BasisImage>;
    }

    /**
     * A class for animation.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Animation.js | Source}
     */
    export interface AnimationFrame {
        position: Vec3;
        quaternion: Quat;
        scale: Vec3;
    }

    export interface AnimationData {
        frames: AnimationFrame[];
    }

    export interface AnimationOptions {
        objects: BoneTransform[];
        data: AnimationData;
    }

    export class Animation {
        objects: BoneTransform[];
        data: AnimationData;
        elapsed: number;
        weight: number;
        duration: number;

        constructor(gl: OGLRenderingContext, options?: Partial<AnimationOptions>);

        update(totalWeight?: number, isSet?: boolean): void;
    }

    /**
     * A mesh with a skeleton and bones for animation.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Skin.js | Source}
     */
    export interface SkinRig {
        bindPose: {position: Vec3; quaternion: Quat; scale: Vec3};
        bones: {name: string; parent: Transform}[];
    }

    export interface SkinOptions {
        rig: SkinRig;
        geometry: Geometry;
        program: Program;
        mode: GLenum;
    }

    export interface BoneTransform extends Transform {
        name: string;
        bindInverse: Mat4;
    }

    export class Skin extends Mesh {
        root: Transform;

        bones: Transform[];

        boneMatrices: Float32Array;
        boneTextureSize: number;
        boneTexture: Texture;
        animations: Animation[];

        constructor(gl: OGLRenderingContext, options?: Partial<SkinOptions>);

        createBones(rig: SkinRig): void;

        createBoneTexture(): void;

        addAnimation(data: Animation['data']): Animation;

        update(): void;

        override draw(options?: {camera?: Camera}): void;
    }

    /**
     * A mesh with a skeleton and bones for animation.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GLTFSkin.js | Source}
     */
    export interface GLTFSkinSkeleton {
        joints: {worldMatrix: Mat4; bindInverse: Mat4}[];
    }

    export interface GLTFSkinOptions {
        skeleton: GLTFSkinSkeleton;
        geometry: Geometry;
        program: Program;
        mode: GLenum;
    }

    export class GLTFSkin<TProgram extends Program = Program> extends Mesh {
        skeleton: GLTFSkinSkeleton;
        program: TProgram;

        boneMatrices: Float32Array;
        boneTextureSize: number;
        boneTexture: Texture;

        constructor(gl: OGLRenderingContext, options?: Partial<GLTFSkinOptions>);

        createBoneTexture(): void;

        updateUniforms(): void;

        override draw(options?: {camera?: Camera}): void;
    }

    /**
     * A class for animation.
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
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GLTFLoader.js | Source}
     */
    export interface GLTFAnimationReference {
        name: string;
        animation: GLTFAnimation;
    }

    export interface GLTFLightOptions {
        name: string;
        color: {value: Color};
        direction: {value: Vec3};
        position: {value: Vec3};
        distance: {value: number};
        decay: {value: number};
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
        joints: {worldMatrix: Mat4; bindInverse: Mat4}[];
    }

    export interface GLTFMaterial {
        name: string;
        extensions: object;
        extras: object;
        baseColorFactor: [number, number, number, number];
        baseColorTexture: {texture: Texture; scale: number};
        metallicFactor: number;
        roughnessFactor: number;
        metallicRoughnessTexture: {texture: Texture; scale: number};
        normalTexture: {texture: Texture; scale: number};
        occlusionTexture: {texture: Texture; scale: number};
        emissiveTexture: {texture: Texture; scale: number};
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

    export interface GLTFDescription {} // TODO: remove?

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

        static parseBufferViews(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            buffers: ArrayBuffer[],
        ): ArrayBufferView[] | null;

        static parseImages(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            dir: string,
            bufferViews: ArrayBufferView[],
        ): Promise<(HTMLImageElement | ImageBitmap)[]> | null;

        static parseTextures(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            images: (HTMLImageElement | ImageBitmap)[],
        ): Texture[] | null;

        static createTexture(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            images: (HTMLImageElement | ImageBitmap)[],
            options: {sample: any; source: any; name: any; extensions: any; extras: any},
        ): Texture;

        static parseMaterials(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            textures: Texture[],
        ): GLTFMaterial[] | null;

        static parseSkins(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            bufferViews: ArrayBufferView[],
        ): GLTFSkinReference[] | null;

        static parseMeshes(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            bufferViews: ArrayBufferView[],
            materials: GLTFMaterial[],
            skins: GLTFSkinReference[],
        ): GLTFMesh[] | null;

        static parsePrimitives(
            gl: OGLRenderingContext,
            primitives: object[],
            desc: GLTFDescription,
            bufferViews: ArrayBufferView[],
            materials: GLTFMaterial[],
            numInstances: number,
            isLightmap: boolean,
        ): GLTFPrimitive[];

        static parseAccessor(
            index: number,
            desc: GLTFDescription,
            bufferViews: ArrayBufferView[],
        ): GLTFAccessor;

        static parseNodes(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            meshes: GLTFMesh[],
            skins: GLTFSkinReference[],
            images: (HTMLImageElement | ImageBitmap)[],
        ): (InstancedMesh | Mesh)[] | null;

        static populateSkins(skins: GLTFSkinReference[], nodes: (InstancedMesh | Mesh)[]): void;

        static parseAnimations(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            nodes: (InstancedMesh | Mesh)[],
            bufferViews: ArrayBufferView[],
        ): GLTFAnimationReference[] | null;

        static parseScenes(desc: GLTFDescription, nodes: (InstancedMesh | Mesh)[]): Transform[] | null;

        static parseLights(
            gl: OGLRenderingContext,
            desc: GLTFDescription,
            nodes: (InstancedMesh | Mesh)[],
            scenes: Transform[],
        ): GLTFLights;
    }

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

    /**
     * A render target.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/RenderTarget.js | Source}
     */
    export class RenderTarget {
        gl: OGLRenderingContext;
        width: number;
        height: number;
        depth: boolean;
        buffer: WebGLFramebuffer;
        target: number;

        textures: Texture[];
        texture: Texture;
        depthTexture: Texture;
        depthBuffer: WebGLRenderbuffer;
        stencilBuffer: WebGLRenderbuffer;
        depthStencilBuffer: WebGLRenderbuffer;

        constructor(gl: OGLRenderingContext, options?: Partial<RenderTargetOptions>);

        setSize(width: number, height: number): void;
    }

    export type OGLRenderingContext = (WebGL2RenderingContext | WebGLRenderingContext) & {
        renderer: Renderer;
        canvas: HTMLCanvasElement;
    };

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

    export interface DeviceParameters {
        maxTextureUnits?: number;
        maxAnisotropy?: number;
    }

    export interface BlendFunc {
        src: GLenum;
        dst: GLenum;
        srcAlpha?: GLenum;
        dstAlpha?: GLenum;
    }

    export interface BlendEquation {
        modeRGB: GLenum;
        modeAlpha?: GLenum;
    }

    export interface Viewport {
        x: number;
        y: number;
        width: number | null;
        height: number | null;
    }

    export interface RenderState {
        blendFunc: BlendFunc;
        blendEquation: BlendEquation;
        cullFace: GLenum | false | null;
        frontFace: number;
        depthMask: boolean;
        depthFunc: number;
        premultiplyAlpha: boolean;
        flipY: boolean;
        unpackAlignment: number;
        viewport: Viewport;
        textureUnits: number[];
        activeTextureUnit: number;
        framebuffer: WebGLFramebuffer | null;
        boundBuffer?: WebGLBuffer | null;
        uniformLocations: Map<WebGLUniformLocation, number | number[]>;
        currentProgram: number | null;
    }

    export interface RendererSortable extends Mesh {
        zDepth: number;
    }

    /**
     * The WebGL renderer.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/core/Renderer.js | Source}
     */
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

        state: RenderState;

        extensions: Record<string, any>;
        vertexAttribDivisor: Function;
        drawArraysInstanced: Function;
        drawElementsInstanced: Function;
        createVertexArray: Function;
        bindVertexArray: Function;
        deleteVertexArray: Function;
        drawBuffers: Function;

        parameters: DeviceParameters;

        width: number;
        height: number;

        currentGeometry?: string | null; // Set from geometry

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

        bindFramebuffer(options?: {target?: GLenum; buffer?: WebGLFramebuffer | null}): void;

        getExtension(
            extension: string,
            webgl2Func?: keyof WebGL2RenderingContext,
            extFunc?: string,
        ): Function | null;

        sortOpaque(a: RendererSortable, b: RendererSortable): number;

        sortTransparent(a: RendererSortable, b: RendererSortable): number;

        sortUI(a: RendererSortable, b: RendererSortable): number;

        getRenderList(options: {
            scene: Transform;
            camera?: Camera;
            frustumCull: boolean;
            sort: boolean;
        }): Mesh[];

        render(
            options: Partial<{
                scene: Transform;
                camera: Camera;
                target: RenderTarget;
                update: boolean;
                sort: boolean;
                frustumCull: boolean;
                clear: boolean;
            }>,
        ): void;
    }

    /**
     * A class for managing post-processing shader passes.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Post.js | Source}
     */
    export interface PostOptions {
        width: number;
        height: number;
        dpr: number;
        wrapS: GLenum;
        wrapT: GLenum;
        minFilter: GLenum;
        magFilter: GLenum;
        geometry: Triangle;
        targetOnly: boolean;
    }

    export interface Pass {
        mesh: Mesh;
        program: Program;
        uniforms: Record<string, any>;
        enabled: boolean;
        textureUniform: string;
        vertex: string;
        fragment: string;
    }

    export class Post {
        gl: OGLRenderingContext;

        passes: Pass[];

        geometry: Triangle;

        uniform: {value: any};
        targetOnly: boolean;

        dpr: number;
        width: number;
        height: number;

        resolutionWidth: number;
        resolutionHeight: number;

        fbo: {
            read: RenderTarget;
            write: RenderTarget;
            swap: () => void;
        };

        constructor(gl: OGLRenderingContext, options?: Partial<PostOptions>);

        addPass(options?: Partial<Pass>): Pass;

        resize(
            options?: Partial<{
                width: number;
                height: number;
                dpr: number;
            }>,
        ): void;

        render(
            options: Partial<{
                scene: Transform;
                camera: Camera;
                texture: Texture;
                target: RenderTarget;
                update: boolean;
                sort: boolean;
                frustumCull: boolean;
                beforePostCallbacks: Function[];
            }>,
        ): void;
    }

    /**
     * A class for {@link https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units | GPGPU (General Purpose GPU)} calculations.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/GPGPU.js | Source}
     */
    export interface GPGPUPass {
        mesh: Mesh;
        program: Program;
        uniforms: Record<string, any>;
        enabled: boolean;
        textureUniform: string;
        vertex: string;
        fragment: string;
    }

    export interface GPGPUOptions {
        data: Float32Array;
        geometry: Triangle;
        type: Texture['type'];
    }

    export class GPGPU {
        gl: OGLRenderingContext;
        passes: GPGPUPass[];
        geometry: Triangle;
        dataLength: number;
        size: number;
        coords: Float32Array;
        uniform: {value: any};

        fbo: {
            read: RenderTarget;
            write: RenderTarget;
            swap: () => void;
        };

        constructor(gl: OGLRenderingContext, options?: Partial<GPGPUOptions>);

        addPass(options?: Partial<GPGPUPass>): GPGPUPass;

        render(): void;
    }

    /**
     * Mouse flowmap.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Flowmap.js | Source}
     */
    export interface FlowmapOptions {
        size: number;
        falloff: number;
        alpha: number;
        dissipation: number;
        type: number;
    }

    export class Flowmap {
        gl: OGLRenderingContext;

        uniform: {value: RenderTarget['texture'] | null};

        mask: {
            read: RenderTarget;
            write: RenderTarget;
            swap: () => void;
        };

        aspect: number;
        mouse: Vec2;
        velocity: Vec2;

        mesh: Mesh;

        constructor(gl: OGLRenderingContext, options?: Partial<FlowmapOptions>);

        update(): void;
    }

    /**
     * Shadow map.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Shadow.js | Source}
     */
    export interface ShadowOptions {
        light: Camera;
        width: number;
        height: number;
    }

    export class Shadow {
        gl: OGLRenderingContext;

        light: Camera;

        target: RenderTarget;
        targetUniform: {value: RenderTarget['texture'] | null};

        depthProgram: Program;

        castMeshes: Mesh[];

        constructor(gl: OGLRenderingContext, options?: Partial<ShadowOptions>);

        add(options: {
            mesh: Mesh;
            receive?: boolean;
            cast?: boolean;
            vertex?: string;
            fragment?: string;
            uniformProjection?: string;
            uniformView?: string;
            uniformTexture?: string;
        }): void;

        setSize(options: {width?: number; height?: number}): void;

        render(options: {scene: Transform}): void;
    }

    export interface RaycastHit {
        localPoint: Vec3;
        distance: number;
        point: Vec3;
        faceNormal: Vec3;
        localFaceNormal: Vec3;
        uv: Vec2;
        localNormal: Vec3;
        normal: Vec3;
    }

    /**
     * A class to assist with {@link https://en.wikipedia.org/wiki/Ray_casting | raycasting}.
     * @see {@link https://github.com/oframe/ogl/blob/master/src/extras/Raycast.js | Source}
     */
    export class Raycast {
        origin: Vec3;
        direction: Vec3;

        constructor();

        castMouse(camera: Camera, mouse?: Vec2 | Vec2Tuple): void;

        intersectBounds(
            meshes: Mesh | Mesh[],
            options?: {maxDistance?: number; output?: Mesh[]},
        ): Mesh[];

        intersectMeshes(
            meshes: Mesh[],
            options?: {
                cullFace?: boolean;
                maxDistance?: number;
                includeUV?: boolean;
                includeNormal?: boolean;
                output?: Mesh[];
            },
        ): Mesh[];

        intersectPlane(plane: {origin: Vec3; normal: Vec3}, origin?: Vec3, direction?: Vec3): Vec3;

        intersectSphere(sphere: Bounds, origin?: Vec3, direction?: Vec3): number;

        intersectBox(box: Bounds, origin?: Vec3, direction?: Vec3): number;

        intersectTriangle(
            a: Vec3,
            b: Vec3,
            c: Vec3,
            backfaceCulling?: boolean,
            origin?: Vec3,
            direction?: Vec3,
            normal?: Vec3,
        ): number;

        getBarycoord(point: Vec3, a: Vec3, b: Vec3, c: Vec3, target?: Vec3): Vec3;
    }

    export type ZoomStyle = 'dolly' | 'fov';

    /**
     * Orbit controls based on the three.js `OrbitControls` class, rewritten using ES6 with some
     * additions and subtractions.
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
        zoomStyle: ZoomStyle;
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
        zoomStyle: ZoomStyle;

        minDistance: number;
        maxDistance: number;

        offset: Vec3;

        constructor(object: Transform & {fov: number}, options?: Partial<OrbitOptions>);

        update(): void;

        forcePosition(): void;

        remove(): void;
    }
}
