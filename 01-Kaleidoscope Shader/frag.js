const frag = `
  #ifdef GL_ES
  precision highp float;
  #endif

  #define PI 3.141592653589
  #define SEGMENTS 12.0

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  uniform sampler2D image;
  varying vec2 v_texcoord;

  void main(void)
  {
      vec2 uv = v_texcoord;
      uv *= 2.0;
      uv -= 1.0;

      vec2 mouse = u_mouse / u_resolution;
      
      // get abgle and radius
      float radius = length(uv) * mix(1.0, 2.0, mouse.x);
      float angle = atan(uv.x, uv.y);
      
      // get a segment
      angle /=  PI * 2.0;
      angle *= SEGMENTS;
      
      if (mod(angle, 2.0) >= 1.0) {
          angle = fract(angle);
      } else { 
          angle = 1.0 - fract(angle);
      }
      
      angle += u_time ; 
      angle += mouse.y;

      // unsquash segment
      angle /= SEGMENTS;
      angle *= PI * 2.0;
      
      vec2 point = vec2(radius * cos(angle), radius * sin(angle));
      // vec2 point = vec2(radius, radius);
      point = fract(point);
      
      vec4 color = texture2D(image, point);
      
      gl_FragColor = color;
  }
`;
