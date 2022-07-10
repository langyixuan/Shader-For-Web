import "@/css/globals.css";
import "@/css/index.css";

import Sketch from "./Sketch";

import PostProcessing from "./components/PostProcessing";
import OuterSphere from "./components/OuterSphere";
import InnerSphere from "./components/InnerSphere";

const sketch = new Sketch({ enableControls: false, container: "#app" });
console.log(sketch);

sketch.add(new OuterSphere(sketch), new InnerSphere(sketch));
sketch.composer = new PostProcessing(sketch);
sketch.startCore();
