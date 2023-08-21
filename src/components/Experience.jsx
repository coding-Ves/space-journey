import { OrbitControls } from '@react-three/drei';

const Experience = () => {
    return (
        <OrbitControls>
            <mesh>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </OrbitControls>
    );
};

export default Experience;
