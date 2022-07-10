import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import * as THREE from "three";

import Component from "@/js/components/Component";
import fragmentShader from "./fragmentShader.glsl";
import vertexShader from "./vertexShader.glsl";

export default class PostProcessing extends Component {
    name = "post-processing";

    constructor(app) {
        super();
        this.#createComposer(app);
    }

    /**
     * post processing effect
     * @param {Sketch} app - Sketch instance
     */
    #createComposer(app) {
        this.composer = new EffectComposer(app.renderer);
        this.composer.addPass(new RenderPass(app.scene, app.camera));

        // prettier-ignore
        const effect = new ShaderPass({
            uniforms: {
                tDiffuse: { value: null },
                tSize: { value: new THREE.Vector2(256, 256) },
                center: { value: new THREE.Vector2(0.5, 0.5) },
                angle: { value: 1.57 },
                scale: { value: 1 },
            },
            fragmentShader,
            vertexShader,
        });
        effect.uniforms.scale.value = 4;
        effect.renderToScreen = true;

        this.composer.addPass(effect);
    }

    core() {
        this.composer.render();
    }
}
