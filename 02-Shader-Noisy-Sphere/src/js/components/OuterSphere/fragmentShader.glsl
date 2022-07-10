varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec2 uResolution;

float lines(vec2 uv,float offset){
    return smoothstep(0.,.5+offset*.5,abs(.5*(sin(uv.x*15.)+offset*2.)));
}

mat2 rotate2D(float angle){
    float s=sin(angle);
    float c=cos(angle);
    return mat2(c,-s,s,c);
}

void main(){
    vec3 baseFirst=vec3(120.+uTime,158.+uTime.,113.+uTime)/255.;
    vec3 baseSecond=vec3(224.,148.,66.)/255.;
    vec3 accent=vec3(0.,0.,0.);
    
    vec2 scaledPosition=vPosition.xy/uResolution.xy;
    float n=noise(vPosition/max(uResolution.x,uResolution.y)+uTime);
    
    vec2 baseUv=rotate2D(n)*scaledPosition*.25;
    
    float basePattern=lines(baseUv,.5);
    float basePattern2=lines(baseUv,.1);
    
    vec3 baseColor=mix(baseSecond,baseFirst,basePattern);
    vec3 baseColor2=mix(baseColor,accent,basePattern2);
    
    // grainy
    // gl_FragColor = vec4(noise(vPosition + uTime) * vec3(baseColor2), 1.0);
    
    // normal
    gl_FragColor=vec4(vec3(baseColor2),1.);
}