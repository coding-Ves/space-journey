/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.10 public/models/rocketship/rocketship.glb 
*/

// import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const Rocketship = (props) => {
    const { nodes, materials } = useGLTF('/models/rocketship/rocketship.glb');
    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.mesh125571997.geometry}
                material={materials.mat8}
            />
            <mesh
                geometry={nodes.mesh125571997_1.geometry}
                material={materials.mat21}
            />
            <mesh
                geometry={nodes.mesh125571997_2.geometry}
                material={materials.mat5}
            />
            <mesh
                geometry={nodes.mesh125571997_3.geometry}
                material={materials.mat12}
            />
            <mesh
                geometry={nodes.mesh125571997_4.geometry}
                material={materials.mat13}
            />
        </group>
    );
};

useGLTF.preload('/models/rocketship/rocketship.glb');
