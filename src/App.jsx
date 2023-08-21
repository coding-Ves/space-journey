import { Canvas } from '@react-three/fiber';
import Experience from './components/Experience';

function App() {
    return (
        <>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 30 }}
                background={['#ececec']}
            >
                <Experience />
            </Canvas>
        </>
    );
}

export default App;
