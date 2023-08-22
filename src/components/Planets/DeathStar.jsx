/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/planets/DeathStar.glb 
*/

import { useGLTF } from '@react-three/drei';

export const DeathStar = (props) => {
    const { nodes, materials } = useGLTF('/models/planets/DeathStar.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.group799463457.geometry}
                material={materials.mat17}
            />
            <mesh
                geometry={nodes.group1208480485.geometry}
                material={materials.mat17}
            />
            <mesh
                geometry={nodes.group1920486902.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.group2085706638.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.group803718959.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.group1672894890.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.mesh333298558.geometry}
                material={materials.mat21}
            />
            <mesh
                geometry={nodes.mesh333298558_1.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.mesh333298558_2.geometry}
                material={materials.mat23}
            />
            <mesh
                geometry={nodes.mesh461147207.geometry}
                material={materials.mat21}
            />
            <mesh
                geometry={nodes.mesh461147207_1.geometry}
                material={materials.mat23}
            />
        </group>
    );
};

useGLTF.preload('/models/planets/DeathStar.glb');
