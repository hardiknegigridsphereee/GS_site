


"use client";

import { Environment, useGLTF } from "@react-three/drei";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as THREE from "three";
import { easing } from "maath";

interface ScrollAssemblyProps {
  onLoadComplete: () => void;
  onProgress: (progress: number) => void;
}

// function ModelScene({
//   scrollProgress,
// }: {
//   scrollProgress: number;
// }) {
//   const { scene } = useGLTF("/main-1.glb");

//   const rootRef = useRef<THREE.Group>(null);

//   const { camera } = useThree();

//   // CENTER MODEL
//   const centeredScene = useMemo(() => {
//     const cloned = scene.clone();

//     const box = new THREE.Box3().setFromObject(
//       cloned
//     );

//     const center = new THREE.Vector3();

//     box.getCenter(center);

//     cloned.position.sub(center);

//     return cloned;
//   }, [scene]);

//   // CREATE CLEAN ASSEMBLY GROUPS
//   const assemblies = useMemo(() => {
//     const topGroup = new THREE.Group();
//     const middleGroup = new THREE.Group();
//     const bottomGroup = new THREE.Group();

//     centeredScene.updateMatrixWorld(true);

//     centeredScene.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         const clonedMesh = child.clone();

//         const worldPos = new THREE.Vector3();

//         child.getWorldPosition(worldPos);

//         // preserve transforms
//         clonedMesh.position.copy(
//           child.position
//         );

//         clonedMesh.rotation.copy(
//           child.rotation
//         );

//         clonedMesh.scale.copy(child.scale);

//         // GROUP BASED ON HEIGHT
//         if (worldPos.y > 0.3) {
//           topGroup.add(clonedMesh);

//         } else if (worldPos.y < -0.3) {
//           bottomGroup.add(clonedMesh);

//         } else {
//           middleGroup.add(clonedMesh);
//         }
//       }
//     });

//     return {
//       topGroup,
//       middleGroup,
//       bottomGroup,
//     };
//   }, [centeredScene]);

//   useFrame((state, delta) => {
//     if (!rootRef.current) return;

//     // subtle floating
//     rootRef.current.position.y =
//       Math.sin(
//         state.clock.elapsedTime * 0.8
//       ) * 0.015;

//     const progress = THREE.MathUtils.clamp(
//       scrollProgress,
//       0,
//       1
//     );

//     // STAGED PHASES

//     // 0 → 40%
//     const topOpen =
//       THREE.MathUtils.smoothstep(
//         progress,
//         0,
//         0.4
//       );

//     // 40 → 70%
//     const middleReveal =
//       THREE.MathUtils.smoothstep(
//         progress,
//         0.4,
//         0.7
//       );

//     // 70 → 100%
//     const finalReveal =
//       THREE.MathUtils.smoothstep(
//         progress,
//         0.7,
//         1
//       );

//     // TOP OPENS SLIGHTLY
//     easing.damp3(
//       assemblies.topGroup.position,
//       [0, topOpen * 0.12, 0],
//       0.15,
//       delta
//     );

//     // INTERNAL ARCHITECTURE
//     easing.damp3(
//       assemblies.middleGroup.position,
//       [0, 0, middleReveal * 0.08],
//       0.15,
//       delta
//     );

//     // BASE SECTION
//     easing.damp3(
//       assemblies.bottomGroup.position,
//       [0, -finalReveal * 0.06, 0],
//       0.15,
//       delta
//     );

//     // VERY SUBTLE PRODUCT ROTATION
//     easing.dampE(
//       rootRef.current.rotation,
//       [0, progress * 0.08, 0],
//       0.15,
//       delta
//     );

//     // PREMIUM CAMERA MOTION
//     easing.damp3(
//       camera.position,
//       [
//         Math.sin(
//           progress *
//             Math.PI *
//             0.5
//         ) * 0.05,

//         1.2,

//         3.8 - progress * 0.12,
//       ],
//       0.15,
//       delta
//     );

//     camera.lookAt(0, 0, 0);
//   });

//   return (
//     <group ref={rootRef}>
//       <primitive
//         object={assemblies.topGroup}
//       />

//       <primitive
//         object={assemblies.middleGroup}
//       />

//       <primitive
//         object={assemblies.bottomGroup}
//       />
//     </group>
//   );
// }

function ModelScene({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  const { scene } = useGLTF("/main-1.glb");

  const rootRef = useRef<THREE.Group>(null);

  const { camera } = useThree();

  // CENTER MODEL
  const centeredScene = useMemo(() => {
    const cloned = scene.clone();

    const box = new THREE.Box3().setFromObject(
      cloned
    );

    const center = new THREE.Vector3();

    box.getCenter(center);

    cloned.position.sub(center);

    return cloned;
  }, [scene]);

  // STORE ORIGINAL POSITIONS
  const meshes = useMemo(() => {
    const data: {
      mesh: THREE.Mesh;
      original: THREE.Vector3;
      normalizedY: number;
    }[] = [];

    const box = new THREE.Box3().setFromObject(
      centeredScene
    );

    const height =
      box.max.y - box.min.y;

    centeredScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        data.push({
          mesh: child,

          original:
            child.position.clone(),

          // normalize height position
          normalizedY:
            (child.position.y -
              box.min.y) /
            height,
        });
      }
    });

    return data;
  }, [centeredScene]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;

    // subtle floating
    rootRef.current.position.y =
      Math.sin(
        state.clock.elapsedTime * 0.8
      ) * 0.01;

    const progress =
      THREE.MathUtils.clamp(
        scrollProgress,
        0,
        1
      );

    // smooth premium easing
    const explode =
      THREE.MathUtils.smootherstep(
        progress,
        0,
        1
      );

    meshes.forEach((item) => {
      const {
        mesh,
        original,
        normalizedY,
      } = item;

      // EXPLODED OFFSET
      // based ONLY on vertical position

      const offsetY =
        (normalizedY - 0.5) *
        explode *
        0.8;

      easing.damp3(
        mesh.position,
        [
          original.x,
          original.y + offsetY,
          original.z,
        ],
        0.18,
        delta
      );
    });

    // subtle product rotation
    easing.dampE(
      rootRef.current.rotation,
      [0, progress * 0.08, 0],
      0.15,
      delta
    );

    // premium camera
    easing.damp3(
      camera.position,
      [
        0,
        1.1,
        3.8 - progress * 0.15,
      ],
      0.15,
      delta
    );

    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={rootRef}>
      <primitive object={centeredScene} />
    </group>
  );
}

useGLTF.preload("/main-1.glb");

export default function ScrollAssembly({
  onLoadComplete,
  onProgress,
}: ScrollAssemblyProps) {
  const [scrollProgress, setScrollProgress] =
    useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const maxScroll =
        document.documentElement
          .scrollHeight -
        window.innerHeight;

      const progress =
        maxScroll > 0
          ? scrollY / maxScroll
          : 0;

      setScrollProgress(progress);

      onProgress?.(
        Math.floor(progress * 100)
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [onProgress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div
      style={{
        height: "300vh",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",

          background:
            "radial-gradient(circle at center, #111 0%, #050505 100%)",
        }}
      >
        <Canvas
          camera={{
            position: [0, 1.2, 3.8],
            fov: 42,
          }}
        >
          {/* DEPTH */}

          <fog
            attach="fog"
            args={["#050505", 4, 10]}
          />

          {/* ENVIRONMENT */}

          <Environment preset="city" />

          {/* LIGHTING */}

          <ambientLight intensity={1.1} />

          <directionalLight
            position={[5, 8, 5]}
            intensity={1.6}
          />

          <directionalLight
            position={[-5, 5, 3]}
            intensity={0.8}
            color="#10b981"
          />

          <pointLight
            position={[0, 2, 2]}
            intensity={0.5}
          />

          <ModelScene
            scrollProgress={scrollProgress}
          />
        </Canvas>

        {/* UI OVERLAY */}

        <div
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background:
                "rgba(255,255,255,0.05)",

              border:
                "1px solid rgba(255,255,255,0.08)",

              backdropFilter: "blur(20px)",

              borderRadius: "999px",

              padding: "10px 22px",

              color: "#10b981",

              fontSize: "13px",

              letterSpacing: "0.15em",
            }}
          >
            {scrollProgress < 0.1 &&
              "SCROLL TO EXPLORE"}

            {scrollProgress >= 0.1 &&
              scrollProgress < 0.4 &&
              "TOP SHELL OPENING"}

            {scrollProgress >= 0.4 &&
              scrollProgress < 0.7 &&
              "INTERNAL ARCHITECTURE"}

            {scrollProgress >= 0.7 &&
              "FULL SYSTEM REVEAL"}
          </div>
        </div>
      </div>
    </div>
  );
}