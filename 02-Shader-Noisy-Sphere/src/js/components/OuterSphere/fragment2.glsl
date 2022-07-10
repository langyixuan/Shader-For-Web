uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;

#define NUM_OCTAVES 5

float random(vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float rand(vec2 n){
  return fract(sin(dot(n,vec2(12.,3.5)))*43758.);
}

float noise(vec2 p){
  vec2 ip=floor(p);
  vec2 u=fract(p);
  u=u*u*(3.-2.*u);
  
  float res=mix(
    mix(rand(ip),rand(ip+vec2(1.,0.)),u.x),
    mix(rand(ip+vec2(0.,1.)),rand(ip+vec2(1.,1.)),u.x),u.y);
    return res*res;
  }
  
  float fbm(vec2 x){
    float v=0.;
    float a=.5;
    vec2 shift=vec2(100);
    // Rotate to reduce axial bias
    mat2 rot=mat2(cos(.5),sin(.5),-sin(.5),cos(.50));
    for(int i=0;i<NUM_OCTAVES;++i){
      v+=a*noise(x);
      x=rot*x*2.+shift;
      a*=.5;
    }
    return v;
  }
  
  mat2 rotation2d(float angle){
    float s=sin(angle);
    float c=cos(angle);
    
    return mat2(
      c,-s,
      s,c
    );
  }
  
  vec3 hsv2rgb(vec3 c){
    vec4 K=vec4(1.,2./3.,1./3.,3.);
    vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
    return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
  }
  
  void main(){
    vec2 uv=vUv;
    
    // where does the hue start
    float hue=uTime*.02;
    
    // make tw hsv colors
    vec3 hsv1=vec3(.102+hue,.949+hue,.9294);
    vec3 hsv2=vec3(.5+hue,.75,1.);
    
    // convert them to RGBA
    vec3 rgb1=hsv2rgb(hsv1);
    vec3 rgb2=hsv2rgb(hsv2);
    
    vec4 color1=vec4(rgb1,1.);
    vec4 color2=vec4(rgb2,1.);
    
    float grain=mix(-.01,.01,rand(uv));
    
    // make movement for fbm
    vec2 movement=vec2(uTime*.01,uTime*-.01);
    movement*=rotation2d(uTime*.005);
    
    float f=fbm(uv+movement);
    f*=10.;
    f+=grain;
    f+=uTime*.3;
    f=fract(f);
    
    float mixer=smoothstep(0.,.3,f)-smoothstep(.5,.9,f);;
    
    vec4 color=mix(color1,color2,mixer);
    
    gl_FragColor=color;
  }