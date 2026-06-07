// "use client";

// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { useRef, useMemo } from "react";
// import * as THREE from "three";

// interface Model3DProps {
//   progress: number;
// }

// export default function Model3D({ progress }: Model3DProps) {
//   const { scene } = useGLTF("/main-1.glb");
//   const modelRef = useRef<THREE.Group>(null);

//   // Store initial positions and randomized factors for staggering
//   const partsData = useMemo(() => {
//     const data: { 
//       uuid: string; 
//       pos: THREE.Vector3; 
//       factor: number;
//       rotationAxis: THREE.Vector3;
//     }[] = [];
    
//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         data.push({
//           uuid: child.uuid,
//           pos: child.position.clone(),
//           // Randomized explosion factor for staggered look
//           factor: 0.5 + Math.random() * 2.5,
//           rotationAxis: new THREE.Vector3(
//             Math.random() - 0.5,
//             Math.random() - 0.5,
//             Math.random() - 0.5
//           ).normalize()
//         });
//       }
//     });
//     return data;
//   }, [scene]);

//   useFrame((state) => {
//     if (!modelRef.current) return;

//     const currentProgress = typeof progress === 'number' ? progress : progress.get();

//     scene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         const part = partsData.find((d) => d.uuid === child.uuid);
//         if (part) {
//           // Smoother, more controlled easing for the explosion
//           // 0 = Assembled, 1 = Exploded
//           const easedProgress = currentProgress; 
//           const strength = easedProgress * part.factor * 2.5; // Reduced from 8 to 2.5 for control
          
//           // Move outward from the local center
//           const direction = part.pos.clone().normalize();
//           if (direction.length() === 0) direction.set(0, 1, 0);

//           child.position.x = part.pos.x + direction.x * strength;
//           child.position.y = part.pos.y + direction.y * strength;
//           child.position.z = part.pos.z + direction.z * strength;

//           // Subtle, controlled rotation instead of chaotic spinning
//           child.rotation.x = easedProgress * part.rotationAxis.x * 0.5;
//           child.rotation.y = easedProgress * part.rotationAxis.y * 0.5;
//         }
//       }
//     });

//     // Slow, professional rotation for the entire group
//     modelRef.current.rotation.z = currentProgress * 0.5; // Slight tilt
//   });

//   return (
//     <primitive 
//       ref={modelRef} 
//       object={scene} 
//       scale={1.8} 
//       position={[0, 0, 0]} 
//       rotation={[Math.PI / 2, 0, 0]} // Corrected upright rotation (adjusting based on common GLB issues)
//     />
//   );
// }

// // Preload the model
// useGLTF.preload("/main-1.glb");
// "use client";

// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { MotionValue } from "framer-motion";
// import { useRef, useMemo, useState, useEffect } from "react";
// import * as THREE from "three";

// interface Model3DProps {
//   progress: number | MotionValue<number>;
// }

// export default function Model3D({ progress }: Model3DProps) {
//   const { scene } = useGLTF("/main-1.glb");
//   const modelRef = useRef<THREE.Group>(null);
//   const [isReady, setIsReady] = useState(false);

//   // Clone the scene to avoid mutating the original
//   const clonedScene = useMemo(() => {
//     return scene.clone();
//   }, [scene]);

//   useEffect(() => {
//     if (scene) {
//       setIsReady(true);
//     }
//   }, [scene]);

//   // Store ORIGINAL positions, rotations, and scales of every part
//   const partsData = useMemo(() => {
//     const data: { 
//       uuid: string;
//       originalPos: THREE.Vector3;
//       originalRot: THREE.Euler;
//       originalScale: THREE.Vector3;
//       factor: number;
//       explosionDirection: THREE.Vector3;
//     }[] = [];
    
//     clonedScene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         // Get the world position relative to the model center
//         const worldPos = child.getWorldPosition(new THREE.Vector3());
        
//         data.push({
//           uuid: child.uuid,
//           originalPos: child.position.clone(),
//           originalRot: child.rotation.clone(),
//           originalScale: child.scale.clone(),
//           // Stagger factor - parts explode at different speeds
//           factor: 0.5 + Math.random() * 1.5,
//           // Direction to explode outward from center (0,0,0)
//           explosionDirection: new THREE.Vector3(
//             worldPos.x,
//             worldPos.y + 0.5, // Slight upward bias
//             worldPos.z
//           ).normalize()
//         });
//       }
//     });
    
//     console.log(`🎨 Model loaded with ${data.length} parts ready to explode`);
//     return data;
//   }, [clonedScene]);

//   useFrame(() => {
//     if (!modelRef.current || !isReady) return;

//     const currentProgress = typeof progress === "object" && "get" in progress
//       ? progress.get()
//       : progress;

//     // Clamp progress between 0 and 1
//     const progressValue = Math.min(1, Math.max(0, Number(currentProgress) || 0));
    
//     // Use easeOutCubic for smoother explosion (starts fast, ends smooth)
//     const easedProgress = 1 - Math.pow(1 - progressValue, 2.5);

//     clonedScene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         const part = partsData.find((d) => d.uuid === child.uuid);
//         if (part) {
//           // Calculate explosion strength
//           const strength = easedProgress * part.factor * 1.8;
          
//           // Move outward along explosion direction
//           child.position.x = part.originalPos.x + (part.explosionDirection.x * strength);
//           child.position.y = part.originalPos.y + (part.explosionDirection.y * strength);
//           child.position.z = part.originalPos.z + (part.explosionDirection.z * strength);
          
//           // Subtle rotation during explosion (max 0.5 rad ~ 30 degrees)
//           child.rotation.x = part.originalRot.x + (easedProgress * part.explosionDirection.x * 0.6);
//           child.rotation.y = part.originalRot.y + (easedProgress * part.explosionDirection.y * 0.6);
//           child.rotation.z = part.originalRot.z + (easedProgress * part.explosionDirection.z * 0.6);
//         }
//       }
//     });
//   });

//   return (
//     <group ref={modelRef}>
//       <primitive 
//         object={clonedScene} 
//         scale={1}           // Original scale from .glb
//         position={[0, 0, 0]} // Original position
//         rotation={[0, 0, 0]}  // NO extra rotation - keep original orientation
//       />
//     </group>
//   );
// }

// // Preload the model
// useGLTF.preload("/main-1.glb");