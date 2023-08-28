import { Environment, Sphere, Stars } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';

import * as THREE from 'three';

const Background = () => {
    const colorA = '#000';
    const colorB = '#141E30';
    const start = 0.5;
    const end = -0.5;
    return (
        <>
            <Stars
                radius={7}
                depth={70}
                count={10000}
                factor={2}
                saturation={12}
                fade
                speed={0.9}
            />
            <Stars
                radius={5}
                depth={50}
                count={10000}
                factor={1}
                saturation={1}
                fade
                speed={0.6}
            />

            <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
                <LayerMaterial color={'#ffffff'} side={THREE.BackSide}>
                    <Gradient
                        colorA={colorA}
                        colorB={colorB}
                        axes={'y'}
                        start={start}
                        end={end}
                    />
                </LayerMaterial>
            </Sphere>
            <Environment resolution={256}>
                <Sphere
                    scale={[100, 100, 100]}
                    rotation-y={Math.PI / 6}
                    rotation-x={Math.PI}
                >
                    <LayerMaterial color={'#ffffff'} side={THREE.BackSide}>
                        <Gradient
                            colorA={colorA}
                            colorB={colorB}
                            axes={'y'}
                            start={start}
                            end={end}
                        />
                    </LayerMaterial>
                </Sphere>
            </Environment>
        </>
    );
};

export default Background;
