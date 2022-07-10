import * as THREE from "three";
import Component from "@/js/components/Component";

import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";
import genericNoise from "./genericNoise.glsl";
import fragment2 from "./fragment2.glsl";
import vertex2 from "./vertex2.glsl";

export default class OuterSphere extends Component {
  name = "outer-sphere";

  constructor({ uniforms, size }) {
    super();

    const vMax = Math.max(size.width, size.height);

    const geometry = new THREE.SphereBufferGeometry(vMax, 64, 64);
    const material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      // wireframe: true,
      side: THREE.DoubleSide,
      uniforms,
      vertexShader: vertex2,
      // fragmentShader: `${genericNoise}\n${fragmentShader}`,
      fragmentShader: fragment2,
    });

    this.object = new THREE.Mesh(geometry, material);
  }
}
