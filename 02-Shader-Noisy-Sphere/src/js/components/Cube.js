import * as THREE from "three";
import Component from "./Component";

export default class Cube extends Component {
    name = "cube";

    constructor() {
        super();

        const geometry = new THREE.BoxGeometry(100, 100, 100);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.object = new THREE.Mesh(geometry, material);
        this.object.position.set(0, 0, 0);
    }

    core() {
        this.object.rotation.x += 0.01;
        this.object.rotation.y += 0.02;
    }
}
