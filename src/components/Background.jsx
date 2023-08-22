import { Environment, Sphere } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';

import * as Three from 'three';

const Background = () => {
    // const texture = new Three.TextureLoader().load(
    //     '/public/milky-way-full-stars-space.jpg'
    // );
    // texture.wrapS = Three.RepeatWrapping;
    // texture.wrapT = Three.RepeatWrapping;
    // texture.repeat.set(4, 4);

    return (
        <>
            <Environment preset='night' />
            <Sphere scale={[100, 100, 100]} rotation-y={Math.PI / 2}>
                <LayerMaterial
                    lighting='physical'
                    transmission={1}
                    side={Three.BackSide}
                >
                    <Gradient
                        colorA={'white'}
                        colorB={'#080c51'}
                        axes={'y'}
                        start={0}
                        end={-0.7}
                    />
                    {/* <Texture map={texture} axes={'y'} start={0} end={-0.9} /> */}
                </LayerMaterial>
            </Sphere>
        </>
    );
};

export default Background;
