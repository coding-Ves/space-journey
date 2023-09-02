import { Text } from '@react-three/drei';

export const TextSection = ({ title, subtitle, ...props }) => {
    return (
        <group {...props}>
            {!!title && (
                <Text
                    color='white'
                    fillOpacity={1000}
                    anchorX={'left'}
                    outlineWidth={0.001}
                    anchorY='bottom'
                    fontSize={0.6}
                    maxWidth={5}
                    lineHeight={1}
                >
                    {title}
                </Text>
            )}

            <Text
                color='white'
                anchorX={'left'}
                fillOpacity={130}
                anchorY='top'
                fontSize={0.3}
                maxWidth={3}
            >
                {subtitle}
            </Text>
        </group>
    );
};
