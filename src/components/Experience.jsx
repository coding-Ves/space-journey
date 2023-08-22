import { Float, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Background from './Background';
import { Asteroid } from './Planets/Asteroid';
import { DeathStar } from './Planets/DeathStar';
import { JupiterOne } from './Planets/JupOne';
import { Mars } from './Planets/Mars';
import { Moon } from './Planets/Moon';
import { Neptune } from './Planets/Neptune';
import { PlanetOne } from './Planets/PlanOne';
import { Saturn } from './Planets/Saturn';
import { Rocketship } from './Rocketship';
import { useFrame } from '@react-three/fiber';

const LINE_NB_POINTS = 12000;

const Experience = () => {
    const cameraGroup = useRef();
    const scroll = useScroll();
    const rocketship = useRef();

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(1, 0, -10),
                new THREE.Vector3(-1, 1, -20),
                new THREE.Vector3(-4, -1, -30),
                new THREE.Vector3(2, 0, -40),
                new THREE.Vector3(-1, -2, -50),
                new THREE.Vector3(4, -1, -50),
                new THREE.Vector3(6, -1, -60),
                new THREE.Vector3(1, 0, -70),
                new THREE.Vector3(-1, -1, -80),
                new THREE.Vector3(0, 0, -90),
                new THREE.Vector3(0, 0, -100),
            ],
            false,
            'catmullrom',
            0.5
        );
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);

        return shape;
    }, [curve]);

    useFrame((_state, delta) => {
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        );
        const curPoint = linePoints[curPointIndex];
        const pointAhead =
            linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

        const xDisplacement = (pointAhead.x - curPoint.x) * 80;

        const angleRotation =
            (xDisplacement < 0 ? 1 : -1) *
            Math.min(Math.abs(xDisplacement), Math.PI / 3);

        const targeRocketshipQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
                rocketship.current.rotation.x,
                rocketship.current.rotation.y,
                angleRotation
            )
        );
        const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
                cameraGroup.current.rotation.x,
                angleRotation,
                cameraGroup.current.rotation.z
            )
        );

        rocketship.current.quaternion.slerp(
            targeRocketshipQuaternion,
            delta * 0.2
        );
        cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 1);

        cameraGroup.current.position.lerp(curPoint, delta * 1);
    });

    return (
        <>
            <group ref={cameraGroup}>
                <Background />
                <PerspectiveCamera
                    position={[0, 0.1, 1.1]}
                    fox={40}
                    makeDefault
                />
                <group ref={rocketship}>
                    <Float floatIntensity={1.3} speed={2}>
                        <Rocketship
                            // rotation-y={Math.PI}
                            // rotation-z={0.3}
                            rotation={[3.5, 0.32, 2.2]}
                            scale={[0.5, 0.5, 0.5]}
                            position-y={-0.1}
                        />
                    </Float>
                </group>
            </group>

            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                steps: LINE_NB_POINTS,
                                bevelEnabled: false,
                                extrudePath: curve,
                            },
                        ]}
                    />
                    <meshStandardMaterial
                        color={'white'}
                        opacity={0.4}
                        transparent
                    />
                </mesh>
            </group>

            <Asteroid scale={[2, 2, 2]} position={[-2, -2, -3]} />

            <Mars scale={[1.7, 1.7, 1.7]} position={[2.3, -0.5, -5]} />

            <JupiterOne
                scale={[0.3, 0.3, 0.3]}
                rotation-y={Math.PI / 9}
                position={[-5, 1, -14]}
            />
            <Moon
                scale={[1.4, 1.4, 1.4]}
                rotation-y={Math.PI / 9}
                position={[2, -4, -14]}
            />
            <Asteroid
                scale={[1.4, 1.4, 1.4]}
                rotation={[3, -2, -25]}
                position={[3, 1.8, -80]}
            />
            <PlanetOne scale={[1.5, 1.5, 1.5]} position={[-8, -8, -35]} />

            <Asteroid
                scale={[3, 3, 3]}
                position={[3, 3, -25]}
                rotation={[1, 1, 1]}
            />
            <Saturn scale={[6.5, 6.5, 6.5]} position={[9, 4, -44]} />

            <Mars scale={[5, 5, 5]} position={[-8, 5, -31]} />

            <Neptune scale={[0.17, 0.17, 0.17]} position={[-2, -11, -62]} />

            <Moon
                scale={[4, 4, 4]}
                rotation-y={Math.PI / 9}
                position={[12, -3, -70]}
                rotation={[2, 65, 1]}
            />

            <Asteroid
                scale={[1.4, 1.4, 1.4]}
                rotation={[33, -23, -5]}
                position={[6, 3.5, -83]}
            />
            <Asteroid
                scale={[0.8, 0.8, 0.8]}
                rotation={[5, 33, -22]}
                position={[-3, 3.2, -85]}
            />
            <Asteroid
                scale={[0.6, 0.6, 0.6]}
                rotation={[5, 7, -2]}
                position={[-1, 4.4, -83]}
            />
            <Asteroid
                scale={[1, 1, 1]}
                rotation={[53, 3.6, -2]}
                position={[-1, -5, -85]}
            />

            <Asteroid
                scale={[1, 1, 1]}
                rotation={[-5, -9, 4]}
                position={[-4, 2, -78]}
            />

            <Moon
                scale={[0.5, 0.5, 0.5]}
                rotation-y={Math.PI / 9}
                position={[-5, -2, -78]}
                rotation={[29, -65, -12]}
            />

            <Asteroid
                scale={[2.3, 2.3, 2.3]}
                rotation={[52, 1, 0]}
                position={[-6, -4, -74]}
            />

            <Asteroid
                scale={[1.9, 1.9, 1.9]}
                rotation={[5, 9, 7]}
                position={[-10, 3, -74]}
            />

            <Asteroid
                scale={[0.5, 0.5, 0.5]}
                rotation={[5, 9, 7]}
                position={[2, 1, -69]}
            />

            <DeathStar
                scale={[50, 50, 50]}
                position={[0, 9, -97]}
                rotation={[0.5, 0, 3.2]}
            />
        </>
    );
};

export default Experience;
