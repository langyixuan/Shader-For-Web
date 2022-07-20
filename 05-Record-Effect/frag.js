const frag = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
uniform float recordIndex;
uniform float circle;

#define MAX 3

varying vec2 v_texcoord;

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

vec4 samplerColor(vec4 colors[MAX], int index) {
  for(int i = 0; i < MAX; i++) {
      if (index == i) {
          return colors[i];
      }
  }
  return vec4(1.0, 1.0, 1.0, 1.0);
}

vec3 formatColor(float r, float g, float b) {
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}

void main(void)
{
    vec2 uv =-1.0 + 2.0 * v_texcoord;
    
    vec4 background = vec4(formatColor(0.0, 0.0, 0.0), 1.0);
    
    vec4 innerColors[MAX];
    vec4 midColors[MAX];
    vec4 outerColors[MAX];

    innerColors[0] = vec4(formatColor(204.0, 194.0, 24.0), 1.0);
    innerColors[1] =vec4(formatColor(1.0, 145.0, 11.0), 1.0);
    innerColors[2] = vec4(formatColor(209.0, 206.0, 57.0), 1.0);
    
    midColors[0] = vec4(formatColor(140.0, 190.0, 6.0), 1.0);
    midColors[1] = vec4(formatColor(0.0, 37.0, 98.0), 1.0);
    midColors[2] = vec4(formatColor(110.0, 209.0, 48.0), 1.0);
    
    outerColors[0] =  vec4(formatColor(101.0, 15.0, 163.0), 1.0);
    outerColors[1] =  vec4(formatColor(7.0, 62.0, 166.0), 1.0); 
    outerColors[2] = vec4(formatColor(209.0, 67.0, 107.0), 1.0);
    
    
    int lowerIndex = int(floor(recordIndex));
    int upperIndex = int(ceil(recordIndex));
    float mixer = fract(recordIndex);
    
    vec4 innerColor = mix(
        samplerColor(innerColors, lowerIndex),
        samplerColor(innerColors, upperIndex),
        mixer
    );
    
     vec4 midColor = mix(
        samplerColor(midColors, lowerIndex),
        samplerColor(midColors, upperIndex),
        mixer
    );
    
     vec4 outerColor = mix(
        samplerColor(outerColors, lowerIndex),
        samplerColor(outerColors, upperIndex),
        mixer
    );
    
    vec2 innerPoint = vec2(0.0, 0.0) + 0.5 * vec2(cos(u_time), sin(u_time));
    vec2 midPoint = innerPoint + 0.1  * vec2(cos(u_time), sin(u_time));
    vec2 outerPoint = vec2(0.0, 0.0);
    
    float innerDist = distance(uv, innerPoint);
    float midDist = distance(uv, midPoint);
    float outerDist = distance(uv, outerPoint);
    
    float grain = mix(-0.1, 0.1, rand(uv));
    
    float innerStep = smoothstep(0.0, 1.0, innerDist + grain);
    float midStep = smoothstep(0.0, 1.5, midDist + grain);
    float outerStep = smoothstep(0.0, 2.0 * rand(uv), outerDist);
    
    vec4 color = mix(innerColor, midColor, innerStep);
    color = mix(color, outerColor, midStep);
    color = mix(color, background, outerStep);
    
    float disc = fract(outerDist * circle);
    float mixDisc = smoothstep(0.2, 0.3, disc) - smoothstep(0.7, 0.8, disc);
    
    color = mix(background, color, mixDisc);
    
    gl_FragColor = color;
}
`;
