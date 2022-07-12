const frag = `
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  uniform sampler2D flower;
  uniform float seed; 

  varying vec2 v_texcoord;

  vec2 aspect(vec2 uv, float texture_ratio, float canvas_ratio) {
    if(texture_ratio > canvas_ratio) {
        float diff = canvas_ratio / texture_ratio;
        uv.x *= diff;
        uv.x += (1.0 - diff) / 2.0;
    } else {
        float diff = texture_ratio / canvas_ratio;
        uv.y *= diff;
        uv.y += (1.0 - diff) / 2.0;
    }
    return uv;
  }
  void main(void)
  {
      vec2 uv = v_texcoord;

      // find out the aspect ratios
      float texture_ratio = 0.5;
      float canvas_ratio = u_resolution.x / u_resolution.y;

      vec2 coords = aspect(uv, texture_ratio, canvas_ratio);

      // make a safe are5
      coords = mix(vec2(0.1, 0.1), vec2(0.9, 0.9), coords);

      // make a normalize mouse
      vec2 u_mouse = u_mouse / u_resolution;

      float blocksX = 6.0;
      float blocksY = 12.0;
      float x = floor(uv.x * blocksX) / blocksY;
      float y = floor(uv.y * blocksY) / blocksX;

      vec2 distortion = 0.1 * vec2(
        sin(u_time + x * 1.0 + y * 1.5 + u_mouse.x * 2.0 + u_mouse.y * seed),
        cos(u_time + x * 1.1 + y * 2.0 + u_mouse.x * 1.2 + u_mouse.y * seed)
    ); 

      vec4 color = texture2D(flower, coords + distortion);
      
      gl_FragColor = color;
  }`;
