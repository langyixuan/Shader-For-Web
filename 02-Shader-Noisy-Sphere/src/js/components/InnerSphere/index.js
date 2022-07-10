import * as THREE from "three";
import Component from "@/js/components/Component";

import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

export default class InnerSphere extends Component {
  name = "inner-sphere";

  constructor(app) {
    super();

    this.#createRenderTarget();
    this.#createObject(app);
  }

  /**
   * create Cube map
   * @private
   * @returns {void}
   */
  #createRenderTarget() {
    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapLinearFilter,
      encoding: THREE.sRGBEncoding,
    });

    this.cubeCamera = new THREE.CubeCamera(0.1, 5000, this.cubeRenderTarget);
  }

  /**
   * create Three.js Sphere object
   * @param {Sketch} app - Sketch instance
   * @returns {void}
   */
  #createObject({ uniforms, size }) {
    const vMax = Math.max(size.width, size.height);

    const geometry = new THREE.SphereBufferGeometry(500, 320, 320);
    const material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        ...uniforms,
        tCube: { type: "t", value: this.cubeRenderTarget.texture },

        // this.cubeRenderTarget.texture
      },
      vertexShader,
      fragmentShader,
    });

    this.object = new THREE.Mesh(geometry, material);
    this.object.position.x = size.width / 2;
    this.object.position.y = 200;
  }

  /**
   * render cubeCamera
   * @param {Sketch} app - Sketch instance
   */
  core(app) {
    this.object.visible = false;
    this.cubeCamera.update(app.renderer, app.scene);
    this.object.visible = true;
  }
}
