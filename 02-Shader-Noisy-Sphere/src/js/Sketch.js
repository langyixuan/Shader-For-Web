import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Sketch {
    /**
     * initialize a new Sketch class
     * @param {object} config - Sketch config
     * @param {boolean} config.enableControls - use orbit controls or not
     * @param {string|HTMLElement} config.container - container id Sketch will append canvas to
     */
    constructor({ enableControls, container } = {}) {
        this.enableControls = enableControls;
        this.container = typeof container == "string" ? document.body.querySelector(container) : container;

        this.composer = null;
        this.components = [];
        this.uniforms = {
            uTime: { type: "f", value: 0 },
            uResolution: { type: "v2", value: new THREE.Vector2() },
        };

        // initialize Three.js
        this.#createScene();
        this.#createCamera();
        this.#createRenderer();

        if (this.enableControls) {
            this.#createControls();
        }

        // add event listeners
        this.#addEventListeners();
    }

    /**
     * add components to Sketch
     * @param  {...any} components - components to add to Sketch
     */
    add(...components) {
        components.flat(Infinity).forEach((component) => {
            this.components.push(component);
            if (component.object) {
                this.scene.add(component.object);
            }
        });
    }

    /**
     * get the size of the Sketch
     * @returns {object} - { width, height }
     */
    get size() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    /**
     * aspect ratio of Sketch
     * @returns {number} - aspect ratio
     */
    get aspect() {
        return this.size.width / this.size.height;
    }

    /**
     * initialize Three.js scene
     * @private
     * @returns {void}
     */
    #createScene() {
        this.scene = new THREE.Scene();
    }

    /**
     * initialize Three.js camera
     * @private
     * @returns {void}
     */
    #createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 5000);
        this.camera.position.z = 600;
    }

    /**
     * initialize Three.js renderer
     * @private
     * @returns {void}
     */
    #createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.size.width, this.size.height);
        this.container.appendChild(this.renderer.domElement);
    }

    /**
     * add event listeners
     * @private
     * @returns {void}
     */
    #addEventListeners() {
        const onResize = () => {
            this.renderer.setSize(this.size.width, this.size.height);

            // prettier-ignore
            this.camera.fov = 2 * Math.atan((this.size.height / 2) / this.camera.position.z) * (180 / Math.PI);
            this.camera.aspect = this.aspect;
            this.camera.updateProjectionMatrix();

            // update uniforms
            this.uniforms.uResolution.value.x = this.size.width;
            this.uniforms.uResolution.value.y = this.size.height;

            // resize all components
            this.components.forEach((component) => component.resize(this));
        };

        onResize();
        window.addEventListener("resize", onResize);
    }

    /**
     * add orbit controls
     * @private
     * @returns {void}
     */
    #createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    /**
     * animation loop
     * @returns {void}
     */
    startCore() {
        const core = () => {
            requestAnimationFrame(core);

            // update global uniforms
            this.uniforms.uTime.value += 0.01;

            // update all components
            this.components.forEach((component) => component.core(this));
            if (this.enableControls) {
                this.controls.update();
            }

            this.composer ? this.composer.core() : this.renderer.render(this.scene, this.camera);
        };

        core();
    }
}
