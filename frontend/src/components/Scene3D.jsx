import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

export function Scene3D({ isLogin }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Canvas shadows>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 20]} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 10, 7.5]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <SceneContent isLogin={isLogin} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}

function SceneContent({ isLogin, mousePosition }) {
  const characterRef = useRef();
  const platformRef = useRef();
  const keyRef = useRef();
  const dataLinesRef = useRef();
  const { camera } = useThree();
  const cameraPosition = new THREE.Vector3(0, 1.5, 4);

  const [hovering, setHovering] = useState(false);
  const [keyHovering, setKeyHovering] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const { keyRotation, keyScale, keyY } = useSpring({
    keyRotation: isLogin ? [0, Math.PI * 2, 0] : [0, 0, 0],
    keyScale: keyHovering ? 1.2 : 1,
    keyY: authenticated ? 3 : hovering ? 2.5 : 2.2,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const { characterColor } = useSpring({
    characterColor: isLogin ? "#3b82f6" : "#10b981",
    config: { duration: 800 },
  });

  useEffect(() => {
    const targetX = cameraPosition.x + mousePosition.x * 0.5;
    const targetY = cameraPosition.y + mousePosition.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 1, 0);
  }, [camera, cameraPosition, mousePosition]);

  const handleKeyClick = () => {
    setAuthenticated(true);
    setTimeout(() => setAuthenticated(false), 3000);
  };

  useFrame((state, delta) => {
    if (platformRef.current) {
      platformRef.current.rotation.y += delta * 0.2;
    }
    if (characterRef.current) {
      characterRef.current.position.y =
        1 + Math.sin(state.clock.elapsedTime) * 0.1;
      const targetRotation = isLogin ? 0 : Math.PI;
      characterRef.current.rotation.y = THREE.MathUtils.lerp(
        characterRef.current.rotation.y,
        targetRotation,
        delta * 2
      );
    }
    if (dataLinesRef.current) {
      dataLinesRef.current.children.forEach((line, i) => {
        line.position.y =
          ((state.clock.elapsedTime * (0.5 + i * 0.2)) % 5) - 2.5;
        line.material.opacity = THREE.MathUtils.lerp(
          line.material.opacity,
          authenticated ? 1 : 0.3,
          delta * 3
        );
      });
    }
  });

  return (
    <>
      <group
        ref={characterRef}
        position={[0, 1, 0]}
        scale={hovering ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
      >
        <animated.mesh castShadow>
          <capsuleGeometry args={[0.5, 1, 4, 16]} />
          <animated.meshStandardMaterial color={characterColor} />
          <mesh position={[0, 0.8, 0]} castShadow>
            <sphereGeometry args={[0.3, 32, 32]} />
            <animated.meshStandardMaterial color={characterColor} />
          </mesh>
        </animated.mesh>
      </group>

      <animated.group
        ref={keyRef}
        position-y={keyY}
        rotation={keyRotation}
        scale={keyScale}
        onClick={handleKeyClick}
        onPointerOver={() => setKeyHovering(true)}
        onPointerOut={() => setKeyHovering(false)}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshStandardMaterial
            color={isLogin ? "#f59e0b" : "#ec4899"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -0.4, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial
            color={isLogin ? "#f59e0b" : "#ec4899"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.15, -0.7, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshStandardMaterial
            color={isLogin ? "#f59e0b" : "#ec4899"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.25, -0.55, 0]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshStandardMaterial
            color={isLogin ? "#f59e0b" : "#ec4899"}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </animated.group>

      <group ref={dataLinesRef}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 4,
              -5 + i * 0.5,
              (Math.random() - 0.5) * 4,
            ]}
          >
            <boxGeometry args={[0.05, 0.3 + Math.random() * 0.5, 0.05]} />
            <meshBasicMaterial
              color={isLogin ? "#3b82f6" : "#10b981"}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>

      <group>
        <mesh ref={platformRef} position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[2, 2, 0.1, 36]} />
          <meshStandardMaterial
            color="#1e1e1e"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.9, 2.1, 64]} />
          <meshBasicMaterial
            color={isLogin ? "#3b82f6" : "#10b981"}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>

      <Stars isLogin={isLogin} authenticated={authenticated} />
    </>
  );
}

function Stars({ isLogin, authenticated }) {
  const starsRef = useRef();
  const particlesRef = useRef();

  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle) => {
        particle.material.opacity = 0;
      });
    }
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle) => {
        if (authenticated) {
          particle.position.y += 0.05 + Math.random() * 0.05;
          if (particle.position.y > 5) {
            particle.position.y = -2;
            particle.position.x = (Math.random() - 0.5) * 4;
            particle.position.z = (Math.random() - 0.5) * 4;
          }
          particle.material.opacity = Math.min(
            1,
            particle.material.opacity + 0.01
          );
        } else {
          particle.material.opacity = Math.max(
            0,
            particle.material.opacity - 0.01
          );
        }
      });
    }
  });

  return (
    <>
      <group ref={starsRef}>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="white" />
          </mesh>
        ))}
      </group>
      <group ref={particlesRef}>
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 4,
              -2,
              (Math.random() - 0.5) * 4,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color={isLogin ? "#3b82f6" : "#10b981"}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}
