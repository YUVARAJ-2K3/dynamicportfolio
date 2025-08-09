import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarField = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 2000;
      starPositions[i + 1] = (Math.random() - 0.5) * 2000;
      starPositions[i + 2] = (Math.random() - 0.5) * 2000;

      // Random colors for stars (purple, blue, cyan, white)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Purple
        starColors[i] = 0.8;
        starColors[i + 1] = 0.4;
        starColors[i + 2] = 1;
      } else if (colorChoice < 0.6) {
        // Blue
        starColors[i] = 0.4;
        starColors[i + 1] = 0.8;
        starColors[i + 2] = 1;
      } else if (colorChoice < 0.8) {
        // Cyan
        starColors[i] = 0.4;
        starColors[i + 1] = 1;
        starColors[i + 2] = 1;
      } else {
        // White
        starColors[i] = 1;
        starColors[i + 1] = 1;
        starColors[i + 2] = 1;
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 5;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (stars) {
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarField;