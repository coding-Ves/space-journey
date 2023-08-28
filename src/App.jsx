import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';
import { ScrollControls } from '@react-three/drei';

function App() {
    return (
        <>
            <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <color attach='background' args={['#ececec']} />
                <ScrollControls pages={8} damping={0.8}>
                    <Experience />
                </ScrollControls>
            </Canvas>
        </>
    );
}

export default App;
