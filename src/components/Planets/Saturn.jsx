/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/planets/Saturn.glb 
*/

import { useGLTF } from '@react-three/drei';

export const Saturn = (props) => {
    const { nodes, materials } = useGLTF('/models/planets/Saturn.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.group292618952.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.group2013386449.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.mesh646701568.geometry}
                material={materials.mat15}
            />
            <mesh
                geometry={nodes.mesh646701568_1.geometry}
                material={materials.mat18}
            />
        </group>
    );
};

useGLTF.preload('/models/planets/Saturn.glb');
