import { Float, PerspectiveCamera, Text, useScroll } from '@react-three/drei';
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
import { PlanetThree } from './Planets/PlanetThree';
import { PlanetFour } from './Planets/PlanetFour';
import { PlanetFive } from './Planets/PlanetFive';
import { Group } from 'three';

const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 10;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_ROCKETSHIP = 0.02;
const ROCKETSHIP_MAX_ANGLE = 90;

const Experience = () => {
    const cameraGroup = useRef();
    const scroll = useScroll();
    const rocketship = useRef();

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -1 * CURVE_DISTANCE),
                new THREE.Vector3(-4, -1, -2 * CURVE_DISTANCE),
                new THREE.Vector3(-2, 0, -3 * CURVE_DISTANCE),
                new THREE.Vector3(2, 0, -4 * CURVE_DISTANCE),
                new THREE.Vector3(8, -2, -5 * CURVE_DISTANCE),
                new THREE.Vector3(-11, 0, -6 * CURVE_DISTANCE),
                // new THREE.Vector3(-7, 0, -7 * CURVE_DISTANCE),
                new THREE.Vector3(0, 0, -8 * CURVE_DISTANCE),
                new THREE.Vector3(0, 0, -9 * CURVE_DISTANCE),
                new THREE.Vector3(0, 0, -10 * CURVE_DISTANCE),
                new THREE.Vector3(0, 0, -11 * CURVE_DISTANCE),
            ],
            false,
            'catmullrom',
            0.5
        );
    }, []);

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.3);
        shape.lineTo(0, 0.3);

        return shape;
    }, [curve]);

    useFrame((_state, delta) => {
        const scrollOffset = Math.max(0, scroll.offset);

        const curPoint = curve.getPoint(scrollOffset);

        cameraGroup.current.position.lerp(curPoint, delta * 24);

        const lookAtPoint = curve.getPoint(
            Math.min(scrollOffset + CURVE_AHEAD_CAMERA, 1)
        );

        const currentLookAt = cameraGroup.current.getWorldDirection(
            new THREE.Vector3()
        );

        const targetLookAt = new THREE.Vector3()
            .subVectors(curPoint, lookAtPoint)
            .normalize();

        const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
        cameraGroup.current.lookAt(
            cameraGroup.current.position.clone().add(lookAt)
        );

        const tangent = curve.getTangent(scrollOffset + CURVE_AHEAD_ROCKETSHIP);

        const nonLerpLookAt = new Group();
        nonLerpLookAt.position.copy(curPoint);
        nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

        tangent.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            -nonLerpLookAt.rotation.y
        );

        let angle = Math.atan2(-tangent.z, tangent.x);
        angle = -Math.PI / 2 + angle;

        let angleDegrees = (angle * 180) / Math.PI;
        angleDegrees *= 1.5;

        if (angleDegrees < 0) {
            angleDegrees = Math.max(angleDegrees, -ROCKETSHIP_MAX_ANGLE);
        }
        if (angleDegrees > 0) {
            angleDegrees = Math.min(angleDegrees, ROCKETSHIP_MAX_ANGLE);
        }

        angle = (angleDegrees * Math.PI) / 180;

        const targetRocketshipQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
                rocketship.current.rotation.x,
                rocketship.current.rotation.y,
                angle
            )
        );
        rocketship.current.quaternion.slerp(
            targetRocketshipQuaternion,
            delta * 2
        );
    });

    return (
        <>
            <directionalLight
                position={[10, 0, -100]}
                intensity={3}
                color={'#184f72'}
            />
            <directionalLight
                position={[-50, 0, 20]}
                intensity={1}
                color={'#4b1870'}
            />
            <directionalLight
                position={[0, -1, 10]}
                intensity={0.8}
                color={'#fff'}
            />

            <group ref={cameraGroup}>
                <Background />
                <PerspectiveCamera
                    position={[0, 0.1, 1.1]}
                    fox={40}
                    makeDefault
                />

                {/* ROCKETSHIT  */}
                <group ref={rocketship}>
                    <Float
                        floatIntensity={1}
                        speed={1.5}
                        rotationIntensity={0.5}
                    >
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

            {/* TEXT */}
            <group position={[-2.8, 0.5, -5]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.33}
                    maxWidth={1.9}
                >
                    Stars are falling
                </Text>
            </group>
            <group position={[4, -1, -16]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.5}
                    maxWidth={5}
                >
                    from the sky and stuff
                </Text>
            </group>
            <group position={[-10, 1, -22]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.5}
                    maxWidth={5}
                >
                    in space and stuff
                </Text>
            </group>

            <group position={[7, -5, -46]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.5}
                    maxWidth={2}
                >
                    a vacuum fills the void
                </Text>
            </group>

            <group position={[-5, 2, -72]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.5}
                    maxWidth={2}
                >
                    in space and stuff
                </Text>
            </group>

            <group position={[-1, 0, -100]}>
                <Text
                    color='white'
                    anchorX={'left'}
                    anchorY='middle'
                    fontSize={0.5}
                    maxWidth={2}
                    fade
                >
                    and on and on and on we travel
                </Text>
            </group>

            {/* LINE */}
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
                        opacity={0.5}
                        transparent
                    />
                </mesh>
            </group>

            {/* PLANETS */}
            <Asteroid scale={[1.3, 1.3, 1.3]} position={[-2, -1, -2]} />

            <Mars scale={[1.7, 1.7, 1.7]} position={[2.3, -0.5, -5]} />

            <JupiterOne
                scale={[0.3, 0.3, 0.3]}
                rotation-y={Math.PI / 9}
                position={[-5, 1, -14]}
            />

            <JupiterOne
                scale={[1.4, 1.4, 1.4]}
                position={[10, -25, -90]}
                rotation-z={1.9}
            />
            <Moon
                scale={[1.2, 1.2, 1.2]}
                rotation-y={Math.PI / 9}
                position={[3, -2, -17]}
            />

            <Mars
                scale={[6, 6, 6]}
                position={[-11, 14, -31]}
                rotation-y={2.7}
            />

            <PlanetOne scale={[1.5, 1.5, 1.5]} position={[-8, -8, -35]} />

            <Saturn
                scale={[6.5, 6.5, 6.5]}
                position={[9, 6, -44]}
                rotation-z={0.3}
            />

            <PlanetThree
                scale={[2.8, 2.8, 2.8]}
                position={[25, 30, -70]}
                rotation-y={2.5}
                rotation-x={0.6}
            />

            <Moon
                scale={[4, 4, 4]}
                rotation-y={Math.PI / 9}
                position={[17, 4, -80]}
                rotation={[2, 65, 1]}
            />

            <PlanetFour
                scale={[12, 12, 12]}
                position={[-30, 3, -70]}
                rotation-y={3.2}
                rotation-x={3.1}
            />

            <PlanetFive
                scale={[10, 10, 10]}
                position={[30, -10, -65]}
                rotation-y={3}
                rotation-x={3.1}
            />
            <Asteroid
                scale={[1.4, 1.4, 1.4]}
                rotation={[3, -2, -25]}
                position={[3, 1.8, -80]}
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

            <Neptune
                scale={[0.17, 0.17, 0.17]}
                position={[-5, 5, -70]}
                rotation-y={3}
            />

            <Moon
                scale={[0.4, 0.4, 0.4]}
                rotation={[5, 93, -1]}
                position={[2, -1, -79]}
            />

            <Moon
                scale={[0.2, 0.2, 0.2]}
                rotation={[5, 9, 7]}
                position={[5, -2, -69]}
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
